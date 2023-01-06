import React, { useEffect, useRef, useState } from 'react';
import * as faceapi from 'face-api.js';
import axios from 'axios';
import { Alert, AlertDescription, AlertIcon, AlertTitle, Button, CloseButton, Flex, Img, useDisclosure } from '@chakra-ui/react';
import { useLocation, useNavigate } from 'react-router-dom';
import AuthImage from '../assets/loginImage.png';

const Auth = () => {
    const {
        isOpen: onClose,
                onOpen,
      } = useDisclosure({ defaultIsOpen: true })
    const navigate = useNavigate();
    const image = new Image();
    const [matchFound, setMatchFound] = useState(false);
    const [username, setUsername] = useState();
    const successRef = useRef(null);
    const errorRef = useRef(null);
    const videoRef = useRef(null);
    const width = 465;
    const height = 564;
    const canvasRef = useRef(null);
    const location = useLocation();
    const body = {
        token: location.state.token
    }
    
    // Fetch user facial recognition data
    axios.post('https://fraser-project-api.onrender.com/users/getData', body)
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

    const detectFace = async () => {
        errorRef.current.style.display = "none";
        const displaySize = { width: videoRef.current.clientWidth, height: videoRef.current.clientHeight }
        canvasRef.current.innerHTML = faceapi.createCanvasFromMedia(videoRef.current);
        faceapi.matchDimensions(canvasRef.current, displaySize);
        const referenceImage = await faceapi.detectSingleFace(image, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceDescriptor()
        const labeledDescriptor = new faceapi.LabeledFaceDescriptors(username, [referenceImage.descriptor])
        const faceMatcher = new faceapi.FaceMatcher(labeledDescriptor)
        var intervalId = setInterval( async () => {
            canvasRef.current.getContext('2d').clearRect(0, 0, width, height);
            const recognition = await faceapi.detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceDescriptor()
            // Checking if face detected
            if (recognition != undefined){
                const resizedRecognition = faceapi.resizeResults(recognition, displaySize);
                const match = faceMatcher.findBestMatch(recognition.descriptor)
                const box = resizedRecognition.detection.box
                const drawBox = new faceapi.draw.DrawBox(box, { label: match.label })
                drawBox.draw(canvasRef.current)
                // Checking if match found
                if (match.label != "unknown"){
                    clearInterval(intervalId)
                    setTimeout(() => {
                        successRef.current.style.display = "block"
                    }, 1500)
                    setTimeout(() => {
                        navigate('/success')
                    }, 4000)
                }
            }
        }, 200)

        setTimeout(() =>{
            clearInterval(intervalId)
            errorRef.current.style.display = "block"
        }, 10000)
    }

    useEffect(() => {
        startVideo();
        videoRef && loadModels();
    }, [])

    return (
        <Flex height="100vh" alignItems="center" justifyContent="center" background="#DADFE2">
            <Flex height="39.6vw" display="flex" alignItems="center" justifyContent="center" direction="column" background="#C2D3DD" borderRadius="10px" pl="20vw" pr="20vw">
                <Img src={AuthImage} position="absolute" height="39.6vw" zIndex="0"/>
                <Flex width="23vw" borderRadius="5" overflow="hidden" zIndex="2" pt="7.2vh">
                    <video ref={videoRef}></video>
                    <canvas ref={canvasRef} style={{ position: 'absolute' }} />
                </Flex>
                <Button mt="1.2vh" width="23vw" height="6vh" onClick={() => detectFace()} background="#184874" color="white">Authenticate</Button>
            </Flex>

            {/* Success Alert */}
            <Alert ref={successRef} status='success' display="none" position="absolute" width="20vw" top="2vh" right="2vw" borderRadius={10}>
                <Flex display="flex" direction="row">
                    <AlertIcon />
                    <AlertTitle fontSize="1.4vw">
                        Authentication Successful!
                    </AlertTitle>
                </Flex>
            </Alert>

            {/* Error Alert */}
            <Alert ref={errorRef} status='error' display="none" position="absolute" width="22vw" top="2vh" right="2vw" borderRadius={10} fontSize="1.2vw">
                <Flex display="flex" direction="row">
                    <AlertIcon />
                    <AlertTitle fontSize="1.4vw">
                        Authentication Failed!
                    </AlertTitle>
                </Flex>
                <AlertDescription fontSize="1.2vw">
                    Please retry...
                </AlertDescription>
            </Alert>
        </Flex>     
    )
}

export default Auth