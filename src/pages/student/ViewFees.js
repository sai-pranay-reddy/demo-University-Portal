import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { db } from '../../data/mockData';
import { useAuth } from '../../contexts/AuthContext';

const ViewFees = () => {
    const { user } = useAuth();
    const [feeDetails, setFeeDetails] = useState(null);

    useEffect(() => {
        if (user) {
            setFeeDetails(db.get('fees').find(fee => fee.studentId === user.username));
        }
    }, [user]);

    if (!feeDetails) {
        return <DashboardLayout><h2>Loading Fee Details...</h2></DashboardLayout>;
    }

    const balance = feeDetails.totalAmount - feeDetails.amountPaid;
    const percentPaid = Math.round((feeDetails.amountPaid / feeDetails.totalAmount) * 100);

    return (
        <DashboardLayout>
            <h2>My Fee Details</h2>
            <div className="widgets-container">
                <div className="widget">
                    <h3>Total Payable</h3>
                    <p>₹{feeDetails.totalAmount.toLocaleString()}</p>
                </div>
                <div className="widget">
                    <h3>Total Paid</h3>
                    <p style={{ color: '#28a745' }}>₹{feeDetails.amountPaid.toLocaleString()}</p>
                </div>
                <div className="widget">
                    <h3>Outstanding Balance</h3>
                    <p style={{ color: '#dc3545' }}>₹{balance.toLocaleString()}</p>
                </div>
            </div>

            <div className="content-box" style={{ marginTop: '2rem' }}>
                <h3>Payment Summary</h3>
                <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${percentPaid}%`, backgroundColor: '#007bff' }}>
                        {percentPaid}% Paid
                    </div>
                </div>
                 <p style={{textAlign: 'center', marginTop: '1rem'}}>Due Date: {new Date(feeDetails.dueDate).toLocaleDateString()}</p>
            </div>
        </DashboardLayout>
    );
};

export default ViewFees;