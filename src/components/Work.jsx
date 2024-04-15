
import React from 'react';
import data from './data.json'

import { useState, useEffect, useRef } from 'react';

const Work = ({ onNext, onBack, Id }) => {
    const currentYear = new Date().getFullYear();

    const [Work, setWork] = useState({
        jobtitle: '',
        organisation: '',
        startyear: currentYear,
        endyear: currentYear,
        description: '',
    });


    useEffect(() => {
        const userDataFromLocalStorage = localStorage.getItem(Id);
        if (userDataFromLocalStorage) {
            const userData = JSON.parse(userDataFromLocalStorage);
            if (userData.experiences)
                setExperiences(userData.experiences);
        }
        // else {
        //     setExperiences(data.experience);

        // }
    }, [Id]);

    const [errorMessage, setErrorMessage] = useState('');
    const formRef = useRef(null);

    const [experiences, setExperiences] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;


        setWork((prevWork) => ({
            ...prevWork,
            [name]: value
        }));

    };

    const handleAdd = async (e) => {
        e.preventDefault();
        try {
            if (Work.jobtitle && Work.organisation && Work.startyear && Work.endyear && Work.description) {
                const newExperience = { ...Work };

                setErrorMessage('');

                setExperiences([...experiences, newExperience]);

                setWork({
                    jobtitle: '',
                    organisation: '',
                    startyear: currentYear,
                    endyear: currentYear,
                    description: ''
                });
            } else {
                setErrorMessage('* Please fill in all fields');
                formRef.current.scrollIntoView({ behavior: "smooth" });
            }


        } catch (error) {
            console.error('Failed to save user information:', error);

        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            if (Work.jobtitle && Work.organisation && Work.startyear && Work.endyear && Work.description) {
                const newExperience = { ...Work };

                setErrorMessage('');

                setExperiences([...experiences, newExperience]);

                setWork({
                    jobtitle: '',
                    organisation: '',
                    startyear: currentYear,
                    endyear: currentYear,
                    description: ''
                });

                onNext('experiences', [...experiences, newExperience]);

            } else if (experiences.length > 0) {
                onNext('experiences', experiences);
            } else {
                setErrorMessage('* Please fill in all fields');
                formRef.current.scrollIntoView({ behavior: "smooth" });

            }


        } catch (error) {
            console.error('Failed to save user information:', error);

        }
    };

    const handleWorkBack = () => {
        onBack();
    };

    return (

        <div className=" w-full h-screen pt-[54px] overflow-y-auto">

            <div className='w-full md:w-[60%] shadow mx-auto px-20 py-5 bg-white rounded-lg' ref={formRef}>
                <form onSubmit={handleSubmit}>

                    <h1 className="text-base mt-10 font-semibold leading-7 text-gray-900 mb-5">Work Experience</h1>


                    <div>


                        <div className="border-t border-gray-900/10 pb-4">



                            {experiences.map((experience, index) => (



                                <div key={index} className='border-b border-gray-900/10 pb-4'>
                                    <p className="mt-1 text-sm leading-6 text-gray-600">Experience {index + 1}</p>
                                    <h2 className="text-lg font-semibold text-gray-900 mb-2">{experience.jobtitle}</h2>
                                    <p className="text-sm text-gray-700 font-semibold mb-1">{experience.organisation}</p>
                                    <p className="text-sm text-gray-700 font-light">{experience.startyear} - {experience.endyear}</p>

                                    <ul className="list-disc pl-5">
                                        {experience.description.split('.').map((sentence, sentenceIndex) => (
                                            sentence && <li key={sentenceIndex} className="text-sm text-gray-700">{sentence}.</li>
                                        ))}
                                    </ul>
                                </div>

                            ))}

                        </div>
                        {errorMessage && (
                            <div className="col-span-full text-red-500 text-sm">
                                {errorMessage}
                            </div>
                        )}
                        <div className="border-b border-gray-900/10 pb-12">

                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="sm:col-span-3">
                                    <label htmlFor="job-title" className="block text-sm font-medium leading-6 text-gray-900">
                                        Job title
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            name="jobtitle"
                                            id="job-title"
                                            autoComplete="job-title"
                                            value={Work.jobtitle}
                                            onChange={handleChange}
                                            className="block w-full rounded-md ps-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:outline-none focus:ring-gray-700 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-3">
                                    <label htmlFor="organisation" className="block text-sm font-medium leading-6 text-gray-900">
                                        Organisation
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            name="organisation"
                                            id="organisation"
                                            value={Work.organisation}
                                            onChange={handleChange}
                                            autoComplete="job-title"
                                            className="block w-full rounded-md ps-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:outline-none focus:ring-gray-700 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-3">
                                    <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                                        Start year
                                    </label>
                                    <div className="mt-2 ">
                                        <select
                                            id="startyear"
                                            name="startyear"
                                            value={Work.startyear}
                                            onChange={handleChange}
                                            autoComplete="startyear"
                                            className=" block w-full p-3 rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:outline-none focus:ring-gray-700 sm:max-w-xs sm:text-sm sm:leading-6"
                                        >
                                            {Array.from({ length: 50 }, (_, index) => {
                                                const year = new Date().getFullYear() - index;
                                                return <option key={year} value={year}>{year}</option>;
                                            })}
                                        </select>
                                    </div>
                                </div>

                                <div className="sm:col-span-3">
                                    <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                                        End year
                                    </label>
                                    <div className="mt-2">
                                        <select
                                            id="endyear"
                                            name="endyear"
                                            value={Work.endyear}
                                            onChange={handleChange}
                                            autoComplete="endyear"
                                            className="block w-full p-3 rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:outline-none focus:ring-gray-700 sm:max-w-xs sm:text-sm sm:leading-6"
                                        >
                                            {Array.from({ length: 50 }, (_, index) => {
                                                const year = new Date().getFullYear() - index;
                                                return <option key={year} value={year}>{year}</option>;
                                            })}
                                        </select>
                                    </div>
                                </div>


                                <div className="col-span-full">
                                    <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                                        Job description
                                    </label>
                                    <div className="mt-2">
                                        <textarea
                                            rows="6"
                                            placeholder='Describe your job responsibilities and achievements.'
                                            name="description"
                                            id="description"
                                            value={Work.description}
                                            onChange={handleChange}
                                            autoComplete="description"
                                            className="block w-full rounded-md border-0 ps-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:outline-none focus:ring-gray-700 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>


                            </div>
                            <div className="mt-6 flex items-center justify-center gap-x-6">
                                <div onClick={handleAdd} className="text-blue-500 font-semibold cursor-pointer hover:underline">
                                    Add New
                                </div>
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
                            Next
                        </button>
                    </div>
                </form>
                <div className='h-20'></div>
            </div>
        </div>


    );
}

export default Work;

