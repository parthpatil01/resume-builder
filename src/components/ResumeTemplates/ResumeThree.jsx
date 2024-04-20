import React, { useState, useEffect } from "react";
import profilepic from '../../Assets/wp-2021-01-linkedin-profile-picture-after.avif'
import { Height } from "@mui/icons-material";


const ResumeThree = (props) => {

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
    <div class="w-[210mm] h-[297mm] shadow-md" >
      <div class="flex h-full">
        <div class="w-[40%] p-10 bg-[#FDF4F5]">
          <div class="grid gap-8">
            <div class="mx-auto ">
              <img class="w-[150px] rounded-full" src={personalInfo.photo||profilepic} alt="" />
            </div>
            <p class="text-4xl font-bold text-[#A685E2]">{personalInfo.firstName.toUpperCase()} {personalInfo.lastName.toUpperCase()}</p>
          </div>
          <div class="pt-3">
            <p class="font-light uppercase">{personalInfo.role}</p>
          </div>
          <div class="pt-10">
            <p class="text-2xl font-medium text-[#6155A6]">Contact</p>
            <div class="grid gap-2 pt-4 text-base font-light">
              <p>{personalInfo.streetAddress} {personalInfo.region} {personalInfo.city} {personalInfo.postalCode}</p>
              <p>{personalInfo.phone}</p>
              <p>{personalInfo.email}</p>

            </div>
          </div>
          <div class="flex flex-col gap-5 pt-10">
            <p class="text-2xl font-medium text-[#6155A6]">Skills</p>
            <div class="flex flex-col gap-5">
              <div>
                <div class="flex flex-col gap-2 text-base font-light">
                  {skills.map((skill, index) => (
                    <p key={index} className=" text-base sm:text-base">{skill}</p>
                  ))}


                </div>
              </div>

            </div>
          </div>
        </div>
        <div >
          <div class="pl-10 pt-16 pr-10">
            <p class="text-2xl font-semibold text-[#6155A6]">About</p>
            <p class="pt-4 text-base font-light">{personalInfo.objective}</p>
          </div>

          <div class="pl-10 pt-10 pr-10">
            <p class="text-2xl font-semibold text-[#6155A6]">Work Experience</p>


            {experiences.map((experience, index) => (
              <div className="pb-2 " key={index}>
                <div class="flex items-center justify-between pt-4">
                  <p class="text-base font-light">{experience.organisation}</p>
                  <p class="text-xs font-light">{experience.startyear} - {experience.endyear}</p>
                </div>
                <div>
                  <p class="pt-1 font-medium">{experience.jobtitle}</p>
                  <ul className="list-disc pl-5 pt-3 text-base">
                    {experience.description.split('.').map((point, pointIndex) => (
                      point && <li key={pointIndex}>{point.trim()}.</li>
                    ))}
                  </ul>
                </div>

              </div>
            ))}
            

          </div>


          <div class="pl-10 pt-10 pr-10">
            <p class="text-2xl font-semibold text-[#6155A6]">Education History</p>
            <div class="flex items-center justify-between pt-4">
              <p class="text-base font-light">{education.university}</p>
              <p class="text-xs font-light">{education.startyear} - {education.endyear}</p>
            </div>

            <p>{education.degree}</p>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeThree;