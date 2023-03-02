import React from "react"
import { useState, useEffect } from "react"
import QuizQuestionComponent from "./QuizQuestionComponent"
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
    const [ userID , setUserID] =useState('')
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()
    const navigate = useNavigate();



    const handleSubmitView = (quiz_viewid) =>
    {
        localStorage.removeItem('quiz_viewid')
         localStorage.setItem('quiz_viewid',quiz_viewid)
            navigate("/teacher/viewquiz");
    }


    const getCurentUser = () =>
    {
      let logintoken = localStorage.getItem("logintoken")
      axios.defaults.headers.common["Authorization"] = `Bearer ${logintoken}`;
      axios.get("http://localhost:5000/teacher/viewprofile")
        .then(res=> {
                setUserID(res.data._id);
                setTeachers(res.data.name);
        }).catch (err=> {
            console.log(err) })
    }

    const getAllQuizzes = () =>
    {

        axios.get("http://localhost:5000/quizzes/getcurrquizzes") 
        .then(res=> {
          setQuizzes(res.data)
          //console.log(quizzes)
    }).catch (err=> {
       console.log(err) })
    
    }

   
    
   useEffect(()=>
   { 
    //getCurentUser();
    getAllQuizzes();
   },[])

   const DeleteQuiz=(quiz_deleteid)=>
   {
   
     localStorage.setItem('quiz_deleteid',quiz_deleteid)
     axios.delete(`http://localhost:5000/quizzes/deletequiz/${localStorage.getItem('quiz_deleteid')}`)
     .then((res) => {
       //window.alert("Delete Successfull!")
   }).catch((error) => {
     //window.alert("Not Deleted! ")
   })
   }

  


    return (

      <Box pt={0} px={0} mx='auto' textAlign={'center'} width={'100%'} backgroundColor='gray.100' borderRadius={30}>
      <Box pt={4} pb={2} my={4} >
        <Heading mb={4} >
          View Quizzes
        </Heading>
      </Box>

      <Flex maxW='2xl' mx="auto" flexDirection={'column'}>
        <Flex p={4} pt={0}>
          <Input placeholder="Quiz's Name" variant={'outlined'} borderColor='orange'></Input>
          <Button colorScheme={'orange'}>Search</Button>
        </Flex>

        <Flex border={'1px solid orange'} 
              gap={2} 
              justifyContent='space-around' 
              height='50vh' borderRadius='10px' 
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
             Camp Name: {quiz.campname}
              </Text> 
              <Text>
              Quiz No: {quiz.quizno}
              </Text>
            </Box>
            
            <Flex flexDir={'column'} justifyContent='center'>
                <Button  onClick={()=>handleSubmitView(quiz._id)} colorScheme='orange' variant='ghost'>
                  <i class="fa-solid fa-eye"></i>
                </Button>

                <Button  onClick={onOpen} colorScheme='orange' variant='ghost'>
                  <i class="fa-solid fa-trash"></i>
                </Button>

            </Flex>
        
            
            </Flex>  ))}

               <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
                >
                  <AlertDialogOverlay>
                    <AlertDialogContent>
                      <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                        Delete 
                      </AlertDialogHeader>

                      <AlertDialogBody>
                        Are you sure? You can't undo this action afterwards.
                      </AlertDialogBody>

                      <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={onClose}>
                          Cancel
                        </Button>
                        <Button colorScheme='red' onClick={()=>DeleteQuiz(quizzes._id)} ml={3}>
                          Delete
                        </Button>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialogOverlay>
                </AlertDialog>

        </Flex>
      </Flex>

    </Box>
       
    )
  }

  export default ViewQuizzes;