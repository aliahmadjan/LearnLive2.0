import React from "react"
import { useState, useEffect } from "react"
import {Avatar, Box,Button,Tooltip ,SimpleGrid,Center,Divider, Text,Card, FormControl, FormLabel, Input, Select, Textarea, Heading, Flex, CardHeader} from "@chakra-ui/react";
import axios from "axios"
import { useNavigate, useParams} from "react-router-dom";
import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
  } from '@chakra-ui/react'
  import { useDisclosure } from '@chakra-ui/react'
  import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
  } from '@chakra-ui/react'


  const ViewSingleCamp = (props)=>
  {
    const navigate = useNavigate();
    const [campname , setCampName] = useState("");
    const [camp_level , setCampLevel] = useState()
    const [ teachers , setTeachers] =useState([]);
    const [students , setStudents] = useState([]);
    const [ camps , setCamps] = useState([])


    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()
 
    const getSingleUser = () =>
    {
      axios
         .get('http://localhost:5000/camp/getcamp/:',{params : {id: localStorage.getItem('camp_viewid')}})
        .then((res) => {
          //setCamps(res.data);
          //console.log(camps)
          setCampName(res.data.campname)
          setCampLevel(res.data.camp_level)
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

    
    const handleBack = ()=>
    {
      navigate("/admin/viewcamps");
    }
  
    // const handleRemoveTeacher = (teacherc_delid) =>
    // {
    //   //localStorage.removeItem('teacherc_delid')
    //   localStorage.setItem('teacherc_delid' , teacherc_delid)
    //   console.log(teacherc_delid)
     
    // }

    // const handleRemoveStudent = (studentc_delid ) =>
    // {
    //   //localStorage.removeItem('studentc_delid')
    //   localStorage.setItem('studentc_delid',studentc_delid)
    //   //localStorage.setItem('campname2', campname2)
    // }

    const handleSubmitTeacherDelete = (teacherc_delid)=>
    {
      localStorage.removeItem('teacherc_delid')
      localStorage.setItem('teacherc_delid',teacherc_delid)

    }

    const DeleteTeacherCamp = (e) => {
      e.preventDefault();
      //localStorage.setItem('teacherc_delid' , teacherc_delid)
      const teacherID = localStorage.getItem('teacherc_delid');  
     
      axios.delete(`http://localhost:5000/camp/deleteteachercamp/${teacherID}/${props.campName.campname}`)
        .then((res) => {
          console.log(res)
          const updatedTeachers = teachers.filter((teacher) => teacher._id !== teacherID);
          setTeachers(updatedTeachers)          
          
        })
        .catch((error) => {
          console.log(error)
          
        });
    };

    const handleSubmitStudentDelete = (studentc_delid)=>
    {
      localStorage.removeItem('studentc_delid')
      localStorage.setItem('studentc_delid',studentc_delid)

    }

    const DeleteStudentCamp = (e) => {
      e.preventDefault();
      //localStorage.setItem('studentc_delid',studentc_delid)
      const studentID = localStorage.getItem('studentc_delid');     
      axios.delete(`http://localhost:5000/camp/deletestudentcamp/${studentID}/${props.campName.campname}`)
        .then((res) => {
          console.log(res)
          const updatedStudents = students.filter((student) => student._id !== studentID);
          setStudents(updatedStudents)   
          
        })
        .catch((error) => {
          console.log(error)
          
        });
    };

  

   

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



  
    {teachers.map((teacher, index) => (
 
            <Card maxWidth={'100%'} maxHeight='160px' m={2}>
        <CardHeader>
          <Flex spacing='4' alignItems='center' justifyContent={'space-evenly'}>
            <Flex justifyContent={'space-evenly'} alignItems='center' flexWrap='wrap'>
              <Avatar name={teacher.name} src={teacher.profileimg} mx={4} />
              <Box>
                <Heading size='sm'>{teacher.name}</Heading>
                <Tooltip label="Remove" hasArrow placement='right'>

                  <Button size='sm' onClick={()=>onOpen(handleSubmitTeacherDelete(teacher._id))}
                    colorScheme='orange' variant='ghost'>
                    <i class="fa-solid fa-trash"></i>
                  </Button>

                </Tooltip>
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
                            <Tooltip label="Remove" hasArrow placement='right'>
                              <Button size='sm' onClick={()=>onOpen(handleSubmitStudentDelete(student._id))} colorScheme='orange' variant='ghost'>
                                <i class="fa-solid fa-trash"></i>
                              </Button>
                            </Tooltip>
                          </Box>
                        </Flex>
                      </Flex>
                    </CardHeader>
                  </Card>
                     ))} 

<AlertDialog
              isOpen={isOpen}
              leastDestructiveRef={cancelRef}
              onClose={onClose}
             
            >
              <AlertDialogOverlay>
                <AlertDialogContent>
                  <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                    Delete
                  </AlertDialogHeader>

                  <AlertDialogBody>
                    Are you sure? You can't undo this action afterwards.
                  </AlertDialogBody>

                  <AlertDialogFooter>
                    <Button ref={cancelRef} onClick={onClose}>
                      Cancel
                    </Button>
                    <Button
                      colorScheme='red'
                      onClick={(e) => {
                       
                        DeleteStudentCamp(e)
                        DeleteTeacherCamp(e)
                       
                        onClose();
                      }}
                      ml={3}
                    >
                      Delete
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialogOverlay>
            </AlertDialog>         
                
             

            </SimpleGrid>





          </Flex>

        </Flex>

          <Button onClick={handleBack} colorScheme='orange' variant='solid'>
            Back
          </Button>
      </Box>
       
    );
  }

  export default ViewSingleCamp;