import { useState } from 'react'

import { Box } from '@chakra-ui/react'
import LoginPage from './LoginPage'
import StudentDashboard from './StudentDashboard'
import TeacherDashboard from './TeacherDashboard'
import useStore from '../store'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import AdminDashboard from './AdminDashboard'
import CallBack from '../components/ZoomComponents/CallBack'
import DiscussionForumDashboard from './DiscussionForumDashboard'
import EditorPage from '../components/CodeEditorPages/EditorPage'


function App() {
  return  (
    <Router>
    <Routes>    
     <Route index element = {<LoginPage/>}/>
     <Route path="teacher/*" element= {<TeacherDashboard/>} />
     <Route path="student/*" element={<StudentDashboard/>}/>
     <Route path="admin/*" element={<AdminDashboard/>}/>
      {/* <Route path="teacher/discussionforum/*" element={<DiscussionForumDashboard/>}/>  */}
     {/* <Route path="teacher/oauth-callback" element = {<CallBack/>}/>
     <Route path="teacher/*" element={[<TeacherDashboard/>]} */}

    </Routes>
  </Router>
  );
  };
  // const user = useStore(state => state.user)
  // const loginState = useStore(state => state.loginState)

  // if(loginState){

  //   if(user=="student"){
  //     return (<StudentDashboard></StudentDashboard>)
  //   }
  //   else if(user=="teacher"){
  //     return (<TeacherDashboard></TeacherDashboard>)
  //   }
  // }
  // else{
  //   return (<LoginPage></LoginPage>)
  // }



export default App
