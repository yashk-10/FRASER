import React, {useRef, useEffect, useState} from 'react'
import * as faceapi from 'face-api.js';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import SetupBackground from '../assets/setupBackground.png'
import FaceTemplate from '../assets/faceTemplate.png'
import { Flex, Heading, Text, Input,
         Button, Image , Popover, PopoverTrigger,
          PopoverContent, PopoverArrow, PopoverCloseButton, PopoverHeader,
        PopoverBody, Portal, Box, PopoverFooter, Alert, AlertIcon, AlertTitle, AlertDescription } from '@chakra-ui/react'

const Setup = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const cameraRef = useRef(null);
    const imageRef = useRef(null);
    const initRef = useRef(null);
    const errorRef = useRef(null);
    const successRef = useRef(null);
    const [image, setImage] = useState("")
    const [errorMessage, setErrorMessage] = useState("");

    const startVideo = () => {
        navigator.mediaDevices
            .getUserMedia({ 
                video: {width: 465, height: 564 } 
            })
            .then(stream => {
                let camera = cameraRef.current;
                camera.srcObject = stream;
                camera.play();
            })
            .catch(err =>{
                console.error(err);
            })
    }

    const captureImage = () => {
        errorRef.current.style.display = "none";
        let camera = cameraRef.current;
        let image = imageRef.current;
        image.width = 295
        image.height = 375
        let ctx = image.getContext('2d')
        ctx.drawImage(camera, 0, 0, 295, 375);
        const dataURL = image.toDataURL('image/jpeg')
        setImage(dataURL)
    }

    useEffect(() => {
        startVideo();
    }, [cameraRef])

    const addUser = async () => {
        Promise.all([
            faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
            faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
            faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
            faceapi.nets.ssdMobilenetv1.loadFromUri('/models')
        ]).then(async () => {
            console.log("Models Loaded!");
            const recognition = await faceapi.detectSingleFace(imageRef.current, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceDescriptor()
            if (recognition != undefined){
                const body = {
                    username: location.state.username,
                    email: location.state.email, 
                    password: location.state.password,
                    image: image
                }

                // Saving the user in the database
                axios.post('http://localhost:6001/users/add', body)
                .then(res => console.log(res.data));
            
                successRef.current.style.display = "block";

                setTimeout(() => {
                    navigate('/');
                }, 2000)
            }
            else{
                errorRef.current.style.display = "block";
                setErrorMessage("Face Undetected! Please follow instructions and try again...")
            }
        })
        .catch((err) => {
            errorRef.current.style.display = "block";
            setErrorMessage(err)
        })
    }
    
    return (
        <Flex height="100vh" display="flex" alignItems="center" justifyContent="center" background="#BFCAD4">
            <Flex height="80vh" display="flex" direction="row" background="#ACBCCB" borderRadius="10px">

            {/* Left Panel */}
            <Flex height="10vh" mt="35vh" pl="4vw" pr="10vw" display="flex" direction="column" justifyContent="center" alignItems="center">
                <Text textAlign="center" fontSize="2vw" fontFamily="Poppins">Set Up</Text>
                <Text textAlign="center" fontSize=".8vw" width="16vw" mt=".5vh" fontFamily="Poppins" color="#5E5E5E">Capture your face and upload
                    it to our database for efficient authentication</Text>
            </Flex>

            {/* Camera */}
            <Flex height="80vh" display="flex" justifyContent="center" direction="column" alignItems="center">
                <Image src={SetupBackground} position="absolute" height="80vh" zIndex="0"/>
                <Flex height="55vh" borderRadius="5" overflow="hidden" zIndex="2" >
                    <video ref={cameraRef}></video>
                </Flex>
                <Image mb="5vh" src={FaceTemplate} position="absolute" height="40vh" zIndex="3"/>
             <Popover closeOnBlur={false} placement='top' initialFocusRef={initRef}>
                 {({ isOpen, onClose }) => (
                     <>
                     <PopoverTrigger placement='top'>
                        <Button  pl="6vw" pr="6vw" mt="1vh" height="6vh" background="#85B9DF" borderRadius="5" onClick={()=> captureImage()}>{isOpen ? 'Cancel' : 'Capture'}</Button>
                     </PopoverTrigger>
                     <Portal >
                         <PopoverContent background="#184874">
                         <PopoverHeader color="white">Success!</PopoverHeader>
                         <PopoverCloseButton color="white"/>
                         <PopoverBody display="flex" alignItems="center" flexDirection="column">
                             <Box color="white" mb={2}>Would you like to submit this image?</Box>
                             <canvas ref={imageRef}/>
                             <Button mb={2} mt={3} background= "#85B9DF" onClick={() => addUser()} ref={initRef}>Submit</Button>
                         </PopoverBody>
                         </PopoverContent>
                     </Portal>
                     </>
                 )}
                 </Popover>
                </Flex>

                {/* Right Panel */}
                <Flex height="10vh" mt="35vh" pr="4vw" pl="10vw" display="flex" direction="column" justifyContent="center" alignItems="center">
                    <Text textAlign="center" fontSize="2vw" fontFamily="Poppins">Instructions</Text>
                    <Text textAlign="center" fontSize=".8vw" width="17vw" mt=".8vh" fontFamily="Poppins" color="#5E5E5E">Align your face with the dotted template</Text>
                    <Text textAlign="center" fontSize=".8vw" width="17vw" mt=".8vh" fontFamily="Poppins" color="#5E5E5E">Make sure to remove any face coverings e.g
                     sunglasses, mask, headband</Text>
                    <Text textAlign="center" fontSize=".8vw" width="17vw" mt=".8vh" fontFamily="Poppins" color="#5E5E5E">Once ready, click the <b>“Capture”</b> button to take the image</Text>
                    <Text textAlign="center" fontSize=".8vw" width="17vw" mt=".8vh" fontFamily="Poppins" color="#5E5E5E">Capture your face and upload
                     it to our database for efficient authentication</Text>
                    <Text textAlign="center" fontSize=".8vw" width="17vw" mt=".8vh" fontFamily="Poppins" color="#5E5E5E">Capture your face and upload
                     it to our database for efficient authentication</Text>
                </Flex>
            </Flex>

            {/* Success Alert */}
            <Alert ref={successRef} status='success' display="none" position="absolute" width="20vw" top="2vh" right="2vw" borderRadius={10}>
                <Flex display="flex" direction="row">
                <AlertIcon />
                <AlertTitle fontSize="1.4vw">
                    User Added Successfully!
                </AlertTitle>
                </Flex>
            </Alert>

            {/* Error Alert */}
            <Alert ref={errorRef} status='error' display="none" position="absolute" width="20vw" top="2vh" right="2vw" borderRadius={10}>
                <Flex display="flex" direction="row">
                <AlertIcon />
                <AlertTitle fontSize="1.4vw">Error!</AlertTitle>
                </Flex>
                <AlertDescription fontSize="1.2vw">
                    {errorMessage}
                </AlertDescription>
            </Alert>
        </Flex>
    )
}

export default Setup