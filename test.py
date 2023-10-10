import cv2
import threading
from datetime import datetime
from flask import Flask, render_template, Response
from ultralytics import YOLO
import os


app = Flask(__name__)



# make a folder named snapshot to save the snap while the accident is detected
snapshot_dir = "snapshots"
os.makedirs(snapshot_dir, exist_ok=True)

frame_count = 0  # Initialize frame_count outside of any function


model = YOLO("acc_test.pt")

frame_skip = 5

def annotate_frame(frame, custom_text):
    # time and date
    now = datetime.now()
    current_time = now.strftime("%Y-%m-%d %H:%M:%S")

  
    font = cv2.FONT_HERSHEY_SIMPLEX
    cv2.putText(frame, current_time, (10, 30), font, 1, (0, 0, 255), 2, cv2.LINE_AA)

 
    cv2.putText(frame, custom_text, (10, 60), font, 1, (0, 255, 0), 2, cv2.LINE_AA)

   
    results = model(frame)
    annotated_frame = results[0].plot()

    return annotated_frame

def generate_frames(video_path, custom_text, confidence_threshold=0.5):
    global frame_count
    cap = cv2.VideoCapture(video_path)
    frame_count = 0

    while True:
        success, frame = cap.read()

        if not success:
            break

        frame_count += 1

        if frame_count % frame_skip == 0:
            results = model(frame)

            # Check for severe or moderate accidents
            for det in results.pred[0]:
                class_id, confidence, bbox = det[:3]
                if class_id in [0, 1] and confidence >= confidence_threshold:  # Class 0: Severe, Class 1: Moderate
                    annotated_frame = annotate_frame(frame, custom_text)

                    snapshot_filename = os.path.join(snapshot_dir, f"snapshot_{frame_count}.jpg")
                    cv2.imwrite(snapshot_filename, annotated_frame)

                    _, buffer = cv2.imencode('.jpg', annotated_frame)
                    frame_bytes = buffer.tobytes()

                    yield (b'--frame\r\n'
                           b'Content-Type: image/jpeg\r\n\r\n' + frame_bytes + b'\r\n')


@app.route('/videoo')
def video():
    video_path = "test1.mp4"
    custom_text = "pulchowk"
    confidence_threshold = 0.5  
    return Response(generate_frames(video_path, custom_text, confidence_threshold), mimetype='multipart/x-mixed-replace; boundary=frame')


@app.route('/video')
def video():
    video_path = "test1.mp4"
    custom_text = "pulchowk"
    confidence_threshold = 0.5
  
    return Response(generate_frames(video_path, custom_text, confidence_threshold), mimetype='multipart/x-mixed-replace; boundary=frame')

# while running the file go to the index.html page and render the templates
@app.route('/')
def index():
    return render_template('index.html')


# hosting the video in the different path and passsing the video link to the path.
@app.route('/test1')
def video1():
    video_path = "test1.mp4"  
    custom_text = "Maitighar"
    confidence_threashold = 0,5
    return Response(generate_frames(video_path, custom_text), mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/test2')
def video2():
    video_path = "test2.mp4"  
    custom_text = "Koteshwor"
    return Response(generate_frames(video_path, custom_text), mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/test3')
def video3():
    video_path = "test1.mp4"  
    custom_text = "Kappan"
    return Response(generate_frames(video_path, custom_text), mimetype='multipart/x-mixed-replace; boundary=frame')
# hosting the entire file in the port 49
if __name__ == '__main__':
    app.run(port=49, debug=False)
