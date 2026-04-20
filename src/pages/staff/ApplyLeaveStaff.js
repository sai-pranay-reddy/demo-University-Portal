import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { db } from '../../data/mockData';
import { useAuth } from '../../contexts/AuthContext';

const ApplyLeaveStaff = () => {
    const { user } = useAuth();
    // All existing state logic remains the same
    const [leaveDate, setLeaveDate] = useState('');
    const [reason, setReason] = useState('');
    const [myRequests, setMyRequests] = useState([]);

    // All fetching and submitting logic remains the same
    const fetchHistory = () => {
        if(user) {
            const allRequests = db.get('leaveRequests');
            setMyRequests(allRequests.filter(req => req.userId === user.username));
        }
    };

    useEffect(() => {
        fetchHistory();
    }, [user]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newRequest = { id: `leave${Date.now()}`, userId: user.username, userName: user.name, date: leaveDate, reason: reason, status: 'Pending' };
        const allRequests = db.get('leaveRequests');
        db.set('leaveRequests', [...allRequests, newRequest]);

        alert('Your leave request has been submitted!');
        fetchHistory(); // Instantly refresh the history table
        setLeaveDate('');
        setReason('');
    };

    // The only change is in the returned JSX structure
    return (
    <DashboardLayout>
        <h2>Apply for Leave</h2>

        {/* --- REUSE the Aesthetic Two-Column Layout --- */}
        <div className="two-column-layout">

            {/* --- Left Column: Application Form --- */}
            <div className="layout-column">
                <div className="content-box">
                    <h3>New Leave Request</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="leave-date">Date</label>
                            <input type="date" id="leave-date" value={leaveDate} onChange={e => setLeaveDate(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="leave-reason">Reason for Leave</label>
                            <textarea id="leave-reason" rows="5" value={reason} placeholder="Please provide a brief reason..." onChange={e => setReason(e.target.value)} required></textarea>
                        </div>
                        {/* --- Reusing the enhanced button style --- */}
                        <button type="submit" className="btn-add icon-btn">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/><path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/></svg>
                            Submit Request
                        </button>
                    </form>
                </div>
            </div>

            {/* --- Right Column: Request History Table --- */}
            <div className="layout-column">
                    <div className="content-box">
                    <h3>My Request History</h3>
                    {myRequests.length > 0 ? (
                        <table>
                            <thead><tr><th>Date</th><th>Reason</th><th>Status</th></tr></thead>
                            <tbody>
                                {myRequests.map(req => (
                                <tr key={req.id}>
                                    <td>{new Date(req.date).toLocaleDateString()}</td>
                                    <td>{req.reason}</td>
                                    <td><span className={`status-${req.status.toLowerCase()}`}>{req.status}</span></td>
                                </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        // --- Reusing the empty state message ---
                        <div className="empty-state">
                            <p>You have not submitted any leave requests yet.</p>
                        </div>
                    )}
                </div>
            </div>

        </div>
    </DashboardLayout>
    );
};
export default ApplyLeaveStaff;