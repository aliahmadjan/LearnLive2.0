import { Heading, Text, VStack, Flex, Container, SimpleGrid, GridItem, FormControl, FormLabel, Input, Button, Image, color } from '@chakra-ui/react'
import React, { useContext, useEffect, useState } from "react";
import LogInNavBar from '../components/LogInNavBar'
import useStore from '../store'
import { useNavigate} from "react-router-dom";
import axios from "axios"


const TeacherLogin = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');
    const [isLoggedin , setIsLoggedIn] = useState(false);

     const navigate = useNavigate();
    // const handleSubmit1 = () =>
    // {
    //         navigate("/vsignup");
    // }
    const LoginTeacher = async(e) =>
    {
        e.preventDefault();
        try {
           const res=  await axios.post('http://localhost:5000/teacher/verifylogin', {
                email: email,
                password: password,
            });

            localStorage.setItem("logintoken",res.data);
            setIsLoggedIn(true);
            navigate("/teacher");
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            }
        }
    }

  return (
    <Container maxW="full" p={0} bg='orange.100' >

        <Flex h={{base: "full", md: '90vh'}} 
            py={{base: '12'}} 
            px={{base: '10px', md: "20px", lg:"200px"}} 
            align="center" justify="space-between" 
            direction={{base: 'column', md: 'row'}}>

            <VStack >
                <Heading w={'100%'} pb={4}>Teacher Login</Heading>
                <Text fontSize={"xl"}>Sign In to Learn Live</Text>
            </VStack>
          
            <Image src="TeacherLogin3D.png" w={400} overflow="hidden" ml={{lg: '-80px' , md: '-80px'}} pl={{base: '60px', lg:'0px'} }/>

            <SimpleGrid pb={10} columns={2} columnGap={3} rowGap={6} textAlign="center">
                    <GridItem colSpan={2} minW={40}>
                        <FormControl>
                            <FormLabel>Username</FormLabel>
                            <Input
                            onChange={e => setEmail(e.target.value)} 
                            id='email'
                             name='email'
                              label='Email'
                            variant={'filled'}
                             placeholder='John'
                             required/>  
                        </FormControl>
                    </GridItem>

                    <GridItem colSpan={2} minW={40}>
                        <FormControl>
                            <FormLabel>Password</FormLabel>
                            <Input
                            onChange={e=>setPassword(e.target.value)}
                             id='password' name='password' label='Password'
                             variant='filled'
                             type='password'
                              required
                             />  
                        </FormControl>
                    </GridItem>

                    <GridItem colSpan={2} textAlign="end">
                        <Text fontSize={'xs'} color="gray">Forgot Password?</Text>
                    </GridItem>

                    <GridItem colSpan={1}>
                        <Button variant='ghost'>Sign Up</Button>
                    </GridItem>

                    <GridItem colSpan={1}>
                        <Button type ='submit' onClick={LoginTeacher}variant='solid' colorScheme='brand1'>Log In</Button>
                    </GridItem>

                </SimpleGrid>
        </Flex>
    </Container>
  )
}

export default TeacherLogin