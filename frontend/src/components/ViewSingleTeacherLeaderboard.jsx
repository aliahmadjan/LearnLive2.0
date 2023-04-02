import { Grid, Box,Flex,Heading,Button, Input, Text, List,FormControl, FormLabel, TableContainer, Table, TableCaption, Thead, Tr, Th, Td, Tbody } from "@chakra-ui/react";
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

      <Box p={2} m='auto' textAlign={'center'} width={'100%'} borderRadius={30}>

        <Box pt={4} pb={2} >
          <Heading mb={4} >
            Leaderboard
          </Heading>
        </Box>

        <Box width={'76%'} mx='auto' py={4}>
        {/* <Heading size={'md'} mb={4}> Students Scores </Heading> */}

          <TableContainer
            px={4} 
            maxHeight='60vh'
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

            <Table variant={'simple'} >
              
              <TableCaption>Students Leaderboard Points</TableCaption>
              
              <Thead>
                <Tr>
                  <Th>Student Name</Th>
                  <Th>Points</Th>
                </Tr>
              </Thead>

              <Tbody>
                {details
                  .sort((a, b) => (b.assignment_score + b.quiz_score) - (a.assignment_score + a.quiz_score))
                    .map((dt, index) => (
                      <Tr>
                        <Td>
                          <i class="fa-solid fa-medal"
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
                                  }}/>

                          {dt.student_name}
                        </Td>

                        <Td>
                          {dt.assignment_score.reduce((a, b) => a + b, 0) +
                            dt.quiz_score.reduce((a, b) => a + b, 0)}
                        </Td>
                      </Tr> 
                ))}
              </Tbody>

            </Table>
          </TableContainer>
        </Box>

      </Box>
  
);
}

export default ViewSingleTeacherLeaderboard