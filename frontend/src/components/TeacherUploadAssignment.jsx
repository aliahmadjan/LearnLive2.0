import { SimpleGrid, Card, Select, Box, FormControl, FormLabel, Input, Text, FormErrorMessage, Button, Heading, Flex, Textarea } from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import { useEffect, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Viewer } from 'react-doc-viewer';
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

//import DatePicker from "react-datepicker"
//import 'react-datepicker/dist/react-datepicker.css';
//import  DatePicker  from '@chakra-ui/react';

function TeacherUploadAssignment() {
  const [submitStatus, setSubmitStatus] = useState(0);
  const [userID , setUserID] = useState("");
  const [campname , setCampName] = useState([]);
  const [selectedCamp , setSelectedCamp] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tmarks, setTMarks] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [dueDate, setDueDate] = useState(new Date());
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
  const getCurentUser = () =>
  {
    let logintoken = localStorage.getItem("logintoken")
    axios.defaults.headers.common["Authorization"] = `Bearer ${logintoken}`;
    axios.get("http://localhost:5000/teacher/viewprofile")
      .then(res=> {
              setUserID(res.data._id);
              setTeacher(res.data.name);
      }).catch (err=> {
          console.log(err) })
  }


  const getCurrentCampName = (userID) =>
  {
    localStorage.setItem('userID',userID)
    //axios.get('http://localhost:5000/camp/getcampteacher/:'}).then(res =>
    axios.get(`http://localhost:5000/camp/getcampteacher/${localStorage.getItem('userID')}`).then(res =>
    {
      setCampName(res.data);

    }).catch(err =>
      {
        console.log(err);
      })
  }


  
  const UploadAssignment = (e) => {
    e.preventDefault();

    const url = "http://localhost:5000";
     const formData = new FormData();
     formData.append("campname" , selectedCamp)
     formData.append("title", title);
     formData.append("description", description);
     formData.append("tmarks", tmarks);
      formData.append("uploadeddate", uploadeddate)
      formData.append("duedate", dueDate);


       for (let i = 0; i < selectedFiles.length; i++) {
        formData.append(`uplassign`,selectedFiles[i]);
       }
       //localStorage.setItem('userID',userID)
       formData.append("teacher",userID)


    fetch('http://localhost:5000/tchassignments/uploadassigns', {
      method: 'POST',
      
      body: formData,
    
    })
      .then((res) =>     
      {
        setSubmitStatus(1)
        res.json()
        })
      .then((data) => console.log(data))
      .catch((err) => 
      {
        setSubmitStatus(-1)
        console.error(err)});
 
  };

  const StatusAlert = () => {
    if (submitStatus === -1)
      return (
        <Alert status='error'>
        <AlertIcon />
       Assignment was not uploaded!
      </Alert>
      );
    if (submitStatus === 1)
      return (
        <Alert status='success'>
        <AlertIcon />
        Assignment was uploaded!
      </Alert>
      );
  };

  useEffect(()=>
  {
    getCurentUser();
    getCurrentCampName(userID);
  })

// const getFileExtension = (filename) => {
//   return filename.split('.').pop();
// }
// const getFileName = (url) => {
//   const parts = url.split('/');
//   return parts[parts.length - 1];
// }


  return (

    <Box p={2} m='auto' textAlign={'center'} width={'100%'} borderRadius={30}>

      <Box pt={4} pb={2}>
        <Heading mb={4}>
          Upload Assignment
        </Heading>
      </Box>

      {error && <Text color="red.500">{error}</Text>}
      {success && <Text color="green.500">{success}</Text>}

      <form onSubmit={UploadAssignment}>
      <Flex pb={4} mx="auto" textAlign={'start'}>

        <Box display={'flex'} flexDirection='column' justifyContent={'space-between'}  maxHeight='70vh' width={selectedFiles.length ? '40%' : '50%'} m='auto'  boxShadow="0px 4px 8px rgba(0, 0, 0, 0.1)" borderRadius={10} p={4} backgroundColor="#FFFFFF">
          
          <FormControl mb={2} display={'flex'} alignItems='center'>
            <FormLabel htmlFor="camp" fontWeight="bold" color="#F57C00" mr={2}>Camp Name</FormLabel>

            <Select
              textAlign={'center'}
              focusBorderColor='#F57C00' 
              variant={'flushed'} 
              borderBottomColor='#F57C00'
              isRequired
              width={'60%'} 
              mr={0} ml='auto'
              id='camp' name='camp'
              value={selectedCamp}
              onChange={e => setSelectedCamp(e.target.value)}>

              <option value="" disabled>
                  Select
              </option>

                {Array.isArray(campname) && campname.map((campname) => (  
                
                <option value={campname}>{campname}</option>

                ))} 

            </Select> 
          </FormControl>

          <FormControl mb={2} display={'flex'} alignItems='center'>
            <FormLabel htmlFor="title" fontWeight="bold" color="#F57C00" mr={2}>Title</FormLabel>
            <Input
              id="title"
              name="title"
              placeholder="e.g. Assignment 1"
              textAlign={'center'}
              focusBorderColor='#F57C00' 
              variant={'flushed'} 
              borderBottomColor='#F57C00'
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              isRequired
              width={'60%'} 
              mr={0} ml='auto'
              />
          </FormControl>
          
          <FormControl mt={4} mb={2} display={'flex'}>
            <FormLabel htmlFor="description" fontWeight="bold" color="#F57C00" mr={2}>Description</FormLabel>
            <Textarea 
            id="description"
            name="description"
            placeholder="What is the assignment about? Write here."
            focusBorderColor='#F57C00'
            borderColor='#F57C00'
            variant='outline'
            resize={'none'}
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            isRequired
            width={'60%'} 
            mr={0} ml='auto'
            />
          </FormControl>

          <FormControl mb={2} display={'flex'} alignItems='center'>
            <FormLabel htmlFor="marks" fontWeight="bold" color="#F57C00" mr={2}>Marks</FormLabel>
            <Input
            id="marks"
            name="marks"
            type="number"
            placeholder='Max. marks'
            textAlign={'center'}
            focusBorderColor='#F57C00' 
            variant={'flushed'} 
            borderBottomColor='#F57C00'
            onChange={(e) => setTMarks(e.target.value)}
            value={tmarks}
            isRequired
            width={'60%'} 
            mr={0} ml='auto'
            />
          </FormControl>

          <FormControl mb={2} display={'flex'} alignItems='center'>
            <FormLabel htmlFor="dueDate" fontWeight="bold" color="#F57C00" mr={2}>Uploaded Date</FormLabel>
            <Input
            id="uploadeddate"
            name='uploadeddate'
            label="Date"
            type="date"
            textAlign={'center'}
            focusBorderColor='#F57C00' 
            variant={'flushed'} 
            borderBottomColor='#F57C00'
            onChange = {e=>setUploadedDate(e.target.value)}
            isRequired
            width={'60%'} 
            mr={0} ml='auto'
            />
          </FormControl>
          <FormControl mb={2} display={'flex'} alignItems='center'>
            <FormLabel htmlFor="dueDate" fontWeight="bold" color="#F57C00" mr={2}>Due Date</FormLabel>
            <Input
            id="dueDate"
            name='dueDate'
            label="Date"
            type="datetime-local"
            textAlign={'center'}
            focusBorderColor='#F57C00' 
            variant={'flushed'} 
            borderBottomColor='#F57C00'
            onChange = {e=>setDueDate(e.target.value)}
            isRequired
            width={'60%'} 
            mr={0} ml='auto'
            />
          </FormControl>

          <FormControl mb={2} display={'flex'} alignItems='center'>
            <FormLabel htmlFor="pdf" fontWeight="bold" color="#F57C00" width='40%' >PDF</FormLabel>
            <Input
            id='pdf'
            type="file"
            mx='auto'
            multiple
            textAlign={'center'}
            focusBorderColor='#F57C00' 
            variant={'flushed'} 
            borderBottomColor='#F57C00'
            accept="application/pdf , image/png , .zip"
            onChange={onSelectFile}
            name="uplassign"
            isRequired
            width={'40%'}
            />
          </FormControl>
        
        </Box>

        <Box width={'50%'} textAlign='center' display={selectedFiles.length ? '' : 'none'}>

          <Heading size='sm' >
            Files
          </Heading>

          <SimpleGrid
            p={2} 
            overflowY='scroll' 
            maxHeight={'12.5vh'} 
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
              
            {selected.map((file, index) => {
              const fileType = file.split('.').pop();
              const fileName = getFileName(file);

              return (
                <a href={file} target='_blank' rel='noopener noreferrer'>
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

          <Heading size='sm' >
            Files Preview
          </Heading>
        
          <Flex wrap="wrap" 
                maxHeight={'52vh'}
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
                selected.map((file, index) => {
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
              
      <Button type='submit' colorScheme='orange' variant='solid'>
        Upload
      </Button>

      </form>
      <StatusAlert/>
    
       <StatusAlert/>

       {/* <form onSubmit={createChannel}>
        <label>Enter Message</label>
        <input type="text" ref={messageRef} />
        <button type="submit">Enter</button>
       </form> */}
    

    </Box>

  );
}

export default TeacherUploadAssignment;