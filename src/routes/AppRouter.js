import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

// Import All Page Components
import HomePage from '../pages/HomePage'; // <-- IMPORT THE NEW HOMEPAGE
import LoginPage from '../pages/auth/LoginPage';
// Admin
import AdminDashboard from '../pages/admin/AdminDashboard';
import ManageStudents from '../pages/admin/ManageStudents';
import ManageStaff from '../pages/admin/ManageStaff';
import ManageCourses from '../pages/admin/ManageCourses';
import ManageSubjects from '../pages/admin/ManageSubjects';
import ManageSessions from '../pages/admin/ManageSessions';
import LeaveRequests from '../pages/admin/LeaveRequests';
import ManageFees from '../pages/admin/ManageFees';
// Staff
import StaffDashboard from '../pages/staff/StaffDashboard';
import TakeAttendance from '../pages/staff/TakeAttendance';
import UpdateResult from '../pages/staff/UpdateResult';
import ApplyLeaveStaff from '../pages/staff/ApplyLeaveStaff';
// Student
import StudentDashboard from '../pages/student/StudentDashboard';
import ViewResult from '../pages/student/ViewResult';
import ViewAttendance from '../pages/student/ViewAttendance';
import ViewFees from '../pages/student/ViewFees';
import ApplyLeaveStudent from '../pages/student/ApplyLeaveStudent';

const AppRouter = () => {
    return (
        <Routes>
            {/* UPDATED: The root path now shows your public homepage */}
            <Route path="/" element={<HomePage />} />

            {/* Your login page now lives at the "/login" path */}
            <Route path="/login" element={<LoginPage />} />

            {/* --- Protected Admin Routes --- */}
            <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
                <Route path="/admin/dashboard" element={<AdminDashboard />} /> 
                <Route path="/admin/manage-students" element={<ManageStudents />} />
                <Route path="/admin/manage-staff" element={<ManageStaff />} />
                <Route path="/admin/manage-courses" element={<ManageCourses />} />
                <Route path="/admin/manage-subjects" element={<ManageSubjects />} />
                <Route path="/admin/manage-sessions" element={<ManageSessions />} />
                <Route path="/admin/leave-requests" element={<LeaveRequests />} />
                <Route path="/admin/manage-fees" element={<ManageFees />} />
            </Route>

            {/* --- Protected Staff Routes --- */}
            <Route element={<ProtectedRoute allowedRoles={['staff']} />}>
                <Route path="/staff/dashboard" element={<StaffDashboard />} />
                <Route path="/staff/take-attendance" element={<TakeAttendance />} />
                <Route path="/staff/update-result" element={<UpdateResult />} />
                <Route path="/staff/apply-leave" element={<ApplyLeaveStaff />} />
            </Route>

            {/* --- Protected Student Routes --- */}
            <Route element={<ProtectedRoute allowedRoles={['student']} />}>
                <Route path="/student/dashboard" element={<StudentDashboard />} />
                <Route path="/student/view-result" element={<ViewResult />} />
                <Route path="/student/view-attendance" element={<ViewAttendance />} />
                <Route path="/student/view-fees" element={<ViewFees />} />
                <Route path="/student/apply-leave" element={<ApplyLeaveStudent />} />
            </Route>

            {/* Fallback Routes */}
            <Route path="/unauthorized" element={<div style={{ padding: '50px', textAlign: 'center' }}><h1>403 - Unauthorized</h1><p>You do not have permission to view this page.</p></div>} />
            <Route path="*" element={<div style={{ padding: '50px', textAlign: 'center' }}><h1>404 - Not Found</h1><p>The page you are looking for does not exist.</p></div>} />
        </Routes>
    );
};

export default AppRouter;