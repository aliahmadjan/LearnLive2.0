import { Grid, Box,Button, Input, Text, Heading, Flex, FormControl, FormLabel} from "@chakra-ui/react";
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




const StudentSingleViewAssignment=()=>
 {
  const [ submitStatus , setSubmitStatus] = useState(0);
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
    
        .then((res) => 
          setSubmitStatus(1),
          setSubmitted(true),
        )
        .catch((err) => setSubmitStatus(-1));
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
   .then((res) => 
   setSubmitStatus(1),
   setSubmitted(true),
 )
 .catch((err) => setSubmitStatus(-1));
   }
    
  
  
}

const StatusAlert = () =>
  {
    if ( submitStatus === -1)
    return (
      <Alert status='error'>
      <AlertIcon />
     Assignment was not submitted!
    </Alert>
    );
    if (submitStatus === 1)
        return (
          <Alert status='success'>
          <AlertIcon />
          Assignment was submitted!
        </Alert>
        );
  };

useEffect(()=>
{
  //localStorage.setItem('submitted', submitted);
  
  getCurentUser();
  getTeacherAssignments();
},[uplassign])


    const Back = ()=>
    {
      navigate("/student/assignments");
    }

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


  return (

        <Box pt={0} px={0} mx='auto' textAlign={'center'} width={'100%'} backgroundColor='gray.100' borderRadius={30}>
        <Box pt={0} px={0} mx='auto' textAlign={'center'} width={'100%'} backgroundColor='gray.100' borderRadius={30}>
        <Box pt={4} pb={2} mt={4} >
            <Heading mb={2} >
              Assignment Details
            </Heading>
          </Box> 
       
        <Flex maxW='2xl' mx="auto" justifyContent={'center'} gap={4} p={1} > 
                  <Text>
                    Camp: <Text color={'orange.800'} display={'inline'}> {campname} </Text> 
                  </Text> 
                  <Text>
                    Marks : <Text color={'orange.800'} display={'inline'}> {tmarks} </Text> 
                  </Text>
                  <Text>
                    Uploaded Date : <Text color={'orange.800'} display={'inline'}> {formattedUploadDate} </Text> 
                  </Text>
                  <Text>
                    Due Date : <Text color={'orange.800'} display={'inline'}> {formattedDueDate} </Text> 
                  </Text>
                  
          </Flex> 

           <Flex maxW='2xl' mx="auto" justifyContent={'center'} pb={2} > 
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

      </Box>
  );
}

export default StudentSingleViewAssignment;