import { Grid,Select, Box, FormControl, FormLabel, Input, Text, FormErrorMessage, Button, Heading, Flex, Textarea } from "@chakra-ui/react";
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
      <Flex p={5} mx="auto" textAlign={'start'}>

        <Box width={selectedFiles.length ? '40%' : '50%'} m='auto'  boxShadow="0px 4px 8px rgba(0, 0, 0, 0.1)" borderRadius='15px' p={4} backgroundColor="#FFFFFF">
          
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
            type="date"
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
            accept="application/pdf , image/png"
            onChange={onSelectFile}
            name="uplassign"
            isRequired
            width={'40%'}
            />
          </FormControl>
        
        </Box>

        <Box width={'50%'} textAlign='center' display={selectedFiles.length ? '' : 'none'}>
          
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
              {
                selected.map((file, index) => {
                  return (
                    //iframe
                    <iframe
                      //filePath={file}
                      src={file}
                      style={{
                        height: '48vh',
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