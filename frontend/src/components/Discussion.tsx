// import React, { useEffect } from 'react'
// import { useState } from 'react';
// import {
//   Box,
//   Heading,
//   Text,
//   Input,
//   Button,
//   VStack,
//   HStack,
//   Divider,
// } from '@chakra-ui/react';
// import { db , db1 }  from "./firebase.js"
// import { collection,addDoc,getDocs,doc } from  "firebase/firestore";
// import axios from "axios"

// const Discussion = () => {
//   const [sendmessages, setSendMessages] = useState([]);
//   const [getmessages , setGetMessages] = useState([])
//   const [name, setName] = useState("");
//   const getCurentUser = () =>
//   {
//     let logintoken = localStorage.getItem("logintoken")
//     axios.defaults.headers.common["Authorization"] = `Bearer ${logintoken}`;
//     axios.get("http://localhost:5000/teacher/viewprofile")
//       .then(res=> {
              
//               setName(res.data.name);
             
//       }).catch (err=> {
//           console.log(err) })
//   }
// const handleSendMessage = (e) => {
//     e.preventDefault();
//     const messageInput = e.target.elements.message;
//     const newMessage = {
//       text: messageInput.value,
//       timestamp: new Date(),
//       sender: `${name}`,
//     };
//     const channelId = window.location.pathname.split('/').pop();
//     const channelRef = db1.collection('channels').doc(channelId);
//     channelRef.collection('messages').add(newMessage)
//       .then(() => {
//         console.log('Message sent successfully!');
//       })
//       .catch((error) => {
//         console.error('Error sending message: ', error);
//       });
//     setSendMessages([...sendmessages, newMessage]);
//     messageInput.value = '';
//   };
  
// //   const retrieveMessages = () =>
// //   {
// //     const channelId = window.location.pathname.split('/').pop();
// //     const channelRef = db1.collection("channels").doc(channelId);

// // channelRef.collection("messages").get().then((querySnapshot) => {
// //   const messages = [];
// //   querySnapshot.forEach((doc) => {
// //     messages.push(doc.data());
// //   });
// //   setGetMessages(messages)
// //   //console.log(messages);
// // }).catch((error) => {
// //   console.log("Error getting messages: ", error);
// // });
// //   }

// const retrieveMessages = () => {
//     const channelId = window.location.pathname.split('/').pop();
//     const channelRef = db1.collection("channels").doc(channelId);
  
//     channelRef.collection("messages").onSnapshot((querySnapshot) => {
//       const messages = [];
//       querySnapshot.forEach((doc) => {
//         messages.push(doc.data());
//       });
//       setGetMessages(messages)
//     }, (error) => {
//       console.log("Error getting messages: ", error);
//     });
//   }
  




//   useEffect(()=>
// {
//     retrieveMessages();
//     getCurentUser();
// }, [getmessages])
  

//   return (
//     <Box borderWidth="1px" borderRadius="md" p="4">
//       <Heading as="h2" size="lg" mb="2">
//         Messages
//       </Heading>
//       <Divider mb="4" />
//       <VStack spacing="4" align="stretch">
//         {getmessages.map((message, index) => (
//           <Box key={index} borderWidth="1px" borderRadius="md" p="4">
//             <HStack justifyContent="space-between">
//               <Text fontWeight="bold">{message.sender}</Text>
//               <Text fontSize="sm" color="gray.500">
//                 {/* {message.timestamp.toLocaleString()} */}
//               </Text>
//             </HStack>
//             <Text mt="2">{message.text}</Text>
//           </Box>
//         ))}
//       </VStack>
//       <form onSubmit={handleSendMessage}>
//         <HStack mt="4">
//           <Input
//             name="message"
//             placeholder="Type your message"
//             size="md"
//             borderRadius="full"
//           />
         
//           <Button type="submit" colorScheme="blue" px="8">
//             Send
//           </Button>
//         </HStack>
//       </form>
//     </Box>
//   );
// }


// export default Discussion

import WidgetBot from '@widgetbot/react-embed'
import React, { useState , useEffect } from 'react'

type DiscussionProps = {
    channelId : string;
    height?: string | number;
    width?: string | number;
};

export const DiscussionChat = ({channelId, 
    height ="635" ,
     width ="1200"
}: DiscussionProps) : JSX.Element =>
{
    const [isReady , setIsReady] = useState(false);

    useEffect(()=>
    {
            setIsReady(true)
    },[])

    if(!isReady) return <></>
    return(
        <WidgetBot
    server="1089483253804703834"
    channel={channelId}
    width={width}
    height={height}
/>
    )
}