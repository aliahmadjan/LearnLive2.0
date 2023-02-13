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
    const [campname, setCampName] = useState("");
    function ScheduleClass(e) {
        e.preventDefault();

        const zoomMainRes = fetch("http://localhost:5000/zoomMain/zoom-refresh", {
          method: "GET",
        });
        var data = JSON.stringify({
            email: email,
            duration: duration,
            agenda: agenda,
            campname: campname
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

    const [zoommeets , setZoomMeets] = useState([]);
    const [userID , setUserID] = useState("")
    const [ teachers , setTeachers] =useState('')

    const getCurentUser = () =>
    {
      let logintoken = localStorage.getItem("logintoken")
      console.log("Login Token"+logintoken);
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

    const getAllMeets= () =>
    {
      //console.log(userID)
    // localStorage.setItem('userID',userID)
    axios.get('http://localhost:5000/zoomMeet/getData')
        //axios.get(`http://localhost:5000/tchassignments/getcurrtchass/${localStorage.getItem('userID')}`) 
        .then(res=> {
           console.log(res.data)
           setZoomMeets(res.data)
           setStartUrl(res.data.start_url)
    }).catch (err=> {
       console.log(err) })
    
    }
 

    
   useEffect(()=>
   {   
    getAllMeets();
    getCurentUser();
   })
    return (

    

      <Box pt={0} px={0} mx='auto' textAlign={'center'} width='100%' backgroundColor='gray.100' borderRadius={30} flexDirection='row'>
  
  
      <Box pt={4} pb={2} mt={4} >
        <Heading mb={4} >
          Schedule Class
        </Heading>
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
              <FormLabel htmlFor="campname" fontWeight="bold" color="orange.500" mr={2}>Camp</FormLabel>
              <Input
              id="campname"
              name="campname"
              textAlign={'center'}
              focusBorderColor='orange.700' 
              variant={'flushed'} 
              borderBottomColor='orange'
              onChange={(e) => setCampName(e.target.value)}
              value={campname}
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