
import React from 'react';
import data from './data.json'


import { useState, useEffect, useRef } from 'react';

const Education = ({ onNext, onBack, Id }) => {

    const currentYear = new Date().getFullYear();

    const [errorMessage, setErrorMessage] = useState('');
    const formRef = useRef(null);

    const [Education, setEducation] = useState({
        type: 'Graduation',
        university: '',
        degree: '',
        startyear: currentYear,
        endyear: currentYear,
    });

    useEffect(() => {
        const userDataFromLocalStorage = localStorage.getItem(Id);
        if (userDataFromLocalStorage) {
            const userData = JSON.parse(userDataFromLocalStorage);
            if (userData.education)
                setEducation(userData.education);
            // else {
            //     setEducation(data.education);
            // }
        }
    }, [Id]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setEducation((prevEducation) => ({
            ...prevEducation,
            [name]: value
        }));

    };

    const handleWorkBack = () => {
        onBack();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            for (const key in Education) {
                if (Education[key] === '') {
                    setErrorMessage('*Please fill in all fields');
                    formRef.current.scrollIntoView({ behavior: "smooth" });
                    return;
                }
            }
            onNext('education', Education);

        } catch (error) {
            console.error('Failed to save user information:', error);
        }

    };

    return (

        <div className="mx-auto w-full md:w-[50%] mt-[70px] px-20 bg-white shadow rounded-lg overflow-y" ref={formRef}>

            <form onSubmit={handleSubmit}>

                <div className="border-b border-gray-900/10 pb-2">
                    <h1 className="text-base mt-10 font-semibold leading-7 text-gray-900 mb-5">Education Details</h1>
                </div>

                {errorMessage && (
                    <div className="col-span-full text-red-500 text-sm">
                        {errorMessage}
                    </div>
                )}

                <div>

                    <div className="border-b border-gray-900/10 pb-12">

                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                            <div className="sm:col-span-3">
                                <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                                    Type
                                </label>
                                <div className="mt-2">
                                    <select
                                        id="type"
                                        name="type"
                                        value={Education.type}
                                        onChange={handleChange}
                                        autoComplete="type"
                                        className="block w-full p-3 rounded-md border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:outline-none focus:ring-gray-700 sm:max-w-xs sm:text-sm sm:leading-6"
                                    >

                                        <option >Graduation</option>
                                        <option >Post Graduation</option>

                                    </select>
                                </div>
                            </div>

                            <div className="sm:col-span-3">

                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="university" className="block text-sm font-medium leading-6 text-gray-900">
                                    University
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="university"
                                        id="university"
                                        value={Education.university}
                                        onChange={handleChange}
                                        autoComplete="job-title"
                                        className="block w-full rounded-md ps-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:outline-none focus:ring-gray-700 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="degree" className="block text-sm font-medium leading-6 text-gray-900">
                                    Degree
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="degree"
                                        id="degree"
                                        value={Education.degree}
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
                                <div className="mt-2">
                                    <select
                                        id="startyear"
                                        name="startyear"
                                        value={Education.startyear}
                                        onChange={handleChange}
                                        autoComplete="startyear"
                                        className="block w-full p-3 rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:outline-none focus:ring-gray-700 sm:max-w-xs sm:text-sm sm:leading-6"
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
                                        value={Education.endyear}
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


    );
}

export default Education;

