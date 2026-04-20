import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { db } from '../../data/mockData';
import { useAuth } from '../../contexts/AuthContext';

const ViewAttendance = () => {
    const { user } = useAuth();
    const [myAttendance, setMyAttendance] = useState([]);

    useEffect(() => {
        if (user) {
            const allAttendanceRecords = db.get('attendance');
            
            // --- ROBUST FIX: Filter by username directly ---
            // A student's username (e.g., '2111CS020001') IS their studentId.
            const filteredRecords = allAttendanceRecords.filter(record => record.studentId === user.username);
            
            // Sort by date to show the most recent attendance records first
            filteredRecords.sort((a, b) => new Date(b.date) - new Date(a.date));

            setMyAttendance(filteredRecords);
        }
    }, [user]);

    // Calculate the overall attendance percentage
    const totalDays = myAttendance.length;
    const presentDays = myAttendance.filter(rec => rec.status === 'Present').length;
    const attendancePercentage = totalDays > 0 ? Math.round((presentDays / totalDays) * 100) : 0;

    return (
        <DashboardLayout>
            <h2>My Attendance History</h2>
            
            {/* --- NEW: Aesthetic Summary Widget --- */}
            <div className="widgets-container" style={{ gridTemplateColumns: '1fr', marginBottom: '2rem' }}>
                 <div className="widget">
                    <h3>Overall Attendance</h3>
                    <div className="progress-bar">
                        <div className="progress-fill" style={{ width: `${attendancePercentage}%`, backgroundColor: attendancePercentage < 75 ? '#dc3545' : '#28a745' }}>
                           {attendancePercentage}%
                        </div>
                    </div>
                </div>
            </div>

            <div className="content-box">
                {myAttendance.length > 0 ? (
                    <table>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {myAttendance.map(record => (
                                <tr key={record.id}>
                                    <td>{new Date(record.date).toLocaleDateString()}</td>
                                    <td>
                                        <span className={`status-${record.status.toLowerCase()}`}>
                                            {record.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="empty-state">
                        <p>No attendance records have been marked for you yet.</p>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
};
export default ViewAttendance;