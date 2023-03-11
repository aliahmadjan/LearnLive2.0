import { Box, Container, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { useState } from 'react'
import AdminSidebar from '../components/AdminSidebar'
import AdminAccountDetails from '../components/AdminAccountDetails'
import AdminSettings from '../components/AdminSettings'
import AddTeachers from '../components/AddTeachers'
import AddStudents from '../components/AddStudents'
import ViewAllTeachers from '../components/ViewAllTeachers'
import ViewAllStudents from '../components/ViewAllStudents'
import GenerateCertificate from '../components/GenerateCertificate'
import EditTeacherDetails from '../components/EditTeacher'
import EditStudentDetails from '../components/EditStudent'
import AssignTeachers from '../components/AssignTeachers'
import AddCamp from '../components/AddCamp'
import ViewCamps from '../components/ViewCamps'
import ViewSingleCamp from '../components/ViewSingleCamp'
import AssignStudents from '../components/AssignStudents'
const AdminDashboard = () => {
    
    const [navSize, setNavSize] = useState("large")

    function changeNavSize(size) {
        setNavSize(size)
    }

  return (
    <Box w="100%" h="100vh" backgroundColor='#101010' pt={0} pb={4} pr={4}>
        <Flex width={'100%'} height='100%'>
            <AdminSidebar navSize={navSize} changeNavSize={ (size) => changeNavSize(size) }></AdminSidebar>
            <Flex 
                w={ navSize=="small" ? "95%" : "85%"} 
                mt={4} borderRadius={30}
                backgroundColor={'#FFFFFF'}
            >
                <Routes>
                    <Route path="account" element={<AdminAccountDetails />} />
                    <Route path="settings" element={<AdminSettings />} />
                    <Route path="addteachers" element={<AddTeachers/>}/>
                    <Route path="addstudents" element={<AddStudents/>}/>
                    <Route path="viewteachers" element={<ViewAllTeachers/>}/>
                    <Route path="viewstudents" element={<ViewAllStudents/>}/>
                    <Route path="generatecert" element={<GenerateCertificate/>}/>                 
                    <Route path="editteacher"  element={<EditTeacherDetails/>}/>
                    <Route path="editstudent" element={<EditStudentDetails/>}/>
                    <Route path="assignteacher" element={<AssignTeachers/>}/>
                    <Route path="assignstudent" element={<AssignStudents/>}/>
                    <Route path="addcamp" element={<AddCamp/>}/>
                    <Route path="viewcamps" element={<ViewCamps/>}/>
                    <Route path="viewcamp" element={<ViewSingleCamp/>}/>
                </Routes>
            </Flex>
        </Flex>
    </Box>
  )
}

export default AdminDashboard