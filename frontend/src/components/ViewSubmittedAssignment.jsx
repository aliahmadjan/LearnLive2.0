import React from "react"
import { useState, useEffect } from "react"
import { Box,Grid,Button, Text,FormControl, FormLabel, Input, Select, Textarea, Heading} from "@chakra-ui/react";
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



  const ViewSubmittedAssignments = ()=>
  {

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

    const getAllAssignments= () =>
    {

        axios.get("http://localhost:5000/stdassignments/gettchassigns") 
        .then(res=> {
          setAssignments(res.data)
          //console.log(quizzes)
    }).catch (err=> {
       console.log(err) })
    
    }


    const Back = ()=>
    {
      navigate("/teacher/viewassignment");
    }
   useEffect(()=>
   { 
  
    getAllAssignments();
   },[assignments])



    return (
        <Box width="80%" mt={8}  mx={"auto"}>
             
        <Text my={4} align={"center"} fontWeight="bold" fontSize={30}>All Students</Text>
        {assignments.map((assignment) => (  
            
            <> 
            {/* <Grid templateColumns="repeat(3, 1fr)" gap={10} overflow="scroll" height="30%" width="100%" > */}
            
                <Box p={5} shadow="md" borderWidth="1px" margin={2} marginBottom={10}>
                <Text fontSize="xl" fontWeight="bold">
                  Camp Name: {assignment.campname}
                </Text>  
                <Text fontSize="xl" fontWeight="bold">
                  Name: {assignment.title}
                </Text>
                <Button display={"table-column"} type="submit"  
               onClick={()=>handleSubmitView(assignment._id)}
                colorScheme={"orange"} size="lg" mt={28} p="auto" ml="auto" mr="auto">
                     View
             </Button> 
            <Button display={"table-column"} type="submit" 
                onClick={onOpen}
                colorScheme={"orange"} size="lg" mt={28} p="4" ml="28" mr={"auto"}>
             Delete
             </Button> 
             
                </Box>

            {/* </Grid> */}

            <>
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
            <Button colorScheme='red' ml={3}>
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  </> 

            </>
                 ))} 
       
       <Button  onClick={Back}
      style={{
        position: 'absolute',
        right: 30,
        bottom:10,
      }}
      colorScheme='teal' variant='solid'>
  Back
  </Button>
  
        </Box>
       
    )
  }

  export default ViewSubmittedAssignments;