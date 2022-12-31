import React, { useEffect, useRef, useState } from 'react';
import * as faceapi from 'face-api.js';
import axios from 'axios';
import { Button } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';

const Auth = () => {
    const image = new Image();
    const [videoLoaded, setVideoLoaded] = useState(false);
    const [username, setUsername] = useState();
    // const [imageURL, setImageURL] = useState();
    const videoRef = useRef(null);
    const width = 465;
    const height = 564;
    const canvasRef = useRef(null);
    const location = useLocation();
    const body = {
        token: location.state.token
    }

    // Fetch user facial recognition data
    axios.post('http://localhost:6001/users/getData', body)
        .then((res) => {
            setUsername(res.data.data.username)
            image.src = res.data.data.image
        })

    const loadModels = async () => {
        Promise.all([
            faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
            faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
            faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
        ]).then(() => {
            console.log("Models Loaded!");
        })
        .catch((err) => console.log(err))
    }

    const startVideo = () => {
        navigator.mediaDevices
            .getUserMedia({ 
                video: {width: width, height: height} 
            })
            .then(stream => {
                let camera = videoRef.current;
                camera.srcObject = stream;
                camera.play();
            })
            .catch(err =>{
                console.error(err);
            })
    }

    const detectFace = async () => {
        setInterval( async () => {
            if (canvasRef && canvasRef.current) {
                const displaySize = { width: width, height: height }
                canvasRef.current.innerHTML = faceapi.createCanvasFromMedia(videoRef.current);
                faceapi.matchDimensions(canvasRef.current, displaySize);
                const detections = await faceapi.detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks();
                const resizedDetections = faceapi.resizeResults(detections, displaySize);
                canvasRef.current.getContext('2d').clearRect(0, 0, width, height);
                faceapi.draw.drawDetections(canvasRef.current, resizedDetections);
              }
        }, 100)
    }


    useEffect(() => {
        startVideo();
        videoRef && loadModels();
    }, [])

    return (
        <div>
            <button style={{width: "50px", height:"50px"}} onClick={() => detectFace()}>Detect</button>
            <div style={{display: "flex", justifyContent:"center", padding:"10px"}}>
                <video ref={videoRef}></video>
                <canvas ref={canvasRef} style={{ position: 'absolute' }} />
            </div>
        </div>    

        
    )
}

export default Auth