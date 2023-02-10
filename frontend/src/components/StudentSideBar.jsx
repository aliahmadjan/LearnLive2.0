import React, { useState, useEffect } from 'react'
import {
    Flex,
    Text,
    IconButton,
    Divider,
    Avatar,
    Heading
} from '@chakra-ui/react'
import {
    FiMenu,
    FiHome,
    FiCalendar,
    FiUser,
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
import { Link, useLocation } from 'react-router-dom'


export default function StudentSidebar({navSize, changeNavSize}) {

    // To make links active on Sidebar
    const location = useLocation();
    const route = location.pathname.split("/").pop();

    const [ userID , setUserID] = useState("");
    const [name, setName] = useState("");
    const [ profileimg , setProfileImg] = useState(null);

    const getCuurentUser = () =>
    {
      let logintoken = localStorage.getItem("ltoken")
      console.log("Login Token"+logintoken);
      axios.defaults.headers.common["Authorization"] = `Bearer ${logintoken}`;
      axios.get("http://localhost:5000/student/viewprofile")
        .then(res=> {
                console.log(res.data)
                setUserID(res.data._id);
                setName(res.data.name);
                setProfileImg(res.data.profileimg);
        }).catch (err=> {
            console.log(err) })
    }

    useEffect(()=>
    {
        getCuurentUser();
    }, [])

    return (
        <Flex
            pos="sticky"
            left="5"
            m={0}
            w={navSize == "small" ? "75px" : "20%"}
            flexDir="column"     
            justifyContent={'center'}
            position='relative'>

            <IconButton
                background="none"
                mt={4}        
                alignSelf='center'
                position={'absolute'}
                top={4}
                color='white'
                _hover={{background: 'gray.100',  color:'orange' }}
                icon={<FiMenu />}
                onClick={() => {
                    if (navSize == "small")
                        changeNavSize("large")
                    else
                        changeNavSize("small")
                }} />

            <Flex
                flexDir="column"
                w="100%"
                alignItems={navSize == "small" ? "center" : "flex-start"}
                as="nav"
            >
               
                <NavItem navSize={navSize} icon={'fa-solid fa-user'} active={route === "account"} title="Account" route="account" />
                <NavItem navSize={navSize} icon={'fa-solid fa-list-check'} active={route === "quizzes"}  title="Quizzes" route="quizzes" />
                <NavItem navSize={navSize} icon={'fa-solid fa-folder'} active={route === "assignments"} title="Assignments" route="assignments"/>
                <NavItem navSize={navSize} icon={'fa-solid fa-folder'} active={route === "viewmeets"} title="Classes" route="viewmeets"/>

                {/* <NavItem navSize={navSize} icon={FiHome} title="Dashboard" description="This is the description for the dashboard." /> */}
                <NavItem navSize={navSize} icon={'fa-solid fa-calendar'} active={route === "calendar"} title="Calendar" route="calendar" />
                
                {/* <NavItem navSize={navSize} icon={FiInfo} title="Reports" /> */}
                <NavItem navSize={navSize} icon={'fa-solid fa-gear'} title="Settings" active={route === "settings"} route="settings" />

            </Flex>

            <Divider display={navSize == "small" ? "none" : "flex"} variant='dashed' borderColor={'orange.900'} />

            <Flex
                mt={4}
                p={2} 
                align="center" 
                border='1px solid' 
                borderColor={'white'} 
                width={'100%'} 
                alignItems='center' justifyContent={'center'}
                borderRadius={30}>
                
                <Avatar
                    size="sm"
                    src={`https://avatars.dicebear.com/v2/bottts/${name}.svg?`}
                    />
                    
                <Flex flexDir="column" ml={4} display={navSize == "small" ? "none" : "flex"}>
                        <Heading as="h3" size="sm" color={'white'}>{name}</Heading>
                </Flex>

            </Flex>

        </Flex>
    )
}