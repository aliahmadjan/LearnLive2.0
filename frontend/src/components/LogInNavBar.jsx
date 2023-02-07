import { Box, Button, HStack, Img, Stack } from '@chakra-ui/react'
import React from 'react'
import useStore from '../store'

const LogInNavBar = () => {

  const changeUser = useStore(state => state.setUser)

  return (
    <Stack justifyContent={"space-between"} p={2}  boxShadow="md" direction={"row"}>
        <Img w={10} src="/abv.jpg"></Img>
        <HStack>
            <Button variant={"outline"} colorScheme="facebook" onClick={ () => changeUser("admin")}>Admin Login</Button>
            <Button variant={"outline"} colorScheme="brand1" onClick={ () => changeUser("teacher")}>Teacher Login</Button>
            <Button colorScheme={"brand1"} onClick={() => changeUser("student")}>Student Login</Button>
        </HStack>
    </Stack>
  )
}

export default LogInNavBar