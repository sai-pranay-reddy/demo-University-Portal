import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { useAuth } from '../../contexts/AuthContext';
import { db } from '../../data/mockData';

const StaffDashboard = () => {
    const { user } = useAuth();
    const [myAssignments, setMyAssignments] = useState([]);
    const [inchargeInfo, setInchargeInfo] = useState(null);

    useEffect(() => {
        if (user) {
            const timetable = db.get('timetable');
            
            // Get a unique list of teaching assignments for this staff member
            const uniqueAssignments = [...new Map(timetable
                .filter(c => c.staffId === user.username)
                .map(item => [item.subjectCode + item.section, item]))
                .values()
            ];
            
            setMyAssignments(uniqueAssignments);

            // Check for Class Incharge role
            if (user.isClassIncharge) {
                setInchargeInfo({ section: user.assignedSection });
            }
        }
    }, [user]);

    return (
        <DashboardLayout>
            <h2>Welcome, {user?.name}!</h2>

            {/* --- NEW: Aesthetic Incharge Banner --- */}
            {inchargeInfo && (
                <div className="incharge-banner">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                    <span>You are the Class Incharge for <strong>Section {inchargeInfo.section}</strong>.</span>
                </div>
            )}

            {/* --- NEW: Grid of Class Cards --- */}
            <div className="content-box" style={{ background: 'transparent', border: 'none', boxShadow: 'none', padding: 0 }}>
                <h3>My Teaching Assignments</h3>
                {myAssignments.length > 0 ? (
                    <div className="class-grid">
                        {myAssignments.map((assignment) => (
                            <div key={`${assignment.subjectCode}-${assignment.section}`} className="class-card">
                                <div className="class-card-icon">
                                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 10H8v-2h10v2zm-4 4H8v-2h6v2zm4-8H8V6h12v2z"/></svg>
                                </div>
                                <div className="class-card-details">
                                    <h4>{assignment.subjectTitle}</h4>
                                    <p>Section: {assignment.section}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="empty-state">
                        <p>You currently have no teaching assignments.</p>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
};
export default StaffDashboard;