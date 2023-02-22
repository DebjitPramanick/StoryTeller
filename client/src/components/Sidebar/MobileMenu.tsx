import React from 'react'
import { AccountCircle, BookmarkRounded, CreateRounded, ExploreRounded, FeedRounded, Logout } from '@mui/icons-material'
import { Link, useNavigate } from 'react-router-dom'
import { useUser } from '../../contexts/UserContext';
import "./sidebar.css"

const MobileMenu = ({
    closeMenu
}: any) => {

    const curPath = window.location.pathname;
    const hide = curPath.includes('register') || curPath.includes('login')
    const { user } = useUser();
    const navigate = useNavigate()

    const items: { name: string, icon: any, path: string }[] = [
        {
            name: 'Feeds',
            icon: <FeedRounded />,
            path: '/'
        },
        {
            name: 'Profile',
            icon: <AccountCircle />,
            path: '/profile'
        },
        {
            name: 'Create Story',
            icon: <CreateRounded />,
            path: '/editor'
        },
        {
            name: 'Saved Items',
            icon: <BookmarkRounded />,
            path: '/saved'
        },
        {
            name: 'Explore',
            icon: <ExploreRounded />,
            path: '/explore'
        },
        {
            name: 'Logout',
            icon: <Logout />,
            path: '/logout'
        },
    ]

    if (hide) return null;

    const isCurrent = (path: string) => {
        return (curPath === path || (curPath.includes("feed") && path === "/"));
    }

    const goToPage = (pageRoute: string) => {
        navigate(pageRoute)
        closeMenu()
    }

    return (
        <div className='mobile-menu h-full'>
            <aside className="w-full h-full" aria-label="Sidebar">
                <div className="overflow-y-auto py-4 px-3 rounded-lg h-full" style={{ background: '#c5fbd3' }}>
                    <div className='rounded-lg p-2 mb-2 bg-green-300'>
                        <div className="flex justify-center cursor-pointer relative">
                            <img className="w-16 h-16 rounded-full border-green-200 border-2" src={user.avatar} alt="" />
                        </div>
                        <div className="flex items-center gap-2 my-2">
                            <div className="flex-1 min-w-0 text-center">
                                <p className="text-lg font-medium text-gray-900 truncate">
                                    {user.name}
                                </p>
                                <p className="text-sm text-gray-500 truncate">
                                    {user.username}
                                </p>
                            </div>
                        </div>
                    </div>
                    <ul className="space-y-2">
                        {items.map((item) => (
                            <li>
                                <p
                                    onClick={() => goToPage(item.path)}
                                    className={`flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-green-200 ${isCurrent(item.path) ? 'bg-green-300 hover:bg-green-300' : ''}`}>
                                    <span>{item.icon}</span>
                                    <span className="ml-3">{item.name}</span>
                                </p>
                            </li>
                        ))}
                    </ul>
                </div>
            </aside>
        </div>
    )
}

export default MobileMenu