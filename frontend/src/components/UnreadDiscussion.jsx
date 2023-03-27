  import React from 'react'
  import { useState , useEffect} from 'react';
import {
  Box,
  Heading,
  Text,
  Input,
  Button,
  VStack,
  HStack,
  Divider,
} from '@chakra-ui/react';
import { db , db1 }  from "./firebase.js"
import { collection,addDoc,getDocs,doc } from  "firebase/firestore";
import axios from "axios"
  
  const  UnreadDiscussion = () => {


    const [unreadCount, setUnreadCount] = useState(0);
    const channelId = window.location.pathname.split('/').pop();
  
   
// Function to mark all unread messages in a channel as read
const markChannelAsRead = (channelId) => {
    
    const channelRef = db1.collection('channels').doc(channelId);
    const messagesRef = channelRef.collection('messages');
    
    messagesRef.where('unread', '==', true).get()
      .then((querySnapshot) => {
        const batch = db.batch();
        querySnapshot.forEach((doc) => {
          const messageRef = messagesRef.doc(doc.id);
          batch.update(messageRef, { unread: false });
        });
        return batch.commit();
      })
      .then(() => {
        console.log('Channel marked as read');
      })
      .catch((error) => {
        console.error('Error marking channel as read:', error);
      });
  }
  
  // Function to listen for new messages and update the unread messages count
  const listenForNewMessages = (channelId, setUnreadCount) => {
    const channelRef = db1.collection('channels').doc(channelId);
    const messagesRef = channelRef.collection('messages');
    
    // Listen for new messages
    messagesRef.where('unread', '==', true).onSnapshot((querySnapshot) => {
      const count = querySnapshot.size;
      setUnreadCount(count);
    });
    
    // Listen for changes to existing messages
    messagesRef.onSnapshot((querySnapshot) => {
      querySnapshot.docChanges().forEach((change) => {
        if (change.type === 'modified' && change.doc.data().unread) {
          setUnreadCount((count) => count + 1);
        }
      });
    });
  }

   // Listen for new messages and update the unread count
   useEffect(() => {
    listenForNewMessages(channelId, setUnreadCount);
  }, [channelId]);
  
  // Mark the channel as read when the component unmounts
  useEffect(() => {
    return () => {
      markChannelAsRead(channelId);
    }
  }, [channelId]);

    return (
      <div>UnreadDiscussion</div>
    )
  }
  
  export default UnreadDiscussion
  
  
  