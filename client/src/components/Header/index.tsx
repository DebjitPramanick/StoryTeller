import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <div className='fixed w-full z-20 top-0 left-0'>
            <nav className="bg-white px-2 sm:px-4 py-2.5 w-full z-20 top-0 left-0 border-b border-gray-200" style={{ background: '#c5fbd3' }}>
                <div className="container flex flex-wrap justify-between items-center mx-auto">
                <Link to="/" className="flex items-center">
                        <img src="https://flowbite.com/docs/images/logo.svg" className="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
                        <span className="self-center text-xl font-semibold whitespace-nowrap">Story Teller</span>
                    </Link>
                    <img className="p-1 w-10 h-10 rounded-full ring-2 ring-gray-300 cursor-pointer" src="https://i.pravatar.cc/300" alt="Bordered avatar" />
                </div>
            </nav>
        </div>
    )
}

export default Header