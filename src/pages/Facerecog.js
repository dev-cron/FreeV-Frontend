import { React, useState, useEffect, useRef } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import * as faceapi from "@vladmandic/face-api";
import "../css/Facerecog.css";
import { message } from "antd";

export const Facerecog = () => {
  const navigate = useNavigate();

  const  {state} = useLocation();

  console.log(state);

  let ages = [];

  const [initializing, setinitializing] = useState(false);

  const videoRef = useRef();

  const canvasRef = useRef();

  const startVideo = () => {
    
    if(navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
      .then(function (s) {
        videoRef.current.srcObject = s;
      })
      .catch((err)=>{
        message.error("No webcam found!");
        message.warning("Webcam needed for verification");
      })
      }
  };

  const loadModels = async () => {
    const ModelUrl = process.env.PUBLIC_URL + "/models";

    setinitializing(true);

    Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri(ModelUrl),

      faceapi.nets.faceLandmark68Net.loadFromUri(ModelUrl),

      faceapi.nets.faceRecognitionNet.loadFromUri(ModelUrl),

      faceapi.nets.faceExpressionNet.loadFromUri(ModelUrl),

      faceapi.nets.ageGenderNet.loadFromUri(ModelUrl),
    ]).then(startVideo);
  };

  const handelVideoOnPlay = () => {
    let Interval = setInterval(async () => {
      if (initializing) {
        setinitializing(false);
      }

      canvasRef.current.innerHTML = faceapi.createCanvasFromMedia(
        videoRef.current
      );

      const displaySize = { width: 750, height: 750 };

      faceapi.matchDimensions(canvasRef.current, displaySize);

      const detections = await faceapi

        .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())

        .withFaceLandmarks()

        .withAgeAndGender()

        .withFaceExpressions();

      if (detections.length > 0) {
        if (ages.length < 5) ages.push(detections);
        else {
          let count = 0;
          clearInterval(Interval);
          navigator.mediaDevices.getUserMedia({video:false});
          ages.forEach((ele) => {
            if (ele[0].age >= 18) {
              count++;
            }
          });
          if (count >= 3) {
            axios
              .post("/register/register", state)
              
              .then(alert("Now login to continue")
              
              .then(navigate("/login",{replace:true})))
          } 
          else {
            alert("you are not 18+");
            navigate('/register',{replace:true});
          }
        }
      }

      const resizedDetections = faceapi.resizeResults(detections, displaySize);

      canvasRef.current.getContext("2d").clearRect(0, 0, 750, 750);

      faceapi.draw.drawDetections(canvasRef.current, resizedDetections);

      faceapi.draw.drawFaceLandmarks(canvasRef.current, resizedDetections);

      faceapi.draw.drawFaceExpressions(canvasRef.current, resizedDetections);
    }, 100);
  };

  useEffect(() => {
    console.log("use effect working");

    loadModels();
  }, []);

  return (
    <div className="face-recog-div">
      <span>{initializing ? "Initializing" : "Ready"}</span>

      <video
        ref={videoRef}
        autoPlay="true"
        height="750"
        width="750"
        onPlay={handelVideoOnPlay}
      />

      <canvas ref={canvasRef} className="canvas-class" />
    </div>
  );
};
