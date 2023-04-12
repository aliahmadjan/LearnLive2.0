import { Grid, Box,Button, Input,Textarea, Text, Heading, Flex, SimpleGrid, Card, CardHeader, CardBody, CardFooter} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams} from "react-router-dom";

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
          Upload Date: <Text color={'orange.800'} display={'inline'}> {uploadeddate} </Text> 
        </Text>
        <Text>
          Due Date: <Text color={'orange.800'} display={'inline'}> {duedate} </Text> 
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
                uplassign.map((file, index) => {
                  return (
                    //iframe
                    <iframe
                      //filePath={file}
                      src={file}
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