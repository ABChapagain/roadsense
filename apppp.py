
import cv2
import threading
from datetime import datetime
from flask import Flask, render_template, Response
from ultralytics import YOLO
import os
import time


app = Flask(__name__)



# make a folder named snapshot to save the snap while the accident is detected
snapshot_dir = "public/snapshots"
os.makedirs(snapshot_dir, exist_ok=True)

frame_count = 0  # Initialize frame_count outside of any function


model = YOLO("acc_best.pt")

frame_skip = 5

classnames = ["moderate-accident", "fatal-accident", "Normal"]

def annotate_frame(frame, custom_text):
    # time and date
    now = datetime.now()
    current_time = now.strftime("%Y-%m-%d %H:%M:%S")

  
    font = cv2.FONT_HERSHEY_SIMPLEX
    cv2.putText(frame, current_time, (10, 30), font, 1, (0, 0, 255), 2, cv2.LINE_AA)

 
    cv2.putText(frame, custom_text, (10, 60), font, 1, (0, 255, 0), 2, cv2.LINE_AA)

   
    results = model.predict(frame)
    for r in results:
        for c in r.boxes.cls:
            class_name = model.names[int(c)]
            
            count = 1
            if "moderate-accident" in class_name:
                print(class_name) 
                snapshot_filename = os.path.join(snapshot_dir, f"snapshot.jpg")
                cv2.imwrite(snapshot_filename, frame)
                                
                
                print(snapshot_dir)
          
                
                
                
                
            else:
                print("Hello World")
        
        
    
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
            annotated_frame = annotate_frame(frame, custom_text)
            
            # if ["moderate-accident", "fatal-accident"] in classnames:
            #   snapshot_filename = os.path.join(snapshot_dir, f"snapshot.jpg")
            #   cv2.imwrite(snapshot_filename, frame)
            #   snapshot_taken =True
            # else :
            #     snapshot_taken =False
            
            # while ["moderate-accident", "fatal-accident"] in classnames:
            #     frame_count = 0
            #     if ["moderate-accident", "fatal-accident"]:
            #         snapshot_filename = os.path.join(snapshot_dir, f"snapshot.jpg")
            #         cv2.imwrite(snapshot_filename, frame)
            #         snapshot_taken = True
                
            #     if not ["moderate-accident", "fatal-accident"]:
            #         break
                
                
                
            

            # if "moderate-accident" in custom_text or "fatal-accident" in custom_text:
            #     if not snapshot_taken:
            #         snapshot_filename = os.path.join(snapshot_dir, f"snapshot_{custom_text}.jpg")
            #         cv2.imwrite(snapshot_filename, frame)
            #         snapshot_taken = True
            # else:
            #     # Reset snapshot_taken
            #     snapshot_taken = False

            # snapshot_filename = os.path.join(snapshot_dir, f"snapshot_{frame_count}.jpg")
            # cv2.imwrite(snapshot_filename, frame)

            frame_count += 1

            _, buffer = cv2.imencode('.jpg', annotated_frame)
            frame_bytes = buffer.tobytes()

            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame_bytes + b'\r\n')


@app.route('/video')
def video():
    video_path = "test1.mp4"
    custom_text = "pulchowk"
  
    return Response(generate_frames(video_path, custom_text), mimetype='multipart/x-mixed-replace; boundary=frame')

# while running the file go to the index.html page and render the templates
@app.route('/')
def index():
    return render_template('index.html')


# hosting the video in the different path and passsing the video link to the path.
@app.route('/test1')
def video1():
    video_path = "test1.mp4"  
    custom_text = "Maitighar"
    return Response(generate_frames(video_path, custom_text), mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/test2')
def video2():
    video_path = "test2.mp4"  
    custom_text = "Koteshwore"
    return Response(generate_frames(video_path, custom_text), mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/test3')
def video3():
    video_path = "test1.mp4"  
    custom_text = "Kappan"
    return Response(generate_frames(video_path, custom_text), mimetype='multipart/x-mixed-replace; boundary=frame')
# hosting the entire file in the port 49
if __name__ == '__main__':
    app.run(port=49, debug=False)
