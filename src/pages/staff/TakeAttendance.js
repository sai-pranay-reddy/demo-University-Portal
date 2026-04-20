import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { db } from '../../data/mockData';
import { useAuth } from '../../contexts/AuthContext';

const TakeAttendance = () => {
    const { user } = useAuth();
    // This state will hold ONLY the students from the incharge's assigned section
    const [myStudents, setMyStudents] = useState([]); 
    const [attendanceData, setAttendanceData] = useState({});
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10));

    // This effect now validates the user's role and fetches the correct students
    useEffect(() => {
        if (user && user.isClassIncharge) {
            const allStudents = db.get('students');
            
            // Filter all students to get only those in the incharge's assigned section
            const studentsInMySection = allStudents.filter(student => student.section === user.assignedSection);
            
            setMyStudents(studentsInMySection);
        }
    }, [user]); // Reruns whenever user data is available

    // Functions for saving attendance remain the same as they operate on the `myStudents` list
    const handleStatusChange = (studentId, status) => setAttendanceData(prev => ({ ...prev, [studentId]: status }));
    
    const handleSaveAttendance = () => {
        const allAttendance = db.get('attendance');
        const newRecords = Object.keys(attendanceData).map(studentId => ({ id: `att_${studentId}_${selectedDate}`, studentId, date: selectedDate, status: attendanceData[studentId] }));
        db.set('attendance', [...allAttendance, ...newRecords]);
        alert(`Attendance for Section ${user.assignedSection} on ${selectedDate} has been saved.`);
    };

    // --- SECURE RENDER ---
    // If the user is not an incharge, show an access denied message. This is a crucial security check.
    if (!user || !user.isClassIncharge) {
        return (
            <DashboardLayout>
                <h2>Access Denied</h2>
                <div className="content-box">
                    <p>This page is only available to assigned Class Incharges.</p>
                </div>
            </DashboardLayout>
        );
    }
    
    return (
        <DashboardLayout>
            <h2>Take Attendance for Section: {user.assignedSection}</h2>
            <div className="content-box">
                <div className="input-group"><label>Select Date:</label><input type="date" value={selectedDate} onChange={e => setSelectedDate(e.target.value)} /></div>
                <table>
                    <thead><tr><th>Hall Ticket No.</th><th>Student Name</th><th>Status</th></tr></thead>
                    <tbody>
                        {myStudents.map(student => (
                            <tr key={student.id}>
                                <td>{student.id}</td>
                                <td>{student.name}</td>
                                <td className="actions-cell">
                                    <button onClick={() => handleStatusChange(student.id, 'Present')} className={attendanceData[student.id] === 'Present' ? 'btn-approve' : 'btn-secondary'}>Present</button>
                                    <button onClick={() => handleStatusChange(student.id, 'Absent')} className={attendanceData[student.id] === 'Absent' ? 'btn-delete' : 'btn-secondary'}>Absent</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button onClick={handleSaveAttendance} className="btn-add" style={{ marginTop: '20px', width: '100%' }}>Save Attendance</button>
            </div>
        </DashboardLayout>
    );
};
export default TakeAttendance;