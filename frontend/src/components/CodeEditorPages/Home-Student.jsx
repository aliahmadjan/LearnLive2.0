import { v4 as uuidV4 } from 'uuid';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import React , {useState, useEffect} from 'react'
import { Box,Button, Heading, Text, Link ,FormControl,FormLabel, Input,RadioGroup,Radio,Stack, InputGroup, Image} from '@chakra-ui/react'
import axios from "axios"
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'

const Home = () => {
    const navigate = useNavigate();

    const [roomId, setRoomId] = useState('');
    const [username, setUsername] = useState('');
    const createNewRoom = (e) => {
        e.preventDefault();
        const id = uuidV4();
        setRoomId(id);
        toast.success('Created a new room');
    };

    const joinRoom = () => {
        if (!roomId || !username) {
            toast.error('ROOM ID & username is required');
            return;
        }

        // Redirect
        navigate(`/student/editor/${roomId}`, {
            state: {
                username,
            },
        });
    };

    const handleInputEnter = (e) => {
        if (e.code === 'Enter') {
            joinRoom();
        }
    };
    return (
        <Box p={2} m='auto' textAlign={'center'} width={'100%'} borderRadius={30}>

      <Box pt={4} pb={2}  >
        <Heading mb={4} >
          Join Room
        </Heading>
      </Box>

      <form onSubmit={joinRoom}>
      <Box p={5} width="60%" mx="auto" textAlign={'start'}>
        
        <Box boxShadow="0px 4px 8px rgba(0, 0, 0, 0.1)" borderRadius='15px' p={4} backgroundColor="#FFFFFF">
            <div>
                Paste Invitation Room ID
            </div>
            <FormControl mb={2} display={'flex'} alignItems='center'>
              <FormLabel fontWeight="bold" color="#F57C00" mr={2}>Room ID</FormLabel>
                <Input
                  textAlign={'center'}
                  focusBorderColor='#F57C00' 
                  variant={'flushed'} 
                  borderBottomColor='orange' 
                  onChange={e=>setRoomId(e.target.value)}
                  onKeyUp={handleInputEnter}
                  value={roomId}
                  id='roomid' name='roomid' label='Room ID'
                  placeholder= "Room ID"
                  isRequired
                  width={'60%'} 
                  mr={0} ml='auto'/>  
            </FormControl>

            <FormControl mb={2} display={'flex'} alignItems='center'>
              <FormLabel fontWeight="bold" color="#F57C00" mr={2}>Username</FormLabel>
              <Input
                textAlign={'center'}
                focusBorderColor='#F57C00' 
                variant={'flushed'} 
                borderBottomColor='orange' 
                onChange={e=>setUsername(e.target.value)}
                onKeyUp={handleInputEnter}
                id='username' name='username' label='Username'
                placeholder= "Username"
                isRequired
                width={'60%'} 
                mr={0} ml='auto'/> 
            </FormControl>
                
          </Box>
        </Box>
              
        <Button mt={4} type='submit' colorScheme='orange' variant='solid' onClick={joinRoom}>
              Join
        </Button>

        <div className="createInfo">
                        If you don't have an invite then create &nbsp;
                        <a
                            onClick={createNewRoom}
                            href=""
                            className="createNewBtn"
                        >
                            new room
                        </a>
        </div>

        </form>

  </Box>
    );
};

export default Home;

