import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Flex, Heading, Text, Input, Button, Image, Alert, AlertIcon, AlertDescription, AlertTitle } from '@chakra-ui/react'
import Logo from '../assets/logo.png'
import LoginImage from '../assets/loginImage.png'
import axios from 'axios'

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const successRef = useRef(null);
  const errorRef = useRef(null);

  const loginUser = async () => {
    errorRef.current.style.display = "none"
    const body = {
      username: username,
      password: password
    }

    axios.post('http://localhost:6001/users/login', body)
    .then((res) => {
      if (res.data == "error"){
        errorRef.current.style.display = "block"
      }
      else {
        successRef.current.style.display = "block";
        setTimeout(() => {
          navigate('/auth', { state: {
            token: res.data
          }})
        }, 1000)
      }
    });
}


  return (
    <Flex height="100vh" alignItems="center" justifyContent="center" background="#DADFE2">
      <Flex height="39.6vw"  display="flex" direction="row" background="#C2D3DD" borderRadius="10px">

        {/* Action */}
        <Flex fontFamily="Poppins" pt="6.5vw" pl="4vw" pr="4vw" direction="column" alignItems="center">
          <Image src={Logo} alt="Logo" opacity={1.5} height="5vw"/>
          <Text mb=".5vw" textAlign="center" fontSize="2.8vw" >Welcome Back</Text>
          <Text mb="1vw" width="25vw" fontSize="1vw" textAlign="center" color="#5E5E5E">Enter your credentials and we’ll get started with the verification process.</Text>
          <Input value={username} onChange={(e) => setUsername(e.target.value)} height="3.3vw" width="25vw" placeholder="Username" variant="filled" mb="1vw" type="text" border="1px solid" fontSize="1.1vw"/>
          <Input value={password} onChange={(e) => setPassword(e.target.value)} height="3.3vw" width="25vw" placeholder="Password" variant="filled" mb="1vw" type="password" border="1px solid" fontSize="1.1vw" />
          <Button onClick={() => loginUser()} height="3.3vw" width="25vw" background="#184874" color="white" fontSize="1.1vw">Continue</Button>
        </Flex>

        {/* Information */}
        <Flex alignItems="right" justifyContent="right">
          <Image src={LoginImage} alt="Login Image" height="39.6vw"/>
          <Button height="2.5vw" position="absolute" _hover="none" background="#939393" color="white" fontSize="1vw" cursor="default" mr="7.6vw" mt="7.8vw" >FRASER</Button>
          <Text position="absolute" fontSize="0.8vw" textAlign="right" mr="7.6vw" mt="10.5vw" color="#FFFFFF" >Facial Recognition Authentication System <br></br> Evolutionizing Reliability</Text>
          <Text position="absolute" fontSize="3vw" mr="7.6vw" mt="13vw" color="#FFFFFF" fontWeight="bold">Hello!</Text>
          <Text position="absolute" fontSize="0.8vw" textAlign="right" mr="7.6vw" mt="17vw" color="#FFFFFF"  >Empowering secure digital communities & safer<br></br> virtual interactions, one face at a time.</Text>
          <Text position="absolute" fontSize="0.8vw" textAlign="left" mr="14.2vw" mt="31.5vw" color="#FFFFFF" >Don't have an account?<Link to="/signup"><b>Sign Up</b></Link></Text>
        </Flex>

      </Flex>

      {/* Success Alert */}
      <Alert ref={successRef} status='success' display="none" position="absolute" width="20vw" top="2vh" right="2vw" borderRadius={10}>
          <Flex display="flex" direction="row">
            <AlertIcon />
            <AlertTitle fontSize="1.4vw">
              Login Successful!
            </AlertTitle>
          </Flex>
      </Alert>

      {/* Error Alert */}
      <Alert ref={errorRef} status='error' display="none" position="absolute" width="20vw" top="2vh" right="2vw" borderRadius={10}>
        <Flex display="flex" direction="row">
          <AlertIcon />
          <AlertTitle fontSize="1.4vw">Login Failed!</AlertTitle>
        </Flex>
          <AlertDescription fontSize="1.2vw">
            Please ensure that your username and password are correct!
          </AlertDescription>
      </Alert>

    </Flex>
  )
}

export default Login