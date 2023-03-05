import { Grid,Select, Box, FormControl, FormLabel, Input, Text, FormErrorMessage, Button, Heading } from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react'

function AddCamp() {
  const [ submitStatus , setSubmitStatus] = useState(0);
  const [campname , setCampName] = useState("");
  const [startdate , setStartDate] = useState("");
  const [enddate , setEndDate] = useState("");
  
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  


  const UploadCamp = (e) => {
    e.preventDefault();

    axios.post("http://localhost:5000/camp/addcamp" ,
    {
        campname: campname,
        startdate: startdate,
        enddate: enddate,

    }).then(res =>
        {
          setSubmitStatus(1);
        }).catch (err =>
            {
              setSubmitStatus(-1)
                console.log(err);
            })
          };

          const StatusAlert = () =>
          {
            if (submitStatus === -1)
            return(
              <Alert status='error'>
                <AlertIcon />
                  Camp Name has already been taken!
                
              </Alert>
            );
            if (submitStatus === 1 )
            return(
              <Alert status='success'>
                <AlertIcon />
                  Camp has been added!
               
              </Alert>
            )
          }




    // const parsedDueDate = new Date(dueDate);
    //  // Formatting the parsed date and time in the same format as the uploadDate state variable
    //  const formattedDueDate = new Intl.DateTimeFormat('en-US', {
    //   year: 'numeric',
    //   month: '2-digit',
    //   day: '2-digit',
    //   hour: '2-digit',
    //   minute: '2-digit',
    //   second: '2-digit'
    //   }).format(parsedDueDate);
  




  return (

    <Box pt={0} px={0} mx='auto' textAlign={'center'} width={'100%'} backgroundColor='gray.100' borderRadius={30}>

      <Box pt={4} pb={2}  >
        <Heading mb={4} >
          Add Camp
        </Heading>
        <Text mb={6}>
          Here you can Add a Study Camp.
        </Text>
      </Box>

      <form onSubmit={UploadCamp}>
        <Box p={5} maxW="lg" mx="auto" textAlign={'start'} position={'relative'}>
            <Box border={'1px solid orange'} borderRadius='20px' p={4} >

            {error && <Text color="red.500">{error}</Text>}
            {success && <Text color="green.500">{success}</Text>}

            <FormControl mb={2} display={'flex'} alignItems='center'>
                <FormLabel htmlFor="campname" fontWeight="bold" color="orange.500" mr={2}>Camp Name</FormLabel>
                <Input
                textAlign={'center'}
                focusBorderColor='orange.700' 
                variant={'flushed'} 
                borderBottomColor='orange'
                id="campname"
                name="campname"
                placeholder="e.g., OOP"
                onChange={(e) => setCampName(e.target.value)}
                isRequired
                width={'60%'} 
                mr={0} ml='auto'/>
            </FormControl>

            <FormControl mb={2} display={'flex'} alignItems='center'>
                <FormLabel htmlFor="startdate" fontWeight="bold" color="orange.500" mr={2}>Start Date</FormLabel>
                <Input
                textAlign={'center'}
                focusBorderColor='orange.700' 
                variant={'flushed'} 
                borderBottomColor='orange'
                id="startdate"
                label="startdate"
                type="date"
                onChange = {e=>setStartDate(e.target.value)}
                isRequired
                width={'60%'} 
                mr={0} ml='auto'/>
            </FormControl>

            <FormControl mb={2} display={'flex'} alignItems='center'>
                <FormLabel htmlFor="enddate" fontWeight="bold" color="orange.500" mr={2}>End Date</FormLabel>
                <Input
                textAlign={'center'}
                focusBorderColor='orange.700' 
                variant={'flushed'} 
                borderBottomColor='orange'
                id="enddate"
                label="enddate"
                type="date"
                onChange = {e=>setEndDate(e.target.value)}
                isRequired
                width={'60%'} 
                mr={0} ml='auto'/>
            </FormControl>

            </Box>
        </Box>

        <Button type='submit' colorScheme='orange' variant='solid'>
                Add Camp
        </Button>

      </form>
      <StatusAlert/>
    </Box>


  );
}

export default AddCamp;