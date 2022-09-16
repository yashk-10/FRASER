import React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Setup from './pages/Setup'

const App = () => {
  return (
    <ChakraProvider>
      {/* <Login/> */}
      {/* <Signup/> */}
      <Setup/>
    </ChakraProvider>
  )
}

export default App