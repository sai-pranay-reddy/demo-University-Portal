import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { db } from '../../data/mockData';

const LeaveRequests = () => {
    // State to hold all the leave requests
    const [requests, setRequests] = useState([]);

    // useEffect to load the data from localStorage when the page opens
    useEffect(() => {
        const allRequests = db.get('leaveRequests');
        setRequests(allRequests);
    }, []);

    // This function handles the "Approve" or "Reject" button clicks
    const handleStatusChange = (requestId, newStatus) => {
        // Create a new updated list by mapping over the old one
        const updatedRequests = requests.map(request => {
            // If the request ID matches, update its status
            if (request.id === requestId) {
                return { ...request, status: newStatus };
            }
            // Otherwise, return the request unchanged
            return request;
        });

        // Update the state to re-render the UI with the new status
        setRequests(updatedRequests);

        // Save the entire updated list back to localStorage
        db.set('leaveRequests', updatedRequests);
    };

    return (
        <DashboardLayout>
            <h2>Review Leave Requests</h2>
            <div className="content-box">
                <table>
                    <thead>
                        <tr>
                            <th>Applicant Name</th>
                            <th>Reason for Leave</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests.map(request => (
                            <tr key={request.id}>
                                <td>{request.userName}</td>
                                <td>{request.reason}</td>
                                <td>{request.date}</td>
                                <td>
                                    <span className={`status-${request.status.toLowerCase()}`}>
                                        {request.status}
                                    </span>
                                </td>
                                <td className="actions-cell">
                                    {/* Only show buttons if the status is 'Pending' */}
                                    {request.status === 'Pending' && (
                                        <>
                                            <button onClick={() => handleStatusChange(request.id, 'Approved')} className="btn-approve">Approve</button>
                                            <button onClick={() => handleStatusChange(request.id, 'Rejected')} className="btn-delete">Reject</button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </DashboardLayout>
    );
};

export default LeaveRequests;