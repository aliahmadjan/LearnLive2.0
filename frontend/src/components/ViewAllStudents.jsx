import React , {useState, useEffect} from 'react'
import { Box,Button, Avatar,Heading, Text, SimpleGrid, Card, CardHeader, Tooltip, Link ,FormControl,FormLabel, Input,RadioGroup,Radio,Stack, Flex} from '@chakra-ui/react'
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

  const ViewAllStudents = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [gender ,setGender] = useState("");
    const [phoneno , setPhoneNo] = useState("");
    const [password, setPassword]= useState("");
    const [profileimg , setProfileImg]= useState("");

    const [students , setStudents]= useState([]);

    const [ query, setQuery]= useState("");
    const [results , setResults] = useState([]);

    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()

    const navigate = useNavigate();
    const handleSubmit = (studentid) =>
    
    {

         localStorage.removeItem('studentid')
         localStorage.setItem('studentid',studentid)
            navigate("/admin/editstudent");
    }

    const handleSubmitAssign = (student_assignid) =>
    
    {
         localStorage.removeItem('student_assignid')
         localStorage.setItem('student_assignid',student_assignid)
            navigate("/admin/assignstudent");
    }

    const handleSubmitDelete = (student_delid)=>
    {
      localStorage.removeItem('student_delid')
      localStorage.setItem('student_delid',student_delid)

    }

    const handleGenerateCertificate = (student_certid) =>
    {
      localStorage.removeItem('student_certid')
      localStorage.setItem('student_certid',student_certid)
      navigate("/admin/generatecert")
    }
    useEffect(() => {
      axios
        .get("http://localhost:5000/student/getstudents")
        .then((res) => {
          setStudents(res.data);
          setResults(res.data)
        })
        .catch((err) => {
          console.log(err);
        });
    }, []);

   



    const handleSearch = async(e) =>
  {
    const query = e.target.value;
    setQuery(query);
    if (query === '') {
      setResults(students);
    } else {
      const filteredStudents = students.filter((std) =>
        std.name.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filteredStudents);
    }
  }

  const DeleteStudent = (e) => {
    e.preventDefault();
      const studentId = localStorage.getItem('student_delid');
      axios.delete(`http://localhost:5000/student/deletestudent/${studentId}`)
        .then(() => {
          const updatedStudents = students.filter(std => std._id !== studentId);
          setStudents(updatedStudents);
          setResults(updatedStudents);
        })
        .catch((error) => {
          console.log(error)
          
        });
  };
  

  useEffect(()=>
  {
     // console.log(results)
  },[results])
  
    const paperStyle = {padding : 20, height: '400vh', width: 900,
      margin: '80px 0px 50px 240px'}
    const btStyle = { margin: "30px 0px 12px" };
    const textStyle = { margin: "3px 0" };

    return (

      <Box p={2} m='auto' textAlign={'center'} width={'100%'} borderRadius={30}>

      <Box pt={4} pb={2}  >
        <Heading mb={4} >
          View Students
        </Heading>
      </Box>

      <Box width={'80%'} mx="auto" >

        <Flex p={4}>
          <Input
          type="text"
          placeholder="Student's Name"
          onChange={handleSearch}
          value={query}
          variant={'outlined'} borderColor='orange'
          >
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

            {results.map((student) => (
              <Card maxWidth={'100%'} maxHeight='160px' m={2}>
                <CardHeader>
                  <Flex spacing='4' alignItems='center' justifyContent={'space-evenly'}>
                    <Flex justifyContent={'space-evenly'} alignItems='center' flexWrap='wrap'>
                      <Avatar name={student.name} src={student.profileimg} mx={4} />
                      <Box>
                        <Heading size='sm'>{student.name}</Heading>
                        <Text>{student.email}</Text>
                        <Text>{student.gender}</Text>
                      </Box>
                    </Flex>

                    <Flex flexDir={'column'} justifyContent='center'>

                      <Tooltip label="Edit" hasArrow placement='right'>
                        <Button size='sm' onClick={()=>handleSubmit(student._id)} colorScheme='orange' variant='ghost'>
                          <i class="fa-solid fa-pen-to-square"></i>               
                        </Button>
                      </Tooltip>
                      

                      <Tooltip label="Delete" hasArrow placement='right'>
                        <Button size='sm' onClick={()=>onOpen(handleSubmitDelete(student._id))} colorScheme='orange' variant='ghost'>
                        <i class="fa-solid fa-trash"></i>
                        </Button>
                      </Tooltip>


                      <Tooltip label="Assign Camp" hasArrow placement='right'>
                        <Button size='sm' onClick={()=>handleSubmitAssign(student._id)} colorScheme='orange' variant='ghost'>
                        <i class="fa-sharp fa-solid fa-person-circle-plus"></i>
                        </Button>
                      </Tooltip>

                      <Tooltip label="Generate Certificate" hasArrow placement='right'>
                        <Button size='sm' onClick={()=>handleGenerateCertificate(student._id)} colorScheme='orange' variant='ghost'>
                          <i class="fa-solid fa-certificate"></i>
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
                        DeleteStudent(e);
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
  
  export default ViewAllStudents;
  