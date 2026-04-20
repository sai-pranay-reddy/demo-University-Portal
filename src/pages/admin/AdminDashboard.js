import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import DashboardLayout from '../../components/layout/DashboardLayout';
import { db } from '../../data/mockData';

const AdminDashboard = () => {
    // --- State for all our dashboard data ---
    const [stats, setStats] = useState({ studentCount: 0, staffCount: 0, courseCount: 0 });
    const [recentLeave, setRecentLeave] = useState([]);

    useEffect(() => {
        // --- Load all necessary data at once ---
        const students = db.get('students');
        const staff = db.get('staff');
        const courses = db.get('courses');
        const leaveRequests = db.get('leaveRequests');
        
        // Update stats
        setStats({
            studentCount: students.length,
            staffCount: staff.length,
            courseCount: courses.length
        });
        
        // Get the 5 most recent pending leave requests for the summary list
        setRecentLeave(leaveRequests.filter(r => r.status === 'Pending').slice(0, 5));
    }, []);

    return (
        <DashboardLayout>
            <h2>Administrator Dashboard</h2>
            
            {/* --- 1. Aesthetic Icon-Enhanced Widgets --- */}
            <div className="widgets-container">
                <div className="widget icon-widget">
                    <div className="widget-icon" style={{ backgroundColor: '#e2eafc' }}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#002366"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg></div>
                    <div className="widget-content"><h3>Total Students</h3><p>{stats.studentCount}</p></div>
                </div>
                <div className="widget icon-widget">
                    <div className="widget-icon" style={{ backgroundColor: '#d1f4e8' }}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#198754"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-.38 0-.74.07-1.08.18C14.49 3.65 12.42 2.5 10 2.5c-2.27 0-4.22 1.04-5.5 2.65-.96.34-1.66 1.25-1.66 2.35 0 1.38 1.12 2.5 2.5 2.5H16z"/><path d="M12 2.5c-1.57 0-2.99.78-3.83 1.95.83.67 1.33 1.69 1.33 2.85 0 1.93-1.57 3.5-3.5 3.5h-1c-1.1 0-2 .9-2 2v.22c.98-.67 2.16-1.08 3.42-1.15C9.28 15.35 11.08 17 13 17c.53 0 1.02-.12 1.47-.32.65.81 1.63 1.32 2.78 1.32 1.93 0 3.5-1.57 3.5-3.5 0-1.29-.7-2.4-1.72-3.05.34-.36.52-.82.52-1.31 0-1.22-.89-2.22-2.05-2.46C14.73 4.16 12.82 2.5 10 2.5z"/></svg></div>
                    <div className="widget-content"><h3>Total Staff</h3><p>{stats.staffCount}</p></div>
                </div>
                <div className="widget icon-widget">
                     <div className="widget-icon" style={{ backgroundColor: '#ffe6d5' }}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#D9462D"><path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 10H8v-2h10v2zm-4 4H8v-2h6v2zm4-8H8V6h12v2z"/></svg></div>
                    <div className="widget-content"><h3>Total Courses</h3><p>{stats.courseCount}</p></div>
                </div>
            </div>

            {/* --- 2. Aesthetic Quick Actions Section --- */}
            <div className="content-box">
                <h3>Quick Actions</h3>
                <div className="quick-actions-grid">
                    <Link to="/admin/manage-students" className="action-card">Add / Edit Students</Link>
                    <Link to="/admin/manage-staff" className="action-card">Manage Staff Roles</Link>
                    <Link to="/admin/manage-fees" className="action-card">Update Fee Details</Link>
                    <Link to="/admin/leave-requests" className="action-card">Review Leave Requests</Link>
                </div>
            </div>

            {/* --- 3. Dynamic Data Summary List --- */}
            <div className="content-box" style={{marginTop: '2rem'}}>
                <h3>Recent Pending Leave Requests</h3>
                {recentLeave.length > 0 ? (
                    <table>
                        <thead><tr><th>Applicant Name</th><th>Date</th><th>Reason</th></tr></thead>
                        <tbody>{recentLeave.map(r => (
                            <tr key={r.id}><td>{r.userName}</td><td>{new Date(r.date).toLocaleDateString()}</td><td>{r.reason}</td></tr>
                        ))}</tbody>
                    </table>
                ) : (
                    <div className="empty-state"><p>No pending leave requests at this time.</p></div>
                )}
            </div>
        </DashboardLayout>
    );
};

export default AdminDashboard;