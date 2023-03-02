import React , {useState, useEffect} from 'react'
import { Box,Button, Avatar,Heading, Text, Link ,FormControl,FormLabel, Input,RadioGroup,Radio,Stack, InputGroup, IconButton, Flex} from '@chakra-ui/react'
import axios from "axios"
import { Divider } from '@chakra-ui/react'
import { useNavigate, useParams} from "react-router-dom";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react'


const EditTeacherDetails = (props) =>
{
    const [userID , setUserID] = useState();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [gender ,setGender] = useState("");
    const [phoneno , setPhoneNo] = useState("");
    const [password, setPassword]= useState("");
    const [profileimg , setProfileImg]= useState("");
    const [campname , setCampName] = useState("");
    const [teachers , setTeachers]= useState([]);
    const [submitStatus, setSubmitStatus] = useState(0);
    const [selectedFile, setSelectedFile] =useState(null);
    const [fileInputState, setFileInputState ] = useState("");
    const [previewSource , setPreviewSource] = useState("");
   
      const [msg, setMsg] = useState('');
  const navigate = useNavigate();
  //{params : {id: localStorage.getItem('teacherid')}})

    const getSingleUser = () =>
    {
      axios
        .get('https://learnlive.onrender.com/teacher/getteacher/:',{params : {id: localStorage.getItem('teacherid')}})
        .then((res) => {
          setName(res.data.name);
          setEmail(res.data.email);
          setGender(res.data.gender);
          setPhoneNo(res.data.phoneno);
          setPassword(res.data.password);
          setProfileImg(res.data.profileimg);
          setCampName(res.data.campname);
        })
        .catch((err) => {
          console.log(err);
        });
    }
   

     

  const EditTeachers = async(e) =>
  {
    e.preventDefault();
   // ${localStorage.getItem('teacherid')}
    //setName(name);
    axios.put(`https://learnlive.onrender.com/teacher/updateteacher/${localStorage.getItem('teacherid')}`,
    {
      name:name,
      email:email,
      gender:gender,
      phoneno:phoneno,
      password:password,
    
    }).then((res)=>
    {
      //console.log(category)
      submitStatus(1)
    }).catch((err)=>
      {
        submitStatus(-1)
      })
           
  }

  const StatusAlert = () => {
    if (submitStatus === -1)
      return (
        <Alert status='error'>
        <AlertIcon />
       Teacher was not updated!
      </Alert>
      );
    if (submitStatus === 1)
      return (
        <Alert status='success'>
        <AlertIcon />
       Teacher was updated!
      </Alert>
      );
  };

  const Back = ()=>
  {
    navigate("/admin/viewteachers");
  }

  useEffect(() =>{
    getSingleUser()
  }, [])
  //getSingleUser()

  return (

    <Box pt={0} px={0} mx='auto' textAlign={'center'} width={'100%'} backgroundColor='gray.100' borderRadius={30}>
    <Box pt={4} pb={2}  >
      <Heading mb={4} >
        Teacher Details
      </Heading>
      <Text mb={6}>
        This page displays account details.
      </Text>
    </Box>

    <Box p={5} maxW="lg" mx="auto" textAlign={'start'} position={'relative'}>

      <Box align="center" mb={4} mx='auto' px='auto' >
        <Avatar size='2xl' src={profileimg} />
      </Box>

      <form onSubmit={EditTeachers}>

        <Box border={'1px solid orange'} borderRadius='20px' p={4} >

          <FormControl mb={2} display={'flex'} alignItems='center'>
            <FormLabel fontWeight="bold" color="orange.500" mr={2}>
              Name:
            </FormLabel>
            <Input textAlign={'center'} 
                  focusBorderColor='orange.700' 
                  variant={'flushed'} 
                  borderBottomColor='orange' 
                  width={'60%'} 
                  mr={0} ml='auto' 
                  onChange={e=>setName(e.target.value)}
                  id='name' name='name' label='Name'
                  value={name}
                  defaultValue={name}
                  isRequired
            />
          </FormControl>


          <FormControl mb={2} display={'flex'} alignItems='center'>
            <FormLabel fontWeight="bold" color="orange.500" mr={2}>
              Email:
            </FormLabel>
            <Input textAlign={'center'} 
                  focusBorderColor='orange.700' 
                  variant={'flushed'} 
                  borderBottomColor='orange' 
                  width={'60%'} 
                  mr={0} ml='auto' 
                  onChange={e=>setEmail(e.target.value)}
                  id='email' name='email' label='Email'
                  value={email}
                  defaultValue={email}
                  type='email'
                  isRequired
            />
          </FormControl>

          <FormControl mb={2} display={'flex'} alignItems='center'>
            <FormLabel fontWeight="bold" color="orange.500" mr={2}>
              Phone No:
            </FormLabel>
            <Input value={phoneno} 
                  textAlign={'center'} 
                  focusBorderColor='orange.700' 
                  variant={'flushed'} 
                  borderBottomColor='orange' 
                  width={'60%'} 
                  mr={0} ml='auto'
                  onChange={e=>setPhoneNo(e.target.value)}
                    defaultValue={phoneno}
                    id='phoneno' name='phoneno' label='phoneno'
                    isRequired />
          </FormControl>

          <FormControl mb={2} display={'flex'} alignItems='center'>
            <FormLabel fontWeight="bold" color="orange.500" mr={2}>
              Password:
            </FormLabel>
            <Input
                  textAlign={'center'} 
                  focusBorderColor='orange.700' 
                  variant={'flushed'} 
                  borderBottomColor='orange' 
                  width={'60%'} 
                  mr={0} ml='auto'
                  onChange={e=>setPassword(e.target.value)}
                  value={password}
                  defaultValue={password}
                  id='password' name='password' label='password'
                  isRequired />
          </FormControl>

          <FormControl mb={2} display={'flex'} alignItems='center'>
            <FormLabel fontWeight="bold" color="orange.500" mr={2}>
              Gender:
            </FormLabel>

            <RadioGroup onChange={setGender} value={gender}
            defaultValue={gender}
            id='gender' aria-label="gender" name="gender"
            mr={2} ml='auto'>
            <Stack direction='row'>
              <Radio  value="male">Male</Radio>
              <Radio  value="female">Female</Radio>
              <Radio  value="other">Other</Radio>
            </Stack>
            </RadioGroup>

          </FormControl>
          <FormControl mb={2} display={'flex'} alignItems='center'>
            <FormLabel fontWeight="bold" color="orange.500" mr={2}>
            Campname:
            </FormLabel>
            <Input textAlign={'center'} 
                  focusBorderColor='orange.700' 
                  variant={'flushed'} 
                  borderBottomColor='orange' 
                  width={'60%'} 
                  mr={0} ml='auto' 
                  onChange={e=>setCampName(e.target.value)}
                  id='campname' name='campname' label='Campname'
                  value={campname}
                  defaultValue={campname}
                  
                  isRequired
            />
          </FormControl>
        </Box>

        <Flex mb={2} mt={2} justifyContent={'center'} gap={4}>
          <Button type='submit' colorScheme='orange' variant='solid' >
            Update Teacher
          </Button>
          
          <Button type='button' onClick={Back} colorScheme='orange' variant='solid' >
            Back 
          </Button>

        </Flex>

      </form>
      <StatusAlert/>
    </Box>
  </Box>

)};

export default EditTeacherDetails;