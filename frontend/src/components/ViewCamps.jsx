import React from "react"
import { useState, useEffect } from "react"
import { Box,Grid,Button, Text,FormControl, FormLabel, Input, Select, Textarea, Heading, Flex} from "@chakra-ui/react";
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
    const [camps , setCamps] = useState([]);
    const [ teachers , setTeachers] =useState('')
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()
    const navigate = useNavigate();

    const handleSubmitView = (camp_viewid) =>
    {
        localStorage.removeItem('camp_viewid')
         localStorage.setItem('camp_viewid',camp_viewid)
            navigate("/admin/viewcamp");
    }

    const getAllCamps= () =>
    {

        axios.get("http://localhost:5000/camp/getcamps") 
        .then(res=> {
           console.log(res.data)
           setCamps(res.data)
          console.log(camps)
          //console.log(quizzes)
    }).catch (err=> {
       console.log(err) })
    
    }

 
    
   useEffect(()=>
   { 
  
   getAllCamps();
   },[])

   const DeleteQuiz=(quiz_deleteid)=>
   {
   
     localStorage.setItem('quiz_deleteid',quiz_deleteid)
     axios.delete(`http://localhost:5000/quizzes/deletequiz/${localStorage.getItem('quiz_deleteid')}`)
     .then((res) => {
       //window.alert("Delete Successfull!")
   }).catch((error) => {
     //window.alert("Not Deleted! ")
   })
   }

  //  export default function App() {
  //   const jokeElements = camps.map(joke => {
  //       return <Joke setup={joke.setup} punchline={joke.punchline} />
  //   })
  //   return (
  //       <div>
  //           {jokeElements}
  //       </div>
  //   )


    return (

      <Box pt={0} px={0} mx='auto' textAlign={'center'} width={'100%'} backgroundColor='gray.100' borderRadius={30}>
      <Box pt={4} pb={2}  >
        <Heading mb={4} >
          View Camps
        </Heading>
        <Text mb={6}>
          This page displays Camp details and allows you to edit and view them.
        </Text>
      </Box>

      <Box maxW='4xl' mx="auto" >
        <Flex p={4} pt={0}>
          <Input placeholder="Camp's Name" variant={'outlined'} borderColor='orange'></Input>
          <Button colorScheme={'orange'}>Search</Button>
        </Flex>

        <Flex border={'1px solid orange'} gap={2} justifyContent='space-around' height='50vh' borderRadius='20px' p={4} flexWrap='wrap' overflow='scroll'>

          {camps.map((camp) => (
            <Flex border={'1px solid orange'} width={'250px'} borderRadius={30} p={2} alignItems='center' justifyContent={'space-around'}>

              <Box ml={0} >
                <Text >
                  {camp.campname}
                </Text> 
              </Box>

              <Flex flexDir={'column'} justifyContent='center'>
                <Button  onClick={()=>handleSubmitView(camp._id)} colorScheme='orange' variant='ghost'>
                  <i class="fa-sharp fa-solid fa-eye"></i>
                </Button>

                <Button  onClick={onOpen} colorScheme='orange' variant='ghost'>
                  <i class="fa-solid fa-trash"></i>
                </Button>

              </Flex>
              
            </Flex>
          ))}


            {/* Lookk thisss uPPP //Jaaan */}
            
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
                        <Button colorScheme='red' ml={3}>
                          Delete
                        </Button>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialogOverlay>
        </AlertDialog>

        </Flex>
      </Box>

    </Box>

       
    )
  }

  export default ViewCamps;