import { Heading, Text, VStack, Flex, Container, SimpleGrid, GridItem,InputGroup, InputRightElement, FormControl, FormLabel, Input, Button, Image, color } from '@chakra-ui/react'
import React, {useContext,useEffect, useState} from 'react'
import LogInNavBar from '../components/LogInNavBar'
import useStore from '../store'
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react'

const StudentLogin = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');
const [showPassword , setShowPassword] = useState(false)
const [submitStatus , setSubmitStatus] = useState()


     const navigate = useNavigate();
    // const handleSubmit1 = () =>
    // {
    //         navigate("/vsignup");
    // }
    const LoginStudent = async(e) =>
    {

        e.preventDefault();
        try {
           const res=  await axios.post('http://localhost:5000/student/verifylogin', {
                email: email,
                password: password,
            });

            localStorage.setItem("ltoken",res.data);
            navigate("/student");
        } catch (error) {
          if (error.response && error.response.status === 401) {
              setSubmitStatus("Invalid Credentials");
            } else {
              // Handle other errors here
              console.error(error);
          }
      }
    }

    const StatusAlert = () => {
        
  
      if (submitStatus === "Invalid Credentials")
      return (
        <Alert status="error" variant="solid" h="7vh" >
          <AlertIcon />
          <AlertTitle  mr={6} statusBar="red">
      Invalid Credentials! 
    </AlertTitle>
        </Alert>
      );
  };
    const toggleShowPassword = () =>
        {
          setShowPassword(!showPassword)
        }

    

  return (
    
    <Container maxW="full" height="88vh" backgroundImage={'linear-gradient(to bottom, #fddb92 0%, #d1fdff 100%);'} >

        <Flex h={{base: "full", md: '88vh'}} 
            py={{base: '12px'}} 
            px={{base: '10px', md: "20px", lg:"140px"}} 
            align="center" justify="space-between" 
            direction={{base: 'column', md: 'row'}}>

            <VStack >
                <Heading w={'100%'} pb={4}>Student Login</Heading>
                <Text fontSize={"xl"}>Sign In to Learn Live</Text>
            </VStack>
          
            <Image src="SignIn.png" w={400} overflow="hidden" ml={{lg: '-80px' , md: '-80px'}} pl={{base: '60px', lg:'0px'} }/>

            <SimpleGrid p={10} width="34%" columns={2} columnGap={3} rowGap={6} textAlign="center" boxShadow="0px 2px 10px rgba(0, 0, 0, 0.5)" borderRadius={10} >
                    <GridItem colSpan={2} minW={40}>
                        <FormControl>
                            <Input
                            id='email'
                            name='email'
                            label='Email'
                            onChange={e=>setEmail(e.target.value)}
                            variant={'filled'} placeholder='Email'
                            required/>  
                        </FormControl>
                    </GridItem>

                    <GridItem colSpan={2} minW={40}>
  <FormControl mb={2}>
    <InputGroup>
      <Input
        onChange={e => setPassword(e.target.value)}
        id='password'
        name='password'
        label='Password'
        variant='filled'
        placeholder='Password'
        type={showPassword ? 'text' : 'password'}
        isRequired
      />
      <InputRightElement>
        <Button onClick={toggleShowPassword} colorScheme='orange' variant='ghost'>
          <i class='fa-sharp fa-solid fa-eye'></i>
        </Button>
      </InputRightElement>
    </InputGroup>
  </FormControl>
</GridItem>

                    <GridItem colSpan={2}>
                        <Button variant='solid' width="100%" colorScheme='brand1' onClick={LoginStudent}>Log In</Button>
                    </GridItem>

                    <GridItem colSpan={2} textAlign="center">
                        <StatusAlert/>
                    </GridItem>

                </SimpleGrid>
        </Flex>
    </Container>

  )
}

export default StudentLogin