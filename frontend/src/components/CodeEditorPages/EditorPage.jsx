import React, { useState, useRef, useEffect } from 'react';
import toast from 'react-hot-toast';
import ACTIONS from '../CodeEditorComponents/Code-Actions';
import Client from '../CodeEditorComponents/Code-Client';
import Editor from '../CodeEditorComponents/Code-Editor';
import { Navigate } from 'react-router-dom';
import { Textarea } from '@chakra-ui/react'
import { Box,Button, Heading, Text, SimpleGrid ,Card,CardHeader, Avatar,RadioGroup,Radio,Stack, InputGroup, Image, Flex} from '@chakra-ui/react'
import axios from "axios"
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Select
} from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'
import { initSocket } from '../CodeEditorComponents/Code-Socket';
import {
    useLocation,
    useNavigate,
    useParams,
} from 'react-router-dom';

const EditorPage = () => {
    const socketRef = useRef(null);
    const codeRef = useRef(null);
    const location = useLocation();
    const { roomId } = useParams();
    const reactNavigator = useNavigate();
    const [clients, setClients] = useState([]);
    let navigate = useNavigate(); 

    useEffect(() => {
        const init = async () => {
            socketRef.current = await initSocket();
            socketRef.current.on('connect_error', (err) => handleErrors(err));
            socketRef.current.on('connect_failed', (err) => handleErrors(err));

            function handleErrors(e) {
                console.log('socket error', e);
                toast.error('Socket connection failed, try again later.');
                reactNavigator('/');
            }

            socketRef.current.emit(ACTIONS.JOIN, {
                roomId,
                username: location.state?.username,
            });

            // Listening for joined event
            socketRef.current.on(
                ACTIONS.JOINED,
                ({ clients, username, socketId }) => {
                    if (username !== location.state?.username) {
                        toast.success(`${username} joined the room.`);
                        console.log(`${username} joined`);
                    }
                    setClients(clients);
                    socketRef.current.emit(ACTIONS.SYNC_CODE, {
                        code: codeRef.current,
                        socketId,
                    });
                }
            );

            // Listening for disconnected
            socketRef.current.on(
                ACTIONS.DISCONNECTED,
                ({ socketId, username }) => {
                    toast.success(`${username} left the room.`);
                    setClients((prev) => {
                        return prev.filter(
                            (client) => client.socketId !== socketId
                        );
                    });
                }
            );
        };
        init();
        return () => {
            socketRef.current.disconnect();
            socketRef.current.off(ACTIONS.JOINED);
            socketRef.current.off(ACTIONS.DISCONNECTED);
        };
    }, []);

    let [outputValue, setOutputValue] = React.useState('')
    let [inputValue, setInputValue] = React.useState('')
    const options = ["Javascript", "Python", "C++", "Java","C","C#","Swift"];
    const [languageValue, setLanguageValue] = useState(options[0]);

    let handleInputChange = (e) => {
        let outputValue = e.target.value
        setOutputValue(outputValue)
    }

    async function copyRoomId() {
        try {
            await navigator.clipboard.writeText(roomId);
            toast.success('Room ID has been copied to your clipboard');
        } catch (err) {
            toast.error('Could not copy the Room ID');
            console.error(err);
        }
    }
    

    // function leaveRoom() {
    //     let path = `localhost:3000/student/code-editor-home`; 
    //     navigate(path);
    // }

    function runCode() {
        const encodedParams = new URLSearchParams();
        if (languageValue == "Javascript"){
            encodedParams.append("LanguageChoice", "17");
        }
        else if (languageValue == "C++"){
            console.log("YO")
            encodedParams.append("LanguageChoice", "7");
        }
        else if (languageValue == "Python"){
            encodedParams.append("LanguageChoice", "5");
        }
        else if (languageValue == "Java"){
            encodedParams.append("LanguageChoice", "4");
        }
        else if (languageValue == "C"){
            encodedParams.append("LanguageChoice", "6");
        }
        else if (languageValue == "C#"){
            encodedParams.append("LanguageChoice", "1");
        }
        else if (languageValue == "Swift"){
            encodedParams.append("LanguageChoice", "37");
        }
        else {
            encodedParams.append("LanguageChoice", "17");
        }
        encodedParams.append("Program", inputValue);

        const options = {
        method: 'POST',
        url: 'https://code-compiler.p.rapidapi.com/v2',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'X-RapidAPI-Key': '655fb080b5msh340797ca7ef42d0p1c0c46jsn07a9765cd792',
            'X-RapidAPI-Host': 'code-compiler.p.rapidapi.com'
        },
        data: encodedParams
        };

        axios.request(options).then(function (response) {
            console.log(response.data)
            if (response.data.Result == null){
                setOutputValue("Error in your code.")
            }
            else {
                setOutputValue(response.data.Result)
            }
        }).catch(function (error) {
            console.error(error);
        });

        
    }

    if (!location.state) {
        return <Navigate to="/" />;
    }

    return (

        <Box p={5} width="95%" m="auto" textAlign={'start'}>


            <Flex width={'100%'} gap={4}>
                <Flex width={'20%'} direction={'column'} textAlign={'center'} justifyContent={'space-around'}>
                    
                    <Box>
                        <Heading size='md'>People</Heading>
                        <SimpleGrid 
                            width={'90%'} 
                            overflowY='auto' 
                            maxHeight={'32vh'} 
                            mx='auto' 
                            minChildWidth='120px' 
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

                            {clients.map((client) => (
                            <Card key={client.socketId} m={2} justifyContent={'center'}>
                                <CardHeader>
                                <Flex spacing='4' alignItems='center' justifyContent={'space-evenly'}>
                                    
                                    <Avatar name={client.username} />

                                    <Flex justifyContent={'space-evenly'} alignItems='center' flexWrap='wrap'>
                                    <Box>
                                        <Heading size='sm'>{client.username}</Heading>
                                    </Box>
                                    </Flex>                                

                                </Flex>

                                </CardHeader>
                
                            </Card>
                            ))}
                        </SimpleGrid>
                    </Box>

                    <Box>
                        <Heading size='md'>Room Options</Heading>
                        <Button mt={4} type='submit' colorScheme='teal' variant='solid' onClick={copyRoomId}>
                            Copy Room ID
                        </Button>
                        
                        {/* <Button mt={4} type='submit' colorScheme='orange' variant='solid' onClick={leaveRoom}>
                            Leave
                        </Button> */}
                    </Box>

                </Flex>


                        
                <Flex width={'80%'} flexDir={'column'} gap={4}>
                    <Box width={'100%'} boxShadow="0px 4px 8px rgba(0, 0, 0, 0.1)" borderRadius='8px' p={4} backgroundColor="#FFFFFF">
                        <div className="editorWrap">
                            <Flex alignItems={'center'} gap={2} py={2}>
                                <Select
                                    onChange={(e) => setLanguageValue(e.target.value)}
                                    defaultValue={languageValue}
                                >
                                    {options.map((option, idx) => (
                                    <option key={idx}>{option}</option>
                                    ))}
                                </Select>

                                <Button type='submit' colorScheme='orange' variant='solid' onClick={runCode}>
                                Run
                                </Button>

                            </Flex>
                            <Editor
                                socketRef={socketRef}
                                roomId={roomId}
                                onCodeChange={(code) => {
                                    codeRef.current = code;
                                    setInputValue(code);
                                }}
                            />
                        </div> 
                        
                    </Box>

                    <Box textAlign={'center'} boxShadow="0px 4px 8px rgba(0, 0, 0, 0.1)" borderRadius='8px' p={4} backgroundColor="#FFFFFF">
                        <Text mb='8px'>Output</Text>
                            <Textarea 
                                borderColor={'orange'}
                                resize={'none'}
                                isReadOnly
                                value={outputValue}
                                placeholder='Output of code'
                                size='sm'
                            />
                    </Box>
                </Flex>
            </Flex>
            
        </Box>
    );
};

export default EditorPage;