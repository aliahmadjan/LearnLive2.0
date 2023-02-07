import React from "react";
import { Grid,Select, Box, FormControl, FormLabel, Input, Text, FormErrorMessage, Button, Heading, Flex } from "@chakra-ui/react";
import { useState , useEffect} from "react";
import axios from "axios"

export default function MakeMeet() {
    const CLIENT_ID="AmLk_2YKQhyCHIsewBxyJA"
    const REDIRECT_URL="https://localhost:3000/teacher/oauth-callback"
    const [email , setEmail] = useState("");
    const [selectedCamp , setSelectedCamp] = useState("");
    const [duration , setDuration] = useState();
    const [agenda , setAgenda] = useState("");
    const [zoom_id , setZoomid] = useState("");
    const [passcode , setPasscode] = useState("");
    const [start_url , setStartUrl] = useState("");
    const [join_url , setJoinUrl] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    function ScheduleClass(e) {
        e.preventDefault();

        var data = JSON.stringify({
            email: email,
            duration: duration,
            agenda: agenda
          });
      
          var config = {
              method: 'post',
              url: 'http://localhost:5000/meeting',
              headers: {
                  "Content-Type": "application/json; charset=UTF-8"
              },
              data: data
          };
      
          var zoomRes = axios(config)
              .then(function (response) {
                  return response;
              })
              .catch(function (error) {
                  return error;
              });
        
            var config1 = {
                method: 'get',
                url: 'http://localhost:5000/zoomMeet/getData'
            };
        
            var zoomRes1 = axios(config1)
                .then(function (response) {
                    console.log(response.data)
                    setAgenda(response.data.agenda);
                    setDuration(response.data.duration);
                    setEmail(response.data.email);
                    setJoinUrl(response.data.join_url);
                    setPasscode(response.data.passcode);
                    setStartUrl(response.data.start_url);
                    setZoomid(response.data.zoom_id);
                    return response;
                })
                .catch(function (error) {
                    return error;
                });
            //console.log(zoomRes1)
            //mydata = zoomRes1.data
    }
    return (

    

      <Box pt={0} px={0} mx='auto' textAlign={'center'} width='100%' backgroundColor='gray.100' borderRadius={30} flexDirection='row'>
  
  
      <Box pt={4} pb={2} mt={4} >
        <Heading mb={4} >
          Schedule Class
        </Heading>
      </Box>
  
      <Box m={4}>
        <a target="_blank" rel="noreferrer" href={`https://zoom.us/oauth/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL}`}>
            Authorize Zoom
        </a>
      </Box>
      
  
       {error && <Text color="red.500">{error}</Text>}
       {success && <Text color="green.500">{success}</Text>}
  
      <form onSubmit={ScheduleClass}>
      
        <Box border={'1px solid orange'} maxW='2xl' mx='auto' borderRadius='20px' p={4} >
  
            <FormControl mb={2} display={'flex'} alignItems='center'>
              <FormLabel htmlFor="email" fontWeight="bold" color="orange.500" mr={2}>Email</FormLabel>
              <Input
                id="email"
                name="email"
                textAlign={'center'}
                focusBorderColor='orange.700' 
                variant={'flushed'} 
                borderBottomColor='orange'
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                isRequired
                width={'60%'} 
                mr={0} ml='auto'
                />
            </FormControl>
            
            <FormControl mb={2} display={'flex'} alignItems='center'>
              <FormLabel htmlFor="agenda" fontWeight="bold" color="orange.500" mr={2}>Agenda</FormLabel>
              <Input
              id="agenda"
              name="agenda"
              textAlign={'center'}
              focusBorderColor='orange.700' 
              variant={'flushed'} 
              borderBottomColor='orange'
              onChange={(e) => setAgenda(e.target.value)}
              value={agenda}
              isRequired
              width={'60%'} 
              mr={0} ml='auto'
              />
            </FormControl>
  
            <FormControl mb={2} display={'flex'} alignItems='center'>
              <FormLabel htmlFor="duration" fontWeight="bold" color="orange.500" mr={2}>Duration</FormLabel>
              <Input
              id="duration"
              name="duration"
              type="number"
              textAlign={'center'}
              focusBorderColor='orange.700' 
              variant={'flushed'} 
              borderBottomColor='orange'
              onChange={(e) => setDuration(e.target.value)}
              value={duration}
              isRequired
              width={'60%'} 
              mr={0} ml='auto'
              />
          </FormControl>
         
         
         
        </Box>
              
        <Button m={4} type='submit' colorScheme='orange' variant='solid'>
              Create
        </Button>
  
        </form>
         
      
  
    </Box>
  
    );
    // return (
      
    // <div>
    //   <a target="_blank" rel="noreferrer" href={`https://zoom.us/oauth/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL}`}>
    //             Authorize Zoom
    //         </a>
    //   <form onSubmit={ScheduleClass} align="center">
    //     <div>
    //       <h1 align="center">Create Class</h1>
    //     </div>
    //     <div>
    //       <input
    //           id="email"
    //           name="email"
    //           onChange={(e)=>setEmail(e.target.value)}
    //           textAlign={'center'}
    //           placeholder='email'
    //           required
    //           value={email}
    //       />
    //       <input
    //           id="duration"
    //           name="duration"
    //           type="number"
    //           onChange={(e)=>setDuration(e.target.value)}
    //           textAlign={'center'}
    //           placeholder='duration'
    //           required
    //           value={duration}
    //       />
    //       <input
    //           id="agenda"
    //           name="agenda"
    //           onChange={(e)=>setAgenda(e.target.value)}
    //           textAlign={'center'}
    //           placeholder='agenda'
    //           required
    //           value={agenda}
    //       />
    //     </div>
    //     <div>
    //       <button>Create</button>
    //     </div>
    //   </form>
    //   <div align="center">
    //     <br></br>
    //     Agenda: {agenda}
    //     <br></br>
    //     Duration: {duration}
    //     <br></br>
    //     ID: {zoom_id}
    //     <br></br>
    //     Passcode: {passcode}
    //     <br></br>
    //     Start_url: {start_url}
    //     <br></br>
    //     Join_url: {join_url}
    //     <br></br>
    //   </div>
    // </div>
    // )
}