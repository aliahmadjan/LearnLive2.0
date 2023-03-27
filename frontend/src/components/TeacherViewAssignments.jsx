import React from "react"
import { useState, useEffect } from "react"
import { Box,Grid,Button, SimpleGrid, Card,Tooltip, CardHeader, Avatar, Text,FormControl, FormLabel, Input, Select, Textarea, Heading, Flex} from "@chakra-ui/react";
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

    const handleSubmitEdit = (assignment_editid) =>
    {
      localStorage.removeItem('assignment_editid')
      localStorage.setItem('assignment_editid',assignment_editid)
      navigate("/teacher/editassignment")
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
      //console.log(userID)
     //localStorage.setItem('userID',userID)
    axios.get('http://localhost:5000/tchassignments/getcurrassigns' )
   // axios.get('http://localhost:5000/tchassignments/gettchassigns')
        //axios.get(`http://localhost:5000/tchassignments/getcurrtchass/${localStorage.getItem('userID')}`) 
        .then(res=> {
          
          setAssignments(res.data)
          //console.log(quizzes)
    }).catch (err=> {
       console.log(err) })
    
    }
 

    
   useEffect(()=>
   {   
    getAllAssignments();
    getCurentUser();

   },[])



    return (

      <Box p={2} m='auto' textAlign={'center'} width={'100%'} borderRadius={30}>

      <Box pt={4} pb={2}  >
        <Heading mb={4} >
          View Assignments
        </Heading>
      </Box>

      <Box width={'80%'} mx="auto" >

        <Flex p={4}>
          <Input placeholder="Assigment's Name"
          // onChange={handleSearch}
          variant={'outlined'} borderColor='orange'
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

            {assignments.map((assignment) => (
              <Card maxWidth={'100%'} maxHeight='160px' m={2}>
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


                      <Tooltip label="Edit" hasArrow placement='right'>
                        <Button size='sm' onClick={()=>handleSubmitEdit(assignment._id)} colorScheme='orange' variant='ghost'>
                        <i class="fa-solid fa-pen-to-square"></i>
                        </Button>
                      </Tooltip>

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

          </SimpleGrid>

      </Box>


    </Box>

       
    )
  }

  export default ViewAssignments;