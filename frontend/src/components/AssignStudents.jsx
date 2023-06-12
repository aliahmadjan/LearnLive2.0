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

    const [campname , setCampName]= useState([]);
    const [students , setStudents]= useState([]);
    const [selectedCampus, setSelectedCampus] = useState([]);
    const [searches, setSearches] = useState([])

    const [submitStatus, setSubmitStatus] = useState(0);
  
  const {
    isOpen: isVisible,
    onClose,
    onOpen,
  } = useDisclosure({ defaultIsOpen: true })
    const navigate = useNavigate();

    const GetCampNames = () => {
      axios
        .get('http://localhost:5000/camp/getcampname')
        .then((res) => {
          const campNames = res.data.map((camp) => camp.campname);
          setCampName(campNames);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const AssignStudentsToCamp=async(e)=>
    {
      e.preventDefault();
  
    await axios.post(`http://localhost:5000/camp/addcampstudents/${localStorage.getItem('student_assignid')}`,{
      campname:selectedCampus,
       students:`${localStorage.getItem('student_assignid')}`
    }).then((response) => {
      if (response.status === 200) {
        setSubmitStatus(response.data.message);
      } else {
        setSubmitStatus("Error");
      }
    })
    .catch((error) => {
      if (error.response && error.response.status === 500) {
        setSubmitStatus("Error");
      }
    })
    }

     useEffect(() => {
      GetCampNames(); 
      //console.log(campname)
      //console.log(students);
    }, [])

    const StatusAlert = () => {
      if (submitStatus === "Already Assigned")
        return (
          <Alert status='warning'>
          <AlertIcon />
         Student was already assigned!
        </Alert>
        );
      if (submitStatus === "Assigned")
        return (
          <Alert status='success'>
          <AlertIcon />
         Student was assigned!
        </Alert>
        );

        if (submitStatus === "Error")
        return (
          <Alert status="error">
            <AlertIcon />
            Student was not added!
          </Alert>
        );
    };


    const Back = ()=>
    {
      navigate("/admin/viewstudents");
    }


    return (

      <Box p={2} m='auto' textAlign={'center'} width={'100%'} borderRadius={30}>

      <Box pt={4} pb={2}  >
        <Heading mb={4} >
          Assign Camp
        </Heading>
      </Box>

      <form onSubmit={AssignStudentsToCamp}>
        <Box p={5} maxW="lg" mx="auto" textAlign={'start'} position={'relative'}>

          <Box boxShadow="0px 4px 8px rgba(0, 0, 0, 0.1)" borderRadius='15px' p={4} backgroundColor="#FFFFFF" >

            <FormControl mb={2} display={'flex'} alignItems='center' >
                <FormLabel fontWeight="bold" color="orange.500" mr={2}>Camp</FormLabel>

                <Select
  textAlign="center"
  focusBorderColor="orange.700"
  variant="flushed"
  borderBottomColor="orange"
  width="60%"
  mr={0}
  ml="auto"
  value={selectedCampus}
  onChange={(e) => setSelectedCampus(e.target.value)}
  isRequired
>
  <option value="" disabled>
    Camp Names
  </option>
  {campname.map((camp, index) => (
    <option key={index} value={camp}>
      {camp}
    </option>
  ))}
</Select>
            </FormControl>


            </Box>

            <Flex mb={2} mt={6} alignItems='center' justifyContent={'center'} gap={4}>
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