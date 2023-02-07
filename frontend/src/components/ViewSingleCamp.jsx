import { useState, useEffect } from "react"
import {Avatar, Box,Button, Text,FormControl, FormLabel, Input, Select, Textarea, Heading, Flex} from "@chakra-ui/react";
import axios from "axios"
import { Divider } from '@chakra-ui/react'
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
          console.log(res.data);
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
      <Box pt={0} px={0} mx='auto' textAlign={'center'} width={'100%'} backgroundColor='gray.100' borderRadius={30}>
        <Box pt={4} pb={2}  >
          <Heading mb={4} >
            View Camp
          </Heading>
        </Box>

        <Heading size='lg'>Camp Name : {campname}</Heading>

        <Flex mt={4} maxW='4xl' mx="auto" width={'100%'} gap={4} >
          {/* <Flex p={4} pt={0}>
            <Input placeholder="Student's Name" variant={'outlined'} borderColor='orange'></Input>
            <Button colorScheme={'orange'}>Search</Button>
          </Flex> */}
          <Box width={'50%'}>
            <Heading size={'md'} mb={4}> Teachers </Heading>
            <Flex width="100%" border={'1px solid orange'} gap={2} justifyContent='space-around' height='50vh' borderRadius='20px' p={4} flexWrap='wrap' overflow='scroll'>

              {teachers.map((teacher,index) => (         
                <Box p={2} height="100px">  
                  <Avatar
                      src={teachers[index].profileimg}
                      size="lg"
                    />         
                  <Text>{teachers[index].name}</Text>   
                </Box>
              ))}   

            </Flex>
          </Box>
          
          <Box width={'50%'}>
            <Heading size={'md'} mb={4}> Students </Heading>
            <Flex width="100%" border={'1px solid orange'} gap={2} justifyContent='space-around' height='50vh' borderRadius='20px' p={4} flexWrap='wrap' overflow='scroll'>
              
              {students.map((student,index) => (         
                <Box p={2} height="100px">  
                  <Avatar
                      src={students[index].profileimg}
                      size="lg"
                    />         
                  <Text>{students[index].name}</Text>   
                </Box>
              ))} 

            </Flex>
          </Box>

        </Flex>
      </Box>

  //      <Box width="100%" p={4} className="question-container" textAlign={"center"} >
  //                 <Text mt={4} textStyle='h1'>    
                  
  //      Camp Name : {campname} 
  //     </Text>
  //     <Divider orientation='horizontal' />
  //     <Text textStyle='h1'> Teachers: </Text>
  //            {teachers.map((teacher,index) => (         
  //           <>  
  //           <Avatar
  //               src={teachers[index].profileimg}
  //               size="lg"
  //             />         
  //           <Text>{teachers[index].name}</Text>   
  //           </>
  //           ))}   
                       
  //           <Divider orientation='horizontal' />
  //            <Text textStyle='h1'> Students: </Text>
             
  //            {students.map((student,index) => (         
  //           <>           
  //           <Avatar
  //               src={students[index].profileimg}
  //               size="lg"
                
  //             />
  //           <Text>{students[index].name}</Text>  
  //           </>
  //           ))}   

  //           <Button  onClick={Back}
  //       style={{
  //       position: 'absolute',
  //       right: 30,
  //       bottom:10,
  //     }}
  //     colorScheme='teal' variant='solid'>
  // Back
  // </Button>
  //       </Box> 
       
    )
  }

  export default ViewSingleCamp;