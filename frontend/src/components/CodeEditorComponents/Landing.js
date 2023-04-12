import React , {useState, useEffect} from 'react'
import { Box,Button, Select,Heading, Text, Link ,FormControl,FormLabel, Input,RadioGroup,Radio,Stack, Flex} from '@chakra-ui/react'
import axios from "axios"
import { useNavigate, useParams} from "react-router-dom";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'

const Landing =() =>
{
    return (
        <Box p={2} m='auto' textAlign={'center'} width={'100%'} borderRadius={30}>
            <iframe
            frameBorder="0"
            height="450px"  
            src="https://onecompiler.com/embed/" 
            width="100%"
            ></iframe>
        </Box>
    )
}

export default Landing;