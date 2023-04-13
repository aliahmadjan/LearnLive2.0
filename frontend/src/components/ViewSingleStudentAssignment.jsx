import { Textarea, SimpleGrid, Card , Box,Button, Input, Text, Heading, Flex, FormControl, FormLabel} from "@chakra-ui/react";
import React,{ useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams} from "react-router-dom";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react'
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'

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


const StudentSingleViewAssignment=()=>
 {
  const [ submitStatus , setSubmitStatus] = useState("");
  const [campname , setCampName] = useState("");
  const [title , setTitle] = useState("");
  const [studentID , setStudentID] = useState("");
  const [description , setDescription]= useState("");
  const[assignment_score , setAssignmentScore] = useState("")
  const [tmarks , setTMarks] = useState("");
  const [duedate , setDate] = useState("");
  const [uploadeddate , setUploadedDate] = useState("");
  const[uplassign, setUplAssign] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const navigate = useNavigate();
  const [studentName , setStudentName] = useState("")
  const [submitted, setSubmitted] = useState(false);
  const [submits , setSubmitS] = useState("")

const [selectedFiles, setSelectedFiles] = useState([null]);
const [selected , setSelected] = useState([null])

const submitted_date = new Date().toISOString().substring(0,10)

const { isOpen, onOpen, onClose } = useDisclosure()
const cancelRef = React.useRef()


var imgURLsArray = []
const onSelectFile = (e) => {
  const selectedImages = [...e.target.files];
  selectedImages.map(img=> imgURLsArray.push(URL.createObjectURL(img)))
   setSelected(imgURLsArray)
   setSelectedFiles(e.target.files)

};

const handleViewMarks = (marks_viewid) =>
{
  localStorage.removeItem(marks_viewid)
  localStorage.setItem("marks_viewid",marks_viewid)
  navigate("/student/viewassignmentmarks")
}

const handleSubmitAssign = (submit_assignid)=>
{
  localStorage.removeItem(submit_assignid)
  localStorage.setItem("submit_assignid",submit_assignid)

}

const getTeacherAssignments = () =>
  {
    axios
      .get(`http://localhost:5000/tchassignments/singletchassign/${localStorage.getItem('sassignment_viewid')}`)
      .then((res) => {
        setCampName(res.data.campname);
        setTitle(res.data.title);
        setDescription(res.data.description);
        setTMarks(res.data.tmarks);
        setUploadedDate(res.data.uploadeddate)
        setDate(res.data.duedate);
        setUplAssign(res.data.uplassign);
      })
      .catch((err) => {
        console.log(err);
      });

     
  }
const getCurentUser = () =>
{
  let logintoken = localStorage.getItem("ltoken")
  axios.defaults.headers.common["Authorization"] = `Bearer ${logintoken}`;
  axios.get("http://localhost:5000/student/viewprofile")
    .then(res=> {
            //console.log(res.data)
            
            setStudentID(res.data._id)
            setStudentName(res.data.name);
            //console.log(submitted_date)
           
           
    }).catch (err=> {
        console.log(err) })
}



const SubmitAssignment = (event) =>
{
  event.preventDefault();

      const formData = new FormData();
       if( submitted_date <= duedate)
      {
      formData.append('campname',campname);
      formData.append('title',title);
      formData.append('description',description)
      formData.append('tmarks',tmarks);
      formData.append('duedate',duedate)
      formData.append('submitted_date',submitted_date)
      formData.append('assignment_id',`${localStorage.getItem('sassignment_viewid')}`)
      formData.append('student_name', studentName)
      formData.append('student', studentID)
      // formData.append('submitted', false)
         for (let i = 0; i < selectedFiles.length; i++) {
          formData.append(`uplassign`,selectedFiles[i]);
         }
  
         formData.append('submit_status', submitted_date <= duedate ? 'On time' : 'Late')
         fetch('http://localhost:5000/stdassignments/submitassigns', {
          method: 'POST',
          body: formData,
         
        })
        .then(response => response.json())
.then(data => setSubmitStatus(data.message))
.catch(error => setSubmitStatus("Error"));
        
       
    }

   else
   {
    formData.append('campname',campname);
    formData.append('title',title);
    formData.append('description',description)
    formData.append('tmarks',tmarks);
    formData.append('duedate',duedate)
    formData.append('submitted_date',submitted_date)
    formData.append('assignment_id',`${localStorage.getItem('sassignment_viewid')}`)
    formData.append('student_name', studentName)
    formData.append('student', studentID)
    // formData.append('submitted', false)
       for (let i = 0; i < selectedFiles.length; i++) {
        formData.append(`uplassign`,selectedFiles[i]);
       }
    formData.append('submit_status', submitted_date <= duedate ? 'On time' : 'Late')
         fetch('http://localhost:5000/stdassignments/submitassigns', {
          method: 'POST',
          body: formData,
   })
   .then(response => response.json())
.then(data => setSubmitStatus(data.message))
.catch(error => setSubmitStatus("Error"));
   
   }
    
  
  
}

const StatusAlert = () => {
  if (submitStatus === "Already Submitted")
    return (
      <Alert status='warning'>
      <AlertIcon />
    Assignment has already been submitted!
    </Alert>
    );
  if (submitStatus === "Submitted")
    return (
      <Alert status='success'>
      <AlertIcon />
     Assignment has been submitted!
    </Alert>
    );

    if (submitStatus === "Error")
    return (
      <Alert status="error">
        <AlertIcon />
        Assignment was not submitted!
      </Alert>
    );
};



useEffect(()=>
{
  //localStorage.setItem('submitted', submitted);
  
  getCurentUser();
  getTeacherAssignments();
},[uplassign])

const formatUploadDate = (uploadeddate) =>
    {
      const options = {
        day: "numeric",
        month: "long",
        year: "numeric",
      };
      const date = new Date(uploadeddate);
      return date.toLocaleString("en-US", options);

    }

    const formatDueDate = (duedate) =>
    {
      const options = {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      };
      const date = new Date(duedate);
      return date.toLocaleString("en-US", options);

    }
    const formattedUploadDate = formatUploadDate(uploadeddate)
    const formattedDueDate = formatDueDate(duedate)

    const Back = ()=>
    {
      navigate("/student/assignments");
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
          Upload Date: <Text color={'orange.800'} display={'inline'}> {formattedUploadDate} </Text> 
        </Text>
        <Text>
          Due Date: <Text color={'orange.800'} display={'inline'}> {formattedDueDate} </Text> 
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
                width: '8px',
                borderRadius: '2px',
                backgroundColor: 'white',
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: `#F57C00`,
                borderRadius: '2px',
              },
            }}
            /> 

          <Heading pt={4} pb={2} size='sm' >
            Files
          </Heading>

          <SimpleGrid
            alignItems={'center'}
            p={2} 
            overflowY='auto' 
            maxHeight={'13vh'} 
            m='auto' 
            minChildWidth='160px' 
            spacingX='10px' spacingY='10px'
            sx={{
              '&::-webkit-scrollbar': {
                width: '8px',
                borderRadius: '2px',
                backgroundColor: 'white',
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: `orange.500`,
                borderRadius: '2px',
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

        <Box width={'50%'} textAlign='center'>
          <Heading mb={2} size='sm' >
            Files Preview
          </Heading>
        
          <Flex wrap="wrap" 
                maxHeight={'52vh'}
                overflowY="auto"
                borderRadius='15px'
                gap={2} 
                justifyContent={'space-around'} 
                p={2}
                sx={{
                  '&::-webkit-scrollbar': {
                    width: '8px',
                    borderRadius: '2px',
                    backgroundColor: 'white',
                  },
                  '&::-webkit-scrollbar-thumb': {
                    backgroundColor: `#F57C00`,
                    borderRadius: '2px',
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
                        borderRadius: "8px",
                      }}
                      
                    />
                  );
                })}
              
            </Flex>
        </Box>

      </Flex>

          <form>

            <FormControl display='flex' maxW='2xl' mx="auto"  alignItems='center' my={4}>
              <FormLabel fontWeight="bold" color="orange.500" mr={2}>Submission Files</FormLabel>
              <Input
                focusBorderColor='orange.700' 
                variant={'flushed'} 
                borderBottomColor='orange'
                type="file"
                multiple
                accept="application/pdf , image/png , .zip"
                onChange={onSelectFile}
                name="uplassign"
                isRequired
                disabled={submitted}
                width={'50%'} 
                mr={0} ml='auto'
                />

            </FormControl>

      
            
            <Button mx={4} onClick={()=>handleViewMarks(assignments._id)} type='button' colorScheme='orange' variant='outline'>
                View Marks
            </Button>

            <Button mx={4} type='button'
            onClick={()=>onOpen(handleSubmitAssign(assignments._id))}
            colorScheme='orange' variant='solid'>
                Submit
            </Button>
            

            

            <Button mx={4} onClick={Back} type='button' colorScheme='orange' variant='outline'>
                Back
            </Button>



            <AlertDialog
  isOpen={isOpen}
  leastDestructiveRef={cancelRef}
  onClose={onClose}
>
  <AlertDialogOverlay>
    <AlertDialogContent>
      <AlertDialogHeader fontSize='lg' fontWeight='bold'>
        Submit
      </AlertDialogHeader>

      <AlertDialogBody>
        Are you sure? You can't undo this action afterwards.
      </AlertDialogBody>

      <AlertDialogFooter>
        <Button ref={cancelRef} onClick={onClose}>
          Cancel
        </Button>
        <Button
          colorScheme='orange'
          onClick={(e) => {
            //SetDeleteTeacherId();
            SubmitAssignment(e);
            onClose();
          }}
          ml={3}
        >
          Turn in
        </Button>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialogOverlay>
</AlertDialog>


          </form>
          <StatusAlert/>
          
          
          
    </Box>
    

  );
}

export default StudentSingleViewAssignment;