import React from "react"
import { useState, useEffect } from "react"
import { Box,Grid,Button, Text,FormControl, FormLabel, Input, Select, Textarea, Heading, Flex, VStack, Divider, SimpleGrid, Card, CardHeader, Avatar, Tooltip, TableContainer, Table, TableCaption, Thead, Tr, Th, Tbody, Td} from "@chakra-ui/react";
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



  const ViewSubmittedAssignment = ()=>
  {
    const [userID , setUserID] = useState("")
    const [stdAssignmentID , setStdAssignmentID] = useState("");
    const [assignments , setAssignments] = useState([]);
    const [questions , setQuestions] = useState([]);
    const [ teachers , setTeachers] =useState('')
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()
    const navigate = useNavigate();

    const handleSubmitView = (ssubmitassignment_viewid) =>
    {
        localStorage.removeItem('ssubmitassignment_viewid')
         localStorage.setItem('ssubmitassignment_viewid',ssubmitassignment_viewid)
            navigate("/teacher/viewssubmitassignment");
    }

    const getCurentUser = () =>
    {
      let logintoken = localStorage.getItem("logintoken")
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
      //console.log(`${localStorage.getItem('assignment_viewid')}`)
    axios.get(`http://localhost:5000/stdassignments/getsameass/${localStorage.getItem('assignment_viewid')}`)
        .then(res=> {
          //console.log(`${localStorage.getItem('assignment_viewid')}`)
          // setStdAssignmentID(res.data._id)
          //console.log(res.data)
          setAssignments(res.data)
          //console.log(quizzes)
    }).catch (err=> {
       console.log(err) })
    
    }
 

    
   useEffect(()=>
   {   
    getAllAssignments();
    getCurentUser();

   },[assignments])



    return (

    <Box p={2} m='auto' textAlign={'center'} width={'100%'} borderRadius={30}>

      <Box pt={4} pb={2}  >
        <Heading mb={4} >
          Submitted Assignments
        </Heading>
      </Box>

      <Flex maxW='100%' mx="auto" flexDirection={'column'}>
        <Flex p={4} pt={0} width='80%' m='auto'>
          <Input placeholder="Student's Name" variant={'outlined'} borderColor='orange'></Input>
          <Button colorScheme={'orange'}>Search</Button>
        </Flex>

        <Flex width={'100%'} justifyContent='space-around'>
          <Box width={'85%'} p={4}>
              
              <TableContainer
                px={4} 
                maxHeight='60vh'
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

                <Table variant={'simple'} >
                  
                  <TableCaption>Student Assignments Scores</TableCaption>
                  
                  <Thead>
                    <Tr>
                      <Th></Th>
                      <Th>Student Name</Th>
                      <Th>Assignment Score</Th>
                      <Th>Status</Th>
                      <Th>View</Th>
                    </Tr>
                  </Thead>

                  <Tbody>
                    {assignments.map((assignment,index) => (
                      <Tr key={index}>
                        <Td><Avatar name={assignment.student_name} mx={4} /></Td>
                        <Td>{assignment.student_name}</Td>
                        <Td><Box width={'60px'}><Input variant={'filled'} mx={2} type='number'></Input>/100<Button mx={2}>Grade</Button></Box></Td>
                        <Td>{assignment.submit_status}</Td>
                        <Td>
                          <Tooltip label="View" hasArrow placement='right'>
                            <Button size='sm' onClick={()=>handleSubmitView(assignment._id)} colorScheme='orange' variant='ghost'>
                            <i class="fa-solid fa-eye"></i>
                            </Button>
                          </Tooltip>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>

                </Table>
              </TableContainer>
          </Box>

        </Flex>
      </Flex>


    </Box>

       
    )
  }

  export default ViewSubmittedAssignment;