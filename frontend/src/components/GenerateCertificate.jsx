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
    const [campData , setCampData] = useState([])
    const [enddate , setEndDate] = useState([])
    const [startdate , setStartDate] = useState([])
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

    const CampData = () =>
    {
        axios.get(`http://localhost:5000/camp/getcampsdataforcert/${localStorage.getItem("student_certid")}`)      
        .then(res=> {
            //console.log(res.data)
            setCampData(res.data) 
            }).catch (err=> {
        console.log(err) })
    }



    useEffect(()=>
    {
        getSingleUser();
        CampData();
       
    },[])

    const GenerateCert = (e) =>
    {
        
        e.preventDefault();
        const formData = new FormData();
        

       axios.post("http://localhost:5000/certificate/generatecert",{  
         student_id: `${localStorage.getItem('student_certid')}`,
        student_name: name,
        campname : campname,
        startdate: campData.map((camp) => {
            return camp.startdate
        }),
        enddate:campData.map((camp)=>{
            return camp.enddate
        }),
        issued_date : issued_date
    })
        .then((res)=>
        {       res.json()
                console.log("Clicked")
        }).catch((err)=>
        {

        })

    }

    const formatStartDate = (startdate) =>
    {
      const options = {
        day: "numeric",
        month: "long",
        year: "numeric",
      };
      const date = new Date(startdate);
      return date.toLocaleString("en-US", options);

    }

    const formatEndDate = (enddate) =>
    {
      const options = {
        day: "numeric",
        month: "long",
        year: "numeric",
        // hour: "numeric",
        // minute: "numeric",
        // hour12: true,
      };
      const date = new Date(enddate);
      return date.toLocaleString("en-US", options);


    }



    return(
        <Box p={2} m='auto' textAlign={'center'} width={'100%'} borderRadius={30}>

            <Box pt={4} pb={2}  >
                <Heading mb={4} >
                Generate Certificate
                </Heading>
            </Box>
       
            <Box p={4} width="60%" mx="auto" textAlign={'start'}>
                <Box boxShadow="0px 4px 8px rgba(0, 0, 0, 0.1)" borderRadius='15px' p={4} backgroundColor="#FFFFFF" >

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
  

          

                    
                    {campData.map((campData) => (

                        
                        <FormControl mb={2} display={'flex'} alignItems='center'>
                                <FormLabel fontWeight="bold" color="orange.500" mr={2}>
                                    Campname  :
                                </FormLabel>

                                <Input textAlign={'center'}
                                    focusBorderColor='orange.700'
                                    variant={'flushed'}
                                    borderBottomColor='orange'
                                    width={'60%'}
                                    mr={0} ml='auto'
                                    id='startdate' name='startdate' label='Start Date'
                                    value={campData.campname}
                                    defaultValue={campData.campname}
                                    isRequired />

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
                                    value={formatStartDate(campData.startdate)}
                        
                                    defaultValue={formatStartDate(campData.startdate) }
                                    isRequired />

                    <FormLabel fontWeight="bold" color="orange.500" mr={2}>
                                    End Date :
                                </FormLabel>

                                <Input textAlign={'center'}
                                    focusBorderColor='orange.700'
                                    variant={'flushed'}
                                    borderBottomColor='orange'
                                    width={'60%'}
                                    mr={0} ml='auto'
                                    id='startdate' name='startdate' label='Start Date'
                                    value={formatEndDate(campData.enddate)}
                                    defaultValue={formatEndDate(campData.enddate)}
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
            </Box>

            <Button 
                colorScheme='orange' variant='solid'
                onClick ={GenerateCert}>
                    Generate Certificate
            </Button>

        </Box>
    
    );
}

export default GenerateCertificate;

