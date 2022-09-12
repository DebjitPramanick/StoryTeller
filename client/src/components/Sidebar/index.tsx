import { AccountCircle, BookmarkRounded, CreateRounded, ExploreRounded, FeedRounded, Logout } from '@mui/icons-material'
import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar: React.FC<any> = () => {

    const curPath = window.location.pathname;
    const hide = curPath.includes('register') || curPath.includes('login')

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

    return (
        <div className='fixed'>
            <aside className="w-72" aria-label="Sidebar">
                <div className="overflow-y-auto py-4 px-3 bg-blue-200 rounded-lg">
                    <ul className="space-y-2">
                        {items.map((item) => (
                            <li>
                                <Link to={item.path}
                                    className={`flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-blue-100 ${isCurrent(item.path) ? 'bg-blue-300' : ''}`}>
                                    <span>{item.icon}</span>
                                    <span className="ml-3">{item.name}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </aside>
        </div>
    )
}

export default Sidebar