import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Modal from '../../components/common/Modal'; // Our reusable Modal
import { db } from '../../data/mockData';

const ManageSubjects = () => {
    const [subjects, setSubjects] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    // State to track if we're adding or editing
    const [editingSubject, setEditingSubject] = useState(null);
    
    // State to manage the form inputs for a subject
    const [formData, setFormData] = useState({ name: '', courseId: '' });
    const [courses, setCourses] = useState([]); // For the course dropdown in the form

    // Load initial data for subjects and courses
    useEffect(() => {
        setSubjects(db.get('subjects'));
        setCourses(db.get('courses')); // We need courses for the dropdown selector
    }, []);

    // Function to open the modal for either adding or editing
    const openModal = (subject = null) => {
        setEditingSubject(subject);
        // Pre-fill form if editing, otherwise start blank
        setFormData(subject ? 
            { name: subject.name, courseId: subject.courseId } : 
            { name: '', courseId: '' }
        );
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingSubject(null);
    };

    // Generic handler to update form state as the user types or selects
    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Handles both Add and Edit form submissions
    const handleFormSubmit = (e) => {
        e.preventDefault();
        
        if (editingSubject) {
            // --- UPDATE (EDIT) LOGIC ---
            const updatedSubjects = subjects.map(s => 
                s.id === editingSubject.id ? { ...s, ...formData } : s
            );
            setSubjects(updatedSubjects);
            db.set('subjects', updatedSubjects);
        } else {
            // --- CREATE (ADD) LOGIC ---
            const newSubject = { id: `sub${Date.now()}`, ...formData };
            const updatedSubjects = [...subjects, newSubject];
            setSubjects(updatedSubjects);
            db.set('subjects', updatedSubjects);
        }
        
        closeModal();
    };
    
    // Handle the delete operation
    const handleDelete = (subjectId) => {
        if(window.confirm('Are you sure you want to delete this subject?')) {
            const updatedSubjects = subjects.filter(s => s.id !== subjectId);
            setSubjects(updatedSubjects);
            db.set('subjects', updatedSubjects);
        }
    }

    return (
        <DashboardLayout>
            <h2>Manage Subjects</h2>
            <div className="content-box">
                <button onClick={() => openModal()} className="btn-add">Add New Subject</button>
                <table>
                    <thead>
                        <tr>
                            <th>Subject ID</th>
                            <th>Subject Name</th>
                            <th>Course ID</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {subjects.map(subject => (
                            <tr key={subject.id}>
                                <td>{subject.id}</td>
                                <td>{subject.name}</td>
                                <td>{subject.courseId}</td>
                                <td className="actions-cell">
                                    <button onClick={() => openModal(subject)} className="btn-edit">Edit</button>
                                    <button onClick={() => handleDelete(subject.id)} className="btn-delete">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Reusable Modal for Adding/Editing Subjects */}
            <Modal isOpen={isModalOpen} onClose={closeModal} title={editingSubject ? 'Edit Subject' : 'Add New Subject'}>
                <form onSubmit={handleFormSubmit}>
                    <div className="input-group">
                        <label>Subject Name</label>
                        <input type="text" name="name" value={formData.name} onChange={handleFormChange} required autoFocus />
                    </div>
                    <div className="input-group">
                        <label>Associated Course</label>
                        {/* Dropdown to select a course */}
                        <select name="courseId" value={formData.courseId} onChange={handleFormChange} required>
                            <option value="" disabled>-- Select a course --</option>
                            {courses.map(course => (
                                <option key={course.id} value={course.id}>{course.name}</option>
                            ))}
                        </select>
                    </div>
                    <button type="submit">{editingSubject ? 'Update Subject' : 'Add Subject'}</button>
                </form>
            </Modal>
        </DashboardLayout>
    );
};

export default ManageSubjects;