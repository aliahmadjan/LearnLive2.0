import React , {useState, useEffect} from 'react'
import { Box, Button,Heading, Text, Link , Avatar, IconButton, Flex, Input} from '@chakra-ui/react'
import axios from "axios"

const StudentAccountDetails = () => {

  const [ userID , setUserID] = useState("");
  const [name, setName] = useState("");
  const [email , setEmail] = useState("");
  const [gender, setGender]= useState("");
  const [phoneno , setPhoneNo]=useState("");

  const [campname , setCampName]= useState([]);
  const [students, setStudents] = useState([]);
  const [camps , setCamps] = useState([]);
  

  const getCurrentCampName = (userID) =>
  {
    localStorage.setItem('userID',userID)
    //axios.get('http://localhost:5000/camp/getcampteacher/:',{params : {id:localStorage.getItem('userID')}}).then(res =>
    axios.get(`http://localhost:5000/camp/getcampstudent/${localStorage.getItem('userID')}`).then(res =>
    {
      setCampName(res.data);

    }).catch(err =>
      {
        console.log(err);
      })
  }
  
  const getCurentUser = () =>
  {
    let logintoken = localStorage.getItem("ltoken")
    axios.defaults.headers.common["Authorization"] = `Bearer ${logintoken}`;
    axios.get("http://localhost:5000/student/viewprofile")
      .then(res=> {
              setUserID(res.data._id);
              setName(res.data.name);
              setEmail(res.data.email);
              setGender(res.data.gender);
              setPhoneNo(res.data.phoneno);
      }).catch (err=> {
          console.log(err) })
  }

  

  useEffect(()=>
  {
      getCurentUser();
      getCurrentCampName(userID);
     
  })

 
  return (
    <Box pt={0} px={0} mx='auto' textAlign={'center'} width={'100%'} backgroundColor='gray.100' borderRadius={30}>
    <Box pt={4} pb={2} mt={4}  >
      <Heading mb={4} >
        Account Details
      </Heading>
    </Box>

    <Box p={5} pt={0} maxW="lg" mx="auto" textAlign={'start'} position={'relative'}>

      <Box align="center" mb={4} mx='auto' px='auto' >
        <Avatar size='2xl' src={`https://avatars.dicebear.com/v2/bottts/${name}.svg?`} />
        <Heading fontSize="xl" color="orange.500">
            {name}
        </Heading>

        {/* Add Implementation for Edit Account */}
        <IconButton
          position={'absolute'}
          top={8}
          right={8}
          variant='outline'
          aria-label="Edit account details"
          icon= {<i class="fa-sharp fa-solid fa-user-pen"></i>}
          color='orange'
          colorScheme={'orange'}
          size='lg'

        />
      </Box>

      <Box border={'1px solid orange'} borderRadius='20px' p={4} >

        <Flex mb={2} align='center'>
          <Text fontWeight="bold" color="orange.500" mr={2} >
          User ID:
          </Text>
          <Input value={userID} 
                 textAlign={'center'} 
                 focusBorderColor='orange.700' 
                 variant={'flushed'} 
                 borderBottomColor='orange' 
                 width={'60%'} 
                 mr={0} ml='auto' />
        </Flex>

        <Flex mb={2} align='center'>
          <Text fontWeight="bold" color="orange.500" mr={2} >
            Email:
          </Text>
          <Input value={email} 
                 textAlign={'center'} 
                 focusBorderColor='orange.700' 
                 variant={'flushed'} 
                 borderBottomColor='orange' 
                 width={'60%'} 
                 mr={0} ml='auto' />
        </Flex>

        <Flex mb={2} align='center'>
          <Text fontWeight="bold" color="orange.500" mr={2} >
            Gender:
          </Text>
          <Input value={gender} 
                 textAlign={'center'} 
                 focusBorderColor='orange.700' 
                 variant={'flushed'} 
                 borderBottomColor='orange' 
                 width={'60%'} 
                 mr={0} ml='auto' />
        </Flex>

        <Flex mb={2} align='center'>
          <Text fontWeight="bold" color="orange.500" mr={2} >
            Phone No:
          </Text>
          <Input value={phoneno} 
                 textAlign={'center'} 
                 focusBorderColor='orange.700' 
                 variant={'flushed'} 
                 borderBottomColor='orange' 
                 width={'60%'} 
                 mr={0} ml='auto' />
        </Flex>

        <Flex mb={2} mt={4} align='center'>
          <Text fontWeight="bold" color="orange.500" mr={2} >
            Camps:
          </Text>

          <Flex flexDirection={'column'} 
                overflowY="scroll" 
                height="100px" 
                textAlign={'center'} 
                width={'60%'} 
                border='1px solid orange'
                borderRadius='8px'
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
                }}
                mr={0} ml='auto' >

                {Array.isArray(campname) && campname.map((campname) => (             
                
                  <Text> {campname} </Text>
                  ))}

          </Flex>
          
        </Flex>

      </Box>

    </Box>
  </Box>
  )
}

export default StudentAccountDetails;