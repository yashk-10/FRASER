import React, {useRef, useEffect, useState} from 'react'
import { Flex, Heading, Text, Input, Button, Image } from '@chakra-ui/react'

const Setup = () => {
    const cameraRef = useRef(null);
    const imageRef = useRef(null);

    const [button, setButton] = useState("Capture")
    const [display, setDisplay] = useState("block")
    const [photoExists, setPhotoExists] = useState(false);

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


        image.width = 465;
        image.height = 564;

        let ctx = image.getContext('2d')
        ctx.drawImage(camera, 0, 0, 465, 564);
        setButton("Submit")
        setDisplay("none")
    }


    useEffect(() => {
        startVideo();
    }, [cameraRef])

    return (
        <Flex height="100vh" alignItems="center" justifyContent="center" background="#BFCAD4">
        <Flex height="39.6vw"  display="flex" direction="row" background="#ACBCCB" borderRadius="10px">
            
            <Flex width="80vw" m="3vw"  justifyContent="center">
                <video style={{display: display}} ref={cameraRef} ></video>
                <canvas ref={imageRef}></canvas>
                <Button onClick={captureImage}>{button}</Button>
            </Flex>
            
        </Flex>
        </Flex>
    )
}

export default Setup