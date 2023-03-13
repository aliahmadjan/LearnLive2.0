import React from "react"
import { useState, useEffect } from "react"
import { Box,Grid,Button, Text, SimpleGrid,Card, CardHeader, Avatar,Tooltip, FormControl, FormLabel, Input, Select, Textarea, Heading, Flex} from "@chakra-ui/react";
import axios from "axios"
import { useNavigate, useParams} from "react-router-dom";
import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
  } from '@chakra-ui/react'
  import { useDisclosure } from '@chakra-ui/react'
  import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
  } from '@chakra-ui/react'



  const ViewCamps = ()=>
  {
    const [campname , setCampName] = useState('')
    const [camps , setCamps] = useState([]);
    const [ teachers , setTeachers] =useState('')

    const [ query, setQuery]= useState("");
    const [results , setResults] = useState([]);

    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()
    const navigate = useNavigate();

    const handleSubmitView = (camp_viewid) =>
    {
        localStorage.removeItem('camp_viewid')
         localStorage.setItem('camp_viewid',camp_viewid)
            navigate("/admin/viewcamp");
    }

    const handleSubmitDelete = (camp_delid)=>
    {
      localStorage.removeItem('camp_delid')
      localStorage.setItem('camp_delid',camp_delid)

    }

    const getAllCamps= () =>
    {

        axios.get("http://localhost:5000/camp/getcamps") 
        .then(res=> {
           setCamps(res.data)
           setResults(res.data)
          //console.log(quizzes)
    }).catch (err=> {
       console.log(err) })
    
    }

 
    
   useEffect(()=>
   { 
  
   getAllCamps();
   },[])

   useEffect(()=>
    {
        console.log(results)
    },[results])
   const handleSearch = async(e) =>
   {
       setQuery(e.target.value);
       const filteredCamps = camps.filter(camp=>
         camp.campname.toLowerCase().includes(query.toLowerCase())
         );
         setResults(filteredCamps);
         //setTeachers(filteredTeachers);
   }

   const DeleteCamp = (e) => {
    e.preventDefault();
    const campId = localStorage.getItem('camp_delid');
    axios.delete(`http://localhost:5000/camp/deletecamp/${campId}`)
      .then(() => {
        axios.get('http://localhost:5000/camp/getcamps')
          .then((res) => {
            setResults(res.data)
          })
          .catch((error) => {
          
          });
      })
      .catch((error) => {
        
      });
  };
  


    return (

      <Box p={2} m='auto' textAlign={'center'} width={'100%'} borderRadius={30}>

        <Box pt={4} pb={2}  >
          <Heading mb={4} >
            View Camps
          </Heading>
        </Box>

        <Box width={'80%'} mx="auto" >

          <Flex p={4} pt={0}>
            <Input placeholder="Camp's Name" 
            onChange={handleSearch}
            variant={'outlined'}
            >
            </Input>

            {/* <Button colorScheme={'orange'}>Search</Button> */}
          </Flex>

          <SimpleGrid 
            width={'90%'} 
            overflowY='scroll' 
            maxHeight={'66vh'} 
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

            {results.map((camp) => (

              <Card maxWidth={'100%'} maxHeight='160px' m={2}>
                <CardHeader>
                  <Flex spacing='4' alignItems='center' justifyContent={'space-evenly'}>

                    <Flex justifyContent={'space-evenly'} alignItems='center' flexWrap='wrap'>
                      <Avatar name={camp.campname} mx={4} />
                      <Box>
                        <Heading size='sm'>{camp.campname}</Heading>
                        {/* <Text>{camp.campname}</Text> */}
                      </Box>
                    </Flex>

                    <Flex flexDir={'column'} justifyContent='center'>

                      <Tooltip label="View Camp" hasArrow placement='right'>
                        <Button  onClick={()=>handleSubmitView(camp._id)} colorScheme='orange' variant='ghost'>
                          <i class="fa-sharp fa-solid fa-eye"></i>
                        </Button>
                      </Tooltip>
                      

                      <Tooltip label="Delete" hasArrow placement='right'>
                        <Button  onClick={()=>onOpen(handleSubmitDelete(camp._id))} colorScheme='orange' variant='ghost'>
                          <i class="fa-solid fa-trash"></i>
                        </Button>
                      </Tooltip>

                    </Flex>

                  </Flex>

                </CardHeader>

              </Card>
            ))}
            
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
                        DeleteCamp(e);
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

          </SimpleGrid>

        </Box>
      </Box>

       
    )
  }

  export default ViewCamps;