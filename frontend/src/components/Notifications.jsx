import React, { useState, useEffect , createContext, useContext  } from "react";
import {nanoid} from 'nanoid'
import {
  Box,
  Button,
  Avatar,
  Heading,
  IconButton,
  Tooltip,
  Text,
  Link,
  FormControl,
  FormLabel,
  Input,
  RadioGroup,
  Radio,
  Stack,
  InputGroup,
  Flex,
  SimpleGrid,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from "@chakra-ui/react";
import axios from "axios";
import { Divider } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import moment from 'moment';


const Notifications = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [latestAssignment, setLatestAssignment] = useState([]);
  const [quizzes , setQuizzes] = useState([])
  //const [selectedItem , setSelectedItem] = useState()
  
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  const notifications = [...quizzes, ...latestAssignment].sort((a, b) => new Date(b.uploadeddate) - new Date(a.uploadeddate));
  const [unreadCount, setUnreadCount] = useState(0);
  const [unreadACount , setUnreadACount] = useState(0);
  
  const [selectedItem, setSelectedItem] = React.useState(() => {
    // initialize the selected item to the value in local storage, if available
    const storedItem = localStorage.getItem('selectedItem');
    return storedItem ? JSON.parse(storedItem) : null;
  });


  // const getAllAssignments = () => {
  //   axios.get("http://localhost:5000/tchassignments/samestdassign")
  //     .then((res) => {
  //       setLatestAssignment(res.data);
  //       const newCount = res.data.length;
  //       console.log("Assignments Count", newCount);
  //       // Only set the unread count in local storage when the component mounts
  //       if (!localStorage.getItem("unreadCount")) {
  //         localStorage.setItem("unreadCount", newCount);
  //         setUnreadCount(newCount);
  //       } else {
  //         setUnreadCount(parseInt(localStorage.getItem("unreadCount")));
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };
  

  // const getAllQuizzes = () =>
  // {
  //   axios.get('http://localhost:5000/quizzes/samestdquiz')
  //   .then((res) =>{
  //       setQuizzes(res.data)
  //       const newCount = res.data.length;
  //       console.log("Quizzes Count", newCount);
  //       // Only set the unread count in local storage when the component mounts
  //       if (!localStorage.getItem("unreadCount")) {
  //         localStorage.setItem("unreadCount", newCount);
  //         setUnreadCount(newCount);
  //       } else {
  //         setUnreadCount(parseInt(localStorage.getItem("unreadCount")));
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }

  // useEffect(() => {
 
  //     getAllAssignments();
  //     getAllQuizzes();
  
  // }, []);

  const getAllAssignmentsAndQuizzes = () => {
    Promise.all([
       axios.get("http://localhost:5000/tchassignments/samestdassign"),
       //.then((res=>
      // {
      //   setLatestAssignment(res.data)
      // })).catch((err=>
      //   {
      //     console.log(err)
      //   })),
       axios.get("http://localhost:5000/quizzes/samestdquiz")
       //.then((res=>
      // {
      //   setQuizzes(res.data)
      // })).catch((err=>
      //   {
      //     console.log(err)
      //   }))
    ])
      .then((responses) => {
        setLatestAssignment(responses[0].data)
        const assignmentsCount = responses[0].data.length;
        setQuizzes(responses[1].data)
        const quizzesCount = responses[1].data.length;
        console.log("Assignments Count:", assignmentsCount);
        console.log("Quizzes Count:", quizzesCount);
        const newCount = assignmentsCount + quizzesCount;
        console.log(newCount)
        // const oldCount = parseInt(localStorage.getItem("unreadCount")) || 0;
        // const totalCount = oldCount + newCount;
        // localStorage.setItem("unreadCount", totalCount);
        //setUnreadCount(totalCount);
        if (!localStorage.getItem("unreadCount")) {
          localStorage.setItem("unreadCount", newCount);
          setUnreadCount(newCount);
        } else {
          setUnreadCount(parseInt(localStorage.getItem("unreadCount")));
          localStorage.setItem("unreadCount", parseInt(localStorage.getItem("unreadCount")));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
  useEffect(() => {
    getAllAssignmentsAndQuizzes();
  }, []);
  

  useEffect(() => {
    const storedSelectedItem = localStorage.getItem('selectedItem');
    if (storedSelectedItem) {
      setSelectedItem(JSON.parse(storedSelectedItem));
    }
  }, []);

 

  const renderAssignmentNotification = (notification) => {
    
  
    const handleNotificationAView = (sassignment_viewid) => {
      
       const assign = parseInt(localStorage.getItem('unreadCount'))
       console.log("Current count: ", assign);
       if (assign > 0) {
       const newCount = assign - 1;
         console.log("New count: ", newCount);
         localStorage.setItem('unreadCount', newCount);
     }
       localStorage.setItem('sassignment_viewid', sassignment_viewid);
       navigate("/student/viewassignment");
    //   setSelectedItem(sassignment_viewid);
    //  localStorage.setItem('selectedItem', JSON.stringify(sassignment_viewid));
    };
  
  
  
    const notificationColor = selectedItem === notification._id ? 'blue.50' : 'red.50';

    return (
      <Box
        key={notification._id}
        bg={notificationColor}
        py={2}
        px={4}
        borderRadius={4}
        mb={2}
        _hover={{ bg: 'gray.100', cursor: 'pointer' }}
        onClick={() => 
            handleNotificationAView(notification._id)
          }
      >
        <Flex align="center">
          <Avatar size="md" name={notification.campname} src={notification.image} />
          <Box ml={2} flex="1">
            <Text fontSize="md">
              <b> Assigment: {notification.title} </b> of {notification.campname}
            </Text>
            <Text fontSize="md" color="gray.500">
              {moment(notification.uploadeddate).fromNow()}
            </Text>
          </Box>
        </Flex>
      </Box>
    );
  };

  
  const renderQuizNotification = (notification) => {

    const handleNotificationQView = (quiz_viewid) => {
      const quiz = parseInt(localStorage.getItem('unreadCount'))
       console.log("Current Quiz count: ", quiz);
       if (quiz > 0) {
       const newQCount = quiz - 1;
         console.log("New Quiz count: ", newQCount);
         localStorage.setItem('unreadCount', newQCount);
     }
       localStorage.setItem('quiz_viewid', quiz_viewid);
       navigate("/student/attemptquiz");
      
      // setSelectedItem(quiz_viewid);
      // localStorage.setItem('selectedItem', JSON.stringify(quiz_viewid));
    };


    const notificationColor = selectedItem === notification._id ? 'blue.50' : 'red.50';
    return (
      
        <Box
          key={notification._id}
          bg={notificationColor}
          
          py={2}
          px={4}
          borderRadius={4}
          mb={2}
          _hover={{ bg: 'gray.100', cursor: 'pointer' }}
          onClick={() => 
    
              handleNotificationQView(notification._id)
          
            }
        >
          <Flex align="center">
            <Avatar size="md" name={notification.campname} src={notification.image} />
            <Box ml={2} flex="1">
              <Text fontSize="md">
                <b> Quiz: {notification.quizno} </b> of {notification.campname}
              </Text>
              <Text fontSize="md" color="gray.500">
                {moment(notification.uploadeddate).fromNow()}
              </Text>
            </Box>
          </Flex>
        </Box>
      );
  };
  
  
  

  return (
    <>
      
  <Box p={4} bg="white" boxShadow="lg" height="100%">
    <Heading size="md" mb={2}>
      Notifications
    </Heading>
    <Divider mb={2} />

    {notifications.map((notification) => {
      //let key = nanoid();
    if (latestAssignment.some((item) => item._id === notification._id)) {
      return renderAssignmentNotification(notification);
    } else if (quizzes.some((item) => item._id === notification._id)) {
      return renderQuizNotification(notification);
    }
  })}


  </Box>
{/* )} */}
    </>
  );
};

export default Notifications;
