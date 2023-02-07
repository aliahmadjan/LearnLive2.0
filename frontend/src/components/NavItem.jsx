import React from 'react'
import {
    Flex,
    Text,
    Icon,
    Link,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Tooltip
} from '@chakra-ui/react'
import NavHoverBox from '../components/NavHoverBox'
import { useNavigate } from 'react-router-dom';

export default function NavItem({ icon, title, description, active, navSize, route}) {

    const navigate = useNavigate();

    return (
        <Menu placement="right">
            <Link
                color={active ? 'orange' : "#FFFFFF" }
                _hover={{color: 'orange'}}
                p='2px'
                borderRadius={navSize=="small" ? "full" : "8"}
                w={navSize == "large" && "100%"}
                onClick={() => navigate(route)}                   
            >
                <MenuButton w="100%"  p ='10px'>
                    { navSize == "small" && <i className={icon}></i>}  
                    <Text ml={5} display={navSize == "small" ? "none" : "flex"}>{title}</Text>
                </MenuButton>
            </Link>          
        </Menu>
    )
}