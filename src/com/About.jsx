import './styles/About.css'

function About() {
    return (
        <>
            <h1 className="about-title">Our Team</h1>

            <p className="about-desc">
                Meet the talented team behind our project.
            </p>

            <div className="team-grid">
                <div className="member-card">
                    <img src="/qndel.jpg" alt="Member 1" className="member-img" />
                    <h2 className="member-name">Ibrahim Qandeel</h2>
                    <p className="member-role">developer</p>
                </div>

                <div className="member-card">
                    <img src="/hiasat.jpg" alt="Member 2" className="member-img" />
                    <h2 className="member-name">Ahmad Hiasat</h2>
                    <p className="member-role">Leader</p>
                </div>

                <div className="member-card">
                    <img src="/qaruty.jpg" alt="Member 3" className="member-img" />
                    <h2 className="member-name">Majdaldeen Alqaruty</h2>
                    <p className="member-role">developer</p>
                </div>
            </div>

            <p className="project-details">
                This project is designed to streamline how student information and grades are managed.
                It allows instructors to sort students alphabetically, compare them based on GPA, and apply
                advanced filtering options to quickly find the information they need. The system improves accuracy,
                reduces manual work, and provides a clean, efficient way to handle academic performance data.
            </p>
        </>
    );
}

export default About;
