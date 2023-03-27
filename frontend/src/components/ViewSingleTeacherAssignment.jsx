import { Grid, Box,Button, Input,Textarea, Text, Heading, Flex} from "@chakra-ui/react";
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
      axios.get(`http://localhost:5000/tchassignments/singletchassign/${localStorage.getItem('assignment_viewid')}`)  
      .then((res) => {
        //console.log(res.data)
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

    <Box p={2} m='auto' textAlign={'center'} width={'100%'} borderRadius={30}>

      <Box  >
        <Heading mb={4} >
          Assignment Details
        </Heading>
      </Box>

      <Flex width='80%' mx="auto" justifyContent={'space-around'} gap={2} p={1} >  
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

      {/* <Flex width='80%' mx="auto" p={2} gap={4} alignItems='center' >
         
              <Text>
                Description:
              </Text> 

              <Textarea                   
                  id="description"
                  name="description"
                  focusBorderColor='#F57C00'
                  borderColor='#F57C00'
                  variant='outline'
                  resize={'none'}
                  value={description}
                  sx={{
                    '&::-webkit-scrollbar': {
                      width: '16px',
                      borderRadius: '16px',
                      backgroundColor: 'white',
                    },
                    '&::-webkit-scrollbar-thumb': {
                      backgroundColor: `#F57C00`,
                      borderRadius: '16px',
                    },
                  }}
                  /> 
  
      </Flex> */}

      <Box width={'50%'} textAlign='center'>
          
          <Heading mb={2} size='sm' >
            Files Preview
          </Heading>
        
          <Flex wrap="wrap" 
                maxHeight={'54vh'}
                overflowY="scroll"
                backgroundColor="#FFFFFF" 
                boxShadow="0px 4px 8px rgba(0, 0, 0, 0.1)"
                borderRadius='15px'
                gap={4} 
                justifyContent={'space-around'} 
                p={4}
                sx={{
                  '&::-webkit-scrollbar': {
                    width: '16px',
                    borderRadius: '16px',
                    backgroundColor: 'white',
                  },
                  '&::-webkit-scrollbar-thumb': {
                    backgroundColor: `#F57C00`,
                    borderRadius: '16px',
                  },
                }}>

                  {uplassign.map((assign,index) => (

                  <iframe
                      src={uplassign[index]}
                      style={{
                        height: '48vh',
                        width: "100%",
                        border: '1px solid orange',
                        class: "center",
                        mx: 'auto',
                        borderRadius: "10px",
                      }}
                    />

                  ))}
              
            </Flex>
        </Box>

        <Box p={4}>
          <Button mx={4} onClick={()=>handleSubmitView(assignments._id)} colorScheme='orange' variant='solid'>
              Submissions
          </Button>

          <Button mx={4} onClick={Back} type='button' colorScheme='orange' variant='outline'>
              Back
          </Button>
        </Box>
    </Box>


  );
}

export default TeacherSingleViewAssignment;