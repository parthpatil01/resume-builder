import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import temp1 from '../Assets/temp1.jpg';
import temp2 from '../Assets/temp2.jpg';
import temp3 from '../Assets/temp3.jpg';
import temp4 from '../Assets/temp4.jpg';

function Home() {

    const [isHovered1, setIsHovered1] = useState(false);
    const [isHovered2, setIsHovered2] = useState(false);
    const [isHovered3, setIsHovered3] = useState(false);
    const [isHovered4, setIsHovered4] = useState(false);
    const navigate = useNavigate();

    const handleButtonClick = (templateId) => {
        navigate(`/details?template=${templateId}`);
    };

    return (
        <div className="flex-col justify-center items-center h-full m-[20px] mt-[54px] ">

            <div className='pt-[50px] pb-[30px] '>
                <h1 className='font-bold text-2xl'>Templates</h1>
                <p  className='text-sm text-gray-500 font-semibold mt-2'>Select a template to get started.</p>
            </div>


            <div className="grid grid-row md:grid-cols-4 gap-12">

                <div
                    className=" shadow-md relative"
                    onMouseEnter={() => setIsHovered1(true)}
                    onMouseLeave={() => setIsHovered1(false)}
                >
                    <img src={temp1} alt="template1" />
                    {isHovered1 && (
                        <button className="absolute inset-0 flex items-center justify-center bg-black/50 text-white rounded-md" onClick={() => handleButtonClick('resume1')}>
                            Use Template
                        </button>
                    )}
                </div>
                <div
                    className=" shadow-md relative"
                    onMouseEnter={() => setIsHovered2(true)}
                    onMouseLeave={() => setIsHovered2(false)}
                >
                    <img src={temp2} alt="template2" />
                    {isHovered2 && (
                        <button className="absolute inset-0 flex items-center justify-center bg-black/50 text-white rounded-md" onClick={() => handleButtonClick('resume2')}>
                            Use Template
                        </button>
                    )}
                </div>
                <div
                    className=" shadow-md relative"
                    onMouseEnter={() => setIsHovered3(true)}
                    onMouseLeave={() => setIsHovered3(false)}
                >
                    <img src={temp3} alt="template3" />
                    {isHovered3 && (
                        <button className="absolute inset-0 flex items-center justify-center bg-black/50 text-white rounded-md" onClick={() => handleButtonClick('resume3')}>
                            Use Template
                        </button>
                    )}
                </div>
                <div
                    className=" shadow-md relative"
                    onMouseEnter={() => setIsHovered4(true)}
                    onMouseLeave={() => setIsHovered4(false)}
                >
                    <img src={temp4} alt="template4" />
                    {isHovered4 && (
                        <button className="absolute inset-0 flex items-center justify-center bg-black/50 text-white rounded-md" onClick={() => handleButtonClick('resume4')}>
                            Use Template
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Home;
