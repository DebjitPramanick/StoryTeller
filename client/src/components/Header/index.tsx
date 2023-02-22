import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useUser } from '../../contexts/UserContext'
import MobileMenu from '../Sidebar/MobileMenu'
import "./header.css"

const Logo = require("../../assets/logo.png")

const Header = () => {

    const { user, isLoggedIn } = useUser();

    const [openMenu, setOpenMenu] = useState(false)

    return (
        <div className='fixed w-full z-20 top-0 left-0 shadow-lg' style={{ background: '#c5fbd3' }}>
            <nav className="px-2 py-2.5 max-w-6xl mx-auto z-20 top-0 left-0 border-b border-gray-200">
                <div className="flex flex-wrap justify-between items-center mx-auto">
                    <Link to="/" className="flex items-center">
                        <img src={Logo} className="mr-3 h-10" alt="Flowbite Logo" />
                        <span className="self-center text-xl font-semibold whitespace-nowrap">Story Teller</span>
                    </Link>
                    {isLoggedIn &&
                        <img
                            className="p-1 w-10 h-10 rounded-full ring-2 ring-gray-300 cursor-pointer"
                            src={user.avatar}
                            onClick={() => setOpenMenu(!openMenu)}
                            alt="Bordered avatar" />}
                </div>
            </nav>

            <div className={`absolute b-0 w-full mobile-menu-container ${openMenu ? 'open' :  'close'}`}>
                <MobileMenu closeMenu={() => setOpenMenu(false)} />
            </div>
        </div>
    )
}

export default Header