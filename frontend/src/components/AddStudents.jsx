import React , {useState, useEffect} from 'react'
import { Box,Button, Heading, Text, Link ,SimpleGrid,FormControl,FormLabel, Input,RadioGroup,Radio,Stack, InputGroup, Image} from '@chakra-ui/react'
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
  const [age , setAge] = useState("")
  const [gender, setGender]= useState(null);
  const [phoneno , setPhoneNo]=useState("");
  const [country , setCountry] = useState("");
  const [city , setCity] = useState("");
  const [parents_profession , setParentsProfession] = useState("")
  const [camp_level ,  setCampLevel] = useState([])
  const [ frequency , setFrequency] = useState()
  const  [differently_abled , setDifferentlyAbled] = useState("")
  const [hours , setHours] = useState();
  const [grouped_hours , setGroupedHours] = useState()
  const [ one_to_one , setOnetoOne] = useState();
  const [password,setPassword]= useState("");
  const[cpassword, setConPassword]= useState("");
  const[profileimg, setProfileImg] = useState("");
  const [submitStatus, setSubmitStatus] = useState(0);
  const [msg,setMsg]=useState('');
  const [passwordError, setPasswordError] = useState('');
  const [campname , setCampname] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);

  

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
           formData.append('age',age)
           formData.append('gender',gender)
           formData.append('phoneno',phoneno)
           formData.append('parents_profession', parents_profession)
           formData.append('city' , city)
           formData.append('country',country)
           //camp_level = camp_level.split(',').map(level => parseInt(level.trim()));
          
          //  formData.append('frequency' , frequency)
           formData.append('differently_abled' , differently_abled)
           formData.append('hours', hours)
           formData.append('grouped_hours' , grouped_hours)
           formData.append('one_to_one', one_to_one)
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
  
        const toggleShowPassword = () => {
          setShowPassword(!showPassword);
        };
      
        const toggleShowCPassword = () => {
          setShowCPassword(!showCPassword);
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

      <SimpleGrid 
            width={'90%'} 
            overflowY='scroll' 
            maxHeight={'46vh'} 
            mx='auto'
            minChildWidth='260px' 
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
              <FormLabel fontWeight="bold" color="#F57C00" mr={2}>Age</FormLabel>
              <Input
              type='number'
                textAlign={'center'}
                focusBorderColor='#F57C00' 
                variant={'flushed'} 
                borderBottomColor='orange' 
                onChange={e=>setAge(e.target.value)}
                id='age' name='age' label='age'
                placeholder= "10"
               
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
              <FormLabel fontWeight="bold" color="#F57C00" mr={2}>Parent's Profession</FormLabel>
              <Input
                
                textAlign={'center'}
                focusBorderColor='#F57C00' 
                variant={'flushed'} 
                borderBottomColor='orange' 
                onChange={e=>setParentsProfession(e.target.value)}
                id='parentsprof' name='parentsprof' label='parentsprof'
                placeholder= "Engineer"
                
                width={'60%'} 
                mr={0} ml='auto'/>  
            </FormControl>

            <FormControl mb={2} display={'flex'} alignItems='center'>
              <FormLabel fontWeight="bold" color="#F57C00" mr={2}>City</FormLabel>
              <Input
                textAlign={'center'}
                focusBorderColor='#F57C00' 
                variant={'flushed'} 
                borderBottomColor='orange' 
                onChange={e=>setCity(e.target.value)}
                id='city' name='city' label='City'
                placeholder= "Islamabad"
               
                
                width={'60%'} 
                mr={0} ml='auto'/> 
            </FormControl>

            <FormControl mb={2} display={'flex'} alignItems='center'>
              <FormLabel fontWeight="bold" color="#F57C00" mr={2}>Country</FormLabel>
              <Input
                textAlign={'center'}
                focusBorderColor='#F57C00' 
                variant={'flushed'} 
                borderBottomColor='orange' 
                onChange={e=>setCountry(e.target.value)}
                id='country' name='country' label='Country'
                placeholder= "Pakistan"
                
                isRequired
                width={'60%'} 
                mr={0} ml='auto'/> 
            </FormControl>

           

            {/* <FormControl mb={2} display={'flex'} alignItems='center'>
              <FormLabel fontWeight="bold" color="#F57C00" mr={2}>Frequency</FormLabel>
              <Input
                textAlign={'center'}
                focusBorderColor='#F57C00' 
                variant={'flushed'} 
                borderBottomColor='orange' 
                onChange={e=>setFrequency(e.target.value)}
                id='frequency' name='frequency' label='Frequency'
                placeholder= "2"
                
                isRequired
                width={'60%'} 
                mr={0} ml='auto'/> 
            </FormControl> */}

            <FormControl mb={2} display={'flex'} alignItems='center'>
              <FormLabel fontWeight="bold" color="#F57C00" mr={2}>Differently Abled</FormLabel>
              <Input
                textAlign={'center'}
                focusBorderColor='#F57C00' 
                variant={'flushed'} 
                borderBottomColor='orange' 
                onChange={e=>setDifferentlyAbled(e.target.value)}
                id='differentlyabled' name='differentlyabled' label='DifferentlyAbled'
                placeholder= "No"
                
                isRequired
                width={'60%'} 
                mr={0} ml='auto'/> 
            </FormControl>

            <FormControl mb={2} display={'flex'} alignItems='center'>
              <FormLabel fontWeight="bold" color="#F57C00" mr={2}>Hours</FormLabel>
              <Input
              type='number'
                textAlign={'center'}
                focusBorderColor='#F57C00' 
                variant={'flushed'} 
                borderBottomColor='orange' 
                onChange={e=>setHours(e.target.value)}
                id='hours' name='hours' label='Hours'
                placeholder= "40"
                
                isRequired
                width={'60%'} 
                mr={0} ml='auto'/> 
            </FormControl>

            <FormControl mb={2} display={'flex'} alignItems='center'>
              <FormLabel fontWeight="bold" color="#F57C00" mr={2}>Grouped Hours</FormLabel>
              <Input
              type='number'
                textAlign={'center'}
                focusBorderColor='#F57C00' 
                variant={'flushed'} 
                borderBottomColor='orange' 
                onChange={e=>setGroupedHours(e.target.value)}
                id='groupedhours' name='groupedhours' label='GroupedHours'
                placeholder= "48"
                
                
                width={'60%'} 
                mr={0} ml='auto'/> 
            </FormControl>

            <FormControl mb={2} display={'flex'} alignItems='center'>
              <FormLabel fontWeight="bold" color="#F57C00" mr={2}>1-1</FormLabel>
              <Input
              type='number'
                textAlign={'center'}
                focusBorderColor='#F57C00' 
                variant={'flushed'} 
                borderBottomColor='orange' 
                onChange={e=>setOnetoOne(e.target.value)}
                id='onetoone' name='onetoone' label='OnetoOne'
                placeholder= "1"
                
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
                type={showPassword ? "text" : "password"} 
                isRequired
                width={'60%'} 
                mr={0} ml='auto'/>  
                <Button  onClick={toggleShowPassword} colorScheme='orange' variant='ghost'>
            {showPassword} <i class="fa-sharp fa-solid fa-eye"></i>
                </Button>
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
                type={showCPassword ? "text" : "password"}
                isRequired
                width={'60%'} 
                mr={0} ml='auto'/>  
                 <Button  onClick={toggleShowCPassword} colorScheme='orange' variant='ghost'>
            {showCPassword} <i class="fa-sharp fa-solid fa-eye"></i>
                </Button>
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
              
        </SimpleGrid>
        <Button mt={4} type='submit' colorScheme='orange' variant='solid'>
              Add Student
        </Button>

        </form>
        
        
        

        <StatusAlert />
        
  </Box>
  
  )
}

export default AddStudents