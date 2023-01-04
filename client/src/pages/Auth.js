import React, { useEffect, useRef, useState } from 'react';
import * as faceapi from 'face-api.js';
import axios from 'axios';
import { Button, Img } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';
import testImg from '../assets/faceTest.jpeg';

const Auth = () => {
    const image = new Image();
    const [matchFound, setMatchFound] = useState(false);
    const [username, setUsername] = useState();
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
            faceapi.nets.ssdMobilenetv1.loadFromUri('/models')
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

    const hello = () =>{
        setTimeout(() => {
            console.log("reached")
        }, 5000)
    }

    const detectFace = async () => {
        const displaySize = { width: width, height: height }
        canvasRef.current.innerHTML = faceapi.createCanvasFromMedia(videoRef.current);
        faceapi.matchDimensions(canvasRef.current, displaySize);
        const referenceImage = await faceapi.detectSingleFace(image, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceDescriptor()
        const labeledDescriptor = new faceapi.LabeledFaceDescriptors(username, [referenceImage.descriptor])
        const faceMatcher = new faceapi.FaceMatcher(labeledDescriptor)
        setInterval( async () => {
            canvasRef.current.getContext('2d').clearRect(0, 0, width, height);
            const recognition = await faceapi.detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceDescriptor()
            const resizedRecognition = faceapi.resizeResults(recognition, displaySize);
            const match = faceMatcher.findBestMatch(recognition.descriptor).toString()
            console.log(match)
            const box = resizedRecognition.detection.box
            const drawBox = new faceapi.draw.DrawBox(box, { label: match})
            drawBox.draw(canvasRef.current)
            // if (match.toString() != "unknown"){
            //     hello()
            // }
            // const match = faceMatcher.findBestMatch(recognition.descriptor)
        }, 200)
        // setInterval( async () => {
        //         const detections = await faceapi.detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks();
        //         const resizedDetections = faceapi.resizeResults(detections, displaySize);
        //         canvasRef.current.getContext('2d').clearRect(0, 0, width, height);
        //         const match = faceMatcher.findBestMatch(detections.descriptor)
        //         const box = resizedDetections.detection.box
        //         const drawBox = new faceapi.draw.DrawBox(box, { label: match.toString()})
        //         drawBox.draw(canvasRef.current)
        //         // faceapi.draw.drawDetections(canvasRef.current, resizedDetections);
        // }, 100)
    }

    const test = async () => {
        setMatchFound(true);
        console.log(matchFound);
        const referenceImage = await faceapi.detectSingleFace(image, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceDescriptor()
        const labeledDescriptor = new faceapi.LabeledFaceDescriptors(username, [referenceImage.descriptor])
        const faceMatcher = new faceapi.FaceMatcher(labeledDescriptor)
        const cameraImage = await faceapi.detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceDescriptor()
        const match = faceMatcher.findBestMatch(cameraImage.descriptor)
        console.log(match)
        // const match = new faceapi.FaceMatcher().findBestMatch()
    }

    useEffect(() => {
        startVideo();
        videoRef && loadModels();
    }, [])

    return (
        <div>
            <button style={{width: "50px", height:"50px"}} onClick={() => detectFace()}>Detect</button>
            <button style={{width: "50px", height:"50px"}} onClick={() => test()}>test</button>
            <div style={{display: "flex", justifyContent:"center", padding:"10px"}}>
                <video ref={videoRef}></video>
                <canvas ref={canvasRef} style={{ position: 'absolute' }} />
            </div>
            {/* <img ref={testRef} id="latch" src={testImg}/> */}
        </div>    

        
    )
}

export default Auth