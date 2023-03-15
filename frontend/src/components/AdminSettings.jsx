import { Grid,Select, Box, FormControl, FormLabel, Input, Text, FormErrorMessage, Button, Heading } from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'

function AdminSettings() {
  const [userID , setUserID] = useState("");
  const [password , setPassword] = useState("");
  const [cpassword , setCPassword] = useState("");
  const [submitStatus, setSubmitStatus] = useState(0);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);
  
  const getCurentUser = () =>
  {
    let logintoken = localStorage.getItem("logtoken")
    axios.defaults.headers.common["Authorization"] = `Bearer ${logintoken}`;
    axios.get("http://localhost:5000/admin/viewprofile")
      .then(res=> {
              setUserID(res.data._id);
      }).catch (err=> {
          console.log(err) })
  }

  const UpdatePassword = (e) => {
    e.preventDefault();

    if(password != cpassword)
    {
      setSubmitStatus(-1)
    }
    else{
    axios.put(`http://localhost:5000/admin/updateadmin/${userID}` ,
    {
      password:password,
      cpassword: cpassword,

    }).then(res =>
        {
          setSubmitStatus(1);
            //console.log(res);
        }).catch (err =>
            {
              setSubmitStatus(-1);
                //console.log(err);
            })

          }
        }

        const toggleShowPassword = () => {
          setShowPassword(!showPassword);
        };
      
        const toggleShowCPassword = () => {
          setShowCPassword(!showCPassword);
        };

    // const parsedDueDate = new Date(dueDate);
    //  // Formatting the parsed date and time in the same format as the uploadDate state variable
    //  const formattedDueDate = new Intl.DateTimeFormat('en-US', {
    //   year: 'numeric',
    //   month: '2-digit',
    //   day: '2-digit',
    //   hour: '2-digit',
    //   minute: '2-digit',
    //   second: '2-digit'
    //   }).format(parsedDueDate);
  

  // };

  useEffect(()=>
  {
    getCurentUser();
  },[])

  const StatusAlert = () => {
    if (submitStatus === -1)
      return (
        <Alert status='error'>
        <AlertIcon />
       Passwords do not match!
      </Alert>
      );
    if (submitStatus === 1)
      return (
        <Alert status='success'>
        <AlertIcon />
        Password was updated!
      </Alert>
      );
  };




  return (

    <Box p={2} m='auto' textAlign={'center'} width={'100%'} borderRadius={30}>

      <Box pt={4} pb={2}  >
        <Heading mb={4} >
          Change Password
        </Heading>
      </Box>

      <form onSubmit={UpdatePassword}>
        <Box p={5} maxW="lg" mx="auto" textAlign={'start'} position={'relative'}>
            <Box boxShadow="0px 4px 8px rgba(0, 0, 0, 0.1)" borderRadius='15px' p={4} backgroundColor="#FFFFFF" >

            {error && <Text color="red.500">{error}</Text>}
            {success && <Text color="green.500">{success}</Text>}

            <FormControl mb={2} display={'flex'} alignItems='center'>
                <FormLabel htmlFor="campname" fontWeight="bold" color="orange.500" mr={2}>New Password</FormLabel>
                <Input
                textAlign={'center'}
                focusBorderColor='orange.700' 
                variant={'flushed'} 
                borderBottomColor='orange'
                id="password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                isRequired
                type={showPassword ? "text" : "password"}
                width={'60%'} 
                mr={0} ml='auto'/>
                <Button  onClick={toggleShowPassword} colorScheme='orange' variant='ghost'>
            {showPassword} <i class="fa-sharp fa-solid fa-eye"></i>
                </Button>
            </FormControl>

            <FormControl mb={2} display={'flex'} alignItems='center'>
                <FormLabel htmlFor="campname" fontWeight="bold" color="orange.500" mr={2}>Confirm Password</FormLabel>
                <Input
                textAlign={'center'}
                focusBorderColor='orange.700' 
                variant={'flushed'} 
                borderBottomColor='orange'
                id="cpassword"
                name="cpassword"
                onChange={(e) => setCPassword(e.target.value)}
                type={showCPassword ? "text" : "password"}
                isRequired
                width={'60%'} 
                mr={0} ml='auto'/>
                <Button  onClick={toggleShowCPassword} colorScheme='orange' variant='ghost'>
            {showCPassword} <i class="fa-sharp fa-solid fa-eye"></i>
                </Button>
            </FormControl>

            </Box>
        </Box>

        <Button mt={4} type='submit' colorScheme='orange' variant='solid'>
                Update Password
        </Button>

      </form>
      <StatusAlert/>
    </Box>

  )
}

export default AdminSettings;