import React, {useRef, useEffect, useState} from 'react'
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import SetupBackground from '../assets/setupBackground.png'
import FaceTemplate from '../assets/faceTemplate.png'
import { Flex, Heading, Text, Input,
         Button, Image , Popover, PopoverTrigger,
          PopoverContent, PopoverArrow, PopoverCloseButton, PopoverHeader,
        PopoverBody, Portal, Box, PopoverFooter } from '@chakra-ui/react'

const Setup = () => {
    const location = useLocation();
    const cameraRef = useRef(null);
    const imageRef = useRef(null);
    const initRef = useRef(null);
    const image = "ncioweniocnwoienxiowe";

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
        // setPhotoExists(true)
        let camera = cameraRef.current;
        let image = imageRef.current;

        image.width = 295
        image.height = 375

        let ctx = image.getContext('2d')
        ctx.drawImage(camera, 0, 0, 295, 375);
    }

    useEffect(() => {
        startVideo();
    }, [cameraRef])

    const body = {
        username: location.state.username,
        email: location.state.email, 
        password: location.state.password,
        image: image
    }

    const addUser = async () => {
        axios.post('http://localhost:6001/users/add', body)
        .then(res => console.log(res.data));
    }

    return (
        <Flex height="100vh" display="flex" alignItems="center" justifyContent="center" background="#BFCAD4">
            <Flex height="80vh" display="flex" direction="row" background="#ACBCCB" borderRadius="10px">
                <Flex height="10vh" mt="35vh" pl="4vw" pr="10vw" display="flex" direction="column" justifyContent="center" alignItems="center">
                    <Text textAlign="center" fontSize="2vw" fontFamily="Poppins">Set Up</Text>
                    <Text textAlign="center" fontSize=".8vw" width="16vw" mt=".5vh" fontFamily="Poppins" color="#5E5E5E">Capture your face and upload
                     it to our database for efficient authentication</Text>
                </Flex>
            <Flex height="80vh" display="flex" justifyContent="center" direction="column" alignItems="center">
                <Image src={SetupBackground} position="absolute" height="80vh" zIndex="0"/>
                <Flex height="55vh" borderRadius="5" overflow="hidden" zIndex="2" >
                    <video ref={cameraRef}></video>
                </Flex>
                <Image mb="5vh" src={FaceTemplate} position="absolute" height="50vh" zIndex="3"/>
             <Popover closeOnBlur={false} placement='top' initialFocusRef={initRef}>
                 {({ isOpen, onClose }) => (
                     <>
                     <PopoverTrigger placement='top'>
                        <Button  pl="6vw" pr="6vw" mt="1vh" height="6vh" background="#85B9DF" borderRadius="5" onClick={()=> captureImage()}>{isOpen ? 'Cancel' : 'Capture'}</Button>
                        {/* <button height="2vw" width="5vw" background="#85B9DF" borderRadius="7" onClick={()=> captureImage()}>{isOpen ? 'Cancel' : 'Capture'}</button> */}
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
        </Flex>
        // <Flex height="100vh" alignItems="center" justifyContent="center" background="#BFCAD4">
        // <Flex display="flex" direction="row" background="#ACBCCB" borderRadius="10px">
        //     <Flex display="flex" m="20vw" justifyContent="center" direction="column">
        //         <video ref={cameraRef}></video>
        //         <Popover closeOnBlur={false} placement='top' initialFocusRef={initRef}>
        //         {({ isOpen, onClose }) => (
        //             <>
        //             <PopoverTrigger placement='top'>
        //                 <Button onClick={(captureImage())}>{isOpen ? 'Cancel' : 'Capture'}</Button>
        //             </PopoverTrigger>
        //             <Portal>
        //                 <PopoverContent>
        //                 <PopoverHeader>Success!</PopoverHeader>
        //                 <PopoverCloseButton/>
        //                 <PopoverBody>
        //                     <Box>Would you like to submit this image?</Box>
        //                     <canvas ref={imageRef}/>
        //                     <Button
        //                     mt={4}
        //                     colorScheme='blue'
        //                     onClick={onClose}
        //                     ref={initRef}
        //                     >
        //                     Submit
        //                     </Button>
        //                 </PopoverBody>
        //                 </PopoverContent>
        //             </Portal>
        //             </>
        //         )}
        //         </Popover>


                /* <Popover>
                <PopoverTrigger>
                    <Button m={3} background="#85B9DF" size="lg" height="100vw" onClick={captureImage}>{button}</Button>
                </PopoverTrigger>
                <PopoverContent>
                    <PopoverArrow />
                    <PopoverCloseButton onClick={close}/>
                    <PopoverHeader>Success!</PopoverHeader>
                    <PopoverBody >
                        <canvas ref={imageRef}/>
                    </PopoverBody>
                </PopoverContent>
                </Popover> */
            
    )
}

export default Setup