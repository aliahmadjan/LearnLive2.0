import React from "react";
import { Grid,Select, Box, SimpleGrid, Card, CardHeader,Avatar, Tooltip, FormControl, FormLabel, Input, Text, FormErrorMessage, Button, Heading, Flex } from "@chakra-ui/react";
import { useState , useEffect} from "react";
import axios from "axios"

function TeacherViewMeets () 
{
    const [zoommeets , setZoomMeets] = useState([]);
    const [start_url , setStartUrl] = useState("");
    const getAllMeets= () =>
    {
    axios.get('http://localhost:5000/zoomMeet/getcurrclasses')
        .then(res=> {
           setZoomMeets(res.data)
           setStartUrl(res.data.start_url)
    }).catch (err=> {
       console.log(err) })
    
    }

    useEffect(()=>
    {
        getAllMeets();
    })

return(

  <Box p={2} m='auto' textAlign={'center'} width={'100%'} borderRadius={30}>

    <Box pt={4} pb={2}  >
      <Heading mb={4} >
        Scheduled Meetings
      </Heading>
    </Box>

    <Box width={'80%'} mx="auto" >

        {/* <Flex p={4}>
          <Input placeholder="Student's Name"
          onChange={handleSearch}
          variant={'outlined'} borderColor='orange'
          >
          </Input>
          
          <Button colorScheme={'orange'}>Search</Button>
        </Flex> */}

        <SimpleGrid 
            width={'90%'} 
            overflowY='auto' 
            maxHeight={'44vh'} 
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

            {zoommeets.map((meet) => (
              <Card maxWidth={'100%'}  maxHeight='160px' m={2}>
                <CardHeader>
                  <Flex spacing='4' alignItems='center' justifyContent={'space-evenly'}>
                    <Flex justifyContent={'space-evenly'} alignItems='center' flexWrap='wrap'>
                      <Avatar name={meet.campname} src={meet.campname} mx={4} />
                      <Box>
                        <Heading size='sm'>Camp: {meet.campname}</Heading>
                        <Text>Agenda: <b>{meet.agenda}</b></Text>
                        <Text>Duration: <b>{meet.duration} mins</b></Text>
                        <Text>Password: <b>{meet.password}</b></Text>
                      </Box>
                    </Flex>

                    <Flex flexDir={'column'} justifyContent='center'>

                      <Tooltip label="Start Meeting" hasArrow placement='right'>
                      <form action={meet.start_url} target="_blank">
                        <Button size='md' type='submit' colorScheme='orange' variant='ghost'>
                          <i class="fa-solid fa-play"></i>               
                        </Button>
                      </form>
                      </Tooltip>

                    </Flex>

                  </Flex>

                </CardHeader>
  
              </Card>
            ))}

          </SimpleGrid>

      </Box>

  </Box>
    
);
}

export default TeacherViewMeets;