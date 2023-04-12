import { Box, Container, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
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
import { DiscussionChat}  from '../components/Discussion.tsx'
import Landing from '../components/CodeEditorComponents/Landing'
import Home from '../components/CodeEditorPages/Home-Teacher'
import EditorPage from '../components/CodeEditorPages/EditorPage'
// import JoinMeet from '../components/ZoomComponents/mainZoom'

const TeacherDashboard = () => {

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



    <Box  w="100%" h="100vh" backgroundColor='#101010' pt={0} pb={4} pr={4}>
        <Flex width={'100%'} height='100%'>
            <TeacherSidebar navSize={navSize} changeNavSize={ (size) => changeNavSize(size) }></TeacherSidebar>
            <Flex 
                w={ navSize=="small" ? "95%" : "85%"} 
                mt={4} borderRadius={8}
                
                backgroundImage={'linear-gradient(to bottom, #fddb92 0%, #d1fdff 100%);'}>

                <Routes>

                    <Route path="uploadassignment" element={<TeacherUploadAssignment />} />
                    <Route path="viewassignments" element={<TeacherViewAssignments />} />
                    <Route path="account" element={<TeacherAccountDetails />} />
                    <Route path="uploadquiz" element={<QuizInfo />} />
                    <Route path="viewquizzes" element={<ViewQuizzes/>}/> 
                    <Route path="viewquiz" element={<ViewSingleQuiz/>}/>
                    <Route path="viewquizresults" element={<ViewQuizResults/>}/>
                    <Route path="viewassignment" element={<TeacherSingleViewAssignment/>}/>
                    <Route path="editassignment" element={<TeacherEditAssignment/>}/>
                    <Route path="viewsubmittedassignment" element={<ViewSubmittedAssignments/>}/>
                    <Route path="viewssubmitassignment" element={<TeacherSingleViewSubmitAssignment/>}/>
                    <Route path="code-editor-home" element={<Home/>}/>
                    <Route path="editor/:roomId" element={<EditorPage/>}/>
                    <Route path="settings" element={<TeacherSettings />}/>
                    <Route path="calendar" element={<TeacherCalendar />} />
                    {/* <Route path="createclass" element={<JoinMeet payload={payload}/>}/> */}
                    <Route path="createclass" element={<MakeMeet/>}/>
                    <Route path="viewclass" element={<TeacherViewMeets/>}/>
                    <Route path="leaderboard" element={<TeacherLeaderboard setCampus={(value)=>setCampName(value)}/>}/>
                    <Route path="viewleaderboard" element ={<ViewSingleTeacherLeaderboard campName={campName}/>}/>
                     <Route path="discussionforum" element={<DiscussionChat channelId='1089483253804703839'/>}/> 
                    <Route path="oauth-callback" element={<CallBack/>}/>
                                     
                </Routes>       
             </Flex>
        </Flex>

    </Box>
  )
}

export default TeacherDashboard