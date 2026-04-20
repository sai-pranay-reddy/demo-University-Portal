// import React from 'react';
// import { useInView } from 'react-intersection-observer';
// import Slider from 'react-slick';

import PublicHeader from '../components/layout/PublicHeader';
import Footer from '../components/layout/Footer';
import uniLogo from '../assets/images/Logo.png';


import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

// Your other imports
import React from 'react';
import { useInView } from 'react-intersection-observer';
import Slider from 'react-slick';

// ===================================================================
//  1. REUSABLE & SECTIONAL COMPONENTS
// ===================================================================

/**
 * A wrapper component that applies a fade-in animation when it scrolls into view.
 */
const AnimatedSection = ({ children, className }) => {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });
    return <div ref={ref} className={`${className} fade-in-section ${inView ? 'is-visible' : ''}`}>{children}</div>;
};

/**
 * The main hero slider component.
 */
const HeroSlider = () => {
    const sliderData = [
        { img: 'https://static.wixstatic.com/media/0c0246_a31d0a942f0a4fc8aa66e0a137795043~mv2.webp/v1/fill/w_1225,h_624,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/0c0246_a31d0a942f0a4fc8aa66e0a137795043~mv2.webp', },
        { img: 'https://static.wixstatic.com/media/0c0246_e746971d087e4f02b9be3585e9e52ab6~mv2.webp/v1/fill/w_1225,h_624,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/0c0246_e746971d087e4f02b9be3585e9e52ab6~mv2.webp',  },
        { img: 'https://static.wixstatic.com/media/0c0246_60ef8cc0ba004d079992f46a573c227f~mv2.jpg/v1/fill/w_1225,h_624,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/0c0246_60ef8cc0ba004d079992f46a573c227f~mv2.jpg',  },
    ];
    const settings = { dots: true, infinite: true, speed: 800, slidesToShow: 1, slidesToScroll: 1, autoplay: true, autoplaySpeed: 5000, fade: true, cssEase: 'cubic-bezier(0.7, 0, 0.3, 1)', pauseOnHover: false, };
    return (
        <Slider {...settings}>
            {sliderData.map((slide, index) => (
                <div key={index}>
                    <section className="hero-section" style={{ backgroundImage: `url(${slide.img})` }}>
                        <div className="hero-overlay" />
                        <div className="hero-slide-content">
                            <h1>{slide.title}</h1>
                            <p>{slide.subtitle}</p>
                        </div>
                    </section>
                </div>
            ))}
        </Slider>
    );
};

/**
 * The Announcements and Spotlight section.
 */
const AnnouncementsSection = () => (
    <AnimatedSection className="announcements-section">
        <div className="announcements-card">
            <h3>Announcements</h3>
            <ul>
                <li>Development Program on Communication with AR&VR By ARK June 4-6, 2025.</li>
                <li>School of Engineering Organizes Faculty Development Program on MULESOFT.</li>
            </ul>
            <button className="view-all-btn">View All</button>
        </div>
        <div className="spotlight-section">
            <h3>Spotlight</h3>
            <img src="https://static.wixstatic.com/media/0c0246_bd191f3df82e496f8c23dfc6c32e5e66~mv2.jpeg" alt="Spotlight Event" />
        </div>
    </AnimatedSection>
);

/**
 * The About MRU section.
 */
const AboutSection = () => (
    <AnimatedSection className="about-section">
        <img src={uniLogo} alt="Malla Reddy University Logo" className="about-logo" />
        <div className="about-content">
            <h2>ABOUT MRU</h2>
            <p><strong>Malla Reddy University, Hyderabad</strong> (As per Telangana State Private Universities Act. No.13 of 2020) was established in 2020. It offers industry-focused courses with the aim of providing Quality Higher Education on par with International standards.</p>
            <button className="more-details-btn">More Details</button>
        </div>
    </AnimatedSection>
);

/**
 * The Programmes Offered section with updated images.
 */
/**
 * The Programmes Offered section with interactive buttons.
 */
const ProgramsSection = () => {
    const programs = [
        { name: 'School of Engineering', img: 'https://static.wixstatic.com/media/6685d7_b98e985ab05b4549a886f1a136bc5841~mv2.jpg/v1/crop/x_48,y_0,w_903,h_667/fill/w_612,h_452,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/Graduation.jpg' },
        { name: 'School of Agricultural Sciences', img: 'https://static.wixstatic.com/media/6685d7_3a63c26b5fe3473c8242dd94f7bd6693~mv2.jpg/v1/fill/w_541,h_400,al_c,lg_1,q_80,enc_auto/Agriculture.jpg' },
        { name: 'School of Allied Healthcare Sciences', img: 'https://static.wixstatic.com/media/11062b_bb3e0b7870fd4b03a9f569695342b782~mv2.jpg/v1/fill/w_612,h_452,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/Examining%20Blood%20Sample.jpg' },
        { name: 'School of Management', img: 'https://static.wixstatic.com/media/6685d7_f11bd2328e504152ab74293895915c31~mv2.jpg/v1/fill/w_541,h_400,al_c,lg_1,q_80,enc_auto/MBA.jpg' },
    ];
    return (
        <AnimatedSection className="programs-section">
            <h2>PROGRAMMES OFFERED</h2>
            <div className="programs-grid">
                {programs.map((program, index) => (
                    <div key={index} className="program-card">
                        <img src={program.img} alt={program.name} />
                        <div className="program-card-content">
                            <h4>{program.name}</h4>
                            <div className="program-card-buttons">
                                <button className="apply-btn">APPLY NOW</button>
                                <button className="details-btn">DETAILS</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </AnimatedSection>
    );
};

/**
 * The Industry Partners section with updated logos.
 */
const IndustryPartners = () => {
    const partners = [
        { name: 'Sunstone', logo: 'https://static.wixstatic.com/media/4526cf_eca79ead0e2a4fb48d497e88609350f3~mv2.png/v1/fill/w_454,h_56,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Sunstone%20logo%20Blue.png' },
        { name: 'MH Cockpit', logo: 'https://static.wixstatic.com/media/6685d7_65e32bb55f8041fa84db444497744e40~mv2.png/v1/fill/w_472,h_134,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/6685d7_65e32bb55f8041fa84db444497744e40~mv2.png' },
        { name: 'Risaya', logo: 'https://static.wixstatic.com/media/6685d7_7ceabd82158245e98dd4b867af91cb91~mv2.jpg/v1/fill/w_364,h_156,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/raisaya.jpg' },
        { name: 'Emversity', logo: 'https://static.wixstatic.com/media/6685d7_768389dfc29642a0926e31ae90f3af4c~mv2.png/v1/fill/w_384,h_84,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/6685d7_768389dfc29642a0926e31ae90f3af4c~mv2.png' }
    ];
    return (
        <AnimatedSection className="industry-partners-section">
            <h2>Industry Oriented Programs</h2>
            <div className="partners-grid">
                {partners.map((partner, index) => (
                    <div key={index} className="partner-logo">
                        <img src={partner.logo} alt={`${partner.name} Logo`}/>
                    </div>
                ))}
            </div>
        </AnimatedSection>
    );
};

/**
 * The Leadership Team section with the full board and updated images.
 */
const LeadershipTeam = () => {
    const leaders = [
        { img: 'https://static.wixstatic.com/media/6685d7_294b7edeee7e4ff0b6b915506dc2c9d4~mv2.jpg/v1/fill/w_388,h_508,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/Malla%20Reddy_edited.jpg', name: 'Sri. Ch. Malla Reddy', title: 'Founder Chairman', size: 'large' },
        { img: 'https://static.wixstatic.com/media/6685d7_cf7223ca70be43c391198492d875a9db~mv2.jpg/v1/fill/w_388,h_508,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/Chairman_Kalpana.jpg', name: 'Smt. Ch. Kalpana', title: 'Chancellor - MRUH' },
        { img: 'https://static.wixstatic.com/media/0c0246_bd08f728ef4d4cdda970a08ea3049066~mv2.jpg/v1/fill/w_388,h_508,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/Shalini%20Reddy%20Madam.jpg', name: 'Smt. Ch. Shalini Reddy', title: 'Pro - Chancellor - MRUH' },
        { img: 'https://static.wixstatic.com/media/6685d7_8ee91d59ca134fbbb3e2c93d1ad9a8f1~mv2.jpg/v1/fill/w_388,h_508,al_c,lg_1,q_80,enc_auto/VSK_Reddy.jpg', name: 'Dr. VSK Reddy', title: 'Vice Chancellor - MRUH' },
        { img: 'https://static.wixstatic.com/media/0c0246_3596092014704562bc4720f9484e0924~mv2.jpeg/v1/fill/w_388,h_508,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/Dr_%20S_%20Sudheer%20Kumar.jpeg', name: 'Dr. S. Sudheer Kumar', title: 'Registrar - MRUH' }
    ];
    return (
        <AnimatedSection className="leadership-section">
            <h2>Leadership Team</h2>
            <div className="leader-row chairman-row">
                <div className={`leader-card ${leaders[0].size}`}>
                    <img src={leaders[0].img} alt={leaders[0].name} />
                    <h4>{leaders[0].name}</h4>
                    <p className="chairman-title">{leaders[0].title}</p>
                </div>
            </div>
            <div className="leader-row">
                {[leaders[1], leaders[2]].map((leader, index) => (
                     <div key={index} className="leader-card">
                        <img src={leader.img} alt={leader.name} />
                        <h4>{leader.name}</h4>
                        <p>{leader.title}</p>
                    </div>
                ))}
            </div>
             <div className="leader-row">
                {[leaders[3], leaders[4]].map((leader, index) => (
                     <div key={index} className="leader-card">
                        <img src={leader.img} alt={leader.name} />
                        <h4>{leader.name}</h4>
                        <p>{leader.title}</p>
                    </div>
                ))}
            </div>
            <div className="leader-button-container">
                 <button className="more-details-btn">More Details</button>
            </div>
        </AnimatedSection>
    );
};

// ===================================================================
//  2. MAIN HOMEPAGE COMPONENT
// ===================================================================

const HomePage = () => {
    return (
        <div className="homepage-container">
            <PublicHeader />
            <main>
                <HeroSlider />
                <AnnouncementsSection />
                <AboutSection />
                <ProgramsSection />
                <IndustryPartners />
                <LeadershipTeam />
                {/* Vision/Mission can be added back here if desired */}
            </main>
            <Footer />
        </div>
    );
};

export default HomePage;