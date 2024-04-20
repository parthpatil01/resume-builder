import React from "react";
import './resumetwo.css';
import { useState, useEffect } from "react";
import { MdPhone, MdEmail, MdLocationOn } from 'react-icons/md';
import profilepic from '../../Assets/wp-2021-01-linkedin-profile-picture-after.avif'


const ResumeTwo = (props) => {

    const [userData, setUserData] = useState(null);

    useEffect(() => {
        // Fetch user data from local storage based on specific ID
        const userDataFromLocalStorage = localStorage.getItem(props.sessionId);
        if (userDataFromLocalStorage) {
            setUserData(JSON.parse(userDataFromLocalStorage));
        }
    }, []);

    // Check if userData is null or not before rendering
    if (!userData) {
        return <div>Loading...</div>;
    }

    const { personalInfo, skills, experiences, education } = userData;


    return (

        <div className="container shadow-md print:shadow-none">
            <div className="header">
                <div className="flex justify-between  ">
                    <div className="flex-col">
                        <div className="full-name">
                            <span className="first-name">{personalInfo.firstName.toUpperCase()}</span>
                            <span className="last-name">{personalInfo.lastName.toUpperCase()}</span>
                        </div>
                        <div className="contact-info">
                            <span className="email">Email: </span>
                            <span className="email-val">{personalInfo.email}</span>
                            <span> | </span>
                            <span className="phone">Phone: </span>
                            <span className="phone-val">{personalInfo.phone}</span>
                            <br />
                            <span className="address">Address: </span>
                            <span className="address-val">{personalInfo.streetAddress} {personalInfo.region} {personalInfo.city} {personalInfo.postalCode}</span>
                        </div>
                    </div>
                    <div>
                        <img className='rounded-full profile-pic hidden sm:block relative bottom-[20%] right-[35%] h-[50px] w-[50px] sm:h-[100px] sm:w-[100px]'  src={personalInfo.photo||profilepic} alt="" />
                    </div>

                </div>


                <div className="about">
                    <span className="position">{personalInfo.role}</span>
                    <span className="desc">
                    {personalInfo.objective}
                    </span>
                </div>
            </div>

            <div className="details ">
                <div className="section">
                    <div className="section_title">Experience <hr className="mt-1"/></div>
                    <div className="section_list">

                        {experiences.map((experience, index) => (

                            <div className="section_list-item">
                                <div className="left">
                                    <div className="name">{experience.organisation}</div>
                                    <div className="duration">{experience.startyear} {experience.endyear}</div>
                                </div>
                                <div className="right">
                                    <div className="name">{experience.jobtitle}</div>
                                    <ul className="list-disc pl-5">
                                        {experience.description.split('.').map((sentence, sentenceIndex) => (
                                            sentence && <li key={sentenceIndex} className="text-sm text-gray-700">{sentence}.</li>
                                        ))}
                                    </ul>


                                </div>
                            </div>

                        ))}

                    </div>
                </div>
                <div className="section">
                    <div className="section_title">Education <hr className="mt-1"/> </div>
                    <div className="section_list">
                        <div className="section_list-item">
                            <div className="left">
                                <div className="name">{education.university}</div>
                                <div className="addr">{education.degree}</div>
                                <div className="duration">{education.startyear} - {education.endyear}</div>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="section">
                    <div className="section_title">Skills <hr className="mt-1"/> </div>
                    <div className="skills">
                        <div className="left-column">
                            {skills.slice(0, 5).map((skill, index) => (
                                <div key={index} className="skills_item">
                                    <div className="name">{skill}</div>
                                </div>
                            ))}
                        </div>
                        {skills.length > 5 && (
                            <div className="right-column">
                                {skills.slice(5).map((skill, index) => (
                                    <div key={index} className="skills_item">
                                        <div className="name">{skill}</div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>

    );
};

export default ResumeTwo;