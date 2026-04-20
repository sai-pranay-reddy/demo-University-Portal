import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Modal from '../../components/common/Modal';
import { db } from '../../data/mockData';

const ManageSubjects = () => {
    // State variables correctly named for subjects
    const [subjects, setSubjects] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingSubject, setEditingSubject] = useState(null);
    
    // Form data state tailored for subject properties
    const [formData, setFormData] = useState({ code: '', title: '', courseId: 'cs1' });

    // FIX: Load 'subjects' from the database, not 'students'
    useEffect(() => {
        const subjectsData = db.get('subjects');
        setSubjects(subjectsData);
    }, []);

    const openModal = (subject = null) => {
        setEditingSubject(subject);
        // Set form data based on subject properties
        setFormData(subject ? 
            { code: subject.code, title: subject.title, courseId: subject.courseId || 'cs1' } : 
            { code: '', title: '', courseId: 'cs1' }
        );
        setIsModalOpen(true);
    };

    const closeModal = () => setIsModalOpen(false);

    const handleFormChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        
        const action = editingSubject ? 'update' : 'add';
        let updatedSubjects;

        if (action === 'update') {
            updatedSubjects = subjects.map(s => 
                s.code === editingSubject.code ? { ...s, ...formData } : s
            );
        } else {
            // Logic for a new subject; ensures 'code' is the unique identifier
            const newSubject = { ...formData, courseId: formData.courseId || 'cs1' };
            // FIX: Add new subject to the top of the list for better UX
            updatedSubjects = [newSubject, ...subjects];
        }

        setSubjects(updatedSubjects);
        db.set('subjects', updatedSubjects); // Save updated list to the database
        closeModal();
    };
    
    const handleDelete = (subjectCode) => {
        if (window.confirm('Are you sure you want to delete this subject? This action cannot be undone.')) {
            const updatedSubjects = subjects.filter(s => s.code !== subjectCode);
            setSubjects(updatedSubjects);
            db.set('subjects', updatedSubjects); // Save updated list to the database
        }
    };

    return (
        <DashboardLayout>
            <h2>Manage Subjects</h2>
            <div className="content-box">
                <button onClick={() => openModal()} className="btn-add">Add New Subject</button>
                
                {/* Check if there are subjects to display */}
                {subjects.length === 0 ? (
                    <div className="empty-state">
                        <p>No subjects found. Click "Add New Subject" to get started.</p>
                    </div>
                ) : (
                    <table>
                        {/* Corrected table headers for subjects */}
                        <thead>
                            <tr>
                                <th>Subject ID</th>
                                <th>Subject Name</th>
                                <th>Course ID</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Map over 'subjects' and use correct properties */}
                            {subjects.map(subject => (
                                <tr key={subject.code}>
                                    <td>{subject.code}</td>
                                    <td>{subject.title}</td>
                                    <td>{subject.courseId || 'N/A'}</td> {/* Default value if courseId is missing */}
                                    <td className="actions-cell">
                                        <button onClick={() => openModal(subject)} className="btn-edit">Edit</button>
                                        <button onClick={() => handleDelete(subject.code)} className="btn-delete">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            <Modal isOpen={isModalOpen} onClose={closeModal} title={editingSubject ? 'Edit Subject' : 'Add New Subject'}>
                {/* Corrected form for adding/editing a subject */}
                <form onSubmit={handleFormSubmit}>
                    <div className="input-group">
                        <label>Subject ID</label>
                        <input 
                            type="text" 
                            name="code" 
                            value={formData.code} 
                            onChange={handleFormChange} 
                            required 
                            // Make the ID field read-only when editing
                            disabled={!!editingSubject} 
                        />
                    </div>
                    <div className="input-group">
                        <label>Subject Name</label>
                        <input 
                            type="text" 
                            name="title" 
                            value={formData.title} 
                            onChange={handleFormChange} 
                            required 
                        />
                    </div>
                    <div className="input-group">
                        <label>Course ID</label>
                        {/* Assuming a fixed Course ID for simplicity, can be changed to a select dropdown */}
                        <input 
                            type="text" 
                            name="courseId" 
                            value={formData.courseId} 
                            onChange={handleFormChange} 
                            disabled 
                        />
                    </div>
                    <button type="submit" className="icon-btn">{editingSubject ? 'Update Subject' : 'Add Subject'}</button>
                </form>
            </Modal>
        </DashboardLayout>
    );
};

export default ManageSubjects;