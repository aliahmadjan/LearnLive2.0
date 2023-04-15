import React from "react"
import { useState, useEffect } from "react"
import { Box,Grid,Button, SimpleGrid, Card, Tooltip, CardHeader, Avatar, Text,FormControl, FormLabel, Input, Select, Textarea, Heading, Flex} from "@chakra-ui/react";
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
    const [ query, setQuery]= useState("");
    const [results , setResults] = useState([]);
    
    const navigate = useNavigate();

    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()

    const handleSubmitView = (assignment_viewid) =>
    {
        localStorage.removeItem('assignment_viewid')
         localStorage.setItem('assignment_viewid',assignment_viewid)
            navigate("/teacher/viewassignment");
    }

    const handleSubmitEdit = (assignment_editid) =>
    {
      localStorage.removeItem('assignment_editid')
      localStorage.setItem('assignment_editid',assignment_editid)
      navigate("/teacher/editassignment")
  }

  const handleSubmitDelete = (assignment_delid)=>
  {
    localStorage.removeItem('assignment_delid')
    localStorage.setItem('assignment_delid',assignment_delid)

  }

  const handleViewSubmissions = (submissions_viewid) =>
  {
    localStorage.removeItem('submissions_viewid')
    localStorage.setItem('submissions_viewid' , submissions_viewid)
    navigate("/teacher/viewsubmittedassignment")
  }

 
    
    const getAllAssignments= () =>
    {
      
    axios.get('http://localhost:5000/tchassignments/getcurrassigns' )
   
        .then(res=> {     
          setAssignments(res.data)
          setResults(res.data);
          //console.log(quizzes)
    }).catch (err=> {
       console.log(err) })
    
    }

    const DeleteAssignment = (e) => {
      e.preventDefault();
      const assignmentId = localStorage.getItem('assignment_delid');
      axios.delete(`http://localhost:5000/tchassignments/deletetchassigns/${assignmentId}`)
        .then(() => {
          const updatedAssignments = assignments.filter(assignment => assignment._id !== assignmentId);
          setAssignments(updatedAssignments);
          setResults(updatedAssignments);
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
        setResults(assignments);
      } else {
        const filteredAssignments = assignments.filter((assignment) =>
          assignment.title.toLowerCase().includes(query.toLowerCase())
        );
        setResults(filteredAssignments);
      }
          
    }
 

    
   useEffect(()=>
   {   
    getAllAssignments();
    


   },[])

   useEffect(()=>
   {
  
   },[results])



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
          onChange={handleSearch}
          variant={'outlined'} borderColor='orange'
          value={query}
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

            {results.map((assignment) => (
              <Card m={2} justifyContent={'center'}>
                <CardHeader>
                  <Flex spacing='4' alignItems='center' justifyContent={'space-evenly'}>
                    <Flex justifyContent={'space-evenly'} alignItems='center' flexWrap='wrap'>
                      <Avatar name={assignment.title} mx={4} />
                      <Box>
                        <Heading size='sm'>Title: {assignment.title}</Heading>
                        <Text>Camp: {assignment.campname}</Text>
                      </Box>
                    </Flex>

                    <Flex flexDir={'column'} justifyContent='center'>

                      <Tooltip label="View" hasArrow placement='right'>
                        <Button size='sm' onClick={()=>handleSubmitView(assignment._id)} colorScheme='orange' variant='ghost'>
                        <i class="fa-solid fa-eye"></i>
                        </Button>
                      </Tooltip>

                       {/* <Tooltip label="Submissions" hasArrow placement='right'>
                        <Button size='sm' onClick={()=>handleViewSubmissions(assignment._id)} colorScheme='orange' variant='ghost'>
                        <i class="fa-solid fa-expand"></i>
                        </Button>
                      </Tooltip>  */}

                      <Tooltip label="Edit" hasArrow placement='right'>
                        <Button size='sm' onClick={()=>handleSubmitEdit(assignment._id)} colorScheme='orange' variant='ghost'>
                        <i class="fa-solid fa-pen-to-square"></i>
                        </Button>
                      </Tooltip>

                      <Tooltip label="Delete" hasArrow placement='right'>
                        <Button size='sm' onClick={()=>onOpen(handleSubmitDelete(assignment._id))} colorScheme='orange' variant='ghost'>
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
                        DeleteAssignment(e);
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

  export default ViewAssignments;