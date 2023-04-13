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
    const [assignmentMarks , setAssignmentMarks] = useState([])
    const [results , setResults] = useState([])
    const [query, setQuery] = useState("")
    
    

    const [currentScore , setCurrentScore] = useState()
    const [assignment_score , setAssignmentScore] = useState()

    const [questions , setQuestions] = useState([]);
    const [ teachers , setTeachers] =useState('')
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()
    const navigate = useNavigate();

    const [assignmentScores, setAssignmentScores] = useState([]);

function handleScoreChange(index, newScore) {
  setAssignmentMarks(prevScores => {
    //console.log('Previous Assignment Marks', prevScores)
    const newScores = [...prevScores];
    newScores[index] = { ...newScores[index], assignment_score: newScore };
    //console.log('New assignment marks:', newScores);
     return newScores;
   });
 }



    const handleSubmitView = (ssubmitassignment_viewid) =>
    {
        localStorage.removeItem('ssubmitassignment_viewid')
         localStorage.setItem('ssubmitassignment_viewid',ssubmitassignment_viewid)
            navigate("/teacher/viewssubmitassignment");
    }

   const handleBack = () =>
   {
    navigate('/teacher/viewassignments')
   }

    
   useEffect(()=>
   {   
    
      axios.get(`http://localhost:5000/stdassignments/getsameass/${localStorage.getItem('assignment_viewid')}`)
      .then(res=> {
        
        setAssignments(res.data)
        setResults(res.data)
       
  }).catch (err=> {
     console.log(err) })


     axios.get(`http://localhost:5000/assignmentscore/getassignmentresults/${localStorage.getItem("assignment_viewid")}`)      
    .then((res)=>
    {
      
      setAssignmentMarks(res.data)
      setAssignmentScore(res.data.assignment_score)

     
    }).catch((err)=>
    {

    })

   },[])

   useEffect(()=>
   {
    console.log(assignment_score)
   },[results])

   const handleSearch = async (e) => {
    const query = e.target.value;
    setQuery(query);
    if (query === '') {
      // setTeachers(teachers)
      setResults(assignments);
    } else {
      const filteredStudents = assignments.filter((assign) =>
        assign.student_name.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filteredStudents);
    }
  };


    const EditGrade = () =>
    { 
      
      console.log(assignmentMarks)
    axios.post('http://localhost:5000/assignmentscore/updateassignscore',
    {
     
      

    
    }).then((res)=>
    {
     
       window.alert("EditSuccesFUll")
      //setSubmitStatus(1)
    }).catch((err)=>
      {
         window.alert("EditNOTSuccesFUll")
        //setSubmitStatus(-1)
      })
    

    }

    


    return (

    <Box p={2} m='auto' textAlign={'center'} width={'100%'} borderRadius={30}>

      <Box pt={4} pb={2}  >
        <Heading mb={4} >
          Submitted Assignments
        </Heading>
      </Box>

      <Flex maxW='100%' mx="auto" flexDirection={'column'}>
        <Flex p={4} pt={0} width='80%' m='auto'>
          <Input placeholder="Student's Name" 
          
          type="text"
          value={query}
          onChange={handleSearch}
          variant={'outlined'} borderColor='orange'></Input>
          
          

          
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
                  {results.map((assignment, index) => {
  const currentScore = assignmentMarks.find(score => score.student_name === assignment.student_name);
  const scoreValue = assignmentScores[index]?.assignment_score || currentScore?.assignment_score || '';
  return (
    <Tr key={index}>
      <Td><Avatar name={assignment.student_name} mx={4} /></Td>
      <Td>{assignment.student_name}</Td>
      <Td>
        <Box width={'60px'}>
          <Input
            variant={'filled'}
            mx={2}
            type='number'
            value={scoreValue}
            onChange={(e) => handleScoreChange(index, e.target.value)}
          />
          <Button mx={2}
          onClick={EditGrade}
          >Edit</Button>
        </Box>
      </Td>
      <Td>{assignment.submit_status}</Td>
      <Td>
        <Tooltip label="View" hasArrow placement='right'>
          <Button size='sm' onClick={()=>handleSubmitView(assignment._id)} colorScheme='orange' variant='ghost'>
            <i class="fa-solid fa-eye"></i>
          </Button>
        </Tooltip>
      </Td>
    </Tr>
  
       
  );
})}

                      {/* {results.map((assignment,index) => {
  
  const currentScore = assignmentMarks.find(score => score.student_name === assignment.student_name);
 

  return (
    <Tr key={index}>
      <Td><Avatar name={assignment.student_name} mx={4} /></Td>
      <Td>{assignment.student_name}</Td>
      <Td>
        <Box width={'60px'}>
          <Input variant={'filled'}
         
         onChange={(e) => {
          const newScore = e.target.value;
          setAssignmentScore(newScore);
          setCurrentScore((prevScore) => ({
            ...prevScore,
            assignment_score: newScore,
            
          }));
          console.log(newScore)
        }}
          mx={2} type='number'
          
          value={currentScore?.assignment_score || ''}
          >


          </Input>
          <Button mx={2}
          onClick={EditGrade}
          >Grade</Button>
        </Box>
      </Td>
      <Td>{assignment.submit_status}</Td>
      <Td>
        <Tooltip label="View" hasArrow placement='right'>
          <Button size='sm' onClick={()=>handleSubmitView(assignment._id)} colorScheme='orange' variant='ghost'>
            <i class="fa-solid fa-eye"></i>
          </Button>
        </Tooltip>
      </Td>
    </Tr>
  );
})} */}
                    
                  </Tbody>

                </Table>
              </TableContainer>
          </Box>

        </Flex>
      </Flex>

      <Button colorScheme='orange' onClick={handleBack}>
        Back
      </Button>


    </Box>

       
    )
  }

  export default ViewSubmittedAssignment;