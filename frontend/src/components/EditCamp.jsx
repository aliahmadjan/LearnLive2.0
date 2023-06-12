import React , {useState, useEffect} from 'react'
import { Box,Button, Avatar,Select,Heading, SimpleGrid,Text, Link ,FormControl,FormLabel, Input,RadioGroup,Radio,Stack, Flex} from '@chakra-ui/react'
import axios from "axios"
import { Divider } from '@chakra-ui/react'
import { useNavigate, useParams} from "react-router-dom";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react'


const EditCampDetails = () =>
{
    const [campname , setCampName] = useState("")
    const [camp_level , setCampLevel] = useState()
    const [startdate , setStartDate] = useState("")
    const [enddate , setEndDate] = useState("")
    const options = [1, 2, 3];


    const [submitStatus, setSubmitStatus] = useState("");
   
      const [msg, setMsg] = useState('');
  const navigate = useNavigate();
    const getSingleCamp = ()=>
    {
      axios.get('http://localhost:5000/camp/getcamp/:', {params : {id: localStorage.getItem('camp_editid')}})
      .then(res=> {
        setCampName(res.data.campname)
        setCampLevel(res.data.camp_level)
        setStartDate(res.data.startdate)
        setEndDate(res.data.enddate)
        }).catch (err=> {
    console.log(err) })
    }

  const EditCamps = async(e) =>
  {
   
    e.preventDefault();
    //setName(name);
    axios.put(`http://localhost:5000/camp/updatecamp/${localStorage.getItem('camp_editid')}`,
    {
      campname:campname,
      camp_level :camp_level,
      startdate : startdate,
      enddate: enddate,
    
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
    navigate("/admin/viewcamps");
  }

  const StatusAlert = () => {
    if (submitStatus === -1)
      return (
        <Alert status='error'>
        <AlertIcon />
       Camp Not Updated!
      </Alert>
      );
    if (submitStatus === 1)
      return (
        <Alert status='success'>
        <AlertIcon />
        Camp was updated!
      </Alert>
      );
  };

 

  useEffect(() =>{
    getSingleCamp()
  }, [])
  
  return (

    <Box p={2} m='auto' textAlign={'center'} width={'100%'} borderRadius={30}>

    <Box pt={4} pb={2}  >
      <Heading mb={4} >
        Camp Details
      </Heading>
    </Box>

    <Box p={5} width="60%" mx="auto" textAlign={'start'} position={'relative'}>

      

      <form onSubmit={EditCamps}>

        <Box boxShadow="0px 4px 8px rgba(0, 0, 0, 0.1)" borderRadius='15px' p={4} backgroundColor="#FFFFFF" >

          
      

          <FormControl mb={2} display={'flex'} alignItems='center'>
            <FormLabel fontWeight="bold" color="#F57C00" mr={2}>
              Camp name:
            </FormLabel>
            <Input textAlign={'center'} 
                  focusBorderColor='#F57C00' 
                  variant={'flushed'} 
                  borderBottomColor='orange' 
                  width={'60%'} 
                  mr={0} ml='auto' 
                  onChange={e=>setCampName(e.target.value)}
                  id='campname' name='campname' label='CampName'
                  value={campname}
                  defaultValue={campname}
                  isRequired
            />
          </FormControl>

{/* 
          <FormControl mb={2} display={'flex'} alignItems='center'>
            <FormLabel fontWeight="bold" color="#F57C00" mr={2}>
              Camp Level:
            </FormLabel>
            <Select
                textAlign={'center'}
                focusBorderColor='orange.700' 
                variant={'flushed'} 
                borderBottomColor='orange'
                isRequired
                width={'60%'} 
                mr={0} ml='auto'
                id='camplevel' name='camplevel'
              //   value={campname}
              value={camp_level}
              defaultValue={camp_level}
                onChange={e => setCampLevel(e.target.value)}
                >

                <option value="" disabled>
                    Select
                </option>

                {options.map((option) => (
                <option key={option} value={option}>
             {option} </option>
            ))}

              </Select> 
            
          </FormControl> */}

          <FormControl mb={2} display={'flex'} alignItems='center'>
            <FormLabel fontWeight="bold" color="#F57C00" mr={2}>
              Start Date:
            </FormLabel>
            <Input textAlign={'center'} 
                  focusBorderColor='#F57C00' 
                  variant={'flushed'} 
                  borderBottomColor='orange' 
                  width={'60%'} 
                  mr={0} ml='auto' 
                  onChange={e=>setStartDate(e.target.value)}
                  id='startdate' name='startdate' label='StartDate'
                  value={startdate}
                  defaultValue={startdate}
                  type="Date"
                  isRequired
            />
          </FormControl>

          <FormControl mb={2} display={'flex'} alignItems='center'>
            <FormLabel fontWeight="bold" color="#F57C00" mr={2}>
             End Date
            </FormLabel>
            <Input value={enddate} 
                  textAlign={'center'} 
                  focusBorderColor='#F57C00' 
                  variant={'flushed'} 
                  borderBottomColor='orange' 
                  width={'60%'} 
                  mr={0} ml='auto'
                  onChange={e=>setEndDate(e.target.value)}
                    defaultValue={enddate}
                    id='enddate' name='enddate' label='EndDate'
                    type="Date"
                    isRequired />
          </FormControl>

         
        
          
        
          
        </Box>

      
      <Flex mb={2} mt={4} justifyContent={'center'} gap={4}>
          <Button type='submit' colorScheme='orange' variant='solid' >
            Update Camp
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

export default EditCampDetails;