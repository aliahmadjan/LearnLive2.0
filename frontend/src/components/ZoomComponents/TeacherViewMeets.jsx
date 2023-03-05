import React from "react";
import { Grid,Select, Box, FormControl, FormLabel, Input, Text, FormErrorMessage, Button, Heading, Flex } from "@chakra-ui/react";
import { useState , useEffect} from "react";
import axios from "axios"

function TeacherViewMeets () 
{
    const [zoommeets , setZoomMeets] = useState([]);
    const [start_url , setStartUrl] = useState("");
    const getAllMeets= () =>
    {
    axios.get('http://localhost:5000/zoomMeet/getcurrclasses')
        .then(res=> {
           setZoomMeets(res.data)
           setStartUrl(res.data.start_url)
    }).catch (err=> {
       console.log(err) })
    
    }

    useEffect(()=>
    {
        getAllMeets();
    })
    return(
        <Box pt={0} px={0} mx='auto' textAlign={'center'} width='100%' backgroundColor='gray.100' borderRadius={30} flexDirection='row'>

        <Box pt={4} pb={2} mt={4} >
        <Heading mb={4} >
          Classes
        </Heading>
      </Box>
        {zoommeets.map((meets) => (  
          <Box ml={0} >
          <Text>
          Camp: {meets.campname}
          </Text> 
          <Text>
          Agenda: {meets.agenda}
          </Text> 
          <Text>
          Duration: {meets.duration}
          </Text>
          <Text>
          Password: {meets.password}
          </Text>
          <form action={meets.start_url} target="_blank">
            <Button m={4} type='submit' colorScheme='orange' variant='solid'>
                Start
            </Button> 
          </form>
        </Box>
        ))}
    </Box>
    );
}

export default TeacherViewMeets;