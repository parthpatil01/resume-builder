import { Link } from 'react-router-dom';
import { useState } from 'react';
import logo from '../Assets/logo.png'

function Header() {

    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };


    return (

        <header className="fixed inset-x-0 top-0 z-30 max-w-full border border-gray-100 bg-white/80 py-3 shadow backdrop-blur-lg">
            <div className="flex-1 md:flex md:flex-row justify-between px-4">
                <div className="flex justify-between md:justify-start items-center">
                    <div className="flex shrink-0">
                        <Link to="/" aria-current="page" className="flex items-center">
                            <img className="h-7 w-auto" src={logo} alt="" />
                        </Link>
                    </div>
                    {/* Hamburger Button */}
                    <button className="md:hidden" onClick={toggleMenu}>
                        <svg className="w-6 h-6 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            {isOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                            )}
                        </svg>
                    </button>
                    
                </div>
                <div className={`links ${isOpen ? 'block' : 'hidden'} mt-2 md:mt-0 md:flex md:items-center md:justify-center md:gap-8`} id="mobile-menu-2">
                        <Link to="/" aria-current="page" className="block md:inline-block rounded-lg px-2 py-1 text-sm font-medium text-gray-900 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900">Resume Template</Link>
                        <Link to="/my-resumes" className="block md:inline-block rounded-lg px-2 py-1 text-sm font-medium text-gray-900 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900">My Resumes</Link>
                        <Link to="/about" className="block md:inline-block rounded-lg px-2 py-1 text-sm font-medium text-gray-900 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900">About Us</Link>
                    </div>
            </div>
        </header>

    )
}


export default Header;