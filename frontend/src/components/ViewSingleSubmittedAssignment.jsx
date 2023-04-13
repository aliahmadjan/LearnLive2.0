import { Heading, Flex, SimpleGrid, Textarea, Card, Box,Button, Input, Text, FormControl, FormLabel } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams} from "react-router-dom";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react'

function getIconByFileType(fileType) {
  switch (fileType.toLowerCase()) {
    case 'pdf':
      return <i class="fa-solid fa-file-pdf fa-4x"></i>;
    case 'jpg':
    case 'jpeg':
    case 'png':
    case 'gif':
      return <i class="fa-solid fa-image fa-4x"></i>;
    case 'doc':
    case 'docx':
      return <i class="fa-solid fa-file-doc fa-4x"></i>;
    case 'xls':
    case 'xlsx':
      return <i class="fa-solid fa-file-spreadsheet fa-4x"></i>;
    default:
      return <i class="fa-solid fa-square-question fa-4x"></i>;
  }
}

function getFileName(fileUrl) {
  const url = new URL(fileUrl);
  const path = url.pathname;
  const fileName = path.split('/').pop();
  return fileName;
}

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

    const formatUploadDate = (duedate) =>
    {
      const options = {
        day: "numeric",
        month: "long",
        year: "numeric",
      };
      const date = new Date(duedate);
      return date.toLocaleString("en-US", options);

    }

    
    const formattedUploadDate = formatUploadDate(duedate)
    
  return (

    <Box p={2} m='auto' textAlign={'center'} width={'100%'} borderRadius={30}>

      <Box>
        <Heading mb={4} >
          Assignment Details
        </Heading>
      </Box>

      <Flex mx="auto" justifyContent={'space-around'} gap={2} p={2} >
 
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
          Submitted Date: <Text color={'orange.800'} display={'inline'}> {formattedUploadDate} </Text> 
        </Text>
        
 
      </Flex>

      <Flex p={4} justifyContent='space-around' alignItems={'center'}>

        <Box width={'40%'} textAlign='center'>
          
          <Heading mb={2} size='sm' >
            Description
          </Heading>

          <Textarea
            boxShadow="0 1px 3px 0 rgba(0, 0, 0, 0.1)"
            textAlign={'center'}                   
            id="description"
            name="description"
            focusBorderColor='#F57C00'
            backgroundColor={'#FFFFFF'}
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

          <Heading pt={4} pb={2} size='sm' >
            Files
          </Heading>

          <SimpleGrid
            p={2} 
            overflowY='scroll' 
            maxHeight={'32vh'} 
            m='auto' 
            minChildWidth='160px' 
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
              
            {uplassign.map((assign, index) => {
              const fileType = assign.split('.').pop();
              const fileName = getFileName(assign);

              return (
                <a href={assign} target='_blank' rel='noopener noreferrer'>
                  <Card direction='row' textAlign={'center'} p={1}>

                    <Box>
                      {getIconByFileType(fileType)}
                    </Box>
                    
                    <Text
                      textAlign={'center'}
                      m='auto' 
                      sx={{
                        display: '-webkit-box',
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: 2,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'normal',
                      }}>
                        {fileName}
                    </Text>
                    
              
                  </Card>
                </a>
              );
            })}

          </SimpleGrid>

        </Box>

        <Box width={'40%'} textAlign='center'>
          <Heading mb={2} size='sm' >
            Files Preview
          </Heading>
        
          <Flex wrap="wrap" 
                maxHeight={'50vh'}
                overflowY="scroll"
                borderRadius='15px'
                gap={2} 
                justifyContent={'space-around'} 
                p={2}
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
                {
                uplassign.map((assign, index) => {
                  return (
                    //iframe
                    <iframe
                      //filePath={file}
                      src={uplassign[index]}
                      style={{
                        padding: "8px",
                        backgroundColor: "#FFFFFF",
                        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                        height: '48vh',
                        width: "100%",
                        class: "center",
                        mx: 'auto',
                        borderRadius: "10px",
                      }}
                      
                    />
                  );
                })}
              
            </Flex>
        </Box>

      </Flex>
      
      <form onSubmit={GradeAssignment}>
      <FormControl width='70%' m='auto' display={'flex'} alignItems='center'>
            <FormLabel alignSelf={'flex-end'} htmlFor="marks" fontWeight="bold" color="#F57C00" mr={2}>Grade</FormLabel>
            <Input
            id="title"
            name="title"
            type="number"
            placeholder='Score'
            textAlign={'center'}
            focusBorderColor='#F57C00' 
            variant={'flushed'} 
            borderBottomColor='#F57C00'
            onChange={(e) => setAssignmentScore(e.target.value)}
            value={assignment_score}
            isRequired
            width={'60%'} 
            m='auto'
            />

        <Button ml={12} type='submit' colorScheme='orange' variant='solid'>
          Grade Assignment
        </Button>

      </FormControl>
      </form>
        

      

      <StatusAlert/>

      <Button 
        onClick={Back}
        m='auto'
        mt={4}
        colorScheme='teal' variant='solid'>
         Back
      </Button>
            {/* </Grid> */}
    </Box>

);
}

export default TeacherSingleViewSubmitAssignment;