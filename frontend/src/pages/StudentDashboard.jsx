import { Box, Container, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { useState } from 'react'
import StudentSidebar from '../components/StudentSideBar'
import { Route, Routes } from 'react-router-dom'
import StudentAccountDetails from '../components/StudentAccountDetails'
import ViewAssignments from '../components/StudentViewAssignments'
import StudentSingleViewAssignment from '../components/ViewSingleStudentAssignment'
//import AssignmentForm from '../components/AssignmentForm'
import StudentSettings from '../components/StudentSettings'
import StudentCalendar from '../components/StudentCalendar'
import ViewQuizzes from '../components/StudentViewQuizzes'
import StudentAttemptQuiz from '../components/StudentAttemptQuiz'
import StudentQuizResult from '../components/StudentQuizResult'
import StudentViewMeets from '../components/ZoomComponents/StudentViewMeets'
import ViewCertificate from '../components/ViewCertificate'
import ViewAssignmentMarks from '../components/ViewAssignmentMarks'
import StudentLeaderboard from '../components/StudentLeaderboard'
import Notifications from '../components/Notifications'
import ViewSingleStudentLeaderboard from '../components/ViewSingleStudentLeaderboard'
import Home from '../components/CodeEditorPages/Home-Student'
import EditorPage from '../components/CodeEditorPages/EditorPage'
import {DiscussionChat} from '../components/Discussion.tsx'

const StudentDashboard = () => {
    
    const [navSize, setNavSize] = useState("large")
    const [campName, setCampName] = useState("")

    function changeNavSize(size) {
        setNavSize(size)
    }

  return (

    <Box  w="100%" h="100vh" backgroundColor='#101010' pt={0} pb={4} pr={4}>
        <Flex width={'100%'} height='100%'>
        <StudentSidebar navSize={navSize} changeNavSize={ (size) => changeNavSize(size) }></StudentSidebar>
            <Flex 
                w={ navSize=="small" ? "95%" : "85%"} 
                mt={4}
                borderRadius={8}
                backgroundImage={'linear-gradient(to bottom, #fddb92 0%, #d1fdff 100%);'}>

                <Routes>

                    <Route path="account" element={<StudentAccountDetails />} />
                    <Route path="assignments" element={<ViewAssignments />} />
                    <Route path="quizzes" element={<ViewQuizzes />} />
                    <Route path="attemptquiz" element={<StudentAttemptQuiz/>}/>
                    <Route path="quizresult" element={<StudentQuizResult />} />
                    <Route path="viewassignment" element={<StudentSingleViewAssignment/>}/>
                    <Route path="viewassignmentmarks" element={<ViewAssignmentMarks/>}/>
                    <Route path="viewmeets" element={<StudentViewMeets/>}/>
                    <Route path="calendar" element={<StudentCalendar />}/>
                    <Route path="certificate" element={<ViewCertificate/>} />
                    <Route path="leaderboard" element={<StudentLeaderboard setCampus={(value)=>setCampName(value)}/>}/>
                    <Route path="viewleaderboard" element={<ViewSingleStudentLeaderboard campName={campName}/>}/>
                    <Route path="notifications" element={<Notifications/>} /> 
                    <Route path="code-editor-home" element={<Home/>}/>
                    <Route path="editor/:roomId" element={<EditorPage/>}/>
                    <Route path="discussionforum" element={<DiscussionChat channelId='1089483253804703839'/>}/> 
                    <Route path="settings" element={<StudentSettings />} />

                </Routes> 

            </Flex>
        </Flex>
    </Box>
  )
}

export default StudentDashboard