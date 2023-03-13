import React , {useState, useEffect} from 'react'
import { Box,Button, Avatar,Heading,IconButton, Tooltip, Text, Link ,FormControl,FormLabel, Input,RadioGroup,Radio,Stack, InputGroup, Flex, SimpleGrid, Card, CardHeader, CardBody, CardFooter} from '@chakra-ui/react'
import axios from "axios"
import { Divider } from '@chakra-ui/react'
import { useNavigate, useParams} from "react-router-dom";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'

  const ViewAllTeachers = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [gender ,setGender] = useState("");
    const [phoneno , setPhoneNo] = useState("");
    const [password, setPassword]= useState("");
    const [profileimg , setProfileImg]= useState("");

    const [teachers , setTeachers]= useState([]);
    const [updatedTeachers , setUpdatedTeachers] = useState([]);

    const [ query, setQuery]= useState("");
    const [results , setResults] = useState([]);
    

    const navigate = useNavigate();

    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()

    const handleSubmitEdit = (teacherid) =>
    {
         localStorage.setItem('teacherid',teacherid)
            navigate("/admin/editteacher");
    }

    const handleSubmitAssign = (teacher_assignid) =>
    
    {
         localStorage.removeItem('teacher_assignid')
         localStorage.setItem('teacher_assignid',teacher_assignid)
            navigate("/admin/assignteacher");
    }

    const handleSubmitDelete = (teacher_delid)=>
    {
      localStorage.removeItem('teacher_delid')
      localStorage.setItem('teacher_delid',teacher_delid)

    }
    useEffect(() => {
      axios
        .get("http://localhost:5000/teacher/getteachers")
        .then((res) => {
          setTeachers(res.data);
          setResults(res.data);
          //setUpdatedTeachers(res.data);
          
        })
        .catch((err) => {
          console.log(err);
        });

        
    }, []);

  

    useEffect(()=>
    {
        console.log(results)
    },[results])

    const DeleteTeacher = (e) => {
      e.preventDefault();
      const teacherId = localStorage.getItem('teacher_delid');
      axios.delete(`http://localhost:5000/teacher/deleteteacher/${teacherId}`)
        .then(() => {
          axios.get('http://localhost:5000/teacher/getteachers')
            .then((res) => {
              // const teachers = res.data;
              setResults(res.data)
            })
            .catch((error) => {
            
            });
        })
        .catch((error) => {
          
        });
    };
    

   
    

    
  
  const handleSearch = async(e) =>
  {
      setQuery(e.target.value);
      const filteredTeachers = teachers.filter(teacher =>
        teacher.name.toLowerCase().includes(query.toLowerCase())
        );
        setResults(filteredTeachers);
        //setTeachers(filteredTeachers);
  }


    return (

      <Box p={2} m='auto' textAlign={'center'} width={'100%'} borderRadius={30}>

        <Box pt={4} pb={2}  >
          <Heading mb={4} >
            View Teachers
          </Heading>
        </Box>

        <Box width={'80%'} mx="auto" >

          <Flex p={4}>
            <Input 
              placeholder="Teacher's Name"
              variant={'outlined'} 
              onChange={handleSearch}>
            </Input>

            {/* <Button colorScheme={'orange'}>Search</Button> */}
          </Flex>

          <SimpleGrid 
            width={'90%'} 
            overflowY='scroll' 
            maxHeight={'66vh'} 
            mx='auto' 
            minChildWidth='260px' 
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

            {results.map((teacher,i) => (
              <Card maxWidth={'100%'} maxHeight='160px' m={2}>
              <CardHeader>
                <Flex spacing='4' alignItems='center' justifyContent={'space-evenly'}>
                  <Flex justifyContent={'space-evenly'} alignItems='center' flexWrap='wrap'>
                    <Avatar name={teacher.name} src={teacher.profileimg} mx={4} />
                    <Box>
                      <Heading size='sm'>{teacher.name}</Heading>
                      <Text>{teacher.email}</Text>
                      <Text>{teacher.gender}</Text>
                    </Box>
                  </Flex>

                  <Flex flexDir={'column'} justifyContent='center'>

                    <Tooltip label="Edit" hasArrow placement='right'>
                      <Button  onClick={()=>handleSubmitEdit(teacher._id)} colorScheme='orange' variant='ghost'>
                        <i class="fa-solid fa-pen-to-square"></i>               
                      </Button>
                    </Tooltip>
                    

                    <Tooltip label="Delete" hasArrow placement='right'>
                      <Button  onClick={()=>onOpen(handleSubmitDelete(teacher._id))} colorScheme='orange' variant='ghost'>
                      <i class="fa-solid fa-trash"></i>
                      </Button>
                    </Tooltip>


                    <Tooltip label="Assign Camp" hasArrow placement='right'>
                      <Button onClick={()=>handleSubmitAssign(teacher._id)} colorScheme='orange' variant='ghost'>
                      <i class="fa-sharp fa-solid fa-person-circle-plus"></i>
                      </Button>
                    </Tooltip>

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
                        //SetDeleteTeacherId();
                        DeleteTeacher(e);
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

        </Box>

      </Box>

    );
  };
  
  export default ViewAllTeachers;
  