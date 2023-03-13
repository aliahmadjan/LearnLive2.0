import React , {useState, useEffect} from 'react'
import { Box, Heading, Text, Flex, Avatar, Input, IconButton  } from '@chakra-ui/react'
import axios from "axios"
import theme from '../theme/theme'

const AdminAccountDetails = () => {

  const [ userID , setUserID] = useState("");
  const [name, setName] = useState("");
  const [email , setEmail] = useState("");
  const [gender, setGender]= useState("");
  const [phoneno , setPhoneNo]=useState("");

  const getCurentUser = () =>
  {
    let logintoken = localStorage.getItem("logtoken")
    axios.defaults.headers.common["Authorization"] = `Bearer ${logintoken}`;
    axios.get("http://localhost:5000/admin/viewprofile")
      .then(res=> {
        console.log(res.data);
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
      
  },[])


  return (
    
    
    <Box p={2} m='auto' textAlign={'center'} width={'100%'} borderRadius={30}>

      <Box pt={4} pb={2}  >
        <Heading mb={4} >
          Account Details
        </Heading>
      </Box>


      <Box p={5} width="40%" mx="auto" textAlign={'start'} position={'relative'}>

        <Box align="center" mb={4} mx='auto' px='auto' >
          <Avatar size='2xl' src={`https://avatars.dicebear.com/v2/bottts/${name}.svg?`} />
          <Heading mt={2} fontSize="xl" color="#F57C00">
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
            color='#F57C00'
            colorScheme={'orange'}
            size='lg'
  
          />
        </Box>

        <Box borderRadius='15px' p={4} backgroundColor="#FFFFFF" boxShadow="0px 4px 8px rgba(0, 0, 0, 0.1)">

          <Flex mb={2} align='center'>
            <Text fontWeight="bold" color="#F57C00" mr={2} >
              Email:
            </Text>
            <Input value={email} 
                   textAlign={'center'} 
                   focusBorderColor='#F57C00' 
                   variant={'flushed'} 
                   borderBottomColor='#F57C00' 
                   width={'60%'} 
                   mr={0} ml='auto' />
          </Flex>

          <Flex mb={2} align='center'>
            <Text fontWeight="bold" color="#F57C00" mr={2} >
              Gender:
            </Text>
            <Input value={gender} 
                   textAlign={'center'} 
                   focusBorderColor='#F57C00' 
                   variant={'flushed'} 
                   borderBottomColor='#F57C00' 
                   width={'60%'} 
                   mr={0} ml='auto' />
          </Flex>

          <Flex mb={2} align='center'>
            <Text fontWeight="bold" color="#F57C00" mr={2} >
              Phone No:
            </Text>
            <Input value={phoneno} 
                   textAlign={'center'} 
                   focusBorderColor='#F57C00' 
                   variant={'flushed'} 
                   borderBottomColor='#F57C00' 
                   width={'60%'} 
                   mr={0} ml='auto' />
          </Flex>

        </Box>

      </Box>
    </Box>

  )
}

export default AdminAccountDetails