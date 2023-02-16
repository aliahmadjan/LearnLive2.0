import { Heading, Text, VStack, Flex, Container, SimpleGrid, GridItem, FormControl, FormLabel, Input, Button, Image, color } from '@chakra-ui/react'
import React, {useContext,useEffect, useState} from 'react'
import LogInNavBar from '../components/LogInNavBar'
import useStore from '../store'
import axios from "axios"
import { useNavigate } from 'react-router-dom'

const ViewProfileTeacher = () =>
{
        const [name, setName] = useState('');
        const [email, setEmail] = useState('');
        const [gender , setGender] = useState('');
        const [phoneno , setPhoneNo] = useState('');

        const getCurrTeacher = ()=>
        {
            let logintoken = localStorage.getItem("logintoken")
      axios.defaults.headers.common["Authorization"] = `Bearer ${logintoken}`;
      axios.get("http://localhost:5000/teacher/viewprofile")
        .then(res=> {
                //setUserID(res.data._id);
                setName(res.data.name);
                setEmail(res.data.email);
                setGender(res.data.gender);
                setPhoneNo(res.data.phoneno);
        }).catch (err=> {
            console.log(err) })
        }

        useEffect(()=>
        {
            getCurrTeacher();
        })

    return(

        <Text fontSize='50px' width='140px'>
           {name}
        </Text>

    );
};

export default ViewProfileTeacher;