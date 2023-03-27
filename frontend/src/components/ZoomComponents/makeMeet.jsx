import React from "react";
import { Grid,Select, Box, FormControl, FormLabel, Input, Text, FormErrorMessage, Button, Heading, Flex } from "@chakra-ui/react";
import { useState , useEffect} from "react";
import axios from "axios"
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react'

export default function MakeMeet() {
    const CLIENT_ID="AmLk_2YKQhyCHIsewBxyJA"
    const REDIRECT_URL="https://localhost:3000/teacher/oauth-callback"
    const [submitStatus, setSubmitStatus] = useState(0);
    const [email , setEmail] = useState("");
    const [duration , setDuration] = useState();
    const [agenda , setAgenda] = useState("");
    const [zoom_id , setZoomid] = useState("");
    const [passcode , setPasscode] = useState("");
    const [start_url , setStartUrl] = useState("");
    const [join_url , setJoinUrl] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [campname, setCampName] = useState("");
    const [selectedCamp , setSelectedCamp] = useState([]);
    const [teacher , setTeacher] = useState("");
    

    const [zoommeets , setZoomMeets] = useState([]);
    const [userID , setUserID] = useState("")
    const [ teachers , setTeachers] =useState('')

    const getCurentUser = () =>
    {
      let logintoken = localStorage.getItem("logintoken")
      axios.defaults.headers.common["Authorization"] = `Bearer ${logintoken}`;
      axios.get("http://localhost:5000/teacher/viewprofile")
        .then(res=> {
               // console.log(res.data)
                setUserID(res.data._id);
                localStorage.setItem('userID',res.data._id)
                setTeachers(res.data.name);
        }).catch (err=> {
            console.log(err) })
    }

    const getCurrentCampName = (userID) =>
    {
      localStorage.setItem('userID',userID)
      //axios.get('http://localhost:5000/camp/getcampteacher/:'}).then(res =>
      axios.get(`http://localhost:5000/camp/getcampteacher/${localStorage.getItem('userID')}`).then(res =>
      {
        setCampName(res.data);
  
      }).catch(err =>
        {
          console.log(err);
        })
    }

    function ScheduleClass(e) {
      e.preventDefault();

      const zoomMainRes = fetch("http://localhost:5000/zoomMain/zoom-refresh", {
        method: "GET",
      });
      var data = JSON.stringify({
          duration: duration,
          agenda: agenda,
          campname: selectedCamp,
          teacher: userID
        });
    
        var config = {
            method: 'post',
            url: 'http://localhost:5000/zoomMain/createMeeting',
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
                  setAgenda(response.data.agenda);
                  setDuration(response.data.duration);
                  setEmail(response.data.email);
                  setJoinUrl(response.data.join_url);
                  setPasscode(response.data.passcode);
                  setStartUrl(response.data.start_url);
                  setZoomid(response.data.zoom_id);
                  setTeacher(response.data.userID)
                  setSubmitStatus(1)
                  return response;
                  
              })
              .catch(function (error) {
                  setSubmitStatus(-1)
              });
          //console.log(zoomRes1)
          //mydata = zoomRes1.data
  }
  const StatusAlert = () => {
    if (submitStatus === -1)
      return (
        <Alert status='error'>
        <AlertIcon />
       Class has not been created!
      </Alert>
      );
    if (submitStatus === 1)
      return (
        <Alert status='success'>
        <AlertIcon />
        Class has been created!
      </Alert>
      );
  };
    
   useEffect(()=>
   {  
    getCurentUser();
    getCurrentCampName(userID);
   })

  return (

    <Box p={2} m='auto' textAlign={'center'} width={'100%'} borderRadius={30}>

      <Box pt={4} pb={2}  >
        <Heading mb={4} >
          Schedule Class
        </Heading>
      </Box>
      
  
      {error && <Text color="red.500">{error}</Text>}
      {success && <Text color="green.500">{success}</Text>}
  
      <form onSubmit={ScheduleClass}>
      
      <Box width='40%' mx='auto' borderRadius='15px' p={4} backgroundColor="#FFFFFF" boxShadow="0px 4px 8px rgba(0, 0, 0, 0.1)" >
  
            
        <FormControl mb={2} display={'flex'} alignItems='center'>
            <FormLabel htmlFor="camp" fontWeight="bold" color="#F57C00" mr={2}>Camp Name</FormLabel>

            <Select
              textAlign={'center'}
              focusBorderColor='#F57C00' 
              variant={'flushed'} 
              borderBottomColor='#F57C00'
              isRequired
              width={'60%'} 
              mr={0} ml='auto'
              id='camp' name='camp'
              value={selectedCamp}
              onChange={e => setSelectedCamp(e.target.value)}>

              <option value="" disabled>
                  Select
              </option>

                {Array.isArray(campname) && campname.map((campname) => (  
                
                <option value={campname}>{campname}</option>

                ))} 

            </Select> 
          </FormControl>

            <FormControl mb={2} display={'flex'} alignItems='center'>
              <FormLabel htmlFor="agenda" fontWeight="bold" color="#F57C00" mr={2}>Agenda</FormLabel>
              <Input
              id="agenda"
              name="agenda"
              textAlign={'center'}
              focusBorderColor='#F57C00' 
              variant={'flushed'} 
              borderBottomColor='#F57C00'
              onChange={(e) => setAgenda(e.target.value)}
              value={agenda}
              isRequired
              width={'60%'} 
              mr={0} ml='auto'
              />
            </FormControl>
  
            <FormControl mb={2} display={'flex'} alignItems='center'>
              <FormLabel htmlFor="duration" fontWeight="bold" color="#F57C00" mr={2}>Duration (mins)</FormLabel>
              <Input
              id="duration"
              name="duration"
              type="number"
              textAlign={'center'}
              focusBorderColor='#F57C00' 
              variant={'flushed'} 
              borderBottomColor='#F57C00'
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
        <StatusAlert/>

    
      </Box>
    );

}