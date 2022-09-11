import React from 'react'
import { Flex, Heading, Text, Input, Button, Image } from '@chakra-ui/react'

const Login = () => {
  return (
    <Flex height="100vh" alignItems="center" justifyContent="center" background="#DADFE2">
      <Flex height="80vh" width="85vw" display="flex" direction="row" background="#C2D3DD" borderRadius="10px">
        <Flex fontFamily="Poppins" pt="10vw" pl="5vw" direction="column" alignItems="center">
          <Image src="" alt="Login Logo"/>
          <Heading mb={4}>Welcome Back</Heading>
          <Text mb={4} width="30vw" fontSize="sm" textAlign="center" color="#5E5E5E">Enter your credentials and we’ll get started with the verification process.</Text>
          <Input placeholder="Username" variant="filled" mb={3} type="email" border="1px solid"/>
          <Input placeholder="Password" variant="filled" mb={3} type="password"/>
          <Button width="30vw" background="#184874" color="white">Continue</Button>

        </Flex>
        <Image src="" alt="Login Image"/>
      </Flex>
    </Flex>
  )
}

export default Login