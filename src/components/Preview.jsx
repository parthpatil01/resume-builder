import React, {useState} from 'react';
import Resume from "./ResumeTemplates/Resume";
import ResumeFour from "./ResumeTemplates/ResumeFour";
import ResumeThree from "./ResumeTemplates/ResumeThree";
import ResumeTwo from "./ResumeTemplates/ResumeTwo";
import { useLocation } from 'react-router-dom';
import JsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const Preview = ({onNext,onBack,Id}) => {

    const location = useLocation();
    const urlParams = new URLSearchParams(location.search);
    const templateId = urlParams.get('template');
    const sessionId = Id;
    

    // Define a mapping between URL params and corresponding resume components
    const resumeComponents = {
        'resume1': Resume,
        'resume4': ResumeFour,
        'resume3': ResumeThree,
        'resume2': ResumeTwo,
    };

    // Get the appropriate component based on the URL param
    const ResumeComponent = resumeComponents[templateId];
    const [fileName, setFileName] = useState('Resume');
    const [isLoading, setIsLoading] = useState(false);

    const downloadPdf = () => {

        const currentDate = new Date();
        const date = currentDate.toLocaleDateString();
        const time = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const unixTimestamp = Math.floor(currentDate.getTime() / 1000);


        setIsLoading(true); // Set loading to true when starting to save PDF
        const input = document.getElementById('resume-print');

        html2canvas(input, {
            scale: 4, useCORS: true
        }).then((canvas) => { // increase scale for higher resolution
            const imgData = canvas.toDataURL('image/png');
            const pdf = new JsPDF('p', 'mm', 'a4'); // specify PDF dimensions
            const imgWidth = 210;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
 
            pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight, undefined, 'SLOW');
            pdf.save(`${fileName}.pdf`);
            setIsLoading(false); // Set loading to false when PDF is saved
            onNext('meta',[fileName,date,time,templateId,unixTimestamp]);

        });


    };



    const handleWorkBack = () => {
        onBack();
    };

    return (
        <div className="flex flex-col lg:flex-row justify-evenly mt-[70px]">

            <div className="flex flex-col ">
                <h1 className="mb-5 mx-auto lg:mx-0 font-semibold text-xl text-gray-600 ">Resume Preview</h1>
 
                <div id="resume-print" className=' overflow-y p-2' style={{ overflowY: 'auto', scrollbarWidth: 'none', 'msOverflowStyle': 'none', '&::WebkitScrollbar': { display: 'none' } }}>
                    <ResumeComponent sessionId={sessionId}/>
                </div>

            </div>


            <div className="flex-col self-center lg:self-auto mt-10 lg:mt-[10%] mb-10 ">
                <h1 className="mb-5 mx-auto lg:mx-0 font-semibold text-xl text-gray-400 ">Create File Name</h1>
                <input
                    type="text"
                    value={fileName}
                    onChange={(e) => setFileName(e.target.value)}
                    className="block w-[250px] rounded-md ps-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:outline-none focus:ring-gray-700 sm:text-sm sm:leading-6"
                />
                <div>
                    <div className="mt-6 flex items-center justify-start gap-x-6">
                        <button type="button" className="text-sm font-semibold leading-6 text-gray-900" onClick={handleWorkBack}>
                            Back
                        </button>

                        <button
                            onClick={downloadPdf}
                            className="rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-100"
                        >
                            Save
                        </button>
                    </div>
                    {isLoading && <div className="mt-4 w-full h-2 bg-gray-200 rounded-full">
                        <div className="w-1/2 h-full bg-blue-500 rounded-full"></div>
                    </div>}
                </div>
            </div>
        </div>


    );
}

export default Preview;