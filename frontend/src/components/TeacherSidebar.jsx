import React, { useEffect, useState } from 'react'
import {
    Button,
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
    FiFileText,
    FiUpload,
    FiUploadCloud,
    FiActivity,
    FiBookmark,
    FiAtSign,
    FiArchive
} from 'react-icons/fi'
import { IoPawOutline } from 'react-icons/io5'
import NavItem from './NavItem'
import axios from "axios"
import LoginPage from '../pages/LoginPage'
import { Link, useLocation } from 'react-router-dom'

export default function TeacherSidebar({navSize, changeNavSize}) {

    // To make links active on Sidebar
    const location = useLocation();
    const route = location.pathname.split("/").pop();

    const [ userID , setUserID] = useState("");
    const [name, setName] = useState("");
    const [ profileimg , setProfileImg] = useState(null);

    const getCuurentUser = () =>
    {
      let logintoken = localStorage.getItem("logintoken")
      console.log("Login Token"+logintoken);
      axios.defaults.headers.common["Authorization"] = `Bearer ${logintoken}`;
      axios.get("http://localhost:5000/teacher/viewprofile")
        .then(res=> {
                console.log(res.data)
                setUserID(res.data._id);
                setName(res.data.name);
                setProfileImg(res.data.profileimg);
                console.log(profileimg)
        }).catch (err=> {
            console.log(err) })
    }

    useEffect(()=>
    {
        getCuurentUser();
    })

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
                as="nav">
                
              
                <NavItem navSize={navSize} icon={'fa-solid fa-user'} title="Account" active={route === "account"} route="account" description={"All About"}/>
                <NavItem navSize={navSize} icon={'fa-sharp fa-solid fa-file-arrow-up'} title="Upload Assignment" active={route === "uploadassignment"} route="uploadassignment"/>
                <NavItem navSize={navSize} icon={'fa-solid fa-folder'} title="View Assignments" active={route === "viewassignments"} route="viewassignments"/>
                <NavItem navSize={navSize} icon={'fa-solid fa-list-check'} title="Upload Quiz" active={route === "uploadquiz"} route="uploadquiz"/>
                <NavItem navSize={navSize} icon={'fa-solid fa-solid fa-boxes-stacked'} title="View Quizzes" active={route === "viewquizzes"} route="viewquizzes"/>
                <NavItem navSize={navSize} icon={'fa-solid fa-calendar'} title="Calendar" active={route === "calendar"} route="calendar" />
                <NavItem navSize={navSize} icon={'fa-solid fa-users'} title="Schedule Class" active={route === "createclass"} route="createclass" />
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

            <form action={"https://localhost:3000/"}>
            <Button m={4} type='submit' colorScheme='orange' variant='solid' _hover={{ bg: '#a85e32' }} px='20px' position={'relative'} left='50px'
            width='150px'>
                Sign out
            </Button> 
            </form>
        </Flex>
    )
}