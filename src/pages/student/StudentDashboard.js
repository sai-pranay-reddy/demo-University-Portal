import React, { useState, useEffect } from 'react'; // <--- THIS LINE IS NOW FIXED
import { Link } from 'react-router-dom';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { useAuth } from '../../contexts/AuthContext';
import { db } from '../../data/mockData';

const StudentDashboard = () => {
    const { user } = useAuth();
    // State to hold all necessary data for the dashboard
    const [studentData, setStudentData] = useState(null);
    const [courseName, setCourseName] = useState('Loading...');
    const [recentLeaveRequest, setRecentLeaveRequest] = useState(null);

    useEffect(() => {
        if (user) {
            // Load student and course data
            const allStudents = db.get('students');
            const allCourses = db.get('courses');
            const foundStudent = allStudents.find(student => student.id === user.username);
            
            if (foundStudent) {
                setStudentData(foundStudent);
                const foundCourse = allCourses.find(course => course.id === foundStudent.courseId);
                setCourseName(foundCourse ? foundCourse.name : 'Unknown Course');
            }

            // Load recent activity data
            const allLeaveRequests = db.get('leaveRequests');
            const myLatestRequest = allLeaveRequests.filter(req => req.userId === user.username).pop();
            setRecentLeaveRequest(myLatestRequest);
        }
    }, [user]);

    if (!studentData) return (<DashboardLayout><h2>Loading...</h2></DashboardLayout>);

    return (
        <DashboardLayout>
            <h2>Welcome, {studentData.name}!</h2>
             
            <div className="widgets-container">
                <div className="widget icon-widget">
                    <div className="widget-icon" style={{ backgroundColor: '#e2eafc' }}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#002366"><path d="M12 3L1 9l4 2.18v6.23a2 2 0 0 0 1.29 1.86l5 2.5a2 2 0 0 0 1.42 0l5-2.5A2 2 0 0 0 22 17.41V11.18L23 9l-11-6zM12 15.3l-5-2.5V10.1l5 2.5v2.7z"/></svg></div>
                    <div className="widget-content"><h3>My Program</h3><p style={{fontSize: '1.5rem'}}>{courseName}</p></div>
                </div>
                <div className="widget icon-widget">
                    <div className="widget-icon" style={{ backgroundColor: '#d1f4e8' }}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#198754"><path d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zM9 17H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2zM9 13H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2zm0-4h-2V7h2v2z"/></svg></div>
                    <div className="widget-content"><h3>Hall Ticket No.</h3><p style={{fontSize: '1.5rem'}}>{studentData.id}</p></div>
                </div>
                <div className="widget icon-widget">
                     <div className="widget-icon" style={{ backgroundColor: '#ffe6d5' }}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#D9462D"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg></div>
                    <div className="widget-content"><h3>Assigned Section</h3><p>{studentData.section}</p></div>
                </div>
            </div>

            <div className="content-box">
                <h3>Quick Links</h3>
                <div className="quick-actions-grid">
                    <Link to="/student/view-result" className="action-card">View My Results</Link>
                    <Link to="/student/view-attendance" className="action-card">Check Attendance</Link>
                    <Link to="/student/view-fees" className="action-card">Check Fee Status</Link>
                    <Link to="/student/apply-leave" className="action-card">Apply for Leave</Link>
                </div>
            </div>

            <div className="content-box" style={{marginTop: '2rem'}}>
                <h3>Recent Activity</h3>
                {recentLeaveRequest ? (
                    <div className="activity-item">
                        <span>Your leave request for <strong>{new Date(recentLeaveRequest.date).toLocaleDateString()}</strong> is currently</span>
                        <span className={`status-${recentLeaveRequest.status.toLowerCase()}`}>{recentLeaveRequest.status}</span>
                    </div>
                ) : (
                    <div className="empty-state"><p>No recent activity to show.</p></div>
                )}
            </div>
        </DashboardLayout>
    );
};

export default StudentDashboard;