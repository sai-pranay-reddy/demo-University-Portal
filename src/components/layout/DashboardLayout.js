import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import { useAuth } from '../../contexts/AuthContext';

const DashboardLayout = ({ children }) => {
    const { user } = useAuth();

    // If the user data hasn't loaded yet, don't render anything to avoid errors
    if (!user) {
        return null; // or a loading spinner
    }

    // Dynamic Link Generation logic to show correct links based on role
    const getNavLinks = (role, userData) => {
        const links = {
            admin: [
                { to: "/admin/dashboard", label: "Dashboard" },
                { to: "/admin/manage-students", label: "Manage Students" },
                { to: "/admin/manage-staff", label: "Manage Staff" },
                { to: "/admin/manage-courses", label: "Manage Courses" },
                { to: "/admin/manage-subjects", label: "Manage Subjects" },
                { to: "/admin/manage-sessions", label: "Manage Sessions" },
                { to: "/admin/leave-requests", label: "Leave Requests" },
                { to: "/admin/manage-fees", label: "Manage Fee Details" }
            ],
            staff: [
                { to: "/staff/dashboard", label: "Dashboard" },
                { to: "/staff/update-result", label: "Add/Update Result" },
                { to: "/staff/apply-leave", label: "Apply for Leave" },
            ],
            student: [
                { to: "/student/dashboard", label: "Dashboard" },
                { to: "/student/view-attendance", label: "View Attendance" },
                { to: "/student/view-result", label: "View Result" },
                { to: "/student/view-fees", label: "Fee Details" },
                { to: "/student/apply-leave", label: "Apply for Leave" },
            ]
        };

        // If the logged-in user is a staff member AND a class incharge, add the special link
        if (role === 'staff' && userData.isClassIncharge) {
            // We insert the link at the second position in the array for better UX
            links.staff.splice(1, 0, { to: "/staff/take-attendance", label: "Take Class Attendance" });
        }
        
        return links[role];
    };

    const role = user.role;
    const title = role.charAt(0).toUpperCase() + role.slice(1) + ' Portal';
    const navLinks = getNavLinks(role, user); // Get the dynamic links

    return (
        <>
            <Header title={title} />
            <div className="dashboard-container">
                <Sidebar links={navLinks} />
                <main className="main-content">
                    {children}
                </main>
            </div>
        </>
    );
};

export default DashboardLayout;
