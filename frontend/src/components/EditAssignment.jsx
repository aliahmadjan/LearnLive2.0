import { SimpleGrid, Card, Select, Box, FormControl, FormLabel, Input, Text, FormErrorMessage, Button, Heading, Flex } from "@chakra-ui/react";
import { useState , useRef} from "react";
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
import { useNavigate } from "react-router-dom";

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

  const navigate= useNavigate()
  
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selected , setSelected] = useState([])
  var imgURLsArray = []

  // Define a ref for the file input element
const fileInputRef = useRef(null);


  // const onSelectFile = (e) => {
  //   const selectedImages = [...e.target.files];
  //   selectedImages.map(img=> imgURLsArray.push(URL.createObjectURL(img)))
  //    setSelected(imgURLsArray)
  //    setSelectedFiles(e.target.files)
  
  // };
  const onSelectFile = (e) => {
    e.preventDefault();
    const selectedImages = [...e.target.files];
    const filenames = selectedImages.map(img => img.name);
    setSelectedFiles(selectedImages);
    setSelected(filenames);
    const imgURLsArray = [];
    selectedImages.forEach((img) => {
      //const file_name = getFileName(URL.createObjectURL(img))
      //console.log(file_name)
       const url = URL.createObjectURL(img);
      const reader = new FileReader();
      reader.onload = (e) => {
       // console.log(url)
        imgURLsArray.push(url)
        //const file_name = getFileName(im)
        //console.log(imgURLsArray)
        //imgURLsArray.push(e.target.result);
        setSelected(imgURLsArray);
      };
      reader.readAsDataURL(img);
    });
  };

  function getFileName(index) {
    try {
      return selectedFiles[index].name;
    } catch (err) {
      return 'Unknown File';
    }
  }

  function getFileExtension(index) {
    try {
      const fileName = selectedFiles[index].name;
      return fileName.substring(fileName.lastIndexOf('.') + 1).toLowerCase();
    } catch (err) {
    
      return 'Unknown File';
    }
  }

  

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
      //console.log(res.data)
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
        //console.log(res.data)
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

  const EditAssignment = async(e) => {
    e.preventDefault();
    const formData = new FormData();
    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append(`uplassign`, selectedFiles[i]);
    }
    formData.append('campname', assignmentCamp);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('tmarks', tmarks);
    formData.append('uploadeddate', uploadeddate);
    formData.append('duedate', duedate);
    
    try {
      const response = await axios.put(`http://localhost:5000/tchassignments/updatetchassigns/${localStorage.getItem('assignment_editid')}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
  
      // Update the uplassign array with the new file URLs
      // const updatedFileURLs = response.data.uplassign.map(file => URL.createObjectURL(file));
      // setUplAssign(updatedFileURLs);
  
      setSubmitStatus(1);
    } catch (err) {
      setSubmitStatus(-1);
    }
  };
  

  useEffect(()=>
  {
    getCurentUser();
    getCurrentCampName();
    getCurrentAssignment()
  },[campname])


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

  const handleBack = () =>
  {
    navigate('/teacher/viewassignments')
  }

 

  return (

    <Box p={2} m='auto' textAlign={'center'} width={'100%'} borderRadius={30}>

      <Box pt={4} pb={2}>
        <Heading mb={4}>
          Edit Assignment
        </Heading>
      </Box>

     {error && <Text color="red.500">{error}</Text>}
     {success && <Text color="green.500">{success}</Text>}

      <form onSubmit={EditAssignment}>
      <Flex pb={4} mx="auto" textAlign={'start'}>
        

        <Box display={'flex'} flexDirection='column' justifyContent={'space-between'}  maxHeight='70vh' width={uplassign.length ? '40%' : '50%'} m='auto'  boxShadow="0px 4px 8px rgba(0, 0, 0, 0.1)" borderRadius={10} p={4} backgroundColor="#FFFFFF">
          

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
            type="datetime-local"
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
            // ref={fileInputRef} // Set the ref of the file input element
            name="uplassign"
            isRequired
            width={'60%'} 
            mr={0} ml='auto'
            />
          </FormControl>
        </Box>


        <Box width={'50%'} textAlign='center' display={uplassign.length ? '' : 'none'}>
          
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
              
            {uplassign.map((file, index) => {
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
                maxHeight={'38vh'}
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
                        height: '36vh',
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
            Edit
      </Button>

      <Button onClick={handleBack} colorScheme='orange' variant='solid' style={{ marginLeft: '20px' }}
      >
            Back
      </Button>


      </form>

      <StatusAlert/>
    

    </Box>


    );
}

export default TeacherEditAssignment