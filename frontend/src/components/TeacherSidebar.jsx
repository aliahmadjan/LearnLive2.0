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
import { useNavigate, useParams} from "react-router-dom";

export default function TeacherSidebar({navSize, changeNavSize}) {

    // To make links active on Sidebar
    const location = useLocation();
    const route = location.pathname.split("/").pop();
    const [isLoggedin , setIsLoggedIn] = useState(false);
    const [ userID , setUserID] = useState("");
    const [name, setName] = useState("");
    const [ profileimg , setProfileImg] = useState(null);
    const navigate = useNavigate();
    

    const getCuurentUser = () =>
    {
      let logintoken = localStorage.getItem("logintoken")
      axios.defaults.headers.common["Authorization"] = `Bearer ${logintoken}`;
      axios.get("http://localhost:5000/teacher/viewprofile")
        .then(res=> {
                setUserID(res.data._id);
                setName(res.data.name);
                setProfileImg(res.data.profileimg);
        }).catch (err=> {
            console.log(err) })
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
    })

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
                _hover={{background: 'gray.100',  color:'orange' }}
                icon={<FiMenu />}
                onClick={() => {
                    if (navSize == "small")
                        changeNavSize("large")
                    else
                        changeNavSize("small")
                }} />

            <Divider variant='dashed' borderColor={'orange.500'} />

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
                <NavItem navSize={navSize} icon={'fa-solid fa-users'} title="View Classes" active={route === "viewclass"} route="viewclass" />
                <NavItem navSize={navSize} icon={'fa-solid fa-gear'} title="Settings" active={route === "settings"} route="settings" />
                

            </Flex>

            <Divider variant='dashed' borderColor={'orange.500'} />

            <Flex flexDir={'column'}>
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
                        src={`https://avatars.dicebear.com/v2/bottts/${name}.svg?`}
                        />
                        
                    <Flex flexDir="column" ml={4} display={navSize == "small" ? "none" : "flex"}>
                            <Heading as="h3" size="sm" color={'white'}>{name}</Heading>
                    </Flex>

                </Flex>

                <Flex width = "100%">
                    <Button
                    my={2}
                    borderRadius={navSize == "small" ? "50%" : "4px"}
                    onClick={handleLogout}
                    width={navSize == "small" ? "2px" : "60%"}
                    mx="auto" type='submit' colorScheme='orange' variant='solid' _hover={{ bg: '#a85e32' }} position={'relative'} 
                    >
                        {navSize == "small" ? <i class="fa-solid fa-power-off"></i> : "Log Out" }
                    </Button>    

                </Flex>
            </Flex>
            
           
        </Flex>
    )
}