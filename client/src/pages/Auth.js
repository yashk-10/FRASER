import React, { useState } from 'react';
import axios from 'axios';
import { Button } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';

const Auth = () => {
    const [username, setUsername] = useState();
    const [imageURL, setImageURL] = useState();
    const location = useLocation();
    const body = {
        token: location.state.token
    }

    // Fetch user facial recognition data
    axios.post('http://localhost:6001/users/getData', body)
        .then((res) => {
            setUsername(res.data.data.username)
            setImageURL(res.data.data.image)
        })
    
    console.log(username, imageURL)

    return (
        <div>
        </div>    
    )
}

export default Auth