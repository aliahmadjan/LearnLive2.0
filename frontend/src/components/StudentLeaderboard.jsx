import React , {useState, useEffect} from 'react'
import { Box, Button,Heading, Text, Link , Avatar, Flex, IconButton, Input} from '@chakra-ui/react'
import axios from "axios"
import { useNavigate, useParams} from "react-router-dom";

const  StudentLeaderboard = (props)=> 
{
  const navigate = useNavigate();
  const [userID , setUserID] = useState("");
  const [name, setName] = useState("");
  const [email , setEmail] = useState("");
  const [gender, setGender]= useState("");
  const [phoneno , setPhoneNo]=useState("");

  const [campname , setCampName]= useState([]);
  const [teachers, setTeachers] = useState([]);
  const [camps , setCamps] = useState([]);


  const handleSubmitView = (sleaderboard_viewid, name2, ) => { // add campname as parameter
    localStorage.removeItem("sleaderboard_viewid");
    localStorage.setItem("sleaderboard_viewid", sleaderboard_viewid);
    localStorage.removeItem("campname2");
    localStorage.setItem("campname2", name2);
    props.setCampus(name2)
    navigate("/student/viewleaderboard");
  };

  const getCurentUser = () =>
  {
    let logintoken = localStorage.getItem("ltoken")
    axios.defaults.headers.common["Authorization"] = `Bearer ${logintoken}`;
    axios.get("http://localhost:5000/student/viewprofile")
      .then(res=> {
              //setUserID(res.data._id);
              localStorage.setItem('userID',res.data._id)
              console.log(res.data._id)
              // setName(res.data.name);
              // setEmail(res.data.email);
              // setGender(res.data.gender);
              // setPhoneNo(res.data.phoneno);
      }).catch (err=> {
          console.log(err) })
  }

  const getCurrentCampName = () =>
  {
    //localStorage.setItem('userID',userID)
    console.log(`${localStorage.getItem('userID')}`)
    axios.get(`http://localhost:5000/camp/getcampstudent/${localStorage.getItem('userID')}`).then(res =>
    {
      setCampName(res.data);

    }).catch(err =>
      {
        console.log(err);
      })
  }

  useEffect(()=>
  {
      getCurentUser();
      getCurrentCampName();
     
  },[])

    return (
      <Box pt={0} px={0} mx='auto' textAlign={'center'} width={'100%'} backgroundColor='gray.100' borderRadius={30}>
      <Box pt={4} pb={2} my={4}>
        <Heading mb={4} >
          View Leaderboard of current camps
        </Heading>
      </Box>

      <Flex maxW='2xl' mx="auto" flexDirection={'column'}>
        {/* <Flex p={4} pt={0}>
          <Input placeholder="Assigment's Name" variant={'outlined'} borderColor='orange'></Input>
          <Button colorScheme={'orange'}>Search</Button>
        </Flex> */}

        <Flex border={'1px solid orange'} 
              gap={2} 
              justifyContent='space-around' 
              height='50vh' borderRadius='20px' 
              p={4} flexWrap='wrap' 
              overflowY='scroll'
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

        {campname.map((cn,index) => (  

            <Flex border={'1px solid orange'} height='40%' width={'250px'} borderRadius={30} p={2} alignItems='center' justifyContent={'space-around'}>

            <Box ml={0} >
              <Text>
              Camp: {campname[index]}
              
              </Text> 
            </Box>
            
            <Flex flexDir={'column'} justifyContent='center'>
                <Button  onClick={()=>handleSubmitView(cn._id,cn)} colorScheme='orange' variant='ghost'>
                  <i class="fa-solid fa-eye"></i>
                </Button>

               

            </Flex>
        
            
            </Flex>  ))} 

        </Flex>
      </Flex>

    </Box>

      
    );
}

export default StudentLeaderboard;