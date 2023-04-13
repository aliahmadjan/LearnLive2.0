import React from "react";
import { SimpleGrid, Card, CardHeader, Avatar, Tooltip, Box, FormControl, FormLabel, Input, Text, FormErrorMessage, Button, Heading, Flex } from "@chakra-ui/react";
import { useState , useEffect} from "react";
import axios from "axios"

export default function StudentViewMeets() {
    const [zoommeets , setZoomMeets] = useState([]);
    const [userID , setUserID] = useState("")
    const [ students , setStudents] =useState('')

    const getAllMeets= () =>
    {
    axios.get('http://localhost:5000/zoomMeet/getcurrcampclasses')
        .then(res=> {
           setZoomMeets(res.data)
    }).catch (err=> {
       console.log(err) })
    
    }
 

    
   useEffect(()=>
   {   
    getAllMeets();
   },[zoommeets])
    
  return (

    <Box p={2} m='auto' textAlign={'center'} width={'100%'} borderRadius={30}>

      <Box pt={4} pb={2}  >
        <Heading mb={4} >
          Classes
        </Heading>
      </Box>

      <Box width={'80%'} mx="auto" >

        <Flex p={4}>
          <Input 
          type="text"
          placeholder="Class's Title"
          // onChange={handleSearch}
          variant={'outlined'} borderColor='orange'
          // value={query}
          >
          </Input>
          {/* <Button colorScheme={'orange'}>Search</Button> */}
        </Flex>

        <SimpleGrid 
            width={'90%'} 
            overflowY='auto' 
            maxHeight={'44vh'} 
            mx='auto' 
            minChildWidth='300px' 
            spacingX='10px' spacingY='10px'
            sx={{
              '&::-webkit-scrollbar': {
                width: '8px',
                borderRadius: '2px',
                backgroundColor: 'white',
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: `orange.500`,
                borderRadius: '2px',
              },
            }}>

            {zoommeets.map((meet) => (
              <Card m={2} justifyContent={'center'}>
                <CardHeader>
                  <Flex spacing='4' alignItems='center' justifyContent={'space-evenly'}>
                    
                    <Avatar name={meet.campname} />

                    <Flex justifyContent={'space-evenly'} alignItems='center' flexWrap='wrap'>
                      <Box>
                        <Heading size='sm'>Camp: {meet.campname}</Heading>
                        <Text>Agenda: <b>{meet.agenda}</b></Text>
                        <Text>Duration: <b>{meet.duration} mins</b></Text>
                        <Text>Password: <b>{meet.password}</b></Text>
                      </Box>
                    </Flex>

                    

                    <form action={meet.join_url} target="_blank">
                      <Tooltip label="Join" hasArrow placement='right'>
                        <Button size='sm' type='submit' colorScheme='orange' variant='ghost'>
                        <i class="fa-solid fa-play"></i>
                        </Button>
                      </Tooltip>
                    </form>

                    

                  </Flex>

                </CardHeader>
  
              </Card>
            ))}
        </SimpleGrid>

      </Box>

    </Box>
);

}