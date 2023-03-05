import { Avatar,Grid, Box,Button, Input, Text, Heading, Flex} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams} from "react-router-dom";


const ViewAssignmentMarks=()=>
 {
    const [ stdAssignmentID , setStdAssignmentID ] = useState("")
    const [tmarks , setTMarks] = useState("")
    const [title, setTitle] = useState("")
    const [ assignmentMarks , setAssignmentMarks ] = useState([])
    const navigate = useNavigate();

    const getSingleUser = () =>
    {
      
     
        axios
        .get(`http://localhost:5000/stdassignments/singletchassign/:${localStorage.getItem('marks_viewid')}`) 
        // .get('http://localhost:5000/stdassignments/singletchassign/:',{params : {id: localStorage.getItem('marks_viewid')}})
          .then((res) => {
          })
          .catch((err) => {
            console.log(err);
          });
      
          //axios.get(`http://localhost:5000/assignmentscore/getassignmentresults/${stdAssignmentID}`)
      axios.get(`http://localhost:5000/assignmentscore/getassignmentresults/${localStorage.getItem("assignment_viewid")}`)      
      .then((res)=>
      {
        //console.log(res.data)
        setAssignmentMarks(res.data)
        
        //setAssignmentScore(res.data.assignment_score)
      }).catch((err)=>
      {

      })

    }

    useEffect(()=>
    {
        getSingleUser();
    },[])

    const Back = ()=>
    {
      navigate("/student/viewassignment");
    }

  return (

    
    <Box pt={0} px={0} mx='auto' textAlign={'center'} width={'100%'} backgroundColor='gray.100' borderRadius={30}>
    <Box pt={4} pb={2}  >
      <Heading mb={4} >
        View Marks
      </Heading>
    </Box>

    
  <Flex mt={4} maxW='4xl' mx="auto" width={'100%'} gap={4} >
  {/* <Flex p={4} pt={0}>
    <Input placeholder="Student's Name" variant={'outlined'} borderColor='orange'></Input>
    <Button colorScheme={'orange'}>Search</Button>
  </Flex> */}
  <Box width={'50%'}>
    <Heading size={'md'} mb={4}> Assignment Marks </Heading>
    <Flex width="100%" border={'1px solid orange'} gap={2} justifyContent='space-around' height='50vh' borderRadius='20px' p={4} flexWrap='wrap' overflow='scroll'>

      {assignmentMarks.map((marks,index) => (         
        <Box p={2} height="100px">  
          <Text> Name : { marks.student_name}</Text>
          <Text> Assignment Score :  {marks.assignment_score + "/" + marks.tmarks}</Text>   
        </Box>
      ))}   

    </Flex>
  </Box>
  

</Flex>

   
  </Box>

  );
}

export default ViewAssignmentMarks;