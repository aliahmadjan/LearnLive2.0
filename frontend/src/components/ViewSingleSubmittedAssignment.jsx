import { Grid, Box,Button, Input, Text, FormControl, FormLabel } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams} from "react-router-dom";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react'


const TeacherSingleViewSubmitAssignment=()=>
 {
  const [submitStatus , setSubmitStatus] = useState(0);
  const [stdAssignmentID , setStdAssignmentID] = useState("");
    const [campname , setCampName] = useState("");
    const [title , setTitle] = useState("");
    const [description , setDescription]= useState("");
    const [tmarks , setTMarks] = useState("");
    const [duedate , setDate] = useState("");
    const[uplassign, setUplAssign] = useState([]);
    const [assignment_score , setAssignmentScore] = useState()
    const [assignments, setAssignments] = useState([]);
    const [studentName , setStudentName] = useState("")
    const [ studentID , setStudentID] = useState("")
    const navigate = useNavigate();

    const getSingleUser = () =>
    {
      axios
        .get('http://localhost:5000/stdassignments/singletchassign/:',{params : {id: localStorage.getItem('ssubmitassignment_viewid')}})
        .then((res) => {
          //console.log(res.data)
          setStdAssignmentID(res.data._id)
          setStudentID(res.data.student)
          setCampName(res.data.campname);
          setTitle(res.data.title);
          setStudentName(res.data.student_name);
          setDescription(res.data.description);
          setTMarks(res.data.tmarks);
          setDate(res.data.duedate);
          setUplAssign(res.data.uplassign);
          

         
        })
        .catch((err) => {
          console.log(err);
        });
    }

    const GradeAssignment = () =>
    {
      if (assignment_score <= tmarks) {
        axios.post("http://localhost:5000/assignmentscore/addassignmentscore",{
          tchassignment_id: `${localStorage.getItem('assignment_viewid')}`,
          stdassignment_id: stdAssignmentID,
          student_name: studentName,
          assignment_score: assignment_score,
          student_id: studentID,
          tmarks: tmarks,
         
        })
        setSubmitStatus(1)
      } else {
        setSubmitStatus(-1);
      }
    }
      const StatusAlert = () =>
      {
        if (submitStatus === 1)
        return(
          <Alert status='success'>
            <AlertIcon/>
            Assignment has been graded!
          </Alert>
        );
        if(submitStatus === -1)
        return(
          <Alert status='error'>
            <AlertIcon/>
            Assignment has not been graded!
          </Alert>
        )
      };
    useEffect(()=>
    {
        getSingleUser();
    },[uplassign])

    const Back = ()=>
    {
      navigate("/teacher/viewsubmittedassignment");
    }

  return (
        <Box width="80%" mt={8}  mx={"auto"}>
        <Text my={4} align={"center"} fontWeight="bold" fontSize={30}>Submitted Assignment</Text>
            {/* <Grid templateColumns="repeat(3, 1fr)" gap={10} overflow="scroll" height="80%" > */}
            
            <Text >
                   Campname: {campname}
                </Text>
            <Text >
                   Title: {title}
                </Text>
                <Text> Description: {description}</Text>
                <Text>Total Marks: {tmarks}</Text>
                <Text>Due Date: {duedate}</Text>
            {uplassign.map((assign,index) => (
                <Box p={5} shadow="md" borderWidth="1px" margin={2} marginBottom={10}>
                
                <iframe
                    src={uplassign[index]}
                    style={{
                      height: "200px",
                      width: "400px",
                      class: "center",
                      borderRadous: "50%",
                    }}
                  />
                  
                </Box>
            ))} 
             <FormControl mb={2} display={'flex'} alignItems='center'>
            <FormLabel htmlFor="title" fontWeight="bold" color="orange.500" mr={2}>Grade Assignment</FormLabel>
            <Input
              id="title"
              name="title"
              textAlign={'center'}
              focusBorderColor='orange.700' 
              variant={'flushed'} 
              borderBottomColor='orange'
              onChange={(e) => setAssignmentScore(e.target.value)}
              width={'60%'} 
              mr={0} ml='auto'
              />
          </FormControl>
          <Button onClick={GradeAssignment}>
            Grade Assignment
          </Button>
          <StatusAlert/>

                    <Button  onClick={Back}
      style={{
        position: 'absolute',
        right: 30,
        bottom:10,
      }}
      colorScheme='teal' variant='solid'>
  Back
  </Button>
            {/* </Grid> */}
        </Box>
  );
}

export default TeacherSingleViewSubmitAssignment;