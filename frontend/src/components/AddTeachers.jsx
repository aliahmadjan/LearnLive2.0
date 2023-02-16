import React , {useState, useEffect} from 'react'
import { Box,Button, Select,Heading, Text, Link ,FormControl,FormLabel, Input,RadioGroup,Radio,Stack, Image, Flex} from '@chakra-ui/react'
import axios from "axios"
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'
import { Form } from 'react-router-dom'

const AddTeachers = () => {
  const [submitStatus, setSubmitStatus] = useState(0);
  const [ userID , setUserID] = useState("");
  const [name, setName] = useState("");
  const [email , setEmail] = useState("");
  const [gender, setGender]= useState(null);
  const [phoneno , setPhoneNo]=useState("");
  const [password,setPassword]= useState("");
  const[cpassword, setConPassword]= useState("");
  const[profileimg, setProfileImg] = useState("");
  const [campname , setCampName]= useState("");
  const [teachers , setTeachers] = useState([]);

  const [msg,setMsg]=useState('');

  const [selectedFile, setSelectedFile] =useState(null);
  const [fileInputState, setFileInputState ] = useState("");
  const [previewSource , setPreviewSource] = useState("");
  const {
    isOpen: isVisible,
    onClose,
    onOpen,
  } = useDisclosure({ defaultIsOpen: true })

  const PostTeachers =async (e) =>
  {
    e.preventDefault();
    const url='http://localhost:5000/teacher/addteacher'
           const formData = new FormData()
           formData.append('name',name)
           formData.append('email',email)
           formData.append('gender',gender)
           formData.append('phoneno',phoneno)
           formData.append('password',password)
           formData.append('cpassword',cpassword)
           formData.append('profileimg',selectedFile)
           axios.post(url,formData).then ((res)=>
           {
            setSubmitStatus(1);
            //console.log(res.data)
           })    
  }
  
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

  const StatusAlert = () => {
    if (submitStatus === -1)
      return (
        <Alert status='error'>
        <AlertIcon />
       Teacher was not added!
      </Alert>
      );
    if (submitStatus === 1)
      return (
        <Alert status='success'>
        <AlertIcon />
        Teacher was added!
      </Alert>
      );
  };

  return (
    <Box pt={0} px={0} mx='auto' textAlign={'center'} width={'100%'} backgroundColor='gray.100' borderRadius={30}>

      <Box pt={4} pb={2}  >
        <Heading mb={4} >
          Add Teacher
        </Heading>
        <Text mb={6}>
          Here you can Add a Teacher.
        </Text>
      </Box>

      <form onSubmit={PostTeachers}>
      <Box p={5} maxW="lg" mx="auto" textAlign={'start'} position={'relative'}>
        <Box border={'1px solid orange'} borderRadius='20px' p={4} >
          
            <FormControl mb={2} display={'flex'} alignItems='center'>
              <FormLabel fontWeight="bold" color="orange.500" mr={2}>Full Name</FormLabel>
                <Input
                  textAlign={'center'}
                  focusBorderColor='orange.700' 
                  variant={'flushed'} 
                  borderBottomColor='orange' 
                  onChange={e=>setName(e.target.value)}
                  id='name' name='name' label='Name'
                  placeholder= "Teacher's Name"
                  isRequired
                  width={'60%'} 
                  mr={0} ml='auto'/>  
            </FormControl>

            <FormControl mb={2} display={'flex'} alignItems='center'>
              <FormLabel fontWeight="bold" color="orange.500" mr={2}>Email</FormLabel>
              <Input
                textAlign={'center'}
                focusBorderColor='orange.700' 
                variant={'flushed'} 
                borderBottomColor='orange' 
                onChange={e=>setEmail(e.target.value)}
                id='email' name='email' label='Email'
                placeholder= "teacher@mail.com"
                type='email'
                isRequired
                width={'60%'} 
                mr={0} ml='auto'/> 
            </FormControl>

            <FormControl mb={2} display={'flex'} alignItems='center'>
              <FormLabel fontWeight="bold" color="orange.500" mr={2}>Gender</FormLabel>
              <RadioGroup onChange={setGender} value={gender}
                id='gender' aria-label="gender" name="gender" mr={2} ml='auto'>
                <Stack direction='row'>
                  <Radio isRequired value="male">Male</Radio>
                  <Radio value="female">Female</Radio>
                  <Radio  value="other">Other</Radio>
                </Stack>
              </RadioGroup>

            </FormControl>

            <FormControl mb={2} display={'flex'} alignItems='center'>
              <FormLabel fontWeight="bold" color="orange.500" mr={2}>Phone Number</FormLabel>
              <Input
                textAlign={'center'}
                focusBorderColor='orange.700' 
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
              <FormLabel fontWeight="bold" color="orange.500" mr={2}>Password</FormLabel>
              <Input
                textAlign={'center'}
                focusBorderColor='orange.700' 
                variant={'flushed'} 
                borderBottomColor='orange' 
                onChange={e=>setPassword(e.target.value)}
                id='password' name='password' label='password'
                type="password"
                isRequired
                width={'60%'} 
                mr={0} ml='auto'/>  
            </FormControl>

            <FormControl mb={2} display={'flex'} alignItems='center'>
              <FormLabel fontWeight="bold" color="orange.500" mr={2}>Confirm Password</FormLabel>
              <Input
                textAlign={'center'}
                focusBorderColor='orange.700' 
                variant={'flushed'} 
                borderBottomColor='orange' 
                onChange={e=>setConPassword(e.target.value)}
                id='cpassword' name='cpassword' label='cpassword'
                type="password"
                isRequired
                width={'60%'} 
                mr={0} ml='auto'/>  
            </FormControl>

            <FormControl mb={2} display={'flex'} alignItems='center'>
              <FormLabel fontWeight="bold" color="orange.500" mr={2}>Picture</FormLabel>
              <Input 
                width={'60%'} 
                mr={0} ml='auto'
                textAlign={'center'}
                focusBorderColor='orange.700' 
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
              
        <Button type='submit' colorScheme='orange' variant='solid'>
              Add Teacher
        </Button>

        </form>
         
      
        <StatusAlert />

    </Box>
    
  )
}

export default AddTeachers