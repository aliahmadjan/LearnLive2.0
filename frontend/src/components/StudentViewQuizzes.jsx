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



  const ViewQuizzes = ()=>
  {

    const [quizzes , setQuizzes] = useState([]);
    const [questions , setQuestions] = useState([]);
    const [ teachers , setTeachers] =useState('')
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()
    const navigate = useNavigate();

    const handleSubmitView = (quiz_viewid) =>
    {
        localStorage.removeItem('quiz_viewid')
         localStorage.setItem('quiz_viewid',quiz_viewid)
            navigate("/student/attemptquiz");
    }
    const getAllQuizzes = () =>
    {

        axios.get("http://localhost:5000/quizzes/samestdquiz") 
        .then(res=> {
          setQuizzes(res.data)
          //console.log(quizzes)
    }).catch (err=> {
       console.log(err) })
    
    }
    
   useEffect(()=>
   { 
    getAllQuizzes();
   },[])



    return (
    
      <Box pt={0} px={0} mx='auto' textAlign={'center'} width={'100%'} backgroundColor='gray.100' borderRadius={30}>
      <Box pt={4} pb={2} my={4}>
        <Heading mb={4} >
          View Quizzes
        </Heading>
      </Box>

      <Flex maxW='2xl' mx="auto" flexDirection={'column'}>
        <Flex p={4} pt={0} gap={2}>
          <Input placeholder="Quiz Name" variant={'outlined'} borderColor='orange'></Input>
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

            {quizzes.map((quiz) => ( 

            <Flex border={'1px solid orange'} width={'250px'} borderRadius={30} p={2} alignItems='center' justifyContent={'space-around'}>

            <Box ml={0} >
              {/* Jaan Implement this ( displays teacher Id instead of name)*/}
              {/* <Text>
              Teacher Name: {assignment.teacher}
              </Text>  */}
              <Text>
              Camp: {quiz.campname}
              </Text> 
              <Text>
              Name: {quiz.quizno}
              </Text>
            </Box>
            
            <Flex flexDir={'column'} justifyContent='center'>
                <Button  onClick={()=>handleSubmitView(quiz._id)} colorScheme='orange' variant='ghost'>
                  <i class="fa-solid fa-arrow-right-long"></i>
                </Button>

            </Flex>
        
            
            </Flex>  ))} 

        </Flex>
      </Flex>

    </Box>
       
    )
  }

  export default ViewQuizzes;