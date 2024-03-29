import { Box, Container, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { Outlet, Route, Routes } from 'react-router-dom'
import { useState } from 'react'
import TeacherUploadAssignment from '../components/TeacherUploadAssignment'
import TeacherSidebar from '../components/TeacherSidebar'
import TeacherViewAssignments from '../components/TeacherViewAssignments'
import TeacherAccountDetails from '../components/TeacherAccountDetails'
import QuizQuesionsInfo from '../components/TeacherQuiz/QuizQuestionsInfo'
import QuizInfo from '../components/TeacherQuiz/QuizInfo'
import ViewQuizzes from '../components/TeacherQuiz/ViewQuizzes'
import ViewSingleQuiz from '../components/TeacherQuiz/ViewSingleQuiz'
import ViewQuizResults from '../components/TeacherQuiz/ViewQuizResults'
import ViewSubmittedAssignments from '../components/ViewSubmittedAssignment'
import TeacherSingleViewAssignment from '../components/ViewSingleTeacherAssignment'
import TeacherSingleViewSubmitAssignment from '../components/ViewSingleSubmittedAssignment'
import TeacherSettings from '../components/TeacherSettings'
import TeacherCalendar from '../components/TeacherCalendar'
import MakeMeet from '../components/ZoomComponents/makeMeet'
import TeacherViewMeets from '../components/ZoomComponents/TeacherViewMeets'
import CallBack from '../components/ZoomComponents/CallBack'
import TeacherEditAssignment from '../components/EditAssignment'
import TeacherLeaderboard from '../components/TeacherLeaderboard'
import ViewSingleTeacherLeaderboard from '../components/ViewSingleTeacherLeaderboard'
import DiscussionForumSidebar from '../components/DiscussionForumSideBar'
// import JoinMeet from '../components/ZoomComponents/mainZoom'
import AddTeachers from '../components/AddTeachers'
import { DiscussionChat }  from '../components/Discussion.tsx'
import UnreadDiscussion from '../components/UnreadDiscussion'

const DiscussionForumDashboard = () => {

    // let payload={
    //     sdkKey: 'sJ6V1zLdiXFWJ4vJPKhzDOzqt1Hx8GzPCDzp',
    //     sdkSecret: 'Dee5TvIIJocPQQoDlCoTvypc4pgWulUiSNYS',
    //     meetingNumber : '76712532135',
    //     role : 1,
    //     leaveUrl :'http://localhost:3000',
    //     userName : 'Umais NU ID',
    //     userEmail : '',
    //     passWord :'Sh7Ujn',
    //     registrantToken : ''
    // }
    
    const [navSize, setNavSize] = useState("large")
    const [campName, setCampName] = useState("")

    function changeNavSize(size) {
        setNavSize(size)
    }
    
  return (



    <Box  w="100%" h="100vh"  pt={0} pb={4} pr={4}>
        <Flex width={'100%'} height='100%'>
            <DiscussionForumSidebar navSize={navSize} changeNavSize={ (size) => changeNavSize(size) }>
            </DiscussionForumSidebar>
            <Flex 
                w={ navSize=="small" ? "95%" : "85%"} 
                mt={4} borderRadius={30}
                backgroundColor={'#FFFFFF'}>

                <Routes>

                 {/* <Route path="allunreads" element={<UnreadDiscussion/>} />  */}
                {/*<Route path="announcements" element={<TeacherCalendar/>}/>
                <Route path="classroom" element={<TeacherSettings/>}/>
                <Route path="threads" element={<AddTeachers/>}/> */}
                {/* <Route path=":name" element={<Discussion/>}/> */}
                     
                          
                </Routes>       
             </Flex>
        </Flex>

    </Box>
  )
}

export default DiscussionForumDashboard