import React, { useState } from 'react';
import { Box, Input, Button, Flex, Text, IconButton } from '@chakra-ui/react';


const query = async (data) => {
  const response = await fetch(
    'https://api-inference.huggingface.co/models/deepset/roberta-base-squad2',
    {
      // headers: { Authorization: `Bearer ${process.env.HUGGING_API_KEY}` },
      headers : {Authorization : 'Bearer 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'} ,
      method: 'POST',
      body: JSON.stringify(data),
    }
  );
  const result = await response.json();
  return result;
};

const Chat = () => {
  const [messages, setMessages] = useState([{ sender: 'bot', message: 'Hi, How can i help you today?' }]);
  const [inputValue, setInputValue] = useState('');
  const [context, setContext] = useState("We are WEEPRO CODERS. We teach early year learners coding. We are offering fun-filled and project-based camps of Scratch, Python, HTML, MIT App Inventor, Unity and CS unplugged (Coding without Code) to learners between 5-18 years. \
  Website : https://web.facebook.com/weeProCoders \
  Specialties: Problem Solving, Logic building, Computational Thinking, Creativity, Learning through Gamification, Learning is fun, Playful and engaging classroom experience, Future Skills, Educational Games, Cognition, Abstraction, Learning trajectory, Active classrooms, Adaptive learning, Bridging gap between theory and practice, Brain train, and Coding")

  const handleSendMessage = async () => {
    if (inputValue.trim() !== '') {
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'user', message: inputValue },
      ]);
      setInputValue('');
  
      const response = await query({
        inputs: {
          question: inputValue,
          context: context,
        },
      });
  
      console.log(response);
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'bot', message: response.answer },
      ]);
    }
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <Box
      w="400px"
      p={1}
      border="2px solid orange"
      borderRadius={10}
      backgroundImage={'linear-gradient(to bottom, #fddb92 0%, #d1fdff 100%);'}
    >
      <Box 
        p={2}
        overflowY="scroll" 
        minHeight="300px" 
        maxHeight='400px'
        display={'flex'}
        flexDir={'column'}
        sx={{
            '&::-webkit-scrollbar': {
              width: '8px',
              borderRadius: '8px',
              backgroundColor: 'white',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: `orange.500`,
              borderRadius: '8px',
            },
          }}
        >   
        {messages.map((message, index) => (
          <Box
            key={index}
            mb="10px"
            p="5px"
            borderRadius="5px"
            maxW="80%"
            alignSelf={message.sender === 'user' ? 'flex-end' : 'flex-start'}
            bg={message.sender === 'user' ? 'orange.400' : 'white'}
            color={message.sender === 'user' ? '#fff' : '#000'}
          >
            {message.message}
          </Box>
        ))}
      </Box>

      <Flex mt="10px">
        <Input
          type="text"
          value={inputValue}
          bg='white'
          focusBorderColor='orange.500'
          
          placeholder='Type your question'
          onChange={handleChange}
          mr={2}
        />
        <IconButton
            icon={<i class="fa-solid fa-paper-plane"></i>}
            size="md"
            variant="outline"
            aria-label="Chatbot"
            colorScheme="orange"
            onClick={handleSendMessage}
          />

      </Flex>
    </Box>
  );
};

export default Chat;

