import React , {useState, useEffect} from 'react'
import {SimpleGrid, Card, CardHeader, Tooltip, Box, Button,Heading, Text, Link , Avatar, Flex, IconButton, Input} from '@chakra-ui/react'
import axios from "axios"
import { useNavigate, useParams} from "react-router-dom";

function TeacherLeaderboard  (props) 
{
  const navigate = useNavigate();
  const [userID , setUserID] = useState("");
  const [name, setName] = useState("");
  const [email , setEmail] = useState("");
  const [gender, setGender]= useState("");
  const [phoneno , setPhoneNo]=useState("");

  const [campname , setCampName]= useState([]);
  const [currentCampName, setCurrentCampName] = useState(""); // new state variable for current camp name

  const [teachers, setTeachers] = useState([]);
  const [camps , setCamps] = useState([]);

  const getCurentUser = () =>
  {
    let logintoken = localStorage.getItem("logintoken")
    axios.defaults.headers.common["Authorization"] = `Bearer ${logintoken}`;
    axios.get("http://localhost:5000/teacher/viewprofile")
      .then(res=> {
        localStorage.setItem('userID', res.data._id)
              // setUserID(res.data._id);
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
    axios.get(`http://localhost:5000/camp/getcampteacher/${localStorage.getItem('userID')}`).then(res =>
    {
      setCampName(res.data);

    }).catch(err =>
      {
        console.log(err);
      })
  }

  
  const handleSubmitView = (tleaderboard_viewid, name1, ) => { // add campname as parameter
    localStorage.removeItem("tleaderboard_viewid");
    localStorage.setItem("tleaderboard_viewid", tleaderboard_viewid);
    localStorage.removeItem("campname1");
    localStorage.setItem("campname1", name1);

    //setCurrentCampName(campname); // set the current camp name in state
    //console.log("CAMPUS NAME: ", name1)
    props.setCampus(name1)
    navigate("/teacher/viewleaderboard");
  };

  useEffect(()=>
  {
      getCurentUser();
      getCurrentCampName();
     
  },[])

    return (
      <Box p={2} m='auto' textAlign={'center'} width={'100%'} borderRadius={30}>

        <Box pt={4} pb={2} >
          <Heading mb={4} >
            Leaderboard
          </Heading>
        </Box>

        <SimpleGrid 
            width={'70%'} 
            overflowY='auto ' 
            maxHeight={'66vh'} 
            mx='auto' 
            minChildWidth='250px' 
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

            {campname.map((cn,index) => (
              <Card maxWidth={'100%'} m={2} justifyContent={'center'}>
                <CardHeader>
                  <Flex spacing='4' alignItems='center' justifyContent={'space-evenly'}>
                    <Flex justifyContent={'space-evenly'} alignItems='center' flexWrap='wrap'>
                      <Avatar name={campname[index]} mx={4} />
                      <Box p={2}>
                        <Heading size='sm'>{campname[index]}</Heading>
                      </Box>
                    </Flex>

                    <Flex flexDir={'column'} justifyContent='center'>

                      <Tooltip label="View" hasArrow placement='right'>
                        <Button size='sm' onClick={()=>handleSubmitView(cn._id, cn)} colorScheme='orange' variant='ghost'>
                        <i class="fa-solid fa-eye"></i>
                        </Button>
                      </Tooltip>

                    </Flex>

                  </Flex>

                </CardHeader>
  
              </Card>
            ))}
        </SimpleGrid>

    </Box>

      
    );
}

export default TeacherLeaderboard;