import React , {useState, useEffect} from 'react'
import { Box,Button, Avatar,Heading, SimpleGrid,Text, Link ,FormControl,FormLabel, Input,RadioGroup,Radio,Stack, Flex} from '@chakra-ui/react'
import axios from "axios"
import { Divider } from '@chakra-ui/react'
import { useNavigate, useParams} from "react-router-dom";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react'


const EditStudentDetails = () =>
{
    const [userID , setUserID] = useState();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [ age , setAge] = useState();
    const [gender ,setGender] = useState("");
    const [city , setCity] = useState("")
    const [country, setCountry] = useState("")
    const [parents_profession , setParentsProfession] = useState("");
    const [frequency , setFrequency] = useState();
    const [differently_abled , setDifferentlyAbled] = useState();
    const [hours ,  setHours] = useState();
    const [grouped_hours , setGroupedHours] = useState();
    const [one_to_one , setOnetoOne] = useState();
    const [phoneno , setPhoneNo] = useState("");
    const [password, setPassword]= useState("");
    const [profileimg , setProfileImg]= useState("");
    const [students , setStudents]= useState([]);

    const [selectedFile, setSelectedFile] =useState(null);
    const [fileInputState, setFileInputState ] = useState("");
    const [previewSource , setPreviewSource] = useState("");

    const [submitStatus, setSubmitStatus] = useState("");
   
      const [msg, setMsg] = useState('');
  const navigate = useNavigate();
    const getSingleUser = ()=>
    {
      axios.get('http://localhost:5000/student/getstudent/:', {params : {id: localStorage.getItem('studentid')}})
      .then(res=> {
        setName(res.data.name);
        setEmail(res.data.email);
        setAge(res.data.age);
        setGender(res.data.gender);
        setPhoneNo(res.data.phoneno);
        setParentsProfession(res.data.parents_profession)
        setCity(res.data.city);
        setCountry(res.data.country);
        setFrequency(res.data.frequency);
        setDifferentlyAbled(res.data.differently_abled);
        setHours(res.data.hours);
        setGroupedHours(res.data.grouped_hours);
        setOnetoOne(res.data.one_to_one);
        setPassword(res.data.password);
        setProfileImg(res.data.profileimg)
        }).catch (err=> {
    console.log(err) })
    }

  const EditStudents = async(e) =>
  {
   
    e.preventDefault();
    //setName(name);
    axios.put(`http://localhost:5000/student/updatestudent/${localStorage.getItem('studentid')}`,
    {
      name:name,
      email:email,
      age:age,
      gender:gender,
      phoneno:phoneno,
      parents_profession: parents_profession,
      city: city,
      country:country,
      frequency : frequency,
      differently_abled: differently_abled,
      hours: hours,
      grouped_hours: grouped_hours,
      one_to_one : one_to_one,
      password:password,
      fileInputState:fileInputState,
    
    }).then((res)=>
    {
      // //console.log(category)
      // window.alert("EditSuccesFUll")
      setSubmitStatus(1)
    }).catch((err)=>
      {
        // window.alert("EditNOTSuccesFUll")
        setSubmitStatus(-1)
      })
           
  }

  const Back = ()=>
  {
    navigate("/admin/viewstudents");
  }

  const StatusAlert = () => {
    if (submitStatus === -1)
      return (
        <Alert status='error'>
        <AlertIcon />
       Student Not Updated!
      </Alert>
      );
    if (submitStatus === 1)
      return (
        <Alert status='success'>
        <AlertIcon />
        Student was updated!
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

  useEffect(() =>{
    getSingleUser()
  }, [])
  
  return (

    <Box p={2} m='auto' textAlign={'center'} width={'100%'} borderRadius={30}>

    <Box pt={4} pb={2}  >
      <Heading mb={4} >
        Student Details
      </Heading>
    </Box>

    <Box p={5} width="60%" mx="auto" textAlign={'start'} position={'relative'}>

      <Box align="center" mb={4} mx='auto' px='auto' >
        <Avatar name={name} size='2xl' src={profileimg} />
      </Box>


      <form onSubmit={EditStudents}>
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
        <Box boxShadow="0px 4px 8px rgba(0, 0, 0, 0.1)" borderRadius='15px' p={4} backgroundColor="#FFFFFF" >

          
      

          <FormControl mb={2} display={'flex'} alignItems='center'>
            <FormLabel fontWeight="bold" color="#F57C00" mr={2}>
              Name:
            </FormLabel>
            <Input textAlign={'center'} 
                  focusBorderColor='#F57C00' 
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
            <FormLabel fontWeight="bold" color="#F57C00" mr={2}>
              Email:
            </FormLabel>
            <Input textAlign={'center'} 
                  focusBorderColor='#F57C00' 
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
            <FormLabel fontWeight="bold" color="#F57C00" mr={2}>
              Age:
            </FormLabel>
            <Input textAlign={'center'} 
                  focusBorderColor='#F57C00' 
                  variant={'flushed'} 
                  borderBottomColor='orange' 
                  width={'60%'} 
                  mr={0} ml='auto' 
                  onChange={e=>setAge(e.target.value)}
                  id='age' name='age' label='Age'
                  value={age}
                  defaultValue={age}
                  type='number'
                  isRequired
            />
          </FormControl>

          <FormControl mb={2} display={'flex'} alignItems='center'>
            <FormLabel fontWeight="bold" color="#F57C00" mr={2}>
              Phone No:
            </FormLabel>
            <Input value={phoneno} 
                  textAlign={'center'} 
                  focusBorderColor='#F57C00' 
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
            <FormLabel fontWeight="bold" color="#F57C00" mr={2} width="40%">
              Gender:
            </FormLabel>

            <RadioGroup onChange={setGender} value={gender}
            defaultValue={gender}
            colorScheme='orange'
            id='gender' aria-label="gender" name="gender"
            mx='auto'>
            <Stack direction='row'>
              <Radio  value="male">Male</Radio>
              <Radio  value="female">Female</Radio>
              <Radio  value="other">Other</Radio>
            </Stack>
            </RadioGroup>

          </FormControl>

          <FormControl mb={2} display={'flex'} alignItems='center'>
            <FormLabel fontWeight="bold" color="#F57C00" mr={2}>
              Parent's Profession
            </FormLabel>
            <Input textAlign={'center'} 
                  focusBorderColor='#F57C00' 
                  variant={'flushed'} 
                  borderBottomColor='orange' 
                  width={'60%'} 
                  mr={0} ml='auto' 
                  onChange={e=>setParentsProfession(e.target.value)}
                  id='parentsprof' name='parentsprof' label='ParentsProf'
                  value={parents_profession}
                  defaultValue={parents_profession}
                  
              
            />
          </FormControl>

          <FormControl mb={2} display={'flex'} alignItems='center'>
            <FormLabel fontWeight="bold" color="#F57C00" mr={2}>
              City
            </FormLabel>
            <Input
                  textAlign={'center'} 
                  focusBorderColor='#F57C00' 
                  variant={'flushed'} 
                  borderBottomColor='orange' 
                  width={'60%'} 
                  mr={0} ml='auto'
                  onChange={e=>setCity(e.target.value)}
                  value={city}
                  defaultValue={city}
                  id='city' name='city' label='City'
                  isRequired />
          </FormControl>

          <FormControl mb={2} display={'flex'} alignItems='center'>
            <FormLabel fontWeight="bold" color="#F57C00" mr={2}>
              Country
            </FormLabel>
            <Input textAlign={'center'} 
                  focusBorderColor='#F57C00' 
                  variant={'flushed'} 
                  borderBottomColor='orange' 
                  width={'60%'} 
                  mr={0} ml='auto' 
                  onChange={e=>setCountry(e.target.value)}
                  id='country' name='country' label='Country'
                  value={country}
                  defaultValue={country}
                  
                  isRequired
            />
          </FormControl>

          <FormControl mb={2} display={'flex'} alignItems='center'>
            <FormLabel fontWeight="bold" color="#F57C00" mr={2}>
              Frequency:
            </FormLabel>
            <Input textAlign={'center'} 
                  focusBorderColor='#F57C00' 
                  variant={'flushed'} 
                  borderBottomColor='orange' 
                  width={'60%'} 
                  mr={0} ml='auto' 
                  onChange={e=>setFrequency(e.target.value)}
                  id='frequency' name='frequency' label='Frequency'
                  value={frequency}
                  defaultValue={frequency}
                  type='number'
                  isRequired
            />
          </FormControl>

          <FormControl mb={2} display={'flex'} alignItems='center'>
            <FormLabel fontWeight="bold" color="#F57C00" mr={2}>
              Differently Abled:
            </FormLabel>
            <Input textAlign={'center'} 
                  focusBorderColor='#F57C00' 
                  variant={'flushed'} 
                  borderBottomColor='orange' 
                  width={'60%'} 
                  mr={0} ml='auto' 
                  onChange={e=>setDifferentlyAbled(e.target.value)}
                  id='differentlyabled' name='differentlyabled' label='differentlyabled'
                  value={differently_abled}
                  defaultValue={differently_abled}
                  
                  isRequired
            />
          </FormControl>

          <FormControl mb={2} display={'flex'} alignItems='center'>
            <FormLabel fontWeight="bold" color="#F57C00" mr={2}>
              Hours:
            </FormLabel>
            <Input textAlign={'center'} 
                  focusBorderColor='#F57C00' 
                  variant={'flushed'} 
                  borderBottomColor='orange' 
                  width={'60%'} 
                  mr={0} ml='auto' 
                  onChange={e=>setHours(e.target.value)}
                  id='hours' name='hours' label='Hours'
                  value={hours}
                  defaultValue={hours}
                  type='number'
                  isRequired
            />
          </FormControl>

          <FormControl mb={2} display={'flex'} alignItems='center'>
            <FormLabel fontWeight="bold" color="#F57C00" mr={2}>
              Grouped Hours:
            </FormLabel>
            <Input textAlign={'center'} 
                  focusBorderColor='#F57C00' 
                  variant={'flushed'} 
                  borderBottomColor='orange' 
                  width={'60%'} 
                  mr={0} ml='auto' 
                  onChange={e=>setGroupedHours(e.target.value)}
                  id='groupedhours' name='groupedhours' label='GroupedHours'
                  value={grouped_hours}
                  defaultValue={grouped_hours}
                  type='number'
                  
            />
          </FormControl>

          <FormControl mb={2} display={'flex'} alignItems='center'>
            <FormLabel fontWeight="bold" color="#F57C00" mr={2}>
              1-1:
            </FormLabel>
            <Input textAlign={'center'} 
                  focusBorderColor='#F57C00' 
                  variant={'flushed'} 
                  borderBottomColor='orange' 
                  width={'60%'} 
                  mr={0} ml='auto' 
                  onChange={e=>setOnetoOne(e.target.value)}
                  id='onetoone' name='onetoone' label='OnetoOne'
                  value={one_to_one}
                  defaultValue={one_to_one}
                  type='number'
                  isRequired
            />
          </FormControl>
          
          
        
          
        </Box>
        </SimpleGrid>
        <Flex mb={2} mt={4} justifyContent={'center'} gap={4}>
          <Button type='submit' colorScheme='orange' variant='solid' >
            Update Student
          </Button>
          
          <Button type='button' onClick={Back} colorScheme='orange' variant='solid' >
            Back 
          </Button>

        </Flex>

      </form>
      
      
      <StatusAlert/>
      
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