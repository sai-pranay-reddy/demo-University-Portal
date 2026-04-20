import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Modal from '../../components/common/Modal';
import { db } from '../../data/mockData';

const ManageStaff = () => {
    const [staff, setStaff] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingStaff, setEditingStaff] = useState(null);
    
    // --- UPDATED Form State ---
    // The form now needs to manage the new fields: 'role' and 'assignedSection'
    const [formData, setFormData] = useState({ name: '', role: 'faculty', assignedSection: '' });

    // Load initial staff data
    useEffect(() => {
        setStaff(db.get('staff'));
    }, []);

    // --- UPDATED Modal Opening Logic ---
    const openModal = (staffMember = null) => {
        setEditingStaff(staffMember);
        // Pre-fill the form with ALL staff details, including the new roles
        setFormData(staffMember ? 
            { name: staffMember.name, role: staffMember.role, assignedSection: staffMember.assignedSection || '' } : 
            { name: '', role: 'faculty', assignedSection: '' }
        );
        setIsModalOpen(true);
    };

    const closeModal = () => setIsModalOpen(false);

    // Form change handler doesn't need to change, it's generic
    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // --- UPDATED Form Submission Logic ---
    const handleFormSubmit = (e) => {
        e.preventDefault();
        
        // When updating, make sure that if the role is 'faculty', the assignedSection is cleared.
        const finalFormData = formData.role === 'faculty' ? { ...formData, assignedSection: '' } : formData;

        if (editingStaff) { // Update logic
            const updatedStaffList = staff.map(member => 
                member.id === editingStaff.id ? { ...member, ...finalFormData } : member
            );
            setStaff(updatedStaffList);
            db.set('staff', updatedStaffList);
        } else { // Add logic
            // New staff members don't have email in our simple demo
            const newStaffMember = { id: `STF${Date.now()}`, ...finalFormData, email: '' };
            const updatedStaffList = [...staff, newStaffMember];
            setStaff(updatedStaffList);
            db.set('staff', updatedStaffList);
        }
        
        closeModal();
    };
    
    const handleDelete = (staffId) => {
        if (window.confirm('Delete this staff member? This may affect timetable assignments.')) {
            const updatedStaffList = staff.filter(member => member.id !== staffId);
            setStaff(updatedStaffList);
            db.set('staff', updatedStaffList);
        }
    };

    return (
        <DashboardLayout>
            <h2>Manage Staff & Roles</h2>
            <div className="content-box">
                <button onClick={() => openModal()} className="btn-add">Add New Staff</button>
                <table>
                    <thead>
                        <tr>
                            <th>Staff ID</th>
                            <th>Name</th>
                            <th>Role</th>
                            <th>Assigned Section (if Incharge)</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {staff.map(member => (
                            <tr key={member.id}>
                                <td>{member.id}</td>
                                <td>{member.name}</td>
                                <td style={{ textTransform: 'capitalize' }}>{member.role}</td>
                                <td>{member.assignedSection || 'N/A'}</td>
                                <td className="actions-cell">
                                    <button onClick={() => openModal(member)} className="btn-edit">Edit</button>
                                    <button onClick={() => handleDelete(member.id)} className="btn-delete">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* --- UPDATED MODAL --- */}
            {/* The modal now contains fields for Role and Assigned Section */}
            <Modal isOpen={isModalOpen} onClose={closeModal} title={editingStaff ? 'Edit Staff Details' : 'Add New Staff'}>
                <form onSubmit={handleFormSubmit}>
                    <div className="input-group">
                        <label>Name</label>
                        <input type="text" name="name" value={formData.name} onChange={handleFormChange} required />
                    </div>
                    <div className="input-group">
                        <label>Role</label>
                        <select name="role" value={formData.role} onChange={handleFormChange} required>
                            <option value="faculty">Faculty</option>
                            <option value="incharge">Class Incharge</option>
                        </select>
                    </div>
                    {/* This field ONLY appears if the 'incharge' role is selected */}
                    {formData.role === 'incharge' && (
                        <div className="input-group">
                            <label>Assigned Section for Incharge</label>
                            <input type="text" name="assignedSection" value={formData.assignedSection} onChange={handleFormChange} placeholder="e.g., Alpha, Beta" required />
                        </div>
                    )}
                    <button type="submit">{editingStaff ? 'Update Staff' : 'Add Staff'}</button>
                </form>
            </Modal>
        </DashboardLayout>
    );
};

export default ManageStaff;