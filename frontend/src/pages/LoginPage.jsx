import { Button, Container, Box, IconButton } from '@chakra-ui/react'
import React from 'react'
import LogInNavBar from '../components/LogInNavBar'
import StudentLogin from '../components/StudentLogin'
import TeacherLogin from '../components/TeacherLogin'
import AdminLogin from '../components/AdminLogin'
import Chat from '../components/Chat/Chat'
import { useState } from 'react'
import useStore from '../store'

const LoginPage = () => {

  const [showBox, setShowBox] = useState(false);
  const user = useStore(state => state.user)

  const handleButtonClick = () => {
    setShowBox(!showBox);
  };

  return (
    <Container maxW="100%" h="100vh" p={0} bg="black">
        <LogInNavBar></LogInNavBar>
        {user == "student" ? <StudentLogin ></StudentLogin> : 
          ( user == "teacher" ? <TeacherLogin ></TeacherLogin> : <AdminLogin></AdminLogin>)}

          <IconButton
            position="fixed"
            bottom={12}
            left={12}
            icon={<i class="fa-solid fa-message"></i>}
            size="lg"
            variant="outline"
            aria-label="Chatbot"
            colorScheme="orange"
            onClick={handleButtonClick}
          />

        {showBox && (
          <Box position="fixed"
            bottom={24}
            my={1}
            left={12}>
            <Chat />

          </Box>
        )}
        
    </Container>
  )
}

export default LoginPage