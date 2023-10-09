import os
from flask import Flask, render_template, Response
from ultralytics import YOLO
from datetime import datetime