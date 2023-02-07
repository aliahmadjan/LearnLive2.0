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



  const ViewAssignments = ()=>
  {
    const [userID , setUserID] = useState("")
    const [assignments , setAssignments] = useState([]);
    const [questions , setQuestions] = useState([]);
    const [ teachers , setTeachers] =useState('')
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()
    const navigate = useNavigate();

    const handleSubmitView = (assignment_viewid) =>
    {
        localStorage.removeItem('assignment_viewid')
         localStorage.setItem('assignment_viewid',assignment_viewid)
            navigate("/teacher/viewassignment");
    }

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

    
    const getAllAssignments= () =>
    {
      //console.log(userID)
    // localStorage.setItem('userID',userID)
    axios.get('http://localhost:5000/tchassignments/gettchassigns')
        //axios.get(`http://localhost:5000/tchassignments/getcurrtchass/${localStorage.getItem('userID')}`) 
        .then(res=> {
           console.log(res.data)
          setAssignments(res.data)
          //console.log(quizzes)
    }).catch (err=> {
       console.log(err) })
    
    }
 

    
   useEffect(()=>
   {   
    getAllAssignments();
    getCurentUser();

   })



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
              height='50vh' borderRadius='20px' 
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

            <Flex border={'1px solid orange'} height='40%' width={'250px'} borderRadius={30} p={2} alignItems='center' justifyContent={'space-around'}>

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

                <Button  onClick={onOpen} colorScheme='orange' variant='ghost'>
                  <i class="fa-solid fa-trash"></i>
                </Button>

            </Flex>
        
            
            </Flex>  ))} 

        </Flex>
      </Flex>

    </Box>

       
    )
  }

  export default ViewAssignments;