import React from "react"
import { useState, useEffect } from "react"
import { SimpleGrid, Card, CardHeader, Tooltip, Box, Avatar ,Button, Text, Input, Select, Textarea, Heading, Flex} from "@chakra-ui/react";
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
          //  onChange={handleSearch}
            variant={'outlined'} borderColor='orange'
          //  value={query}
          >
          </Input>
          {/* <Button colorScheme={'orange'}>Search</Button> */}
        </Flex>

        <SimpleGrid 
            width={'90%'} 
            overflowY='auto' 
            maxHeight={'48vh'} 
            mx='auto' 
            minChildWidth='220px' 
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

            {quizzes.map((quiz) => (
              <Card m={2} justifyContent={'center'}>
                <CardHeader>
                  <Flex spacing='4' alignItems='center' justifyContent={'space-between'}>
                    <Avatar name={quiz.campname} />

                    <Flex justifyContent={'space-evenly'} alignItems='center' flexWrap='wrap'>
                      
                      <Box>
                        <Heading size='sm'>Quiz No: {quiz.quizno}</Heading>
                        <Text>Camp: {quiz.campname}</Text>
                      </Box>
                    </Flex>

                    

                    <Tooltip label="Attempt" hasArrow placement='right'>
                      <Button size='sm' onClick={()=>handleSubmitView(quiz._id)} colorScheme='orange' variant='ghost'>
                      <i class="fa-solid fa-arrow-right-long"></i>
                      </Button>
                    </Tooltip>


                      {/* <Tooltip label="Edit" hasArrow placement='right'>
                        <Button size='sm' onClick={()=>handleSubmitEdit(assignment._id)} colorScheme='orange' variant='ghost'>
                        <i class="fa-solid fa-pen-to-square"></i>
                        </Button>
                      </Tooltip> */}


                    

                  </Flex>

                </CardHeader>
  
              </Card>
            ))}
        </SimpleGrid>

      </Box>

    </Box>
       
    )
  }

  export default ViewQuizzes;