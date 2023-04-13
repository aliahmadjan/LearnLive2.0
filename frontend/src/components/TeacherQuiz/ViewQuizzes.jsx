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
    const [ query, setQuery]= useState("");
    const [results , setResults] = useState([]);
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()
    const navigate = useNavigate();



    const handleSubmitView = (quiz_viewid) =>
    {
        localStorage.removeItem('quiz_viewid')
         localStorage.setItem('quiz_viewid',quiz_viewid)
            navigate("/teacher/viewquiz");
    }

    const handleSubmitDelete = (quiz_delid)=>
  {
    localStorage.removeItem('quiz_delid')
    localStorage.setItem('quiz_delid',quiz_delid)

  }

  const handleQuizSubmissions = (qsubmissions_viewid) =>
  {
    localStorage.removeItem('qsubmissions_viewid')
    localStorage.setItem('qsubmissions_viewid' , qsubmissions_viewid)
    navigate("/teacher/viewquizresults")
  }

   

    const getAllQuizzes = () =>
    {

        axios.get("http://localhost:5000/quizzes/getcurrquizzes") 
        .then(res=> {
          setQuizzes(res.data);
          setResults(res.data);
          //console.log(quizzes)
    }).catch (err=> {
       console.log(err) })
    
    }

   
    
   useEffect(()=>
   { 
    getAllQuizzes();
   },[])

   const DeleteQuiz = (e) => {
    e.preventDefault();
    const quizId = localStorage.getItem('quiz_delid');
    axios.delete(`http://localhost:5000/quizzes/deletequiz/${quizId}`)
      .then(() => {
        const updatedQuizzes = quizzes.filter(quiz => quiz._id !== quizId);
        setQuizzes(updatedQuizzes);
        setResults(updatedQuizzes);
      })
      .catch((error) => {
        console.log(error)
        
      });
  };

   
   const handleSearch = async(e) =>
   {
     const query = e.target.value;
     setQuery(query);
     if (query === '') {
       setResults(quizzes);
     } else {
       const filteredQuizzes = quizzes.filter((quiz) =>
         quiz.quizno.toLowerCase().includes(query.toLowerCase())
       );
       setResults(filteredQuizzes);
     }
         
   }


   useEffect(()=>
   {
   
   },[results])

   
  


    return (

      <Box p={2} m='auto' textAlign={'center'} width={'100%'} borderRadius={30}>

        <Box pt={4} pb={2}  >
          <Heading mb={4} >
            View Quizzes
          </Heading>
        </Box>

        <Box width={'80%'} mx="auto" >
        
          <Flex p={4}>
            <Input 
             type="text"
             placeholder="Quiz No"
             onChange={handleSearch}
             variant={'outlined'} borderColor='orange'
             value={query}
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

            {results.map((quiz) => (
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
{/* 
                      <Tooltip label="Results" hasArrow placement='right'>
                        <Button size='sm' onClick={()=>handleQuizSubmissions(quiz._id)} colorScheme='orange' variant='ghost'>
                        <i class="fa-solid fa-expand"></i>
                        </Button>
                      </Tooltip> */}

                      {/* <Tooltip label="Edit" hasArrow placement='right'>
                        <Button size='sm' onClick={()=>handleSubmitEdit(assignment._id)} colorScheme='orange' variant='ghost'>
                        <i class="fa-solid fa-pen-to-square"></i>
                        </Button>
                      </Tooltip> */}

                      <Tooltip label="Delete" hasArrow placement='right'>
                        <Button size='sm'  onClick={()=>onOpen(handleSubmitDelete(quiz._id))} colorScheme='orange' variant='ghost'>
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
                    <Button
                      colorScheme='red'
                      onClick={(e) => {
                        //SetDeleteTeacherId();
                        DeleteQuiz(e);
                        onClose();
                      }}
                      ml={3}
                    >
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