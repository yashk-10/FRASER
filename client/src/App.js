import React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import Login from './pages/Login'
import Signup from './pages/Signup'

const App = () => {
  return (
    <ChakraProvider>
      {/* <Login/> */}
      <Signup/>
    </ChakraProvider>
  )
}

export default App