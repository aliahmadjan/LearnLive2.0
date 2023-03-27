import React , {useState, useEffect, useMemo } from 'react'
import axios from "axios";
import { Box, Heading, Text, Flex, Avatar, Input, IconButton, color, Button  } from '@chakra-ui/react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from "moment";
import 'react-big-calendar/lib/css/react-big-calendar.css';

const TeacherCalendar = props => {

    const localizer = momentLocalizer(moment)
    const [assignments , setAssignments] = useState([]);
    const views = ['month','agenda']
    //const [uploadeddate ,setUploadedDate] = useState("")

    const getAllAssignments = () =>
    {
    axios.get('http://localhost:5000/tchassignments/getcurrassigns') 
    .then(res=> {
      setAssignments(res.data)
  
}).catch (err=> {
   console.log(err) })
    }

    useEffect(()=>
      {
        getAllAssignments();
      },[])

      

    const {defaultDate} = useMemo(() => ({
        defaultDate: new Date(),
        //console.log(defaultDate),
        // uploadeddate: new Date(),
        // duedate: new Date()
      })
      
      , [])

      //console.log(defaultDate)
      // Thu Feb 02 2023 19:30:07 GMT+0500 (Pakistan Standard Time)
  return (
    
    
    <Box p={2} m='auto' textAlign={'center'} width={'100%'} borderRadius={30}>

      <Box pt={4} pb={2}>
          <Heading mb={4}>
          Calendar
          </Heading>
      </Box>

      <Box p={5} width='4xl' 
          mx='auto' height='70vh'
          boxShadow="0px 4px 8px rgba(0, 0, 0, 0.1)"
          borderRadius='15px'
          backgroundColor="#FFFFFF">
      
      <Calendar
       views={views}
       {...props}
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

export default TeacherCalendar