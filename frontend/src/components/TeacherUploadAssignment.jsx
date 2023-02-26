import { Grid,Select, Box, FormControl, FormLabel, Input, Text, FormErrorMessage, Button, Heading, Flex } from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Viewer } from 'react-doc-viewer';

//import DatePicker from "react-datepicker"
//import 'react-datepicker/dist/react-datepicker.css';
//import  DatePicker  from '@chakra-ui/react';

function TeacherUploadAssignment() {
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
    
     

    
    // const parsedDueDate = new Date(dueDate);
    //  // Formatting the parsed date and time in the same format as the uploadDate state variable
    //  const formattedDueDate = new Intl.DateTimeFormat('en-US', {
    //   year: 'numeric',
    //   month: '2-digit',
    //   day: '2-digit',
    //   hour: '2-digit',
    //   minute: '2-digit',
    //   second: '2-digit'
    //   }).format(parsedDueDate);
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
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.error(err));
 
  };

  useEffect(()=>
  {
    getCurentUser();
    getCurrentCampName(userID);
  })


  return (

    <Box pt={0} px={0} mx='auto' textAlign={'center'} width={'100%'} backgroundColor='gray.100' borderRadius={30} flexDirection='row'>

     

    <Box pt={4} pb={2} mt={4} >
      <Heading mb={4} >
        Upload Assignment
      </Heading>
    </Box>

     {error && <Text color="red.500">{error}</Text>}
     {success && <Text color="green.500">{success}</Text>}

    <form onSubmit={UploadAssignment}>
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
          onChange = {e=>setUploadedDate(e.target.value)}
          isRequired
          width={'60%'} 
          mr={0} ml='auto'
          />
        </FormControl>
        <FormControl mb={2} display={'flex'} alignItems='center'>
          <FormLabel htmlFor="dueDate" fontWeight="bold" color="orange.500" mr={2}>Due Date</FormLabel>
          {/* <DatePicker 
          textAlign={'center'}
          focusBorderColor='orange.700' 
          variant={'flushed'} 
          borderBottomColor='orange'
          selected={dueDate}
          onChange={setDueDate}
          isRequired
          width={'60%'} 
          mr={0} ml='auto'
           /> */}
          <Input
          id="dueDate"
          name='dueDate'
          label="Date"
          type="date"
          textAlign={'center'}
          focusBorderColor='orange.700' 
          variant={'flushed'} 
          borderBottomColor='orange'
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
          accept="application/pdf , image/png , .zip , 
          .docx"
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
            Upload
      </Button>

      </form>
       
    

  </Box>

  );
}

export default TeacherUploadAssignment;