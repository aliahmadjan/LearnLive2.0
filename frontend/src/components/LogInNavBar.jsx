import { Box, Button, HStack, Img, Stack } from '@chakra-ui/react'
import React from 'react'
import useStore from '../store'

const LogInNavBar = () => {

  const changeUser = useStore(state => state.setUser)

  return (
    <Stack justifyContent={"space-between"} p={2}  boxShadow="md" direction={"row"}>
        <Img width="140px" src="LearnLiveLogo.png"></Img>
        <HStack gap={4} px={40}>
            <Button variant="link" colorScheme="linkedin" onClick={ () => changeUser("admin")}>Admin Login</Button>
            <Button variant="link" colorScheme="pink" onClick={ () => changeUser("teacher")}>Teacher Login</Button>
            <Button variant="link" colorScheme={"brand1"} onClick={() => changeUser("student")}>Student Login</Button>
        </HStack>
    </Stack>
  )
}

export default LogInNavBar