import React , {useState, useEffect} from 'react'
import { Box,Button, Avatar,Heading, Text, Link ,FormControl,FormLabel, Input,RadioGroup,Radio,Stack, InputGroup, Flex} from '@chakra-ui/react'
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

      <Box pt={0} px={0} mx='auto' textAlign={'center'} width={'100%'} backgroundColor='gray.100' borderRadius={30}>
        <Box pt={4} pb={2}  >
          <Heading mb={4} >
            View Teachers
          </Heading>
          <Text mb={6}>
            This page displays your account details and allows you to edit them.
          </Text>
        </Box>

        <Box maxW='4xl' mx="auto" >
          <Flex p={4} pt={0}>
            <Input placeholder="Teacher's Name"
             variant={'outlined'} 
            onChange={handleSearch}
             borderColor='orange'>
              
             </Input>
            {/* <Button colorScheme={'orange'}>Search</Button> */}
            
          </Flex>
          {/* <ul>
              {results.map(teacher => 
                (
                  <li key={teacher.name}>
                    Name: {teacher.name}
                  </li>
                ))}
            </ul> */}

          <Flex border={'1px solid orange'} gap={2} justifyContent='space-around' height='50vh' borderRadius='20px' p={4} flexWrap='wrap' overflow='scroll'>

  
            {results.map((teacher,i) => (
              <Flex border={'1px solid orange'} width={'250px'} borderRadius={30} p={2} alignItems='center' justifyContent={'space-around'}>

                <Avatar
                  src={teacher.profileimg}
                  size="lg"
                  ml={0}/>

                <Box ml={0} >
                  <Text>
                    {teacher.name}
                  </Text> 
                  <Text>
                    {teacher.email}
                  </Text> 
                  <Text>
                    {teacher.gender}
                  </Text> 
                  <Text>
                    {teacher.password}
                  </Text>
                </Box>

                <Flex flexDir={'column'} justifyContent='center'>
                  <Button  onClick={()=>handleSubmitEdit(teacher._id)} colorScheme='orange' variant='ghost'>
                    <i class="fa-solid fa-pen-to-square"></i>
                  </Button>

                  <Button  onClick={()=>onOpen(handleSubmitDelete(teacher._id))} colorScheme='orange' variant='ghost'>
                    <i class="fa-solid fa-trash"></i>
                  </Button>

                  <Button onClick={()=>handleSubmitAssign(teacher._id)} colorScheme='orange' variant='ghost'>
                    <i class="fa-sharp fa-solid fa-person-circle-plus"></i>
                  </Button>

                  
                  

                </Flex>
                
              </Flex>



              
            ))}


              {/* Lookk thisss uPPP //Jaaan */}
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

              {/* <AlertDialog
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
                          <Button colorScheme='red' ref={cancelRef}
                          
                          onClick={DeleteTeacher} ml={3}>
                            Delete
                          </Button>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialogOverlay>
          </AlertDialog> */}

           
             

          </Flex>
        </Box>

      </Box>

    );
  };
  
  export default ViewAllTeachers;
  