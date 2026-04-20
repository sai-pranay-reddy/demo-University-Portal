import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Modal from '../../components/common/Modal';
import { db } from '../../data/mockData';
import { useAuth } from '../../contexts/AuthContext';

const UpdateResult = () => {
    const { user } = useAuth();
    // State for this staff member's specific data
    const [myStudents, setMyStudents] = useState([]);
    const [mySubjects, setMySubjects] = useState([]);
    const [myResults, setMyResults] = useState([]);

    // Full lookup tables for converting IDs to names
    const [studentNameMap, setStudentNameMap] = useState({});
    const [subjectNameMap, setSubjectNameMap] = useState({});

    // State for modal and form
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingResult, setEditingResult] = useState(null);
    const [formData, setFormData] = useState({ studentId: '', subjectId: '', grade: '' });

    // This single, powerful effect runs once to filter everything for the logged-in staff
    useEffect(() => {
        if (user) {
            // --- 1. Load all raw data from the "database" ---
            const allStudents = db.get('students');
            const allSubjectsRaw = db.get('subjects'); // This is likely empty, we'll build it
            const allResults = db.get('results');
            const timetable = db.get('timetable');

            // --- 2. Find this staff member's teaching assignments from the timetable ---
            const myAssignments = timetable.filter(a => a.staffId === user.username);

            // --- 3. From assignments, create this staff's specific lists ---
            const mySectionNames = [...new Set(myAssignments.map(a => a.section))];
            const mySubjectInfo = [...new Map(myAssignments.map(item => [item['subjectCode'], item])).values()];
            
            const studentsToDisplay = allStudents.filter(s => mySectionNames.includes(s.section));
            const subjectsToDisplay = mySubjectInfo.map(s => ({ id: s.subjectCode, name: s.subjectTitle }));
            
            // --- 4. Filter results to show ONLY those for this staff member's subjects ---
            const mySubjectCodes = mySubjectInfo.map(s => s.subjectCode);
            const resultsToDisplay = allResults.filter(r => mySubjectCodes.includes(r.courseCode));

            // --- 5. Set all states at once ---
            setMyStudents(studentsToDisplay);
            setMySubjects(subjectsToDisplay);
            setMyResults(resultsToDisplay);

            // --- 6. Create lookup maps for displaying names easily in the table ---
            setStudentNameMap(allStudents.reduce((acc, curr) => ({...acc, [curr.id]: curr.name}), {}));
            setSubjectNameMap(timetable.reduce((acc, curr) => ({...acc, [curr.subjectCode]: curr.subjectTitle}), {}));
        }
    }, [user]);

    // --- Modal and Form Logic (remains largely the same) ---
    const openModal = (result = null) => {
        setEditingResult(result);
        setFormData(result ? 
            { studentId: result.studentId, subjectId: result.courseCode, grade: result.grade } : 
            { studentId: '', subjectId: '', grade: '' });
        setIsModalOpen(true);
    };

    const closeModal = () => setIsModalOpen(false);
    const handleFormChange = e => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

    const handleFormSubmit = e => {
        e.preventDefault();
        const allResults = db.get('results');
        const newOrUpdatedRecord = { 
            studentId: formData.studentId, 
            courseCode: formData.subjectId, // Ensure we save with the correct key
            grade: formData.grade.toUpperCase() 
        };

        const updatedResults = editingResult ? 
            allResults.map(r => r.id === editingResult.id ? { ...r, ...newOrUpdatedRecord } : r) : 
            [...allResults, { id: `res${Date.now()}`, ...newOrUpdatedRecord }];

        db.set('results', updatedResults);
        // Refresh the local component state
        const mySubjectCodes = mySubjects.map(s => s.id);
        setMyResults(updatedResults.filter(r => mySubjectCodes.includes(r.courseCode)));
        closeModal();
    };

    const handleDelete = (resultId) => {
        if (window.confirm('Delete this result record?')) {
            const allResults = db.get('results');
            const updatedResults = allResults.filter(r => r.id !== resultId);
            db.set('results', updatedResults);
             // Refresh local component state
            const mySubjectCodes = mySubjects.map(s => s.id);
            setMyResults(updatedResults.filter(r => mySubjectCodes.includes(r.courseCode)));
        }
    };

    return (
        <DashboardLayout>
            <h2>Add & Manage Results (My Classes Only)</h2>
            <div className="content-box">
                <button onClick={() => openModal()} className="btn-add">Add New Result</button>
                <table>
                    <thead><tr><th>Student Name</th><th>Subject</th><th>Grade</th><th>Actions</th></tr></thead>
                    <tbody>
                        {myResults.map(result => (
                            <tr key={result.id}>
                                <td>{studentNameMap[result.studentId] || 'N/A'}</td>
                                <td>{subjectNameMap[result.courseCode] || 'N/A'}</td>
                                <td>{result.grade}</td>
                                <td className="actions-cell">
                                    <button onClick={() => openModal(result)} className="btn-edit">Edit</button>
                                    <button onClick={() => handleDelete(result.id)} className="btn-delete">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Modal isOpen={isModalOpen} onClose={closeModal} title={editingResult ? 'Edit Result' : 'Add New Result'}>
                <form onSubmit={handleFormSubmit}>
                    <div className="input-group">
                        <label>Student</label>
                        <select name="studentId" value={formData.studentId} onChange={handleFormChange} required>
                            <option value="">-- Select Student --</option>
                            {/* Dropdown shows students from this staff member's assigned sections */}
                            {myStudents.map(student => <option key={student.id} value={student.id}>{student.name} ({student.id})</option>)}
                        </select>
                    </div>
                    <div className="input-group">
                        <label>Subject</label>
                        <select name="subjectId" value={formData.subjectId} onChange={handleFormChange} required>
                            <option value="">-- Select Subject --</option>
                            {/* Dropdown ONLY shows subjects this staff member teaches */}
                            {mySubjects.map(subject => <option key={subject.id} value={subject.id}>{subject.name}</option>)}
                        </select>
                    </div>
                    <div className="input-group">
                        <label>Grade</label>
                        <input type="text" name="grade" placeholder="e.g., A, B+" value={formData.grade} onChange={handleFormChange} required/>
                    </div>
                    <button type="submit">{editingResult ? 'Update Result' : 'Add Result'}</button>
                </form>
            </Modal>
        </DashboardLayout>
    );
};

export default UpdateResult;