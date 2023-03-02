import React, { useState, useEffect } from 'react'
import {
    Button,
    Flex,
    Text,
    IconButton,
    Divider,
    Img,
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
    FiSave,
    FiTerminal
} from 'react-icons/fi'
import { IoPawOutline } from 'react-icons/io5'
import NavItem from './NavItem'
import axios from "axios"
import { useNavigate, useParams, useLocation} from "react-router-dom";

export default function AdminSidebar({navSize, changeNavSize}) {

    const location = useLocation();
    const route = location.pathname.split("/").pop();

    //console.log(route)
    
    const [ userID , setUserID] = useState("");
    const [name, setName] = useState("");
    const [ profileimg , setProfileImg] = useState(null);
    
    const naviagte = useNavigate();

    const getCuurentUser = () =>
    {
        if(!localStorage.getItem("logintoken"))
        {
                naviagte('/');
        }
      let logintoken = localStorage.getItem("logtoken")
      axios.defaults.headers.common["Authorization"] = `Bearer ${logintoken}`;
      axios.get("https://learnlive.onrender.com/admin/viewprofile")
        .then(res=> {
                //console.log(res.data)
                setUserID(res.data._id);
                setName(res.data.name);
                setProfileImg(res.data.profileimg)
        }).catch (err=> {
            console.log(err) })
    }


     useEffect(()=>
     {
         getCuurentUser();
    },[])
    
    return (
        <Flex
            pos="sticky"
            left="5"
            m={0}
            w={navSize == "small" ? "75px" : "20%"}
            flexDir="column"
            
            justifyContent={'center'}
            position='relative'
        >
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
                    }}
                />

            <Flex
                flexDir="column"
                w="100%"
                alignItems={navSize == "small" ? "center" : "flex-start"}
                as="nav"
            >
                <NavItem navSize={navSize} icon={'fa-solid fa-user'} title="Account" route="account" active={route === "account"} description="All About You" />
                <NavItem navSize={navSize} icon ={'fa-solid fa-person-circle-plus'} title="Add Teachers" active={route === "addteachers"} route="addteachers"/>
                <NavItem navSize={navSize} icon ={"fa-solid fa-users"} title="View Teachers" active={route === "viewteachers"} route="viewteachers"/>               
                <NavItem navSize={navSize} icon ={"fa-sharp fa-solid fa-user-plus"} title="Add Students" active={route === "addstudents"} route="addstudents"/>
                <NavItem navSize={navSize} icon ={"fa-sharp fa-solid fa-users-line"} title="View Students" active={route === "viewstudents"} route="viewstudents"/>
                <NavItem navSize={navSize} icon ={"fa-solid fa-tent"} title="Add Camp" active={route === "addcamp"} route="addcamp"/>
                <NavItem navSize={navSize} icon={"fa-solid fa-tents"} title="View Camps" active={route === "viewcamps"} route="viewcamps"/>
                <NavItem navSize={navSize} icon={"fa-solid fa-gear"} title="Settings" active={route === "settings"} route="settings"/>
            </Flex>

            <Flex
                p="5%"
                flexDir="column"
                w="100%"
                alignItems={navSize == "small" ? "center" : "flex-start"}
                mb={4}
            >
                           
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
                
                {/* <form action={"http://localhost:3000/"}>
                <Button m={4} type='submit' colorScheme='orange' variant='solid' _hover={{ bg: '#a85e32' }} px='20px' position={'relative'} left='50px'
                width='150px'>
                    Sign out
                </Button> 
                </form> */}
            </Flex>
            
        </Flex>
    )
}