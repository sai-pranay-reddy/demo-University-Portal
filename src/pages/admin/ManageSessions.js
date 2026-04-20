import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Modal from '../../components/common/Modal'; // Import our reusable Modal
import { db } from '../../data/mockData';

const ManageSessions = () => {
    const [sessions, setSessions] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    // State to determine if we are in Add or Edit mode
    const [editingSession, setEditingSession] = useState(null); 
    
    // State to manage the form fields for a session
    const [formData, setFormData] = useState({ name: '', startDate: '', endDate: '' });

    // Load initial session data
    useEffect(() => {
        setSessions(db.get('sessions'));
    }, []);

    // Function to open the modal for either adding or editing
    const openModal = (session = null) => {
        setEditingSession(session);
        // If editing, populate the form with existing data; otherwise, clear it
        setFormData(session ? 
            { name: session.name, startDate: session.startDate, endDate: session.endDate } : 
            { name: '', startDate: '', endDate: '' }
        );
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingSession(null);
    };

    // Update form data state as the user types
    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Handle form submission for both adding and updating
    const handleFormSubmit = (e) => {
        e.preventDefault();
        
        if (editingSession) {
            // --- UPDATE (EDIT) LOGIC ---
            const updatedSessions = sessions.map(s => 
                s.id === editingSession.id ? { ...s, ...formData } : s
            );
            setSessions(updatedSessions);
            db.set('sessions', updatedSessions);
        } else {
            // --- CREATE (ADD) LOGIC ---
            const newSession = { id: `ses${Date.now()}`, ...formData };
            const updatedSessions = [...sessions, newSession];
            setSessions(updatedSessions);
            db.set('sessions', updatedSessions);
        }
        
        closeModal(); // Close the modal upon success
    };
    
    // Handle the delete operation
    const handleDelete = (sessionId) => {
        if (window.confirm('Are you sure you want to delete this session?')) {
            const updatedSessions = sessions.filter(s => s.id !== sessionId);
            setSessions(updatedSessions);
            db.set('sessions', updatedSessions);
        }
    };

    return (
        <DashboardLayout>
            <h2>Manage Academic Sessions</h2>
            <div className="content-box">
                <button onClick={() => openModal()} className="btn-add">Add New Session</button>
                <table>
                    <thead>
                        <tr>
                            <th>Session ID</th>
                            <th>Session Name</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sessions.map(session => (
                            <tr key={session.id}>
                                <td>{session.id}</td>
                                <td>{session.name}</td>
                                <td>{session.startDate}</td>
                                <td>{session.endDate}</td>
                                <td className="actions-cell">
                                    <button onClick={() => openModal(session)} className="btn-edit">Edit</button>
                                    <button onClick={() => handleDelete(session.id)} className="btn-delete">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Reusable Modal for Sessions */}
            <Modal isOpen={isModalOpen} onClose={closeModal} title={editingSession ? 'Edit Session' : 'Add New Session'}>
                <form onSubmit={handleFormSubmit}>
                    <div className="input-group">
                        <label>Session Name</label>
                        <input type="text" name="name" value={formData.name} onChange={handleFormChange} required autoFocus />
                    </div>
                    <div className="input-group">
                        <label>Start Date</label>
                        <input type="date" name="startDate" value={formData.startDate} onChange={handleFormChange} required />
                    </div>
                    <div className="input-group">
                        <label>End Date</label>
                        <input type="date" name="endDate" value={formData.endDate} onChange={handleFormChange} required />
                    </div>
                    <button type="submit">{editingSession ? 'Update Session' : 'Add Session'}</button>
                </form>
            </Modal>
        </DashboardLayout>
    );
};

export default ManageSessions;