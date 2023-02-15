import { Heading, Text, VStack, Flex, Container, SimpleGrid, GridItem, FormControl, FormLabel, Input, Button, Image, color } from '@chakra-ui/react'
import React, {useContext,useEffect, useState} from 'react'
import LogInNavBar from '../components/LogInNavBar'
import useStore from '../store'
import axios from "axios"
import { useNavigate } from 'react-router-dom'

const StudentLogin = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');

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
                <Heading w={'100%'} pb={4}>Student Login</Heading>
                <Text fontSize={"xl"}>Sign In to Learn Live</Text>
            </VStack>
          
            <Image src="StudentLogin.png" w={400} overflow="hidden" ml={{lg: '-80px' , md: '-80px'}} pl={{base: '60px', lg:'0px'} }/>

            <SimpleGrid pb={10} columns={2} columnGap={3} rowGap={6} textAlign="center">
                    <GridItem colSpan={2} minW={40}>
                        <FormControl>
                            <FormLabel>Username</FormLabel>
                            <Input
                            id='email'
                            name='email'
                            label='Email'
                            onChange={e=>setEmail(e.target.value)}
                            variant={'filled'} placeholder='John'
                            required/>  
                        </FormControl>
                    </GridItem>

                    <GridItem colSpan={2} minW={40}>
                        <FormControl>
                            <FormLabel>Password</FormLabel>
                            <Input 
                            id='password'
                            name='password'
                            label='password'
                            onChange={e=>setPassword(e.target.value)}
                            required
                            type='password'
                            variant={'filled'} />  
                        </FormControl>
                    </GridItem>

                    <GridItem colSpan={2} textAlign="end">
                        <Text fontSize={'xs'} color="gray">Forgot Password?</Text>
                    </GridItem>

                    <GridItem colSpan={1}>
                        <Button variant='ghost'>Sign Up</Button>
                    </GridItem>

                    <GridItem colSpan={1}>
                        <Button variant='solid' colorScheme='brand1' onClick={LoginStudent}>Log In</Button>
                    </GridItem>

                </SimpleGrid>
        </Flex>
    </Container>

  )
}

export default StudentLogin