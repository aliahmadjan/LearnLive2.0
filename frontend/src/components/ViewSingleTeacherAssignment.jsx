import { Grid, Box,Button, Input, Text, Heading, Flex} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams} from "react-router-dom";


const TeacherSingleViewAssignment=()=>
 {
    const [campname , setCampName] = useState("");
    const [title , setTitle] = useState("");
    const [description , setDescription]= useState("");
    const [tmarks , setTMarks] = useState("");
    const [uploadeddate , setUploadedDate] = useState("");
    const [duedate , setDate] = useState("");
    const[uplassign, setUplAssign] = useState([]);
    const [assignments, setAssignments] = useState([]);
    const navigate = useNavigate();

    const getSingleUser = () =>
    {
      axios
        .get('https://learnlive.onrender.com/tchassignments/singletchassign/:',{params : {id: localStorage.getItem('assignment_viewid')}})
        .then((res) => {
          setCampName(res.data.campname);
          setTitle(res.data.title);
          
          setDescription(res.data.description);
          setTMarks(res.data.tmarks);
          setUploadedDate(res.data.uploadeddate);
          setDate(res.data.duedate);
          setUplAssign(res.data.uplassign);
          

         
        })
        .catch((err) => {
          console.log(err);
        });
    }
    const handleSubmitView = (submitassignment_viewid) =>
    {
        localStorage.removeItem('submitassignment_viewid')
         localStorage.setItem('submitassignment_viewid',submitassignment_viewid)
            navigate("/teacher/viewsubmittedassignment");
    }

    useEffect(()=>
    {
        getSingleUser();
    },[uplassign])

    const Back = ()=>
    {
      navigate("/teacher/viewassignments");
    }

  return (

    <Box pt={0} px={0} mx='auto' textAlign={'center'} width={'100%'} backgroundColor='gray.100' borderRadius={30}>
      <Box pt={4} pb={2} mt={4} >
        <Heading mb={2} >
          Assignment Details
        </Heading>
      </Box>

      <Flex maxW='80%' mx="auto" justifyContent={'space-around'} gap={2} p={1} >  
              <Text>
                Title: <Text color={'orange.800'} display={'inline'}> {title} </Text> 
              </Text>
              <Text>
                Camp: <Text color={'orange.800'} display={'inline'}> {campname} </Text> 
              </Text>
              <Text>
                Marks: <Text color={'orange.800'} display={'inline'}> {tmarks} </Text> 
              </Text>
              <Text>
                Upload Date: <Text color={'orange.800'} display={'inline'}> {uploadeddate} </Text> 
              </Text>
              <Text>
                Due Date: <Text color={'orange.800'} display={'inline'}> {duedate} </Text> 
              </Text>
      </Flex>

      <Flex maxW='2xl' mx="auto" p={2} justifyContent={'center'} pb={2} > 
              <Text>
                Description: <Text color={'orange.800'} display={'inline'}> {description} </Text> 
              </Text> 
      </Flex>

      <Flex wrap="wrap" 
            overflowY="scroll"
            width='80%'
            mx='auto' 
            height="sm" 
            border='1px solid orange'
            borderRadius='10px'
            gap={4} 
            justifyContent={'space-around'} 
            p={4}
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
            
              {uplassign.map((assign,index) => (

                  <iframe
                      src={uplassign[index]}
                      style={{
                        height: "90%",
                        padding: '10px',
                        width: "100%",
                        border: '1px dashed orange',
                        class: "center",
                        mx: 'auto',
                        borderRadius: "10px",
                      }}
                    />

              ))} 
    
      </Flex>

        <Box p={4}>
          <Button mx={4} onClick={()=>handleSubmitView(assignments._id)} colorScheme='orange' variant='solid'>
              Submissions
          </Button>

          <Button mx={4} onClick={Back} type='button' colorScheme='orange' variant='outline'>
              Back
          </Button>
        </Box>
    </Box>

  //       <Box width="80%" mt={8}  mx={"auto"}>
  //       <Text my={4} align={"center"} fontWeight="bold" fontSize={30}>Assignment</Text>
  //           {/* <Grid templateColumns="repeat(3, 1fr)" gap={10} overflow="scroll" height="80%" > */}
            
  //           <Text >
  //                  Campname: {campname}
  //               </Text>
  //           <Text >
  //                  Title: {title}
  //               </Text>
  //               <Text> Description: {description}</Text>
  //               <Text>Total Marks: {tmarks}</Text>
  //               <Text>Uploaded Date: {uploadeddate}</Text>
  //               <Text>Due Date: {duedate}</Text>
                
            // {uplassign.map((assign,index) => (
            //     <Box p={5} shadow="md" borderWidth="1px" margin={2} marginBottom={10}>
                
            //     <iframe
            //         src={uplassign[index]}
            //         style={{
            //           height: "200px",
            //           width: "400px",
            //           class: "center",
            //           borderRadous: "50%",
            //         }}
            //       />
                  
            //     </Box>
            // ))} 
  //           <Button  onClick={()=>handleSubmitView(assignments._id)} colorScheme='teal' variant='solid'>

  //                   View Submitted Assignments

  //           </Button>
  //                   <Button  onClick={Back}
  //     style={{
  //       position: 'absolute',
  //       right: 30,
  //       bottom:10,
  //     }}
  //     colorScheme='teal' variant='solid'>
  // Back
  // </Button>
  //           {/* </Grid> */}
  //       </Box>
  );
}

export default TeacherSingleViewAssignment;