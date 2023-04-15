import React, { useState, useEffect } from 'react'
import {
    Button,
    Flex,
    Text,
    IconButton,
    Divider,
    Avatar,
    Box,
    Heading,
    Badge,
    Tooltip
} from '@chakra-ui/react'
import {
    FiMenu,
    FiHome,
    FiCalendar,
    FiUser,
    FiBell,
    FiDollarSign,
    FiBriefcase,
    FiSettings,
    FiSquare,
    FiInfo,
    FiPaperclip,
    FiFileText
} from 'react-icons/fi'
import { IoPawOutline } from 'react-icons/io5'
import NavItem from './NavItem'
import axios from "axios"
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDisclosure } from "@chakra-ui/react";
import moment from 'moment';



export default function StudentSidebar({navSize, changeNavSize}) {

    // To make links active on Sidebar
    const location = useLocation();
    const route = location.pathname.split("/").pop();
    const [isLoggedin , setIsLoggedIn] = useState(false);
    const [ userID , setUserID] = useState("");
    const [name, setName] = useState("");
    const [ profileimg , setProfileImg] = useState(null);

    const [showButton , setShowButton] = useState(false)
    const navigate = useNavigate();

    //localStorage.removeItem("unreadCount")
    let unreadCount = localStorage.getItem("unreadCount");
  
    const handleButtonClick = () => {
        const currentPath = location.pathname;
        const targetPath = '/student/notifications';
        if (currentPath === targetPath) {
          navigate(-1);
        } else {
          navigate(targetPath);
        }
      };

      
    const getCuurentUser = () =>
    {
      let logintoken = localStorage.getItem("ltoken")
      axios.defaults.headers.common["Authorization"] = `Bearer ${logintoken}`;
      axios.get("http://localhost:5000/student/viewprofile")
        .then(res=> {
                setUserID(res.data._id);
                setName(res.data.name);
                setProfileImg(res.data.profileimg);
        }).catch (err=> {
            console.log(err) })
    }

    const handleShowNotifications = () =>
    {
        setShowButton(!showButton)
    }

    const handleLogout = () =>
    {
        localStorage.removeItem("logintoken")
        setIsLoggedIn(false)
        navigate('/')
    }

    useEffect(()=>
    {
        getCuurentUser();
        console.log(unreadCount)
    }, [])

    return (
        <Flex
            pos="sticky"
            w={navSize == "small" ? "4%" : "20%"}
            mx="14px"
            flexDir="column"
            justifyContent="space-evenly"
        >

            <IconButton
                background="none"
                mt={4}
                alignSelf='center'
                color='white'
                _hover={{ background: 'gray.100', color: 'orange' }}
                icon={<FiMenu />}
                onClick={() => {
                    if (navSize == "small")
                        changeNavSize("large")

                    else
                        changeNavSize("small")
                } } />

            <Divider variant='dashed' borderColor={'orange.500'} />

            <Flex
                flexDir="column"
                w="100%"
                alignItems={navSize == "small" ? "center" : "flex-start"}
                as="nav"
            >

                <NavItem navSize={navSize} icon={'fa-solid fa-user'} active={route === "account"} title="Account" route="account" />
                <NavItem navSize={navSize} icon={'fa-solid fa-list-check'} active={route === "quizzes"} title="Quizzes" route="quizzes" />
                <NavItem navSize={navSize} icon={'fa-solid fa-folder'} active={route === "assignments"} title="Assignments" route="assignments" />
                <NavItem navSize={navSize} icon={'fa-solid fa-users'} active={route === "viewmeets"} title="Classes" route="viewmeets" />
                <NavItem navSize={navSize} icon={'fa-solid fa-code'} title="Code Editor" active={route === "code-editor-home"} route="code-editor-home" />
                {/* <NavItem navSize={navSize} icon={FiHome} title="Dashboard" description="This is the description for the dashboard." /> */}
                <NavItem navSize={navSize} icon={'fa-brands fa-discord'} title="Discussion Forum" active={route === "discussionforum"} route="discussionforum" />
                {/* <NavItem navSize={navSize} icon={FiInfo} title="Reports" /> */}
                <NavItem navSize={navSize} icon={'fa-solid fa-certificate'} title="Certificate" active={route === "certificate"} route="certificate" />
                <NavItem navSize={navSize} icon={'fa-solid fa-ranking-star'} title="Leaderboard" active={route === "leaderboard"} route="leaderboard" />
                
                
                <NavItem navSize={navSize} icon={'fa-solid fa-calendar'} active={route === "calendar"} title="Calendar" route="calendar" />
                <NavItem navSize={navSize} icon={'fa-solid fa-gear'} title="Settings" active={route === "settings"} route="settings" />

        
          
        <Tooltip label="Notifications">
          <IconButton
            display={navSize == "small" ? "none" : ''}
            aria-label="Notifications"
            color='#FFFFFF'
            icon={<i class="fa-solid fa-bell-concierge"></i>}
            variant="ghost"
           
            onClick={handleButtonClick}
            position="absolute"
            top="30px"
            right="-10px"
          />
        </Tooltip>
         {unreadCount > 0 && ( 
          <Box
            display={navSize == "small" ? "none" : 'flex'}
            position="absolute"
            top="28px"
            right="-10px"
            borderRadius="full"
            bg="red.500"
            color="orange"
            w="15px"
            h="15px"
            alignItems="center"
            justifyContent="center"
            fontSize="sm"
          >
            {unreadCount}
          </Box>
         )} 

     
            {/* <NavItem navSize={navSize} icon={'fa-solid fa-users'} title="Notifications" active={route === "notifications"} route="notifications"/> */}
            
            

        </Flex><Divider variant='dashed' borderColor={'orange.500'} /><Flex flexDir={'column'}>
                <Flex
                    mx="auto"
                    p={2}
                    border='1px solid'
                    borderColor={'white'}
                    width={'90%'}
                    alignItems='center' justifyContent={'center'}
                    borderRadius={30}
                >

                    <Avatar
                        size="sm"
                        src={`https://avatars.dicebear.com/v2/bottts/${name}.svg?`} />

                    <Flex flexDir="column" ml={4} display={navSize == "small" ? "none" : "flex"}>
                        <Heading as="h3" size="sm" color={'white'}>{name}</Heading>
                    </Flex>

                </Flex>

                <Flex width="100%">
                    <Button
                        my={2}
                        borderRadius={navSize == "small" ? "50%" : "4px"}
                        onClick={handleLogout}
                        width={navSize == "small" ? "2px" : "60%"}
                        mx="auto" type='submit' colorScheme='orange' variant='solid' _hover={{ bg: '#a85e32' }} position={'relative'}
                    >
                        {navSize == "small" ? <i class="fa-solid fa-power-off"></i> : "Log Out"}
                    </Button>

                </Flex>
            </Flex>
            
        </Flex>
    )
}