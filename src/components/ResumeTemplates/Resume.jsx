import React, { useState, useEffect } from "react";
import { MdPhone, MdEmail, MdLocationOn } from 'react-icons/md';
import profilepic from '../../Assets/wp-2021-01-linkedin-profile-picture-after.avif'


const Resume = (props) => {


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
        <div className="bg-white p-2 w-[210mm] h-[297mm] mx-auto shadow-md">

            <div className="flex items-center justify-around align-center border-b border-gray-900/10 pb-10 pt-10"
            >

                <div className="flex mr-4 self-center w-[70px] h-[70px] sm:w-[100px] sm:h-[100px] ">

                    <img className="rounded-full " src={personalInfo.photo||profilepic} alt="Profile" />


                </div >

                <div className="text-center mt-5">
                    <h2 className="sm:text-4xl font-bold">{personalInfo.firstName.toUpperCase()} {personalInfo.lastName.toUpperCase()}</h2>
                    <p className="text-gray-600 ">{personalInfo.role}</p>
                </div>



            </div>

            <div className="grid grid-cols-10 ">

                <div className="col-span-4 flex flex-col text-start align-center justify-center mt-4 p-3 sm:p-10">
                    <div className="flex items-center mt-2">
                        <MdPhone className="text-gray-500 mr-2 " />
                        <p className="text-sm text-gray-500 ">{personalInfo.phone}</p>
                    </div>
                    <div className="flex items-center mt-2">
                        <MdEmail className="text-gray-500 mr-2 " />
                        <p className="text-sm text-gray-500">{personalInfo.email}</p>
                    </div>
                    <div className="flex items-center mt-2">
                        <MdLocationOn className="text-gray-500 mr-2" />
                        <p className="text-sm text-gray-500">{personalInfo.streetAddress} {personalInfo.region} {personalInfo.city} {personalInfo.postalCode}</p>
                    </div>
                </div>

                <div className="mt-8 col-span-6 border-l border-gray-900/10 p-5 sm:p-10">
                    <h3 className="sm:text-xl tracking-wider font-medium ">PROFILE</h3>
                    <p className="mt-3 text-gray-500 text-sm sm:text-base">
                        {personalInfo.objective}
                    </p>
                </div>

            </div>

            <div className="grid grid-cols-10 ">

                <div className="col-span-4 ">



                    <div className="border-t border-gray-900/10 p-3 sm:p-10">
                        <h3 className="sm:text-xl tracking-wider font-medium pb-1">SKILLS</h3>
                        <ul className="list-disc mt-2 list-inside text-gray-500">
                            {skills.map((skill, index) => (
                                <li key={index} className=" text-sm sm:text-base">{skill}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="mt-4 p-3 sm:p-10 border-t border-gray-900/10">
                        <h3 className="sm:text-xl tracking-wider font-medium  ">EDUCATION</h3>
                        <ul className="list-none mt-3 list-inside text-gray-500 text-sm sm:text-base ">
                            {education && (
                                <li>
                                    <strong>{education.degree}</strong><br />
                                    {education.university}<br />
                                    {education.startyear} - {education.endyear} 
                                </li>
                            )}

                        </ul>
                    </div>
                </div>

                <div className="col-span-6 border-l border-t border-gray-900/10 p-5 sm:p-10 ">
                    <h3 className="sm:text-xl tracking-wider font-medium pb-1 ">EXPERIENCE</h3>
                    <div className="text-gray-500 mt-3 text-sm sm:text-base">
                        {experiences.map((experience, index) => (
                            <div className="pb-2 " key={index}>
                                <strong >{experience.jobtitle}</strong>
                                <br />
                                {experience.organisation}
                                <br />
                                {experience.startyear} - {experience.endyear} 
                                <br />
                                <ul className="list-disc list-inside mt-2">
                                    {experience.description.split('.').map((point, pointIndex) => (
                                        point && <li key={pointIndex}>{point.trim()}.</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

            </div>







        </div>
    );
};

export default Resume;