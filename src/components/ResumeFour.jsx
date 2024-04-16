
import React, { useState, useEffect } from "react";
import './resumefour.css'
import { MdPhone, MdEmail, MdLocationCity } from 'react-icons/md';
import profilepic from '../Assets/wp-2021-01-linkedin-profile-picture-after.avif'


const ResumeFour = (props) => {

    const [userData, setUserData] = useState(null);

    useEffect(() => {
        // Fetch user data from local storage based on specific ID
        const userDataFromLocalStorage = localStorage.getItem(props.sessionId);
        if (userDataFromLocalStorage) {
            setUserData(JSON.parse(userDataFromLocalStorage));
        }
    }, [props.sessionId]);

    // Check if userData is null or not before rendering
    if (!userData) {
        return <div>Loading...</div>;
    }

    const { personalInfo, skills, experiences, education } = userData;


    return (

        <div className="container_two shadow-md">
            <div className="left_Side">
                <div className="profileText">
                    <div className="imgBx">
                        <img className="photo" src={personalInfo.photo||profilepic} />
                    </div>
                    <br />
                    <h2>{personalInfo.firstName.toUpperCase()} {personalInfo.lastName.toUpperCase()}<br /><span>{personalInfo.role}</span> </h2>
                </div>

                <div className="contactInfo">
                    <h3 className="title">Contact Info</h3>
                    <ul >
                        <li className="flex">
                            <span className="icon">
                                <MdPhone aria-hidden="true" />
                            </span>
                            <span className="text"><a href="tel:06 12 64 41 84">{personalInfo.phone}</a></span>
                        </li>
                        <li className="flex">
                            <span className="icon">
                                <MdEmail aria-hidden="true" />
                            </span>
                            <span className="text"><a href="mailto: morgane.bgn@icloud.com">{personalInfo.email}</a></span>

                        </li>
                        <li className="flex">
                            <span className="icon">
                                <MdLocationCity aria-hidden="true" />
                            </span>
                            <span className="text">{personalInfo.streetAddress} {personalInfo.region} {personalInfo.city} {personalInfo.postalCode}</span>
                        </li>
                    </ul>
                </div>
                <div className="contactInfo education">
                    <h3 className="title">Education</h3>
                    <ul>
                        <li>
                            <h5>{education.startyear} - {education.endyear}</h5>
                            <h4>{education.degree}</h4>
                            <h4>{education.university}</h4><br />
                        </li>
                    </ul>
                    <h3 className="title">Skills</h3>
                    <ul>
                        <li>
                            {skills.map((skill, index) => (
                                <h5 key={index}>{skill}</h5>
                            ))}
                        </li>




                    </ul>
                </div>

            </div>
            <div className="right_Side">

                <div className="about">
                    <div className="about ">
                        <h2 className="title2">About</h2>
                        <div  >

                            <p>
                                {personalInfo.objective}
                            </p>
                        </div>

                    </div>

                    <h2 className="title2">Experiences</h2>


                    {experiences.map((experience, index) => (

                        <div className="box" key={index}>
                            <div className="year_company">
                                <h5>{experience.startyear} - {experience.endyear}</h5>

                            </div>
                            <div className="text">
                                <h4>{experience.organisation}</h4>

                                {experience.description.split('.').map((point, pointIndex) => (
                      point && <p key={pointIndex}>{point.trim()}.</p>
                    ))}


                            </div>
                        </div>

                    ))}



                </div>
            </div>

        </div>
    );
}

export default ResumeFour;