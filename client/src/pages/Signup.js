import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Flex, Heading, Text, Input, Button, Image } from '@chakra-ui/react'
import Logo from '../assets/logo.png'
import SignupImage from '../assets/signupImage.png'
import Setup from './Setup';

const Signup = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const setup = () => {
    navigate('/setup', { state: {
      username: username,
      email: email, 
      password: password
    }})
  }

  return (
    <Flex height="100vh" alignItems="center" justifyContent="center" background="#BFCAD4">
      <Flex height="39.6vw"  display="flex" direction="row" background="#ACBCCB" borderRadius="10px">

        <Flex alignItems="left" justifyContent="left">
          <Image src={SignupImage} alt="Login Image" height="39.6vw"/>
          <Button height="2.5vw" position="absolute" _hover="none" background="#939393" color="white" fontSize="1vw" cursor="default" ml="7.6vw" mt="7.8vw" >FRASER</Button>
          <Text position="absolute" fontSize="0.8vw" textAlign="left" ml="7.6vw" mt="10.5vw" color="#FFFFFF" >Facial Recognition Authentication System <br></br> Evolutionizing Reliability</Text>
          <Text position="absolute" fontSize="3vw" ml="7.6vw" mt="13vw" color="#FFFFFF" fontWeight="bold">Hello!</Text>
          <Text position="absolute" fontSize="0.8vw" textAlign="left" ml="7.6vw" mt="17vw" color="#FFFFFF"  >Empowering secure digital communities & safer<br></br> virtual interactions, one face at a time.</Text>
          <Text position="absolute" fontSize="0.8vw" textAlign="right" ml="14.2vw" mt="31.5vw" color="#FFFFFF" >Already have an account? <a href=""><b>Sign Up</b></a></Text>
        </Flex>
        
        <Flex fontFamily="Poppins" pt="6.5vw" pl="4vw" pr="4vw" direction="column" alignItems="center">
          <Image src={Logo} alt="Logo" opacity={1.5} height="5vw"/>
          <Text mb=".5vw" textAlign="center" fontSize="2.8vw" >Sign Up</Text>
          <Text mb="1vw" width="25vw" fontSize="1vw" textAlign="center" color="#5E5E5E">Create your account and get started with FRASER.</Text>
          <Input value={username} onChange={(e) => setUsername(e.target.value)} height="3.3vw" width="25vw" placeholder="Username" variant="filled" mb="1vw" type="text" border="1px solid" fontSize="1.1vw"/>
          <Flex direction="row" gap="1vw">
            <Input value={email} onChange={(e) => setEmail(e.target.value)} height="3.3vw" width="12vw" placeholder="Email" variant="filled" mb="1vw" type="email" border="1px solid" fontSize="1vw" />
            <Input height="3.3vw" width="12vw" placeholder="Confirm Email" variant="filled" mb="1vw" type="email" border="1px solid" fontSize="1vw" />
          </Flex>
          <Flex direction="row" gap="1vw">
            <Input height="3.3vw" width="12vw" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" variant="filled" mb="1vw" type="password" border="1px solid" fontSize="1vw" />
            <Input height="3.3vw" width="12vw" placeholder="Confirm Password" variant="filled" mb="1vw" type="password" border="1px solid" fontSize="1vw" />
          </Flex>
            <Button height="3.3vw" width="25vw" background="#184874" color="white" fontSize="1.1vw" onClick={() => setup()}>Continue</Button>
        </Flex>

      </Flex>
    </Flex>
  )
}

export default Signup