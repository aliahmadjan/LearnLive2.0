import React, { useState, useRef, useEffect } from 'react';
import toast from 'react-hot-toast';
import ACTIONS from '../CodeEditorComponents/Code-Actions';
import Client from '../CodeEditorComponents/Code-Client';
import Editor from '../CodeEditorComponents/Code-Editor';
import { Navigate } from 'react-router-dom';
import { Textarea } from '@chakra-ui/react'
import { Box,Button, Heading, Text, Link ,FormControl,FormLabel, Input,RadioGroup,Radio,Stack, InputGroup, Image} from '@chakra-ui/react'
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
    

    function leaveRoom() {
        let path = `localhost:3000/student/code-editor-home`; 
        navigate(path);
    }

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

        <Box p={5} width="60%" mx="auto" textAlign={'start'}>

            <Box boxShadow="0px 4px 8px rgba(0, 0, 0, 0.1)" borderRadius='15px' p={4} backgroundColor="#FFFFFF">
                    <div className="aside">
                        <div className="asideInner">
                            <h3>Connected</h3>
                            <div className="clientsList">
                                {clients.map((client) => (
                                    <Client
                                        key={client.socketId}
                                        username={client.username}
                                    />
                                ))}
                            </div>
                        </div>
                        <Button mt={4} type='submit' colorScheme='teal' variant='solid' onClick={copyRoomId}>
                            Copy Room ID
                        </Button>
                        <br></br>
                        <Button mt={4} type='submit' colorScheme='orange' variant='solid' onClick={leaveRoom}>
                            Leave
                        </Button>
                    </div>
            </Box> 
            <Box boxShadow="0px 4px 8px rgba(0, 0, 0, 0.1)" borderRadius='15px' p={4} backgroundColor="#FFFFFF">
                    <div className="editorWrap">
                        <Select
                            onChange={(e) => setLanguageValue(e.target.value)}
                            defaultValue={languageValue}
                        >
                            {options.map((option, idx) => (
                            <option key={idx}>{option}</option>
                            ))}
                        </Select>
                        <Editor
                            socketRef={socketRef}
                            roomId={roomId}
                            onCodeChange={(code) => {
                                codeRef.current = code;
                                setInputValue(code);
                            }}
                        />
                    </div> 
                    <Button mt={4} type='submit' colorScheme='orange' variant='solid' onClick={runCode}>
                            Run
                    </Button>
            </Box>
            <Box boxShadow="0px 4px 8px rgba(0, 0, 0, 0.1)" borderRadius='15px' p={4} backgroundColor="#FFFFFF">
                <Text mb='8px'>Output</Text>
                    <Textarea 
                        isDisabled
                        value={outputValue}
                        placeholder='Output of code'
                        size='sm'
                    />
            </Box>
        </Box>
    );
};

export default EditorPage;