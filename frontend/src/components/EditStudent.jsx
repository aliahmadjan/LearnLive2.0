import React , {useState, useEffect} from 'react'
import { Box,Button, Avatar,Heading, Text, Link ,FormControl,FormLabel, Input,RadioGroup,Radio,Stack, Flex} from '@chakra-ui/react'
import axios from "axios"
import { Divider } from '@chakra-ui/react'
import { useNavigate, useParams} from "react-router-dom";


const EditStudentDetails = () =>
{
    const [userID , setUserID] = useState();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [gender ,setGender] = useState("");
    const [phoneno , setPhoneNo] = useState("");
    const [password, setPassword]= useState("");
    const [profileimg , setProfileImg]= useState("");
    const [students , setStudents]= useState([]);

    const [selectedFile, setSelectedFile] =useState(null);
    const [fileInputState, setFileInputState ] = useState("");
    const [previewSource , setPreviewSource] = useState("");
   
      const [msg, setMsg] = useState('');
  const navigate = useNavigate();
    const getSingleUser = ()=>
    {
      axios.get('http://localhost:5000/student/getstudent/:', {params : {id: localStorage.getItem('studentid')}})
      .then(res=> {
        console.log(res.data)
        setName(res.data.name);
        setEmail(res.data.email);
        setGender(res.data.gender);
        setPhoneNo(res.data.phoneno);
        setPassword(res.data.password);
        setProfileImg(res.data.profileimg)
        }).catch (err=> {
    console.log(err) })
    }

  const EditStudents = async(e) =>
  {
   
    e.preventDefault();
    console.log(`id: ${localStorage.getItem('studentid')}`)
    //setName(name);
    axios.put(`http://localhost:5000/student/updatestudent/${localStorage.getItem('studentid')}`,
    {
      name:name,
      email:email,
      gender:gender,
      phoneno:phoneno,
      password:password,
      fileInputState:fileInputState,
    
    }).then((res)=>
    {
      //console.log(category)
      window.alert("EditSuccesFUll")
    }).catch((err)=>
      {
        window.alert("EditNOTSuccesFUll")
      })
           
  }

  const Back = ()=>
  {
    navigate("/admin/viewstudents");
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

  useEffect(() =>{
    getSingleUser()
  }, [])
  
  return (

    <Box pt={0} px={0} mx='auto' textAlign={'center'} width={'100%'} backgroundColor='gray.100' borderRadius={30}>
    <Box pt={4} pb={2}  >
      <Heading mb={4} >
        Student Details
      </Heading>
      <Text mb={6}>
        This page displays account details.
      </Text>
    </Box>

    <Box p={5} maxW="lg" mx="auto" textAlign={'start'} position={'relative'}>

      <Box align="center" mb={4} mx='auto' px='auto' >
        <Avatar size='2xl' src={profileimg} />
      </Box>

      <form onSubmit={EditStudents}>

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
        </Box>

        <Flex mb={2} mt={2} justifyContent={'center'} gap={4}>
          <Button type='submit' colorScheme='orange' variant='solid' >
            Update Student
          </Button>
          
          <Button type='button' onClick={Back} colorScheme='orange' variant='solid' >
            Back 
          </Button>

        </Flex>

      </form>
    </Box>
  </Box>

//           <div>

// <Box p={5}>
//       <Heading as="h2" size="lg">
//         Student Details
//       </Heading>
//       <Text mt={4}>    
//         Here you can edit student details.    
//       </Text>
      
//       <FormControl>
//            <FormLabel>Full Name</FormLabel>
//      <Input
//       onChange={e=>setName(e.target.value)}
//        id='name' name='name' label='Name'
//        defaultValue={name}
//        variant='filled'
//       inputProps = {
//         { readOnly: false,}
//         }
//         required
//         />  
//          </FormControl>
//          <FormControl>
//            <FormLabel>Email</FormLabel>
//      <Input
//       onChange={e=>setEmail(e.target.value)}
//        id='email' name='email' label='Email'
//       variant='filled'
//       defaultValue={email}
//       inputProps = {
//         { readOnly: false,}
//         }
//         required
//         />  
//          </FormControl>
//          <FormLabel>Gender</FormLabel>
//          <RadioGroup onChange={setGender} value={gender}
//           defaultValue={gender}
//          id='gender' aria-label="gender" name="gender">
//       <Stack direction='row'>
//         <Radio value="male">Male</Radio>
//         <Radio  value="femlae">Female</Radio>
//         <Radio  value="other">Other</Radio>
//       </Stack>
//     </RadioGroup>
//     <FormControl>
//            <FormLabel>Phone Number</FormLabel>
//      <Input
//       onChange={e=>setPhoneNo(e.target.value)}
//       defaultValue={phoneno}
//        id='phoneno' name='phoneno' label='phoneno'
//       variant='filled'
//         required
//         />  
//          </FormControl>
//          <FormControl>
//            <FormLabel>Password</FormLabel>
//      <Input
//       onChange={e=>setPassword(e.target.value)}
//       defaultValue={password}
//        id='password' name='password' label='password'
//       variant='filled'
//       type="password"
//         required
//         />  
//          </FormControl>    
//          {/* <input 
//         type="file"
//          name="file"
//          defaultValue={fileInputState}
//          onChange={handleFileInputChange} 
//         value={fileInputState}
//          />
//          {previewSource && (
//        <img
//           src={previewSource}
//           alt="chosen"
//              style={{height:"200px", width: "400px", class:"center", borderRadous:"50%"}}
//              />
//           )} */}
//           <Button  onClick={getSingleUser} colorScheme='teal' variant='solid'>
//    View Details 
//   </Button>
// <Button  onClick={EditStudents} colorScheme='teal' variant='solid'>
//    Update Teacher
//   </Button>
//   <Button  onClick={Back} colorScheme='teal' variant='solid'>
//    Back
//   </Button>

//     </Box>
//         </div>

          
         )
   };

export default EditStudentDetails;