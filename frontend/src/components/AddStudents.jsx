import React , {useState, useEffect} from 'react'
import { Box,Button, Heading, Text, Link ,FormControl,FormLabel, Input,RadioGroup,Radio,Stack, InputGroup, Image} from '@chakra-ui/react'
import axios from "axios"
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'

const AddStudents = () => {

  const [ userID , setUserID] = useState("");
  const [name, setName] = useState("");
  const [email , setEmail] = useState("");
  const [gender, setGender]= useState(null);
  const [phoneno , setPhoneNo]=useState("");
  const [password,setPassword]= useState("");
  const[cpassword, setConPassword]= useState("");
  const[profileimg, setProfileImg] = useState("");
  const [submitStatus, setSubmitStatus] = useState(0);
  const [msg,setMsg]=useState('');
  const [passwordError, setPasswordError] = useState('');
  const [campname , setCampname] = useState('');

  

  const [selectedFile, setSelectedFile] =useState(null);
  const [fileInputState, setFileInputState ] = useState("");
  const [previewSource , setPreviewSource] = useState("");
  const {
    isOpen: isVisible,
    onClose,
    onOpen,
  } = useDisclosure({ defaultIsOpen: true })
  const PostStudents = (e) => {
    e.preventDefault();
    if (password !== cpassword) {
      setSubmitStatus(-1)
    } else {
      // submit the form
      e.preventDefault();
    const url='http://localhost:5000/student/addstudent'
           const formData = new FormData()
           formData.append('name',name)
           formData.append('email',email)
           formData.append('gender',gender)
           formData.append('phoneno',phoneno)
           formData.append('password',password)
           formData.append('cpassword',cpassword)
           formData.append('profileimg',selectedFile)
           //formData.append('campname',campname)
           axios.post(url,formData).then ((res)=>
           {
            setSubmitStatus(1);
            //console.log(res.data)
           })
          
    }
  }
    
         const StatusAlert = () => {
          if (submitStatus === -1)
            return (
              <Alert status='error'>
              <AlertIcon />
             Student was not added!
            </Alert>
            );
          if (submitStatus === 1)
            return (
              <Alert status='success'>
              <AlertIcon />
              Student was added!
            </Alert>
            );
        };
  


  const handleFileInputChange =(e)=>
  {
      const file = e.target.files[0];
      previewFile(file);
      setSelectedFile(file);
      setFileInputState(e.target.value);
  };
  
  const previewFile = (file) =>
  {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend=()=>
      {
          setPreviewSource(reader.result);
      }
  }




  return (

    <Box p={2} m='auto' textAlign={'center'} width={'100%'} borderRadius={30}>

      <Box pt={4} pb={2}  >
        <Heading mb={4} >
          Add Student
        </Heading>
      </Box>

      <form onSubmit={PostStudents}>
      <Box p={5} width="60%" mx="auto" textAlign={'start'}>
        
        <Box boxShadow="0px 4px 8px rgba(0, 0, 0, 0.1)" borderRadius='15px' p={4} backgroundColor="#FFFFFF">
          
            <FormControl mb={2} display={'flex'} alignItems='center'>
              <FormLabel fontWeight="bold" color="#F57C00" mr={2}>Full Name</FormLabel>
                <Input
                  textAlign={'center'}
                  focusBorderColor='#F57C00' 
                  variant={'flushed'} 
                  borderBottomColor='orange' 
                  onChange={e=>setName(e.target.value)}
                  id='name' name='name' label='Name'
                  placeholder= "Student's Name"
                  isRequired
                  width={'60%'} 
                  mr={0} ml='auto'/>  
            </FormControl>

            <FormControl mb={2} display={'flex'} alignItems='center'>
              <FormLabel fontWeight="bold" color="#F57C00" mr={2}>Email</FormLabel>
              <Input
                textAlign={'center'}
                focusBorderColor='#F57C00' 
                variant={'flushed'} 
                borderBottomColor='orange' 
                onChange={e=>setEmail(e.target.value)}
                id='email' name='email' label='Email'
                placeholder= "student@mail.com"
                type='email'
                isRequired
                width={'60%'} 
                mr={0} ml='auto'/> 
            </FormControl>

            <FormControl mb={2} display={'flex'} alignItems='center'>
              <FormLabel fontWeight="bold" color="#F57C00" mr={2} width="40%">Gender</FormLabel>
              <RadioGroup onChange={setGender} value={gender} colorScheme='orange'
                id='gender' aria-label="gender" name="gender" mx='auto'>
                <Stack direction='row'>
                  <Radio isRequired value="male">Male</Radio>
                  <Radio value="female">Female</Radio>
                  <Radio value="other">Other</Radio>
                </Stack>
              </RadioGroup>

            </FormControl>

            <FormControl mb={2} display={'flex'} alignItems='center'>
              <FormLabel fontWeight="bold" color="#F57C00" mr={2}>Phone Number</FormLabel>
              <Input
                type='number'
                textAlign={'center'}
                focusBorderColor='#F57C00' 
                variant={'flushed'} 
                borderBottomColor='orange' 
                onChange={e=>setPhoneNo(e.target.value)}
                id='phoneno' name='phoneno' label='phoneno'
                placeholder= "03XX-XXXXXXXX"
                isRequired
                width={'60%'} 
                mr={0} ml='auto'/>  
            </FormControl>

            <FormControl mb={2} display={'flex'} alignItems='center'>
              <FormLabel fontWeight="bold" color="#F57C00" mr={2}>Password</FormLabel>
              <Input
                textAlign={'center'}
                focusBorderColor='#F57C00' 
                variant={'flushed'} 
                borderBottomColor='orange' 
                onChange={e=>setPassword(e.target.value)}
                placeholder="**************"
                id='password' name='password' label='password'
                type="password"
                isRequired
                width={'60%'} 
                mr={0} ml='auto'/>  
            </FormControl>

            <FormControl mb={2} display={'flex'} alignItems='center'>
              <FormLabel fontWeight="bold" color="#F57C00" mr={2}>Confirm Password</FormLabel>
              <Input
                textAlign={'center'}
                focusBorderColor='#F57C00' 
                variant={'flushed'} 
                borderBottomColor='orange' 
                onChange={e=>setConPassword(e.target.value)}
                placeholder="**************"
                id='cpassword' name='cpassword' label='cpassword'
                type="password"
                isRequired
                width={'60%'} 
                mr={0} ml='auto'/>  
            </FormControl>

            <FormControl mb={2} display={'flex'} alignItems='center'>
              <FormLabel fontWeight="bold" color="#F57C00" mr={2} width="40%">Picture</FormLabel>
              <Input 
                width={'40%'} 
                mx='auto'
                textAlign={'center'}
                focusBorderColor='#F57C00' 
                variant={'flushed'} 
                borderBottomColor='orange' 
                type="file"
                name="file"
                onChange={handleFileInputChange} 
                value={fileInputState}
                />
                {previewSource && (
                  <Image
                    src={previewSource}
                    alt="chosen"
                    height={100}
                    width={100}
                    mx="auto"
                    border='1px solid orange'
                    fit='contain'
                      />
                  )} 
            </FormControl>
                
          </Box>
        </Box>
              
        <Button mt={4} type='submit' colorScheme='orange' variant='solid'>
              Add Student
        </Button>

        </form>
    
        <StatusAlert />

  </Box>
  )
}

export default AddStudents