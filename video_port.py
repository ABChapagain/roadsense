
import cv2
import threading
from datetime import datetime
from flask import Flask, render_template, Response
from ultralytics import YOLO

app = Flask(__name__)

frame_skip = 1

def annotate_frame(frame, custom_text):
    # time and the date in the video 
    now = datetime.now()
    current_time = now.strftime("%Y-%m-%d %H:%M:%S")

  
    font = cv2.FONT_HERSHEY_SIMPLEX
    cv2.putText(frame, current_time, (10, 30), font, 1, (0, 0, 255), 2, cv2.LINE_AA)

 
    cv2.putText(frame, custom_text, (10, 60), font, 1, (0, 255, 0), 2, cv2.LINE_AA)

  
    return frame

def generate_frames(video_path, custom_text):
    cap = cv2.VideoCapture(video_path)
    frame_count = 0

    while True:
        success, frame = cap.read()

        if not success:
            break

        frame_count += 1

        if frame_count % frame_skip == 0:
            annotated_frame = annotate_frame(frame, custom_text)

            _, buffer = cv2.imencode('.jpg', annotated_frame)
            frame_bytes = buffer.tobytes()

            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame_bytes + b'\r\n')


@app.route('/video')
def video():
    video_path = "train2.mp4"  
    custom_text = "Chabil"
    return Response(generate_frames(video_path, custom_text), mimetype='multipart/x-mixed-replace; boundary=frame')

# go to the html page 
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/test1')
def video1():
    video_path = "train2.mp4"  
    custom_text = "Maitighar"
    return Response(generate_frames(video_path, custom_text), mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/test2')
def video2():
    video_path = "train2.mp4"  
    custom_text = "Koteshwore"
    return Response(generate_frames(video_path, custom_text), mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/test3')
def video3():
    video_path = "train2.mp4"  
    custom_text = "Kappan"
    return Response(generate_frames(video_path, custom_text), mimetype='multipart/x-mixed-replace; boundary=frame')

if __name__ == '__main__':
    app.run(port=499)
