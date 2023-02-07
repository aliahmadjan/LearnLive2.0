import React from 'react'
import { Box, Heading, Text, Link } from '@chakra-ui/react'

const TeacherSettings = () => {
  return (

    <Box pt={0} px={0} mx='auto' textAlign={'center'} width={'100%'} backgroundColor='gray.100' borderRadius={30}>
      <Box pt={4} pb={2} mt={4}  >
        <Heading mb={4} >
          Account Settings
        </Heading>
      </Box>

      <Box p={5} maxW="lg" mx="auto" textAlign={'start'} position={'relative'}>

        <Box align="center" mb={4} mx='auto' px='auto' >
          <Box border={'1px solid orange'} borderRadius='20px' p={4} >
            <Text> Please Wait for a new update to access settings</Text>
          </Box>
        </Box>
 
      </Box>
    </Box>
  )
}

export default TeacherSettings