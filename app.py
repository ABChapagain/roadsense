import datetime
import cv2
import threading
from datetime import datetime
from flask import Flask, render_template, Response
from ultralytics import YOLO
import os
import time
import requests
import json

app = Flask(__name__)



# make a folder named snapshot to save the snap while the accident is detected
snapshot_dir = "public/snapshots"
os.makedirs(snapshot_dir, exist_ok=True)

frame_count = 0  # Initialize frame_count outside of any function


model = YOLO("acc_best.pt")

frame_skip = 5

classnames = ["moderate-accident", "fatal-accident", "Normal"]

#this function sends http post request to the server
def send_accident_data_to_server(accident_data, headers=None):

    # Define the API endpoint
    api_endpoint = "http://localhost:3000/api/accidents"

    #Convert the data to JSON
    json_payload = json.dumps(accident_data)

    # Send the POST request to the server with the JSON payload
    headers = {'Content-Type': 'application/json'}

    response = requests.post(api_endpoint, data=json_payload, headers=headers)

    # Check the server's response
    if response.status_code == 201:
        print("Data sent successfully!")
        return True
    else:
        print("Data upload failed.")
        return False

#post request


def annotate_frame(frame, custom_text):
    now = datetime.now()
    current_time = now.strftime("%Y-%m-%d %H:%M:%S")

    font = cv2.FONT_HERSHEY_SIMPLEX
    cv2.putText(frame, current_time, (10, 30), font, 1, (0, 0, 255), 2, cv2.LINE_AA)
    cv2.putText(frame, custom_text, (10, 60), font, 1, (0, 255, 0), 2, cv2.LINE_AA)

    results = model.predict(frame)

    # Track whether a snapshot has been taken
    snapshot_taken = False



    annotated_frame = results[0].plot()

    return annotated_frame


def generate_frames(video_path, custom_text):
    global frame_count
    cap = cv2.VideoCapture(video_path)
    frame_count = 0
    snapshot_taken = False

    while True:
        success, frame = cap.read()

        if not success:
            break

        frame_count += 1

        if frame_count % frame_skip == 0:
            # Detect "moderate-accident" and take a snapshot if not already taken
            results = model.predict(frame)
            for r in results:
                for c in r.boxes.cls:
                    class_name = model.names[int(c)]

                    if "moderate-accident" in class_name and not snapshot_taken:
                        print("Moderate Accident Detected:", class_name)
                       
                        # generating the unique id
                       
                        current_time = datetime.now()

                        timestamp_with_microseconds = current_time.timestamp()
                        microseconds = int((timestamp_with_microseconds % 1) * 1e6)

                        unique_number = int(timestamp_with_microseconds * 1e6) + microseconds
                       
                        #snap shot is taken here
                        snapshot_filename = os.path.join(snapshot_dir, f"snapshot_{unique_number}.jpg")
                        cv2.imwrite(snapshot_filename, frame)
                        snapshot_taken = True
                       
                        ipaddress=f"http://127.0.0.1:49/{custom_text}"
                       
                        accident_data={
                            "photos":f"snapshots/snapshot_{unique_number}.jpg",
                            "ipAddress":ipaddress
                            }
                       
                        print(accident_data)
                       
                        #send http post request to the server
                        send_accident_data_to_server(accident_data)
                        break  # Exit the loop once the snapshot is taken

            annotated_frame = annotate_frame(frame, custom_text)

            _, buffer = cv2.imencode('.jpg', annotated_frame)
            frame_bytes = buffer.tobytes()

            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame_bytes + b'\r\n')

    cap.release()



# @app.route('/video')
# def video():
#     video_path = "test1.mp4"
#     custom_text = "pulchowk"
 
#     return Response(generate_frames(video_path, custom_text), mimetype='multipart/x-mixed-replace; boundary=frame')

# while running the file go to the index.html page and render the templates
@app.route('/')
def index():
    return render_template('index.html')


# hosting the video in the different path and passsing the video link to the path.
@app.route('/maitighar')
def video1():
    video_path = "maitighar.mp4"  
    custom_text = "maitighar"
    return Response(generate_frames(video_path, custom_text), mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/koteshore')
def video2():
    video_path = "koteshore.mp4"  
    custom_text = "koteshore"
    return Response(generate_frames(video_path, custom_text), mimetype='multipart/x-mixed-replace; boundary=frame')

# @app.route('/test3')
# def video3():
#     video_path = "test1.mp4"  
#     custom_text = "Kappan"
#     return Response(generate_frames(video_path, custom_text), mimetype='multipart/x-mixed-replace; boundary=frame')

# hosting the entire file in the port 49
if __name__ == '__main__':
    app.run(port=49, debug=False)