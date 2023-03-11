import { Grid,Select, Box, FormControl, FormLabel, Input, Text, FormErrorMessage, Button, Heading, Flex } from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Viewer } from 'react-doc-viewer';
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react'

function TeacherEditAssignment () 
{
    const [submitStatus, setSubmitStatus] = useState(0);
  const [userID , setUserID] = useState("");
  const [campname , setCampName] = useState([]);

  const [assignmentCamp , setAssignmentCamp] = useState("");

  const [selectedCamp , setSelectedCamp] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tmarks, setTMarks] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [duedate, setDueDate] = useState(new Date());
  const [uplassign , setUplAssign] = useState([])
  const [ uploadeddate, setUploadedDate] = useState(new Date())
  const [pdf, setPdf] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [teacher , setTeacher] = useState("");
  
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selected , setSelected] = useState([])
  var imgURLsArray = []


  const onSelectFile = (e) => {
    const selectedImages = [...e.target.files];
    selectedImages.map(img=> imgURLsArray.push(URL.createObjectURL(img)))
     setSelected(imgURLsArray)
     setSelectedFiles(e.target.files)
  
  };

  // const onSelectFile = (e) => {
  //   const selectedImages = [...e.target.files];
  //   imgURLsArray = [];
  //   selectedImages.forEach((img) => {
  //     imgURLsArray.push(URL.createObjectURL(img));
  //   });
  //   setSelected(imgURLsArray);
  //   setSelectedFiles(e.target.files);
  // };
  

  const getCurentUser = () =>
  {
    let logintoken = localStorage.getItem("logintoken")
    axios.defaults.headers.common["Authorization"] = `Bearer ${logintoken}`;
    axios.get("http://localhost:5000/teacher/viewprofile")
      .then(res=> {
             localStorage.setItem('userID',userID)
              setUserID(res.data._id);
              setTeacher(res.data.name);
      }).catch (err=> {
          console.log(err) })
  }


  const getCurrentCampName = () =>
  {
    
    axios.get(`http://localhost:5000/camp/getcampteacher/${localStorage.getItem('userID')}`)
    .then((res) =>
    {
      console.log(res.data)
      setCampName(res.data);

    }).catch(err =>
      {
        //console.log(err);
      })
  }


  const getCurrentAssignment =() =>
  {
    axios.get(`http://localhost:5000/tchassignments/singletchassign/${localStorage.getItem('assignment_editid')}`)
    .then((res)=>
    {
        console.log(res.data)
        setAssignmentCamp(res.data.campname)
        setTitle(res.data.title)
        setDescription(res.data.description)
        setTMarks(res.data.tmarks)
        setUploadedDate(res.data.uploadeddate)
        setDueDate(res.data.duedate)
        setUplAssign(res.data.uplassign)
        //setCampName(res.data.campname)
    }).catch((err)=>
    {

    })

  }

  useEffect(()=>
  {
    getCurentUser();
    getCurrentCampName();
    getCurrentAssignment()
  },[campname])

  const EditAssignment = async(e) => {
    e.preventDefault();
    const formData = new FormData();
    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append(`uplassign`, selectedFiles[i]);
    }
    axios.put(`http://localhost:5000/tchassignments/updatetchassigns/${localStorage.getItem('assignment_editid')}`,
    {
    campname: assignmentCamp,
    title:title,
    description:description,
    tmarks:tmarks,
    uploadeddate:uploadeddate,
    duedate:duedate
  })
      .then((res) => {
        setSubmitStatus(1);
      }).catch((err) => {
        setSubmitStatus(-1);
      });
  };

  const StatusAlert = () => {
    if (submitStatus === -1)
      return (
        <Alert status='error'>
        <AlertIcon />
       Assignment was not edited!
      </Alert>
      );
    if (submitStatus === 1)
      return (
        <Alert status='success'>
        <AlertIcon />
        Assignment was edited!
      </Alert>
      );
  };

 

  





    return (
        <Box pt={0} px={0} mx='auto' textAlign={'center'} width={'100%'} backgroundColor='gray.100' borderRadius={30} flexDirection='row'>

     

    <Box pt={4} pb={2} mt={4} >
      <Heading mb={4} >
       Edit Assignment
      </Heading>
    </Box>

     {error && <Text color="red.500">{error}</Text>}
     {success && <Text color="green.500">{success}</Text>}

    <form onSubmit={EditAssignment}>
    <Box p={5} maxW={selectedFiles.length ? "4xl" : 'lg'} mx="auto" gap={4} textAlign={'start'}  position={'relative'} display={'flex'} flexDirection='row'>
      <Box border={'1px solid orange'} borderRadius='20px' p={4} >
        
          <FormControl mb={2} display={'flex'} alignItems='center'>
            <FormLabel htmlFor="camp" fontWeight="bold" color="orange.500" mr={2}>Camp Name</FormLabel>

            <Select
              textAlign={'center'}
              focusBorderColor='orange.700' 
              variant={'flushed'} 
              borderBottomColor='orange'
              isRequired
              width={'60%'} 
              mr={0} ml='auto'
              id='camp' name='camp'
            //   value={campname}
            value={assignmentCamp}
            defaultValue={assignmentCamp}
              onChange={e => setAssignmentCamp(e.target.value)}
              >

              <option value="" disabled>
                  Select
              </option>

                 {Array.isArray(campname) && campname.map((campname) => (  
                
                <option value={campname}>{campname}</option>

                ))}  

            </Select> 
          </FormControl>

          <FormControl mb={2} display={'flex'} alignItems='center'>
            <FormLabel htmlFor="title" fontWeight="bold" color="orange.500" mr={2}>Title</FormLabel>
            <Input
              id="title"
              name="title"
              textAlign={'center'}
              focusBorderColor='orange.700' 
              variant={'flushed'} 
              borderBottomColor='orange'
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              defaultValue={title}
              isRequired
              width={'60%'} 
              mr={0} ml='auto'
              />
          </FormControl>
          
          <FormControl mb={2} display={'flex'} alignItems='center'>
            <FormLabel htmlFor="description" fontWeight="bold" color="orange.500" mr={2}>Description</FormLabel>
            <Input
            id="description"
            name="description"
            textAlign={'center'}
            focusBorderColor='orange.700' 
            variant={'flushed'} 
            borderBottomColor='orange'
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            defaultValue = {description}
            isRequired
            width={'60%'} 
            mr={0} ml='auto'
            />
          </FormControl>

          <FormControl mb={2} display={'flex'} alignItems='center'>
            <FormLabel htmlFor="marks" fontWeight="bold" color="orange.500" mr={2}>Marks</FormLabel>
            <Input
            id="marks"
            name="marks"
            type="number"
            textAlign={'center'}
            focusBorderColor='orange.700' 
            variant={'flushed'} 
            borderBottomColor='orange'
            onChange={(e) => setTMarks(e.target.value)}
            value={tmarks}
            defaultValue = {tmarks}
            isRequired
            width={'60%'} 
            mr={0} ml='auto'
            />
        </FormControl>
        <FormControl mb={2} display={'flex'} alignItems='center'>
          <FormLabel htmlFor="dueDate" fontWeight="bold" color="orange.500" mr={2}>Uploaded Date</FormLabel>
          <Input
          id="uploadeddate"
          name='uploadeddate'
          label="Date"
          type="date"
          textAlign={'center'}
          focusBorderColor='orange.700' 
          variant={'flushed'} 
          borderBottomColor='orange'
          value= {uploadeddate}
          defaultValue = {uploadeddate}
          onChange = {e=>setUploadedDate(e.target.value)}
          isRequired
          width={'60%'} 
          mr={0} ml='auto'
          />
        </FormControl>
        <FormControl mb={2} display={'flex'} alignItems='center'>
          <FormLabel htmlFor="dueDate" fontWeight="bold" color="orange.500" mr={2}>Due Date</FormLabel>
          <Input
          id="dueDate"
          name='dueDate'
          label="Date"
          type="date"
          textAlign={'center'}
          focusBorderColor='orange.700' 
          variant={'flushed'} 
          borderBottomColor='orange'
          value = {duedate}
          defaultValue = {duedate}
          onChange = {e=>setDueDate(e.target.value)}
          isRequired
          width={'60%'} 
          mr={0} ml='auto'
          />
        </FormControl>

        <FormControl mb={2} display={'flex'} alignItems='center'>
          <FormLabel htmlFor="pdf" fontWeight="bold" color="orange.500" mr={2} >PDF</FormLabel>
          <Input
          id='pdf'
          type="file"
          multiple
          textAlign={'center'}
          focusBorderColor='orange.700' 
          variant={'flushed'} 
          borderBottomColor='orange'
          accept="application/pdf , image/png"
          onChange={onSelectFile}
          name="uplassign"
          isRequired
          width={'60%'} 
          mr={0} ml='auto'
          />
        </FormControl>
      
    </Box>

        <Box width={'40%'} pt={4} pb={2} textAlign='center' display={selectedFiles.length ? '' : 'none'}>
          
        <Heading mb={4} size='md' >
          Files Preview
        </Heading>
        
        <Flex wrap="wrap" 
                overflowY="scroll" 
                height="200px" 
                border='1px solid orange'
                borderRadius='10px'
                gap={4} 
                justifyContent={'space-around'} 
                p={2}
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
            {
              selected.map((file, index) => {
                return (
                  //iframe
                  <iframe
                    //filePath={file}
                    src={file}
                    style={{
                      height: "80%",
                      width: "100%",
                      border: '1px solid orange',
                      class: "center",
                      mx: 'auto',
                      borderRadius: "10px",
                    }}
                  />
                );
              })}
            
          </Flex>
        </Box>
      </Box>
            
      <Button type='submit' colorScheme='orange' variant='solid'>
            Edit
      </Button>

      </form>
       <StatusAlert/>
    

  </Box>


    );
}

export default TeacherEditAssignment