import React, { useState, useRef, useEffect } from 'react';
import { MdDelete } from 'react-icons/md';
import data from './data.json'


const Skill = ({ onNext, onBack, Id }) => {


    const [errorMessage, setErrorMessage] = useState('');
    const formRef = useRef(null);

    const [skills, setskills] = useState({
        skills: ['', '', '']
    });

    useEffect(() => {
        const userDataFromLocalStorage = localStorage.getItem(Id);
        if (userDataFromLocalStorage) {
            const userData = JSON.parse(userDataFromLocalStorage);
            if (userData.skills)
                setskills({ skills: userData.skills });
            // else {
            //     setskills({ skills: data.skills });

            // }
        }
    }, [Id]);

    const handleChange = (e, index) => {
        const { value } = e.target;
        const newSkills = [...skills.skills];
        newSkills[index] = value;
        setskills((prevskills) => ({
            ...prevskills,
            skills: newSkills
        }));
    };

    const addSkillInput = () => {
        if (skills.skills.length < 10) {
            setskills((prevskills) => ({
                ...prevskills,
                skills: [...prevskills.skills, '']
            }));
        }
    };

    const deleteSkillInput = (index) => {
        const newSkills = [...skills.skills];
        newSkills.splice(index, 1);
        setskills((prevskills) => ({
            ...prevskills,
            skills: newSkills
        }));
    };

    const handleWorkBack = () => {
        onBack();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            for (const key in skills.skills) {
                if (skills.skills[key] === '') {
                    setErrorMessage('*Please fill in all fields');
                    formRef.current.scrollIntoView({ behavior: "smooth" });
                    return;
                }
            }

            onNext('skills', skills.skills);
        } catch (error) {
            console.error('Failed to save user information:', error);
        }
    };

    return (
        <div className="mx-auto w-full md:w-[50%] px-20 bg-white mt-[70px] shadow rounded-lg overflow-y" ref={formRef}>
            <form onSubmit={handleSubmit}>
                <div className="border-b border-gray-900/10 pb-2">
                    <h1 className="text-base mt-10 font-semibold leading-7 text-gray-900 mb-5">Key Skills</h1>
                </div>
                {errorMessage && (
                    <div className="col-span-full text-red-500 text-sm">
                        {errorMessage}
                    </div>
                )}
                <div className="border-b border-gray-900/10 pb-12">
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        {skills.skills.map((skill, index) => (
                            <div key={index} className="sm:col-span-3">
                                <div className="mt-2 flex items-center">
                                    <input
                                        type="text"
                                        name={`skill-${index + 1}`}
                                        id={`skill-${index + 1}`}
                                        placeholder='Add a skill'
                                        value={skill}
                                        onChange={(e) => handleChange(e, index)}
                                        className="block w-full rounded-md ps-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:outline-none focus:ring-gray-700 sm:text-sm sm:leading-6"
                                    />
                                    {index > 2 && (
                                        <button
                                            type="button"
                                            onClick={() => deleteSkillInput(index)}
                                            className="ml-[-25px] text-red-500"
                                        >
                                            <MdDelete />
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-6 mb-6 gap-x-6">
                        <div onClick={addSkillInput} className="text-blue-500 font-semibold cursor-pointer hover:underline">
                            Add new
                        </div>
                    </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button type="button" onClick={handleWorkBack} className="text-sm font-semibold leading-6 text-gray-900">
                        Back
                    </button>
                    <button
                        type="submit"
                        className="rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-100"
                    >
                        Preview
                    </button>
                </div>
            </form>
            <div className='h-20'></div>
        </div>
    );
}

export default Skill;
