import { Grid, Box,Button, Input, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams} from "react-router-dom";


const TeacherSingleViewSubmitAssignment=()=>
 {
    const [campname , setCampName] = useState("");
    const [title , setTitle] = useState("");
    const [description , setDescription]= useState("");
    const [tmarks , setTMarks] = useState("");
    const [duedate , setDate] = useState("");
    const[uplassign, setUplAssign] = useState([]);
    const [assignments, setAssignments] = useState([]);
    const navigate = useNavigate();

    const getSingleUser = () =>
    {
      axios
        .get('http://localhost:5000/stdassignments/singletchassign/:',{params : {id: localStorage.getItem('ssubmitassignment_viewid')}})
        .then((res) => {
          console.log(res.data);
          setCampName(res.data.campname);
          setTitle(res.data.title);
          
          setDescription(res.data.description);
          setTMarks(res.data.tmarks);
          setDate(res.data.duedate);
          setUplAssign(res.data.uplassign);
          console.log(uplassign);
          

         
        })
        .catch((err) => {
          console.log(err);
        });
    }


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