import React , {useState, useEffect , useRef} from 'react'
import { Box,Button, Select,Heading, Text, Link ,FormControl,FormLabel, Input,RadioGroup,Radio,Stack, InputGroup, Flex} from '@chakra-ui/react'
import axios from "axios"
import { useNavigate, useParams} from "react-router-dom";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSound } from 'use-sound';
import notificationSound from '../notification.mp3';


const AssignTeachers =() =>
{
  //const [playNotificationSound] = useSound(notificationSound);
  const [audio] = useState(new Audio(notificationSound));
    const [camps , setCamps] = useState([])
    const [campname , setCampName]= useState([]);
    const [teachers , setTeachers]= useState("");
    const [selectedCampus, setSelectedCampus] = useState("");
    
    const [searches, setSearches] = useState([])

    const [submitStatus, setSubmitStatus] = useState("");
  
  const {
    isOpen: isVisible,
    onClose,
    onOpen,
  } = useDisclosure({ defaultIsOpen: true })
    const navigate = useNavigate();

    const playNotificationSound = () => {
      audio.play();
    };

    const GetCampNames = () =>
    {
      axios.get('http://localhost:5000/camp/getcampname')
      .then(res =>
        {
          setCampName(res.data);

        }).catch(err =>
          {
            console.log(err)
          })
    };

   
    

    const AssignTeachersToCamp=async(e)=>
    {
      e.preventDefault();
     
 await axios.post(`http://localhost:5000/camp/addcampteachers/${localStorage.getItem('teacher_assignid')}`,{
    campname:selectedCampus,
     teachers:`${localStorage.getItem('teacher_assignid')}`
  }).then((response) => {
    if (response.status === 200) {
      if (response.data.nModified === 0) {
        setSubmitStatus("Already Assigned");
      } else {
        setSubmitStatus("Assigned");
      }
    }
  })
  .catch((error) => {
    if (error.response && error.response.status === 400) {
      setSubmitStatus("Already Assigned");
    } else {
      setSubmitStatus("Error");
    }
  });
} 

     useEffect(() => {
      GetCampNames();
       //console.log(teachers);
    }, [])

    const StatusAlert = () => {
      if (submitStatus === "Already Assigned")
        return (
          <Alert status='warning'>
          <AlertIcon />
         Teacher was already assigned!
        </Alert>
        );
      if (submitStatus === "Assigned")
        return (
          <Alert status='success'>
          <AlertIcon />
         Teacher was assigned!
        </Alert>
        );

        if (submitStatus === "Error")
        return (
          <Alert status="error">
            <AlertIcon />
            Teacher war not added!
          </Alert>
        );
    };


    const Back = ()=>
    {
      navigate("/admin/viewteachers");
    }


    return (

      <Box p={2} m='auto' textAlign={'center'} width={'100%'} borderRadius={30}>

      <Box pt={4} pb={2}  >
        <Heading mb={4} >
          Assign Camp
        </Heading>
      </Box>

      <form onSubmit={AssignTeachersToCamp}>
        <Box p={5} maxW="lg" mx="auto" textAlign={'start'} position={'relative'}>
            <Box boxShadow="0px 4px 8px rgba(0, 0, 0, 0.1)" borderRadius='15px' p={4} backgroundColor="#FFFFFF" >

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

            <Flex mb={2} mt={6} alignItems='center' justifyContent={'center'} gap={4}>
              <Button type='submit' colorScheme='orange' variant='solid'>
                      Assign Teacher
              </Button>

              <Button type='button' onClick={Back} colorScheme='orange' variant='solid' >
                  Back 
              </Button>
            </Flex>

          </Box>

      </form>
     {/* <ToastContainer/> */}
      <StatusAlert />

      {/* <input type="text" id="userInput"/>
      <button  onClick={createChannel}>Save</button> */}
    </Box>
   
      )
}

export default AssignTeachers;