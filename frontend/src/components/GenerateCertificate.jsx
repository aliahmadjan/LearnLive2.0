import { Grid, Image,Box,Button, Heading,Input, Text, FormControl, FormLabel, Center } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams} from "react-router-dom";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react'

const GenerateCertificate = () =>
{
    const [userID , setUserID] = useState();
    const [name, setName] = useState("");
    const [campname , setCampName] = useState([])
    const [startdate , setStartDate] = useState([])
    const [enddate , setEndDate] = useState([])
    const [camp_details , setCampDetails] = useState([])
    const [issued_date , setIssuedDate] = useState("")

    const getSingleUser = ()=>
    {
      axios.get('http://localhost:5000/student/getstudent/:', {params : {id: localStorage.getItem('student_certid')}})
      .then(res=> {
        setName(res.data.name);
        setCampName(res.data.campname)
        }).catch (err=> {
    console.log(err) })
    }

    const CampSDates = () =>
    {
        axios.get(`http://localhost:5000/camp/getcampsdates/${localStorage.getItem("student_certid")}`)      
        .then(res=> {
            setStartDate(res.data) 
            }).catch (err=> {
        console.log(err) })
    }

    const CampEDates = () =>
    {
        axios.get(`http://localhost:5000/camp/getcampedates/${localStorage.getItem("student_certid")}`)
       
        .then(res=> {
            setEndDate(res.data) 
            }).catch (err=> {
        console.log(err) })
    }
    

    useEffect(()=>
    {
        getSingleUser();
        CampSDates();
        CampEDates();
    },[])

    const GenerateCert = (e) =>
    {
        
        e.preventDefault();
        const formData = new FormData();
        

       axios.post("http://localhost:5000/certificate/generatecert",{  
        student_name: name,
        campname : campname,
        startdate: startdate,
        enddate:enddate,
        issued_date : issued_date
    })
        .then((res)=>
        {       res.json()
                console.log("Clicked")
        }).catch((err)=>
        {

        })

    }

    return(
        <Box pt={0} px={0} mx='auto' textAlign={'center'} width={'90%'} borderRadius={30}>

        <Box pt={4} pb={2}  >
          <Heading mb={4} >
            Generate Certificate
          </Heading>
          <Text mb={6}>
            Here you can Generate Certificate for a Student!
          </Text>
       
      <Box border={'1px solid orange'} borderRadius='20px' p={4} >

        <FormControl mb={2} display={'flex'} alignItems='center'>
            <FormLabel fontWeight="bold" color="orange.500" mr={2}>
              Name:
            </FormLabel>
            <Input textAlign={'center'} 
                  focusBorderColor='orange.700' 
                  variant={'flushed'} 
                  borderBottomColor='orange' 
                  width={'60%'} 
                  mr={0} ml='auto' 
                  id='name' name='name' label='Name'
                  value={name}
                  defaultValue={name}
                  isRequired
            />
          </FormControl>

          

{campname.map((campname) => (

    <FormControl mb={2} display={'flex'} alignItems='center'>
        <FormLabel fontWeight="bold" color="orange.500" mr={2}>
            Campname:
        </FormLabel>
        <Input textAlign={'center'}
            focusBorderColor='orange.700'
            variant={'flushed'}
            borderBottomColor='orange'
            width={'60%'}
            mr={0} ml='auto'
            id='campname' name='campname' label='Campname'
            value={campname}
            defaultValue={campname}
            type='campname'
            isRequired />
    </FormControl>

))} 
{startdate.map((startdate) => (
    <FormControl mb={2} display={'flex'} alignItems='center'>
            <FormLabel fontWeight="bold" color="orange.500" mr={2}>
                Start Date :
            </FormLabel>
            <Input textAlign={'center'}
                focusBorderColor='orange.700'
                variant={'flushed'}
                borderBottomColor='orange'
                width={'60%'}
                mr={0} ml='auto'
                id='startdate' name='startdate' label='Start Date'
                value={startdate}
                defaultValue={startdate}
                isRequired />
        </FormControl>
        ))}
        {enddate.map((enddate) => (
        <FormControl mb={2} display={'flex'} alignItems='center'>
        <FormLabel fontWeight="bold" color="orange.500" mr={2}>
            End Date:
        </FormLabel>
        <Input textAlign={'center'}
            focusBorderColor='orange.700'
            variant={'flushed'}
            borderBottomColor='orange'
            width={'60%'}
            mr={0} ml='auto'

            id='name' name='name' label='Name'
            value={enddate}
            defaultValue={enddate}
            isRequired />
    </FormControl>
            
         ))}

<FormControl mb={2} display={'flex'} alignItems='center'>
          <FormLabel htmlFor="dueDate" fontWeight="bold" color="orange.500" mr={2}>Issued Date</FormLabel>
          <Input
          id="issued_date"
          name='issued_date'
          label="Date"
          type="date"
          textAlign={'center'}
          focusBorderColor='orange.700' 
          variant={'flushed'} 
          borderBottomColor='orange'
          onChange = {e=>setIssuedDate(e.target.value)}
          isRequired
          width={'60%'} 
          mr={0} ml='auto'
          />
        </FormControl>
        </Box>
        <Button 
        colorScheme='orange' variant='solid'
        onClick ={GenerateCert}>
            Generate Certificate
            </Button>

        </Box>
    

        </Box>
    );
}

export default GenerateCertificate;

