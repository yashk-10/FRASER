import React from 'react'
import { Flex, Heading, Text, Input, Button, Image } from '@chakra-ui/react'
import LoginLogo from '../assets/loginLogo.png'
import LoginImage from '../assets/loginImage.png'
import { transform } from 'framer-motion'

const Login = () => {
  return (
    <Flex height="100vh" alignItems="center" justifyContent="center" background="#DADFE2">
      <Flex height="80vh"  display="flex" direction="row" background="#C2D3DD" borderRadius="10px">
        <Flex fontFamily="Poppins" pt="6.5vw" pl="4vw" pr="4vw" direction="column" alignItems="center">
          <Image src={LoginLogo} alt="Login Logo" opacity={1.5}/>
          <Text mb={2} textAlign="center" fontSize="4xl" >Welcome Back</Text>
          <Text mb={4} width="25vw" fontSize="sm" textAlign="center" color="#5E5E5E">Enter your credentials and we’ll get started with the verification process.</Text>
          <Input width="25vw" placeholder="Username" variant="filled" mb={3} type="email" border="1px solid" fontSize="sm"/>
          <Input width="25vw" placeholder="Password" variant="filled" mb={3} type="password" border="1px solid" fontSize="sm" />
          <Button width="25vw" background="#184874" color="white">Continue</Button>

        </Flex>
        <Flex alignItems="right" justifyContent="right">
          <Image src={LoginImage} alt="Login Image"/>
          <Button height="2.5vw" position="absolute" _hover="none" background="#939393" color="white" fontSize="1vw" cursor="default" mr="7.6vw" mt="7.8vw" >FRASER</Button>
          <Text position="absolute" fontSize="0.8vw" textAlign="right" mr="7.6vw" mt="10.5vw" color="#FFFFFF" >Facial Recognition Authentication System <br></br> Evolutionizing Reliability</Text>
          <Text position="absolute" fontSize="3vw" mr="7.6vw" mt="13vw" color="#FFFFFF" fontWeight="bold">Hello!</Text>
          <Text position="absolute" fontSize="0.8vw" textAlign="right" mr="7.6vw" mt="17vw" color="#FFFFFF"  >Empowering secure digital communities & safer<br></br> virtual interactions, one face at a time.</Text>
          <Text position="absolute" fontSize="0.8vw" textAlign="left" mr="14.2vw" mt="31.5vw" color="#FFFFFF" >Don't have an account? <a href=""><b>Sign Up</b></a></Text>
         
        </Flex>
      </Flex>
    </Flex>
  )
}

export default Login