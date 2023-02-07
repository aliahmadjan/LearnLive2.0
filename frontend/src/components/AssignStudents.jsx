import React , {useState, useEffect} from 'react'
import { Box,Button, Select,Heading, Text, Link ,FormControl,FormLabel, Input,RadioGroup,Radio,Stack, Flex} from '@chakra-ui/react'
import axios from "axios"
import { useNavigate, useParams} from "react-router-dom";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'

const AssignStudents =() =>
{

    const [campname , setCampName]= useState("");
    const [students , setStudents]= useState([]);
    const [selectedCampus, setSelectedCampus] = useState("");
    const [searches, setSearches] = useState([])

    const [submitStatus, setSubmitStatus] = useState(0);
  
  const {
    isOpen: isVisible,
    onClose,
    onOpen,
  } = useDisclosure({ defaultIsOpen: true })
    const navigate = useNavigate();

    const GetCampNames = () =>
    {
      axios.get('http://localhost:5000/camp/getcampname')
      .then(res =>
        {
          console.log(res.data);
          setCampName(res.data);
          console.log(res.data);
          //setCamps(res.data);
          //console.log(camps)
          
        }).catch(err =>
          {
            console.log(err)
          })
    };

    const AssignStudentsToCamp=async(e)=>
    {
      e.preventDefault();
        const url = 'http://localhost:5000/camp/addcamp';
        setStudents(students=> [...students, `${localStorage.getItem('student_assignid')}`])
       // setSearches(searches => [...searches, `${localStorage.getItem('teacher_assignid')}`]);

   // setSearches(searches =>
     //  searches.concat(`${localStorage.getItem('teacher_assignid')}`))
   await axios.post(url,{
      campname:selectedCampus,
       students:`${localStorage.getItem('student_assignid')}`
    }).then ((res)=>
    {
      setSubmitStatus(1);
      //console.log(res.data)
    }).catch((err)=>
    {
      setSubmitStatus(-1)
    })

    }

     useEffect(() => {
      GetCampNames(); 
      //console.log(students);
    }, [])

    const StatusAlert = () => {
      if (submitStatus === -1)
        return (
          <Alert status='error'>
          <AlertIcon />
         Student was not assigned!
        </Alert>
        );
      if (submitStatus === 1)
        return (
          <Alert status='success'>
          <AlertIcon />
         Student was assigned!
        </Alert>
        );
    };

    const Back = ()=>
    {
      navigate("/admin/viewstudents");
    }


    return (

      <Box pt={0} px={0} mx='auto' textAlign={'center'} width={'100%'} backgroundColor='gray.100' borderRadius={30}>

      <Box pt={4} pb={2}  >
        <Heading mb={4} >
          Assign Camp
        </Heading>
        <Text mb={6}>
          Here you can Add students to a Camp.
        </Text>
      </Box>

      <form onSubmit={AssignStudentsToCamp}>
        <Box p={5} maxW="lg" mx="auto" textAlign={'start'} position={'relative'}>
            <Box border={'1px solid orange'} borderRadius='20px' p={4} >

            <FormControl mb={2} display={'flex'} alignItems='center' >
                <FormLabel fontWeight="bold" color="orange.500" mr={2}>Camp</FormLabel>

                <Select textAlign={'center'}
                        focusBorderColor='orange.700' 
                        variant={'flushed'} 
                        borderBottomColor='orange'
                        width={'60%'} 
                        mr={0} ml='auto'
                        value={selectedCampus}
                        onChange={e => setSelectedCampus(e.target.value)}
                        isRequired>

                        <option value="" disabled>Camp Names</option>
                        {Array.isArray(campname) && campname.map((campname) => ( <option value={campname}>{campname}</option> ))} 
                 </Select>
            </FormControl>


            </Box>

            <Flex mb={2} mt={2} alignItems='center' justifyContent={'center'} gap={4}>
              <Button type='submit' colorScheme='orange' variant='solid'>
                      Assign Student
              </Button>

              <Button type='button' onClick={Back} colorScheme='orange' variant='solid' >
                  Back 
              </Button>
            </Flex>

          </Box>

      </form>

      <StatusAlert />
    </Box>

      )
}

export default AssignStudents;