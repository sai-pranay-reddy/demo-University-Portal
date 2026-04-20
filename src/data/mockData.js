// --- Section and Subject Data ---
const subjectsBySemester = {
    1: [ { code: "MR20-11HS0101", title: "English", credits: 2 }, { code: "MR20-11BS0101", title: "Mathematics - I", credits: 4 }, { code: "MR20-11BS0121", title: "Applied Physics", credits: 3 }, { code: "MR20-11ES0104", title: "Computer Aided Engineering Graphics", credits: 3 }, { code: "MR20-11ES0102", title: "Programming for Problem Solving", credits: 3 }, { code: "MR20-11ES0134", title: "Engineering and IT Workshop", credits: 1.5 }, { code: "MR20-11ES0132", title: "Programming for Problem Solving Lab", credits: 1.5 }],
    2: [ { code: "MR20-11BS0104", title: "Probability and Statistics", credits: 3 }, { code: "MR20-1CS0101", title: "Database Management Systems", credits: 3 }, { code: "MR20-1CS0102", title: "Data Structures using Python", credits: 4 }, { code: "MR20-1CS0105", title: "Web Design and Development", credits: 3 }, { code: "MR20-1CS0182", title: "Data Structures using Python Lab", credits: 1.5 }],
    3: [ { code: "MR20-1CS0107", title: "Design and Analysis of Algorithms", credits: 3 }, { code: "MR20-1CS0110", title: "Cloud Computing and Services", credits: 3 }, { code: "MR20-1CS0303", title: "Machine Learning for Data Science", credits: 3 }, { code: "MR20-1CS0109", title: "Computer Networks", credits: 4 }],
    4: [ { code: "MR20-1CS0201", title: "Artificial Intelligence", credits: 3 }, { code: "MR20-1CS0112", title: "Compiler Design", credits: 3 }, { code: "MR20-1CS0305", title: "Business Intelligence and Analytics", credits: 3 }],
    5: [ { code: "MR20-1CS0144", title: "Object Oriented Software Engineering", credits: 3 }, { code: "MR20-1BM0163", title: "Strategic Management", credits: 3 }],
    6: [ { code: "MR20-1CS0429", title: "Information Security", credits: 3 }, { code: "MR20-1BM0164", title: "Intellectual Property Rights", credits: 3 }],
    7: [ { code: "MR20-1CS0203", title: "Deep Learning", credits: 3 }, { code: "MR20-1CS0307", title: "Big Data Analytics and Applications", credits: 3 }],
    8: [ { code: "MR20-1CS0135", title: "Start-up, Innovation and Entrepreneurship", credits: 3 }, { code: "MR20-1CS0136", title: "Project Development and Thesis", credits: 2 }]
};
const sectionNames = ['Alpha', 'Beta', 'Gamma', 'Delta', 'Sigma', 'Omega', 'Epsilon', 'Zeta'];

// --- Expanded Faculty Roster ---
const facultyData = [
    { id: 'STF001', name: 'Dr. Priya Verma', role: 'incharge', assignedSection: 'Alpha' }, { id: 'STF002', name: 'Dr. Sameer Rao', role: 'incharge', assignedSection: 'Beta' }, { id: 'STF003', name: 'Dr. Anjali Menon', role: 'incharge', assignedSection: 'Gamma' }, { id: 'STF004', name: 'Dr. Vikram Singh', role: 'incharge', assignedSection: 'Delta' }, { id: 'STF005', name: 'Mr. Rohan Desai', role: 'incharge', assignedSection: 'Sigma' }, { id: 'STF006', name: 'Mrs. Neha Gupta', role: 'incharge', assignedSection: 'Omega' }, { id: 'STF007', name: 'Dr. Suresh Kumar', role: 'incharge', assignedSection: 'Epsilon' }, { id: 'STF008', name: 'Ms. Fatima Khan', role: 'incharge', assignedSection: 'Zeta' },
    { id: 'STF009', name: 'Prof. Arjun Reddy', role: 'faculty' }, { id: 'STF010', name: 'Prof. Sneha Patel', role: 'faculty' }, { id: 'STF011', name: 'Prof. David Chen', role: 'faculty' }, { id: 'STF012', name: 'Prof. Maria Garcia', role: 'faculty' }
];

// --- GENERATOR FUNCTIONS ---
const generateTimetable = () => {
    const timetable = []; let facultyIndex = 0;
    Object.values(subjectsBySemester).forEach(semesterSubjects => {
        sectionNames.forEach(section => {
            semesterSubjects.forEach(subject => {
                const staff = facultyData[facultyIndex % facultyData.length];
                timetable.push({ staffId: staff.id, subjectCode: subject.code, subjectTitle: subject.title, section: section });
                facultyIndex++;
            });
        });
    });
    return timetable;
};

const generateMainData = () => {
    const users = {}; const students = []; const results = [];
    const grades = ['O', 'A+', 'A', 'B+', 'B', 'C', 'F'];
    const getRandomGrade = () => grades[Math.floor(Math.random() * grades.length)];
    
    users['admin'] = { role: 'admin', password: 'admin123', name: 'Site Administrator' };
    facultyData.forEach(f => { users[f.id] = { role: 'staff', password: f.id, name: f.name, isClassIncharge: f.role === 'incharge', assignedSection: f.assignedSection || null }; });

    for (let i = 1; i <= 720; i++) {
        const hallTicket = `2111CS020${String(i).padStart(3, '0')}`;
        const section = sectionNames[(i - 1) % 8];
        users[hallTicket] = { role: 'student', password: hallTicket, name: `Student ${i}` };
        students.push({ id: hallTicket, name: `Student ${i}`, courseId: 'cs1', section: section });
        
        for (let sem = 1; sem <= 8; sem++) {
            (subjectsBySemester[sem] || []).forEach(subject => {
                results.push({id: `res_${hallTicket}_${subject.code}`, studentId: hallTicket, semester: sem, courseCode: subject.code, courseTitle: subject.title, grade: getRandomGrade(), credits: subject.credits });
            });
        }
    }
    return { users, students, results };
};

const generateFeeData = (students) => {
    const fees = [];
    students.forEach(student => {
        const totalAmount = 50000;
        const amountPaid = Math.floor(Math.random() * (totalAmount + 1));
        fees.push({ id: `fee_${student.id}`, studentId: student.id, totalAmount, amountPaid, dueDate: '2025-08-30' });
    });
    return fees;
};

const generateAttendanceData = (students) => {
    const attendance = [];
    const today = new Date();
    // --- THIS IS THE FIX ---
    // We generate a more reasonable 7 days of data to stay under the 5MB storage limit.
    const numberOfDays = 7; 

    for (let i = 0; i < numberOfDays; i++) {
        const date = new Date();
        date.setDate(today.getDate() - i);
        const dateString = date.toISOString().slice(0, 10);
        students.forEach(student => {
            const status = Math.random() > 0.1 ? 'Present' : 'Absent';
            attendance.push({ id: `att_${student.id}_${dateString}`, studentId: student.id, date: dateString, status: status });
        });
    }
    return attendance;
};

// --- FINAL 'db' Service ---
export const db = {
  seed: () => {
    // We keep the version as v7, as this is a bug fix, not a new feature.
    if (localStorage.getItem('isDataSeeded_v7')) return;

    // Call all the generators to build our complete dataset
    const { users, students, results } = generateMainData();
    const timetable = generateTimetable();
    const fees = generateFeeData(students);
    const attendance = generateAttendanceData(students); // Call the fixed attendance generator
    const subjects = Object.values(subjectsBySemester).flat().reduce((acc, curr) => {
        if (!acc.some(item => item.code === curr.code)) acc.push(curr);
        return acc;
    }, []);

    // Assemble the complete database
    const finalData = {
        users, students, fees, attendance, staff: facultyData, 
        timetable, subjects, results,
        courses: [{ id: 'cs1', name: 'Data Science' }],
        leaveRequests: [], 
        sessions: []
    };
    
    // Save all tables to localStorage
    Object.keys(finalData).forEach(key => localStorage.setItem(key, JSON.stringify(finalData[key])));
    localStorage.setItem('isDataSeeded_v7', 'true');
    console.log("Database seeded with v7: Final definitive version with all features (attendance fixed).");
  },
  get: (table) => JSON.parse(localStorage.getItem(table) || '[]'),
  set: (table, data) => localStorage.setItem(table, JSON.stringify(data))
};

// Run the seed function on application startup
db.seed();