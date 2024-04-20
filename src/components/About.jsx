import { FaFacebook, FaLinkedin, FaTwitter } from 'react-icons/fa';
import image from '../Assets/img.svg'
import stroke from '../Assets/stroke.jpg'
import instagram from '../Assets/instagram.png';
import facebook from '../Assets/facebook.png';
import twitter from '../Assets/twitter.png';
import whatsapp from '../Assets/whatsapp.png';
import linkedin from '../Assets/linkedin.png';
import mail from '../Assets/mail.png';


function About() {



    return (
        <div className="flex flex-col m-20 md:p-16 mt-8">

            <div className=' '>
                <h1 className="mb-2 text-4xl font-bold text-gray-600">Resume </h1>
                <h1 className="mb-4 md:mb-0 text-4xl font-bold text-gray-600"> Builder</h1>
                <img className='h-[20px] w-[130px]' src={stroke} />
            </div>
            <div className="flex flex-col md:flex-row items-center justify-center">
                <p className="md:w-[60vw] text-lg text-gray-500 font-[500] tracking-wide italic">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque sollicitudin eget massa a aliquam. Mauris pharetra enim massa, vitae egestas nisl pulvinar id. Nullam gravida est nec magna ultricies, vitae tempus quam finibus. Vestibulum viverra, leo et gravida ultricies, diam elit aliquam arcu, vitae hendrerit mauris justo maximus odio. Suspendisse sit amet congue odio. Curabitur eget libero rhoncus, finibus velit vel, commodo orci. Proin consequat nisi ex, sed pulvinar velit efficitur eget. Curabitur sodales, sem consectetur tempus pretium, augue ligula pretium est, at ornare purus nisl vitae lectus. Ut tempus purus et lectus tempor imperdiet.</p>
                <img className='md:w-[40vw]' src={image} alt="students image" />

            </div>

            <h2 className="font-bold text-xl md:mt-4 lg:-mt-10">Share with your friends</h2>


            <ul className="flex mt-4 gap-6 ">
                <li>
                    <a
                        href="#"
                        className="text-blue-700 transition hover:text-blue-700/75"
                    >
                        <img src={facebook} className='h-[20px]' alt="Instagram" />
                            
                    </a>
                </li>

                <li>
                    <a
                        href="#"
                        className="text-blue-700 transition hover:text-blue-700/75"
                    >
                        <img src={instagram} className='h-[20px]' alt="Instagram" />
                    </a>
                </li>

                <li>
                    <a
                        href="#"
                        className="text-blue-400 transition hover:text-blue-400/75"
                    >
                        <img src={twitter} className='h-[20px]' alt="Twitter" />
                    </a>
                </li>

                <li>
                    <a
                        href="#"
                        className="text-green-600 transition hover:text-green-600/75"
                    >
                        <img src={whatsapp} className='h-[20px]' alt="WhatsApp" />
                    </a>
                </li>

                <li>
                    <a
                        href="#"
                        className="text-blue-800 transition hover:text-blue-800/75"
                    >
                        <img src={linkedin} className='h-[20px]' alt="LinkedIn" />
                    </a>
                </li>

                <li>
                    <a
                        href="#"
                        className="text-red-600 transition hover:text-red-600/75"
                    >
                        <img src={mail} className='h-[20px]' alt="Email" />
                    </a>
                </li>

            </ul>

        </div>
    )
} export default About;




