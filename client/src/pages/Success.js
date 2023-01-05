import React, { useRef, useState } from 'react'
import { Flex, Heading, Text, Input, Button, Image, Alert, AlertIcon, AlertDescription, AlertTitle } from '@chakra-ui/react'

const Success = () => {
  return (
    <Flex height="100vh" display="flex" alignItems="center" justifyContent="center" background="#DADFE2">
        <Alert status='success' variant='subtle' flexDirection='column' 
        alignItems='center' justifyContent='center' textAlign='center' 
        height="35vh" width="40vw" borderRadius={10}>
            <AlertIcon boxSize='40px' mr={0} />
            <AlertTitle mt={4} mb={1} fontSize='lg'>
                Authentication Successful!
            </AlertTitle>
            <AlertDescription maxWidth='sm'>
                Thank you for completing the FRASER process!
            </AlertDescription>
        </Alert>
    </Flex>
  )
}

export default Success