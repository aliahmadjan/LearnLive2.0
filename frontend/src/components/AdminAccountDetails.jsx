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
    axios.get("https://marvelous-baklava-4f7cee.netlify.app/admin/viewprofile")
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
      
  })


  return (
    
    
    <Box pt={0} px={0} mx='auto' textAlign={'center'} width={'100%'} backgroundColor='gray.100' borderRadius={30}>
      <Box pt={4} pb={2}  >
        <Heading mb={4} >
          Account Details
        </Heading>
        <Text mb={6}>
          This page displays your account details and allows you to edit them.
        </Text>
      </Box>

      <Box p={5} maxW="lg" mx="auto" textAlign={'start'} position={'relative'}>

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

        </Box>

      </Box>
    </Box>

  )
}

export default AdminAccountDetails