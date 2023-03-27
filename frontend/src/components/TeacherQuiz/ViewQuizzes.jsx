import React from "react"
import { useState, useEffect } from "react"
import QuizQuestionComponent from "./QuizQuestionComponent"
import { Box,Grid,Button,SimpleGrid, Card, CardHeader,Avatar,Tooltip, Text,FormControl, FormLabel, Input, Select, Textarea, Heading, Flex} from "@chakra-ui/react";
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

      <Box p={2} m='auto' textAlign={'center'} width={'100%'} borderRadius={30}>

        <Box pt={4} pb={2}  >
          <Heading mb={4} >
            View Quizzes
          </Heading>
        </Box>

        <Box width={'80%'} mx="auto" >
        
          <Flex p={4}>
            <Input placeholder="Quiz's Name"
            // onChange={handleSearch}
            variant={'outlined'} borderColor='orange.700'
            >
            </Input>
            {/* <Button colorScheme={'orange'}>Search</Button> */}
          </Flex>

          <SimpleGrid 
            width={'90%'} 
            overflowY='scroll' 
            maxHeight={'66vh'} 
            mx='auto' 
            minChildWidth='260px' 
            spacingX='10px' spacingY='10px'
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
              <Card maxWidth={'100%'} maxHeight='160px' m={2}>
                <CardHeader>
                  <Flex spacing='4' alignItems='center' justifyContent={'space-evenly'}>
                    <Flex justifyContent={'space-evenly'} alignItems='center' flexWrap='wrap'>
                      <Box>
                        <Heading size='sm'>Quiz No: {quiz.quizno}</Heading>
                        <Text>Camp: {quiz.campname}</Text>
                      </Box>
                    </Flex>

                    <Flex flexDir={'column'} justifyContent='center'>

                      <Tooltip label="View" hasArrow placement='right'>
                        <Button size='sm' onClick={()=>handleSubmitView(quiz._id)} colorScheme='orange' variant='ghost'>
                        <i class="fa-solid fa-eye"></i>
                        </Button>
                      </Tooltip>


                      {/* <Tooltip label="Edit" hasArrow placement='right'>
                        <Button size='sm' onClick={()=>handleSubmitEdit(assignment._id)} colorScheme='orange' variant='ghost'>
                        <i class="fa-solid fa-pen-to-square"></i>
                        </Button>
                      </Tooltip> */}

                      <Tooltip label="Delete" hasArrow placement='right'>
                        <Button size='sm' onClick={onOpen} colorScheme='orange' variant='ghost'>
                          <i class="fa-solid fa-trash"></i>
                        </Button>
                      </Tooltip>

                    </Flex>

                  </Flex>

                </CardHeader>
  
              </Card>
            ))}

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

          </SimpleGrid>
      </Box>

    </Box>
       
    )
  }

  export default ViewQuizzes;