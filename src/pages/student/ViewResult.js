import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { db } from '../../data/mockData';
import { useAuth } from '../../contexts/AuthContext';
import { calculateSGPA, calculateCGPA } from '../../utils/gradeCalculations.js';

// --- Import the logo image from your assets folder ---
import uniLogo from '../../assets/images/Logo.png';

const ViewResult = () => {
    const { user } = useAuth();
    // State for results
    const [allMyResults, setAllMyResults] = useState([]);
    const [filteredResults, setFilteredResults] = useState([]);
    // State for semester selection
    const [selectedSemester, setSelectedSemester] = useState(1);
    
    // State for calculated GPA values
    const [sgpa, setSgpa] = useState("0.00");
    const [cgpa, setCgpa] = useState("0.00");

    // This effect runs once to fetch all results for the logged-in student
    useEffect(() => {
        if (user) {
            const allResults = db.get('results');
            const studentResults = allResults.filter(res => res.studentId === user.username);
            setAllMyResults(studentResults);
        }
    }, [user]);

    // This effect re-runs whenever the semester or results change to perform calculations
    useEffect(() => {
        const semester = parseInt(selectedSemester, 10);

        const resultsForSemester = allMyResults.filter(res => res.semester === semester);
        setFilteredResults(resultsForSemester);

        if (resultsForSemester.length > 0) {
            setSgpa(calculateSGPA(resultsForSemester));
        } else {
            setSgpa("0.00");
        }

        if (allMyResults.length > 0) {
            setCgpa(calculateCGPA(allMyResults, semester));
        }

    }, [selectedSemester, allMyResults]);

    return (
        <DashboardLayout>
            <h2>My Consolidated Grade Sheet</h2>
            
            {/* The SGPA and CGPA Summary Widgets */}
            <div className="widgets-container" style={{marginBottom: '2rem'}}>
                <div className="widget">
                    <h3>SGPA (Sem {selectedSemester})</h3>
                    <p style={{color: '#007bff'}}>{sgpa}</p>
                </div>
                <div className="widget">
                    <h3>CGPA (Up to Sem {selectedSemester})</h3>
                    <p style={{color: '#28a745'}}>{cgpa}</p>
                </div>
                 <div className="widget">
                    <h3>Overall Class</h3>
                    <p style={{fontSize: '1.5rem'}}>{parseFloat(cgpa) > 8.5 ? "First Class with Distinction" : "First Class"}</p>
                </div>
            </div>

            <div className="content-box">
                {/* --- THIS IS THE NEWLY ADDED GRADESHEET HEADER --- */}
                <div className="gradesheet-header">
                    <img src={uniLogo} alt="University Logo" className="gradesheet-logo" />
                    <div className="gradesheet-header-text">
                        <h3>Consolidated Grade / Credit Sheet</h3>
                        <h4>Malla Reddy University</h4>
                    </div>
                </div>

                <div className="input-group" style={{ maxWidth: '300px', marginTop: '1.5rem', marginBottom: '1.5rem' }}>
                    <label htmlFor="semester-select">View Results For:</label>
                    <select id="semester-select" value={selectedSemester} onChange={e => setSelectedSemester(e.target.value)}>
                        <option value="1">I Year, I Semester</option>
                        <option value="2">I Year, II Semester</option>
                        <option value="3">II Year, I Semester</option>
                        <option value="4">II Year, II Semester</option>
                        <option value="5">III Year, I Semester</option>
                        <option value="6">II Year, II Semester</option>
                        <option value="7">IV Year, I Semester</option>
                        <option value="8">IV Year, II Semester</option>
                    </select>
                </div>

                <table>
                    <thead>
                        <tr><th>Course Code</th><th>Course Title</th><th>Grade</th><th>Credits</th></tr>
                    </thead>
                    <tbody>
                        {filteredResults.length > 0 ? filteredResults.map(res => (
                            <tr key={res.id}>
                                <td>{res.courseCode}</td><td>{res.courseTitle}</td>
                                <td>{res.grade}</td><td>{res.credits}</td>
                            </tr>
                        )) : (
                            <tr><td colSpan="4">No results available for this semester.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </DashboardLayout>
    );
};

export default ViewResult;