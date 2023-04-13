import React from "react"
import { useState, useEffect } from "react"
import { SimpleGrid, Card, CardHeader, Avatar, Tooltip, Box,Grid,Button, Text,FormControl, FormLabel, Input, Select, Textarea, Heading, Flex} from "@chakra-ui/react";
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

    // useEffect(() => {
    //   if (latestAssignment.length > 0) {
    //     latestAssignment.forEach((assignments) => {
    //       toast.success(`New Assignment: ${assignments.title} for ${assignments.campname}
    //       camp`, {
    //         position: "top-right",
    //         autoClose: 5000,
    //         hideProgressBar: false,
    //         closeOnClick: true,
    //         pauseOnHover: true,
    //         draggable: true,
    //         progress: undefined,
    //         onRender: playNotification(),
    //         onClick: () => {
    //           setNotificationData(assignments);
    //           onOpen();
    //         },
    //       });
    //     });
    //   }
    // }, [latestAssignment]);
    
    return (
    
    <Box p={2} m='auto' textAlign={'center'} width={'100%'} borderRadius={30}>

      <Box pt={4} pb={2}  >
        <Heading mb={4} >
          View Assignments
        </Heading>
      </Box>

      <Box width={'80%'} mx="auto" >

        <Flex p={4}>
          <Input 
          type="text"
          placeholder="Assigment's Title"
          // onChange={handleSearch}
          variant={'outlined'} borderColor='orange'
          // value={query}
          >
          </Input>
          {/* <Button colorScheme={'orange'}>Search</Button> */}
        </Flex>

        <SimpleGrid 
            width={'90%'} 
            overflowY='auto' 
            maxHeight={'48vh'} 
            mx='auto' 
            minChildWidth='250px' 
            spacingX='10px' spacingY='10px'
            sx={{
              '&::-webkit-scrollbar': {
                width: '8px',
                borderRadius: '2px',
                backgroundColor: 'white',
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: `orange.500`,
                borderRadius: '2px',
              },
            }}>

            {assignments.map((assignment) => (
              <Card m={2} justifyContent={'center'}>
                <CardHeader>
                  <Flex spacing='4' alignItems='center' justifyContent={'space-between'}>

                    <Avatar name={assignment.title} />

                    <Flex justifyContent={'space-evenly'} alignItems='center' flexWrap='wrap'>
                      <Box>
                        <Heading size='sm'>Title: {assignment.title}</Heading>
                        <Text>Camp: {assignment.campname}</Text>
                      </Box>
                    </Flex>

                    <Tooltip label="View" hasArrow placement='right'>
                      <Button size='sm' onClick={()=>handleSubmitView(assignment._id)} colorScheme='orange' variant='ghost'>
                      <i class="fa-solid fa-eye"></i>
                      </Button>
                    </Tooltip>

                  </Flex>

                </CardHeader>
  
              </Card>
            ))}
        </SimpleGrid>

      </Box>

      <ToastContainer/>
    </Box>
       
    )
  }

  export default ViewAssignments;