import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Setup from './pages/Setup'

const App = () => {
  return (
    <ChakraProvider>
      <Router>
        <Routes>
            <Route exact path="/" element={<Login/>}/>
            <Route exact path="/signup" element={<Signup/>}/>
            <Route exact path="/setup" element={<Setup/>}/>
            {/* <Setup/> */}
        </Routes>
      </Router>
    </ChakraProvider>
  )
}

export default App