import React, { useEffect, useState } from "react";
import Education from "./Education";
import PersonalInfo from "./PersonalInfo";
import Work from "./Work";
import Skill from "./Skill";
import Preview from "./Preview";


import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const Details = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const templateId = urlParams.get('template');

  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [formData, setFormData] = useState({});

  const sections = ["Personal Info", "Work Experience", "Education", "Skills", "Preview"];

  const generateRandomId = () => {
    return Math.random().toString(36).substr(2, 9); // Generate a random string
  };

  const [Id, setId] = useState('');

  const handleNext = (key, data) => {

    setFormData((prevData) => {

      const currentDate = new Date();
      const date = currentDate.toLocaleDateString();
      const time = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const unixTimestamp = Math.floor(currentDate.getTime() / 1000);


      const existingData = JSON.parse(localStorage.getItem(Id)) || {};
      

      const updatedData = {
        ...prevData,
        'meta': [existingData.meta?.[0] ?? data.firstName+' '+data.lastName , date, time, templateId, unixTimestamp],
        [key]: data,
      };


      // Merge existing data with updated data
      const mergedData = {
        ...existingData,
        ...updatedData,
      };


      const nextIndex = activeSectionIndex + 1;
      if (nextIndex === sections.length) {

        localStorage.setItem(Id, JSON.stringify(mergedData));
        navigate("/my-resumes");
      } else {
        // Continue to the next section
        setActiveSectionIndex(nextIndex);
      }

      return mergedData;
    });
  };


  const handleBack = () => {
    setActiveSectionIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };


  const saveDataToLocalStorage = () => {
    localStorage.setItem(Id, JSON.stringify(formData));
  };

  useEffect(() => {
    const urlId = urlParams.get('id');
    if (urlId) {
      setId(urlId);
    } else {
      const generatedId = generateRandomId();
      setId(generatedId);
    }
  }, []);



  useEffect(() => {
    if (Object.keys(formData).length > 0) {
      saveDataToLocalStorage();
    }
  }, [formData]);


  return (
    <div className="flex flex-col w-full md:flex-row flex-auto flex-shrink-0 antialiased text-gray-800">

      <div className="flex flex-col md:w-[20%] bg-white md:h-screen md:border-r pt-[54px]">
        <div className="overflow-y-auto overflow-x-hidden flex-grow">
          <ul className="flex flex-col py-4 space-y-1">
            {sections.map((section, index) => (
              <div key={index}>
                <li
                  
                  className={`flex justify-center md:justify-start focus:outline-none border-l-4 ${activeSectionIndex === index && "bg-gray-50 border-blue-500 text-blue-500"
                    }`}
                >
                  <div className="relative flex flex-row items-center h-11 w-[170px] md:w-full text-black  pr-2 " >
                    <span className={`ml-10 text-sm tracking-wide ${activeSectionIndex === index && "text-blue-500"}`}>{section}</span>
                  </div>

                </li>

                <hr />
              </div>
            ))}


          </ul>
        </div>
      </div>

      <div className="flex h-screen flex-col flex-1 overflow-y-auto">

        {sections[activeSectionIndex] === "Personal Info" && <PersonalInfo onNext={handleNext} Id={Id} />}
        {sections[activeSectionIndex] === "Work Experience" && <Work onNext={handleNext} onBack={handleBack} Id={Id} />}
        {sections[activeSectionIndex] === "Education" && <Education onNext={handleNext} onBack={handleBack} Id={Id} />}
        {sections[activeSectionIndex] === "Skills" && <Skill onNext={handleNext} onBack={handleBack} Id={Id} />}
        {sections[activeSectionIndex] === "Preview" && <Preview onNext={handleNext} onBack={handleBack} Id={Id} />}



      </div>

    </div>
  );
}

export default Details;
