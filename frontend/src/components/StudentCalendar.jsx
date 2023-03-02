import React , {useState, useEffect, useMemo } from 'react'
import axios from "axios";
import { Box, Heading, Text, Flex, Avatar, Input, IconButton, color, Button  } from '@chakra-ui/react'
import { Calendar, momentLocalizer,dayjsLocalizer,dateFnsLocalizer } from 'react-big-calendar'
import moment from "moment";
import 'react-big-calendar/lib/css/react-big-calendar.css';
//import globalize from 'globalize'
import dayjs from 'dayjs'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import enUS from 'date-fns/locale/en-US'



const StudentCalendar = props => {

    //const localizer = momentLocalizer(moment)
    //const localizer = dayjsLocalizer(dayjs)
    //const localizer = globalizeLocalizer(globalize)
    const locales = {
      'en-US': enUS,
    }
    
    const localizer = dateFnsLocalizer({
      format,
      parse,
      startOfWeek,
      getDay,
      locales,
    })
    const [assignments , setAssignments] = useState([]);

    const views = ['month', 'agenda'];
    //const [uploadeddate ,setUploadedDate] = useState("")

    const getAllAssignments = () =>
    {
    axios.get('http://localhost:5000/tchassignments/samestdassign') 
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
        defaultDate: new Date()
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

export default StudentCalendar