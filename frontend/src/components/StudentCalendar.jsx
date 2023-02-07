import React , {useState, useEffect, useMemo } from 'react'
import axios from "axios";
import { Box, Heading, Text, Flex, Avatar, Input, IconButton, color, Button  } from '@chakra-ui/react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from "moment";
import 'react-big-calendar/lib/css/react-big-calendar.css';


const StudentCalendar = () => {

    const localizer = momentLocalizer(moment)
    const [assignments , setAssignments] = useState([]);
    //const [uploadeddate ,setUploadedDate] = useState("")

    const getAllAssignments = () =>
    {
    axios.get('http://localhost:5000/tchassignments/gettchassigns') 
    .then(res=> {
       console.log(res.data)
      setAssignments(res.data)
  
}).catch (err=> {
   console.log(err) })
    }

    useEffect(()=>
      {
        getAllAssignments();
      },[])

      

    const {defaultDate,uploadeddate,duedate} = useMemo(() => ({
        defaultDate: new Date(),
        uploadeddate: new Date(),
        duedate: new Date()
      }), [])

  return (
    
    
    <Box pt={0} px={0} mx='auto' textAlign={'center'} width={'100%'} backgroundColor='gray.100' borderRadius={30}>
      <Box pt={4} pb={2} mt={4}  >
        <Heading mb={4} >
          Calendar
        </Heading>
      </Box>

      <Box p={5} width='4xl' mx='auto' height='70vh' border='1px solid orange' borderRadius={10}>
      
      <Calendar
           defaultDate={defaultDate}
           localizer={localizer}
           events={assignments}
           
          startAccessor="uploadeddate"
           endAccessor="duedate"
           style={{ color: '#ff9800', }} 
           />
      </Box>
      
      
    </Box>

  )
}

export default StudentCalendar