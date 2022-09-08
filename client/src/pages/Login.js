import React from 'react'
import { Flex, Heading, Text, Input, Button, Image } from '@chakra-ui/react'

const Login = () => {
  return (
    <Flex height="100vh" alignItems="center" justifyContent="center" background="#DADFE2">
      <Flex display="flex" direction="row" background="#C2D3DD" borderRadius="10px">
        <Flex direction="column" alignItems="center">
          <Heading mb={5}>Welcome Back</Heading>
          <Text fontSize="md">Enter your credentials and we’ll get started with the verification process.</Text>
          <Input placeholder="Username" variant="filled" mb={3} type="email"/>
          <Input placeholder="Password" variant="filled" mb={6} type="password"/>
          <Button colorScheme="navy">Continue</Button>

        </Flex>
        <Image src="" alt="Login Image"/>
      </Flex>
    </Flex>
  )
}

export default Login