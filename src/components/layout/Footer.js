import React from 'react';
import uniLogo from '../../assets/images/Logo.png'; // Make sure this path is correct

const Footer = () => {
    return (
        <footer className="site-footer">
            <div className="footer-content">
                {/* Column 1: About and Contact */}
                <div className="footer-column about-us">
                    <img src={uniLogo} alt="Malla Reddy University" className="footer-logo" />
                    <p>Maisammaguda, Dulapally, Hyderabad, Telangana 50000</p>
                    <p><strong>Phone:</strong> 94971-94971, 91778-78365</p>
                    <p><strong>Email:</strong> info@mallareddyuniversity.ac.in</p>
                </div>

                {/* Column 2: About Links */}
                <div className="footer-column links">
                    <h4>ABOUT</h4>
                    <ul>
                        <li><a href="#home">Home</a></li>
                        <li><a href="#university">University</a></li>
                        <li><a href="#management">Management</a></li>
                        <li><a href="#advisory-body">Advisory Body</a></li>
                        <li><a href="#statutory-authorities">Statutory Authorities</a></li>
                        <li><a href="#statutory-bodies">Statutory Bodies</a></li>
                        <li><a href="#evaluations">Evaluations</a></li>
                        <li><a href="#placements">Placements</a></li>
                    </ul>
                </div>

                {/* Column 3: Campus Life Links */}
                <div className="footer-column links">
                    <h4>CAMPUS LIFE</h4>
                    <ul>
                        <li><a href="#hostel">Hostel</a></li>
                        <li><a href="#krc">Knowledge Resource Centre</a></li>
                        <li><a href="#cafeteria">Cafeteria</a></li>
                        <li><a href="#laboratories">Laboratories</a></li>
                        <li><a href="#sports">Sports</a></li>
                        <li><a href="#transport">Transport</a></li>
                    </ul>
                </div>

                {/* Column 4: Academics Links */}
                <div className="footer-column links">
                    <h4>ACADEMICS</h4>
                    <ul>
                        <li><a href="#soe">School of Engineering</a></li>
                        <li><a href="#soa">School of Agriculture</a></li>
                        <li><a href="#soahs">School of Allied Healthcare Sciences</a></li>
                        <li><a href="#som">School of Management / Commerce</a></li>
                    </ul>
                </div>
            </div>
            <div className="footer-bottom">
                <p>© {new Date().getFullYear()} Malla Reddy University. All Rights Reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;