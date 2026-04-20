import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Modal from '../../components/common/Modal';
import { db } from '../../data/mockData';

const ManageFees = () => {
    const [fees, setFees] = useState([]);
    const [studentNameMap, setStudentNameMap] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingFeeRecord, setEditingFeeRecord] = useState(null);
    const [formData, setFormData] = useState({ amountPaid: 0 });

    useEffect(() => {
        setFees(db.get('fees'));
        setStudentNameMap(db.get('students').reduce((acc, s) => ({ ...acc, [s.id]: s.name }), {}));
    }, []);

    const getStatus = (record) => {
        const balance = record.totalAmount - record.amountPaid;
        if (balance <= 0) return { text: 'Paid', className: 'status-approved' };
        if (new Date(record.dueDate) < new Date()) return { text: 'Overdue', className: 'status-rejected' };
        return { text: 'Pending', className: 'status-pending' };
    };

    const openModal = (feeRecord) => {
        setEditingFeeRecord(feeRecord);
        setFormData({ amountPaid: feeRecord.amountPaid });
        setIsModalOpen(true);
    };

    const closeModal = () => setIsModalOpen(false);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const updatedFees = fees.map(fee => fee.id === editingFeeRecord.id ? { ...fee, amountPaid: parseInt(formData.amountPaid, 10) } : fee);
        setFees(updatedFees);
        db.set('fees', updatedFees);
        closeModal();
    };

    return (
        <DashboardLayout>
            <h2>Manage Student Fee Details</h2>
            <div className="content-box">
                <table>
                    <thead>
                        <tr><th>Student Name</th><th>Total Fee</th><th>Amount Paid</th><th>Balance Due</th><th>Status</th><th>Actions</th></tr>
                    </thead>
                    <tbody>
                        {fees.map(record => {
                            const status = getStatus(record);
                            const balance = record.totalAmount - record.amountPaid;
                            return (
                                <tr key={record.id}>
                                    <td>{studentNameMap[record.studentId] || 'N/A'}</td>
                                    <td>₹{record.totalAmount.toLocaleString()}</td>
                                    <td>₹{record.amountPaid.toLocaleString()}</td>
                                    <td>₹{balance.toLocaleString()}</td>
                                    <td><span className={status.className}>{status.text}</span></td>
                                    <td className="actions-cell"><button onClick={() => openModal(record)} className="btn-edit">Update</button></td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            <Modal isOpen={isModalOpen} onClose={closeModal} title={`Update Fees for ${studentNameMap[editingFeeRecord?.studentId]}`}>
                <form onSubmit={handleFormSubmit}>
                    <div className="input-group">
                        <label>Total Fee (Read-only)</label>
                        <input type="text" value={`₹${editingFeeRecord?.totalAmount.toLocaleString()}`} readOnly disabled />
                    </div>
                    <div className="input-group">
                        <label>Update Amount Paid</label>
                        <input type="number" value={formData.amountPaid} onChange={(e) => setFormData({ amountPaid: e.target.value })} required autoFocus />
                    </div>
                    <button type="submit">Update Record</button>
                </form>
            </Modal>
        </DashboardLayout>
    );
};
export default ManageFees;