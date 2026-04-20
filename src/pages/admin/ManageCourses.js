import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Modal from '../../components/common/Modal'; // Import our reusable Modal
import { db } from '../../data/mockData';

const ManageCourses = () => {
    const [courses, setCourses] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // State to determine if we are in 'Add' or 'Edit' mode
    const [editingCourse, setEditingCourse] = useState(null); 
    
    // State to manage the form fields for adding/editing a course
    const [formData, setFormData] = useState({ name: '' });

    // Load initial course data from localStorage
    useEffect(() => {
        setCourses(db.get('courses'));
    }, []);

    // Function to open the modal
    // Pass a 'course' object to edit, or nothing to add
    const openModal = (course = null) => {
        setEditingCourse(course);
        // If we are editing, pre-fill the form. Otherwise, start blank.
        setFormData(course ? { name: course.name } : { name: '' });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingCourse(null);
    };

    // Update form state as user types in the input
    const handleFormChange = (e) => {
        setFormData({ name: e.target.value });
    };

    // Handle form submission for both adding new courses and updating existing ones
    const handleFormSubmit = (e) => {
        e.preventDefault();
        
        if (editingCourse) {
            // --- UPDATE (EDIT) LOGIC ---
            const updatedCourses = courses.map(c => 
                c.id === editingCourse.id ? { ...c, ...formData } : c
            );
            setCourses(updatedCourses);
            db.set('courses', updatedCourses);
        } else {
            // --- CREATE (ADD) LOGIC ---
            // The course ID can simply be derived from the name for this demo
            const newCourseId = formData.name.toLowerCase().replace(/\s/g, '');
            const newCourse = { id: newCourseId, ...formData };
            const updatedCourses = [...courses, newCourse];
            setCourses(updatedCourses);
            db.set('courses', updatedCourses);
        }
        
        closeModal(); // Close the modal after submission
    };
    
    // Handle the delete operation
    const handleDelete = (courseId) => {
        if(window.confirm('Are you sure? Deleting a course might affect existing students and subjects.')) {
            const updatedCourses = courses.filter(c => c.id !== courseId);
            setCourses(updatedCourses);
            db.set('courses', updatedCourses);
        }
    }

    return (
        <DashboardLayout>
            <h2>Manage Courses</h2>
            <div className="content-box">
                <button onClick={() => openModal()} className="btn-add">Add New Course</button>
                <table>
                    <thead>
                        <tr>
                            <th>Course ID</th>
                            <th>Course Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {courses.map(course => (
                            <tr key={course.id}>
                                <td>{course.id}</td>
                                <td>{course.name}</td>
                                <td className="actions-cell">
                                    <button onClick={() => openModal(course)} className="btn-edit">Edit</button>
                                    <button onClick={() => handleDelete(course.id)} className="btn-delete">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* The Modal for Adding/Editing a Course */}
            <Modal isOpen={isModalOpen} onClose={closeModal} title={editingCourse ? 'Edit Course' : 'Add New Course'}>
                <form onSubmit={handleFormSubmit}>
                    <div className="input-group">
                        <label>Course Name</label>
                        <input type="text" name="name" value={formData.name} onChange={handleFormChange} required autoFocus />
                    </div>
                    <button type="submit">{editingCourse ? 'Update Course' : 'Add Course'}</button>
                </form>
            </Modal>
        </DashboardLayout>
    );
};

export default ManageCourses;