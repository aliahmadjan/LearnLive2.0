import React from "react"
import { useState, useEffect } from "react"
import { Box,Grid,Button, Text,FormControl, FormLabel, Input, Select, Textarea, Heading, Flex} from "@chakra-ui/react";
import axios from "axios"
import { useNavigate, useParams} from "react-router-dom";
import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
  } from '@chakra-ui/react'
  import { useDisclosure } from '@chakra-ui/react'
  import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
  } from '@chakra-ui/react'
  import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSound } from 'use-sound';
import notificationSound from '../notification.mp3';
  



  const ViewAssignments = ()=>
  {

    const [assignments , setAssignments] = useState([]);
    const [ latestAssignment  , setLatestAssignment ] = useState([])
    const [notificationData, setNotificationData] = useState(null);
    const [questions , setQuestions] = useState([]);
    const [ teachers , setTeachers] =useState('')
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()
    const navigate = useNavigate();
    const [audio] = useState(new Audio(notificationSound));
    const [playNotification] = useSound(notificationSound);

    // const playNotificationSound = () => {
    //   audio.play();
    // };

    const handleSubmitView = (sassignment_viewid) =>
    {
        localStorage.removeItem('sassignment_viewid')
         localStorage.setItem('sassignment_viewid',sassignment_viewid)
            navigate("/student/viewassignment");
    }

    const getAllAssignments= () =>
    {
        axios.get("http://localhost:5000/tchassignments/samestdassign") 
       
        .then(res=> {
          setAssignments(res.data)       
          
    }).catch (err=> {
       console.log(err) })

       axios.get("http://localhost:5000/tchassignments/lateststdassign")
       .then(res=> {
         setLatestAssignment(res.data)
         
        
   }).catch (err=> {
      console.log(err) })
    
    }


    

  

    useEffect(() => {
      getAllAssignments();
    }, []);

    useEffect(() => {
      if (latestAssignment.length > 0) {
        latestAssignment.forEach((assignments) => {
          toast.success(`New Assignment: ${assignments.title} for ${assignments.campname}
          camp`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            onRender: playNotification(),
            onClick: () => {
              setNotificationData(assignments);
              onOpen();
            },
          });
        });
      }
    }, [latestAssignment]);
    
    return (
    
      <Box pt={0} px={0} mx='auto' textAlign={'center'} width={'100%'} backgroundColor='gray.100' borderRadius={30}>
      <Box pt={4} pb={2} my={4}>
        <Heading mb={4} >
          View Assigments
        </Heading>
      </Box>

      <Flex maxW='2xl' mx="auto" flexDirection={'column'}>
        <Flex p={4} pt={0}>
          <Input placeholder="Assigment's Name" variant={'outlined'} borderColor='orange'></Input>
          <Button colorScheme={'orange'}>Search</Button>
        </Flex>

        <Flex border={'1px solid orange'} 
              gap={2} 
              justifyContent='space-around' 
              height='50vh' borderRadius= '9px' 
              p={4} flexWrap='wrap' 
              overflowY='scroll'
              sx={{
                '&::-webkit-scrollbar': {
                  width: '16px',
                  borderRadius: '8px',
                  backgroundColor: 'white',
                },
                '&::-webkit-scrollbar-thumb': {
                  backgroundColor: `orange.500`,
                  borderRadius: '8px',
                },
              }}>

        {assignments.map((assignment) => (   

            <Flex border={'1px solid orange'} width={'250px'} borderRadius={30} p={2} alignItems='center' justifyContent={'space-around'}>

            <Box ml={0} >
              {/* Jaan Implement this ( displays teacher Id instead of name)*/}
              {/* <Text>
              Teacher Name: {assignment.teacher}
              </Text>  */}
              <Text>
              Camp: {assignment.campname}
              </Text> 
              <Text>
              Title: {assignment.title}
              </Text>
            </Box>
            
            <Flex flexDir={'column'} justifyContent='center'>
                 <Button  onClick={()=>handleSubmitView(assignment._id)} colorScheme='orange' variant='ghost'>
                  <i class="fa-solid fa-eye"></i>
                </Button> 
            </Flex>
        
            
            </Flex>  
             ))}  

        </Flex>
      </Flex>
      <ToastContainer/>
    </Box>
       
    )
  }

  export default ViewAssignments;