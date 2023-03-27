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
  const [submitStatus , setSubmitStatus] = useState("");
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

    const GetAssignmentScore = () =>
    {
      axios.get(`http://localhost:5000/assignmentscore/getassignmentscore/${localStorage.getItem('ssubmitassignment_viewid')}`)
      .then((res) =>
      {
        console.log(res.data)
        //setAssignmentScore(res.data.assignment_score)
      }).catch((err)=>
      {
        //console.log(err)
      })
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
        .then((response) => {
          if (response.status === 200) {
            setSubmitStatus("Graded");
          }
        })
        .catch((error) => {
          if (error.response && error.response.status === 400) {
            setSubmitStatus("Already Graded");
          } else {
            setSubmitStatus("error");
          }
        });
    } else {
      setSubmitStatus("error");
    }


        axios.post("http://localhost:5000/leaderboard/addassignscore",{
          campname:campname,
          student_id : studentID,
          student_name: studentName,
          tchassignment_id: `${localStorage.getItem('assignment_viewid')}`,
          assignment_score: Number(assignment_score),
          total_assignmentscore: tmarks
          
        })
          };

    const StatusAlert = () => {
      if (submitStatus === "Graded")
        return (
          <Alert status="success">
            <AlertIcon />
            Assignment has been graded!
          </Alert>
        );
      if (submitStatus === "Already Graded")
        return (
          <Alert status="warning">
            <AlertIcon />
            Assignment has already been graded!
          </Alert>
        );
      if (submitStatus === "error")
        return (
          <Alert status="error">
            <AlertIcon />
            Assignment has not been graded!
          </Alert>
        );
    };
    useEffect(()=>
    {
        getSingleUser();
        //GetAssignmentScore();
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
              value={assignment_score}
              
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