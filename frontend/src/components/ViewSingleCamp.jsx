import { useState, useEffect } from "react"
import {Avatar, Box,Button,SimpleGrid,Center,Divider, Text,Card, FormControl, FormLabel, Input, Select, Textarea, Heading, Flex, CardHeader} from "@chakra-ui/react";
import axios from "axios"
import { useNavigate, useParams} from "react-router-dom";
import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
  } from '@chakra-ui/react'
  import { useDisclosure } from '@chakra-ui/react'


  const ViewSingleCamp = ()=>
  {
    const navigate = useNavigate();
    const [campname , setCampName] = useState("");
    const [ teachers , setTeachers] =useState([]);
    const [students , setStudents] = useState([]);
    const [ camps , setCamps] = useState([])
 
    const getSingleUser = () =>
    {
      axios
         .get('http://localhost:5000/camp/getcamp/:',{params : {id: localStorage.getItem('camp_viewid')}})
        .then((res) => {
          //setCamps(res.data);
          //console.log(camps)
          setCampName(res.data.campname)
          setTeachers(res.data.teachers);
          //console.log(teachers)
          setStudents(res.data.students);

         
        })
        .catch((err) => {
          console.log(err);
        });
    }

    useEffect(()=>
    {
        getSingleUser();
    },[])

    
    const Back = ()=>
    {
      navigate("/admin/viewcamps");
    }
  
    return (
      <Box p={2} m='auto' textAlign={'center'} width={'100%'} borderRadius={30}>

        <Box pt={4} pb={2}  >
          <Heading mb={2} color={'orange.900'}>
            Camp Name: {campname}
          </Heading>
        </Box>

        {/* <Heading size='md' color={'orange.900'}>Camp Name: {campname}</Heading> */}

        <Flex width={'80%'} mx='auto' mt={4} textAlign={'start'} p={4} gap={4}>

          <Flex width={'50%'} flexDirection='column' textAlign={'center'}>
            <Heading size='lg' mb={4}>Teachers</Heading>

            <SimpleGrid
              width={'100%'}
              overflowY='scroll' 
              maxHeight={'66vh'} 
              mx='auto' 
              minChildWidth='160px' 
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
                  
                {teachers.map((teacher,index) => (  
                  <Card maxWidth={'100%'} maxHeight='160px' m={2}>
                  <CardHeader>
                    <Flex spacing='4' alignItems='center' justifyContent={'space-evenly'}>
                      <Flex justifyContent={'space-evenly'} alignItems='center' flexWrap='wrap'>
                        <Avatar name={teachers[index].name} src={teachers[index].profileimg} mx={4} />
                        <Box>
                          <Heading size='sm'>{teachers[index].name}</Heading>
                          {/* <Text>{student.email}</Text>
                          <Text>{student.gender}</Text> */}
                        </Box>
                      </Flex>
                    </Flex>
                  </CardHeader>      
                  </Card> 
                  
                ))}

            </SimpleGrid>

          </Flex>

          <Center height={'60vh'} m='auto' >
            <Divider orientation='vertical' variant='dashed' borderColor={'orange.500'} />
          </Center>

          <Flex width={'50%'} flexDirection='column' textAlign={'center'}>
            <Heading size='lg' mb={4}>Students</Heading>

            <SimpleGrid
              width={'100%'}
              overflowY='scroll' 
              maxHeight={'66vh'} 
              mx='auto' 
              minChildWidth='160px' 
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
                
                {students.map((student,index) => (         
                  <Card maxWidth={'100%'} maxHeight='160px' m={2}>
                  <CardHeader>
                    <Flex spacing='4' alignItems='center' justifyContent={'space-evenly'}>
                      <Flex justifyContent={'space-evenly'} alignItems='center' flexWrap='wrap'>
                        <Avatar name={students[index].name} src={students[index].profileimg} mx={4} />
                        <Box>
                          <Heading size='sm'>{students[index].name}</Heading>
                          {/* <Text>{student.email}</Text>
                          <Text>{student.gender}</Text> */}
                        </Box>
                      </Flex>
                    </Flex>
                  </CardHeader>      
                  </Card> 
                ))} 

            </SimpleGrid>
          </Flex>

        </Flex>

      </Box>
       
    )
  }

  export default ViewSingleCamp;