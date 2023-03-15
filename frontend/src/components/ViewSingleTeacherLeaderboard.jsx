import { Grid, Box,Flex,Heading,Button, Input, Text, List,FormControl, FormLabel } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams} from "react-router-dom";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react'


const ViewSingleTeacherLeaderboard = (props) => 
{
    const [details , setDetails] = useState([])
    // console.log(props.campName)
    const getCampDetails = () => 
    {
      axios.get(`http://localhost:5000/leaderboard/getdetails/${props.campName}`)
      .then((res)=>
      {
        //console.log(res.data)
          setDetails(res.data)
  
      }).catch((err)=>
      {
          console.log(err)
      })
    }
  

    useEffect(()=>
    {
      //console.log(props.campName) 
      getCampDetails();
    },[])
        return (
            <Flex height="35vh" justifyContent="center" alignItems="center">
                <Box p={80} bg="white.100" borderRadius={30}>
                  <Heading mb={4} size="lg" textAlign="center">
                  {/* {props.campName} */}
                  Leaderboard
                  </Heading>
                  <Flex justify="space-between" bg="orange.500" borderRadius={10} px={10} py={3} mb={4}>
                    <Box flex={1} mr={4}>
                        <Text fontWeight="bold" color="white">
                        Student Name 
                        </Text>
                    </Box>
                    <Box flex={1} mr={20}>
                    {/* textAlign="right" */}
                        <Text fontWeight="bold" color="white" textAlign="right" >
                        Points
                        </Text>
                    </Box>
                    
                    {/* {details.map((dt,index) =>
    (
        <Box flex={1} ml={4}>
            <Text fontWeight="bold" color="white">
                Total Points: {dt.total_assignmentscore.reduce((a, b) => a + b, 0) + dt.total_quizscore.reduce((a, b) => a + b, 0)}
            </Text>
        </Box>
    )
)} */}

                    
                    {/* <Box flex={1} ml={4}>
                        <Text fontWeight="bold" color="white">
                        Quiz Score
                        </Text>
                    </Box> */}
                    </Flex>
                    {details
  .sort((a, b) => (b.assignment_score + b.quiz_score) - (a.assignment_score + a.quiz_score))
  .map((dt, index) => (
    <Flex
      key={dt._id}
      justify="space-between"
      bg="white"
      borderRadius={10}
      px={6}
      py={3}
      mb={2}
      boxShadow="md"
    >
      <Box display="flex" alignItems="center">
        <i
          class="fa-solid fa-medal"
          style={{
            marginRight: '10px',
            color:
              index === 0
                ? 'red' // First place is red
                : index === 1
                ? 'blue' // Second place is blue
                : index === 2
                ? 'yellow' // Third place is yellow
                : '' // All other places are none
              }}
        />
        <Text>{dt.student_name}</Text>
      </Box>
      <Text>
        {dt.assignment_score.reduce((a, b) => a + b, 0) +
          dt.quiz_score.reduce((a, b) => a + b, 0)}
      </Text>
    </Flex>
  ))
}


                    </Box>
                  </Flex>
                  
                // </Box>
              );
}

export default ViewSingleTeacherLeaderboard