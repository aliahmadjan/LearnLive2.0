import { Heading, Text, VStack, Flex, Container, SimpleGrid, GridItem, FormControl, FormLabel, Input, Button, Image, color } from '@chakra-ui/react'
import React, {useContext,useEffect, useState} from 'react'
import LogInNavBar from '../components/LogInNavBar'
import useStore from '../store'
import axios from "axios"
import { useNavigate } from 'react-router-dom'

const AdminLogin = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');

     const navigate = useNavigate();
    // const handleSubmit1 = () =>
    // {
    //         navigate("/vsignup");
    // }
    
    const LoginAdmin = async(e) =>
    {
        e.preventDefault();
        try {
           const res=  await axios.post('http://localhost:5000/admin/verifylogin', {
                email: email,
                password: password,
            
            });
            localStorage.setItem("logtoken",res.data);
            //console.log("verified")
            navigate("/admin");
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            }
        }
    }

    

  return (
    
    <Container maxW="full" h="88vh" bg='orange.100' >

        <Flex h={{base: "full", md: '88vh'}} 
            py={{base: '12px'}} 
            px={{base: '10px', md: "20px", lg:"140px"}} 
            align="center" justify="space-between" 
            direction={{base: 'column', md: 'row'}}>

            <VStack >
                <Heading w={'100%'} pb={4}>Admin Login</Heading>
                <Text fontSize={"xl"}>Sign In to Learn Live</Text>
            </VStack>
          
            <Image src="StudentLogin.png" w={400} overflow="hidden" ml={{lg: '-80px' , md: '-80px'}} pl={{base: '60px', lg:'0px'} }/>

            <SimpleGrid p={10} py="60px" width="34%" columns={2} columnGap={3} rowGap={6} textAlign="center" boxShadow="0px 2px 10px rgba(0, 0, 0, 0.5)" borderRadius={10} >
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
                        <FormControl>
                            <Input 
                            id='password'
                            name='password'
                            label='password'
                            placeholder='Password'
                            onChange={e=>setPassword(e.target.value)}
                            required
                            type='password'
                            variant={'filled'} />  
                        </FormControl>
                    </GridItem>

                    <GridItem colSpan={2}>
                        <Button variant='solid' width="100%" colorScheme='brand1' onClick={LoginAdmin}>Log In</Button>
                    </GridItem>

                </SimpleGrid>
        </Flex>
    </Container>

  )
}

export default AdminLogin