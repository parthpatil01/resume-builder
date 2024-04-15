import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import { MdFace, MdFace2, MdNote, MdNotes, MdSailing, MdSave } from 'react-icons/md';



const MyResumes = () => {
    const [dataList, setDataList] = useState([]);


    // Fetch the list of IDs and their corresponding data
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch data from localStorage or any other source
                const allEntries = [];
                // Iterate over all keys in localStorage
                for (let i = 0; i < localStorage.length; i++) {
                    const key = localStorage.key(i);
                    const value = JSON.parse(localStorage.getItem(key));
                    // Push each entry to the allEntries array
                    allEntries.push({ key, value });
                }

                allEntries.sort((a, b) => {
                    const unixA = a.value.meta[4];
                    const unixB = b.value.meta[4];

                    return unixB - unixA; // Descending order, change to dateA - dateB for ascending
                });

                // Set the allEntries array to your component's state
                setDataList(allEntries);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);


    // Function to handle deleting an entry
    const handleDelete = (id) => {
        try {
            // Remove the entry from localStorage
            localStorage.removeItem(id);
            // Update the state to reflect the change
            setDataList(dataList.filter(entry => entry.key !== id));
            console.log(`Deleted entry with ID: ${id}`);
        } catch (error) {
            console.error('Error deleting entry:', error);
        }
    };

    return (

        dataList.length === 0 ? (
            <div className="flex items-center justify-center h-screen">
                <MdSailing className='text-4xl text-gray-600' /><div className="text-center p-4 text-gray-500">You have not made any resume yet....</div>
            </div>
        ) : (
            <div className="flex flex-col w-full md:w-[60%] mx-auto mt-[80px] bg-white rounded-lg shadow">
                <ul className="divide-y">

                    {dataList.map((entry) => (

                        <li className="flex hover:bg-gray-50" key={entry.key}>

                            <Link to={`/details?template=${entry.value.meta[3]}&id=${entry.key}`} className="select-none cursor-pointer  flex items-center pr-4 w-full">
                                <div className="flex flex-col w-[100px] h-[100px] justify-center items-center">
                                    <div href="#" className="block relative">
                                        <img alt="profil" src={entry.value.personalInfo.photo} className="mx-auto w-[60px] h-[60px] object-cover rounded-full " />
                                    </div>
                                </div>
                                <div className="flex flex-1 justify-center pl-1 md:mr-8">
                                    <div className="font-medium text-black">{entry.value.meta[0]}</div>
                                </div>

                                <div className="text-gray-600 text-xs ml-auto ">{entry.value.meta[1]} {entry.value.meta[2]}</div>

                            </Link>
                            <button className="text-red-500 mx-2 self-center md:text-xl h-[94px] mb-[6px]" onClick={() => handleDelete(entry.key)}>
                                <DeleteIcon />
                            </button>
                        </li>

                    ))}
                </ul>
            </div>

        )


    );
};

export default MyResumes;
