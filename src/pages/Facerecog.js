import { React, useState, useEffect, useRef } from "react";
import { Layout, Spin } from "antd";
import { FooterComponent } from "../components/FooterComponent";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import * as faceapi from "@vladmandic/face-api";
import "../css/Facerecog.css";
import { message } from "antd";

const { Content, Header } = Layout;

const stopVideo = () => {
  navigator.mediaDevices
    .getUserMedia({ video: true, audio: false })
    .then((mediaStream) => {
      const stream = mediaStream;
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
    });
};

export const Facerecog = () => {
  const navigate = useNavigate();

  const { state } = useLocation();

  console.log(state);

  let ages = [];

  const [initializing, setinitializing] = useState(false);

  const videoRef = useRef();

  const canvasRef = useRef();

  const startVideo = () => {
    if (state) {
      if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices
          .getUserMedia({ video: true })
          .then(function (s) {
            videoRef.current.srcObject = s;
          })
          .catch((err) => {
            message.error("No webcam found!");
            message.warning("Webcam needed for verification");
          });
      }
    } else {
      navigate("/reg", { replace: true });
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
          navigator.mediaDevices.getUserMedia({ video: false });
          ages.forEach((ele) => {
            if (ele[0].age >= 18) {
              count++;
            }
          });
          if (count >= 3) {
            await axios.post("/register/register", state)
            .then(
            stopVideo(),
            message.success("Done! Now login to continue"),
            navigate("/login", { replace: true }),
            )
            .catch((err)=>{
              message.error("Some error occured, please retry");
            })
          } else {
            stopVideo(); 
            message.warning("You are not 18+");
            navigate("/register", { replace: true });
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
    <>
      <Layout style={{ minHeight: "100vh" }}>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }} />

          <Content style={{ margin: "6px 16px" }}>
            <div className="face-recog-div">
              <video
                ref={videoRef}
                autoPlay="true"
                height="750"
                width="750"
                onPlay={handelVideoOnPlay}
              />
              <canvas ref={canvasRef} className="canvas-class" />
            </div>
            <h3 style={{ textAlign: "center" }}>
              {initializing ? <Spin /> : "Please look at the camera"}
            </h3>
          </Content>

          <FooterComponent />
        </Layout>
      </Layout>
    </>
  );
};
