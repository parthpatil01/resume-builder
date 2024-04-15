import React from 'react';
import { useState, useEffect, useRef } from 'react';
import data from './data.json'

const PersonalInfo = ({ onNext, Id }) => {
    const [userInfo, setUserInfo] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        streetAddress: '',
        city: '',
        region: '',
        postalCode: '',
        role: '',
        objective: '',
        photo: null,
    });


    useEffect(() => {
        const userDataFromLocalStorage = localStorage.getItem(Id);
        if (userDataFromLocalStorage) {
            const userData = JSON.parse(userDataFromLocalStorage);
            if (userData.personalInfo)
                setUserInfo(userData.personalInfo);

        } 
        // else {
        //     setUserInfo(data.personalInfo);
        // }
    }, [Id]);

    const [errorMessage, setErrorMessage] = useState('');

    const formRef = useRef(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserInfo((prevUserInfo) => ({
            ...prevUserInfo,
            [name]: value
        }));
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        setUserInfo(prevUserInfo => ({
            ...prevUserInfo,
            photo: file
        }));
    };

    const handleSubmit = async (e) => {

        e.preventDefault();
        try {

            for (const key in userInfo) {
                if (key === 'phone') {
                    if (userInfo[key] < 0 || userInfo[key].length !== 10) {
                        setErrorMessage('*Invalid Phone number');
                        formRef.current.scrollIntoView({ behavior: "smooth" });
                        return;
                    }
                }
                else {
                    if (userInfo[key] === '') {
                        setErrorMessage('* Please fill in all fields');
                        formRef.current.scrollIntoView({ behavior: "smooth" });
                        return;
                    }
                }
            }

            if (!userInfo.photo) {
                setErrorMessage('* Please upload a photo');
                formRef.current.scrollIntoView({ behavior: 'smooth' });
                return;
            }

            if (userInfo.photo instanceof File) {

                let photoBase64 = null;

                const reader = new FileReader();
                reader.onload = (e) => {
                    photoBase64 = e.target.result;

                    const userData = {
                        ...userInfo,
                        photo: photoBase64
                    };
                    onNext('personalInfo', userData);

                };

                reader.readAsDataURL(userInfo.photo);

            } else onNext('personalInfo', userInfo);




        } catch (error) {
            console.error('Failed to save user information:', error);
        }

    };

    return (

        <div className=" w-full h-screen overflow-y-auto">

            <div className='w-full md:w-[60%] shadow mx-auto px-20 py-5 bg-white rounded-lg' ref={formRef}>
                <form onSubmit={handleSubmit} >
                    <div className="space-y-12">
                        <div className="border-b border-gray-900/10 pb-4">


                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">


                                <div className="col-span-full">
                                    <label htmlFor="photo" className="block text-sm font-medium leading-6 text-gray-900">
                                        Photo
                                    </label>
                                    <div className="mt-2 flex items-center">
                                        <img className="rounded-full" src={

                                            userInfo.photo instanceof File ? URL.createObjectURL(userInfo.photo) : (userInfo.photo || 'https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg'
                                            )



                                        } alt="Circle Image" style={{ width: '100px', height: '100px' }} />
                                        <div className="flex flex-col">
                                            <input
                                                type="file"
                                                accept="image/*"
                                                name="photo"
                                                id="photo"
                                                onChange={handlePhotoChange}
                                                className="sr-only"
                                            />
                                            <label htmlFor="photo" className="rounded-md bg-white mx-5 px-3 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 cursor-pointer hover:bg-gray-50">
                                                Change
                                            </label>
                                        </div>
                                    </div>
                                </div>

                            </div>

                        </div>
                        {errorMessage && (
                            <div className="col-span-full text-red-500 text-sm">
                                {errorMessage}
                            </div>
                        )}

                        <div className="border-b border-gray-900/10 pb-12">


                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="sm:col-span-3">
                                    <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                        First name
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            name="firstName"
                                            id="first-name"
                                            autoComplete="given-name"
                                            value={userInfo.firstName}
                                            onChange={handleChange}
                                            className="block w-full rounded-md ps-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:outline-none focus:ring-gray-700 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-3">
                                    <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                                        Last name
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            name="lastName"
                                            id="last-name"
                                            value={userInfo.lastName}
                                            onChange={handleChange}
                                            autoComplete="family-name"
                                            className="block w-full rounded-md ps-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:outline-none focus:ring-gray-700 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-3">
                                    <label htmlFor="role" className="block text-sm font-medium leading-6 text-gray-900">
                                        Job role
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            name="role"
                                            id="role"
                                            value={userInfo.role}
                                            onChange={handleChange}
                                            autoComplete="role"
                                            className="block w-full rounded-md border-0 ps-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:outline-none focus:ring-gray-700 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-3">
                                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                        Email
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="email"
                                            name="email"
                                            value={userInfo.email}
                                            onChange={handleChange}
                                            type="email"
                                            autoComplete="email"
                                            className="block w-full rounded-md ps-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:outline-none focus:ring-gray-700 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-3">
                                    <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
                                        Mobile
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="phone"
                                            name="phone"
                                            value={userInfo.phone}
                                            onChange={handleChange}
                                            type="number"
                                            autoComplete="phone"
                                            className="block w-full rounded-md border-0 ps-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:outline-none focus:ring-gray-700 sm:text-sm sm:leading-6"

                                        />
                                    </div>
                                </div>

                                <div className="col-span-full">
                                    <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                                        Address
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            name="streetAddress"
                                            id="street-address"
                                            value={userInfo.streetAddress}
                                            onChange={handleChange}
                                            autoComplete="street-address"
                                            className="block w-full rounded-md border-0 ps-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:outline-none focus:ring-gray-700 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-3 sm:col-start-1">
                                    <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                                        City
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            name="city"
                                            id="city"
                                            value={userInfo.city}
                                            onChange={handleChange}
                                            autoComplete="address-level2"
                                            className="block w-full rounded-md border-0 ps-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:outline-none focus:ring-gray-700 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-3">
                                    <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">
                                        State
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            name="region"
                                            id="region"
                                            value={userInfo.region}
                                            onChange={handleChange}
                                            autoComplete="address-level1"
                                            className="block w-full rounded-md border-0 ps-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:outline-none focus:ring-gray-700 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-3">
                                    <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
                                        Postal code
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="number"
                                            name="postalCode"
                                            id="postal-code"
                                            value={userInfo.postalCode}
                                            onChange={handleChange}
                                            autoComplete="postal-code"
                                            className="block w-full rounded-md border-0 ps-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:outline-none focus:ring-gray-700 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>



                                <div className="col-span-full">
                                    <label htmlFor="objective" className="block text-sm font-medium leading-6 text-gray-900">
                                        Objective
                                    </label>
                                    <div className="mt-2">
                                        <textarea
                                            rows="6"
                                            name="objective"
                                            id="objective"
                                            value={userInfo.objective}
                                            onChange={handleChange}
                                            autoComplete="objective"
                                            className="block w-full rounded-md border-0 ps-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:outline-none focus:ring-gray-700 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                            </div>
                        </div>



                    </div>

                    <div className="mt-6 flex items-center justify-end gap-x-6">

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

export default PersonalInfo;