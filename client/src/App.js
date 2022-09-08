import React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import Login from './pages/Login'

const App = () => {
  return (
    <ChakraProvider>
      <Login/>
    </ChakraProvider>
  )
}

export default App