import React from 'react'
import { UserDetailsType } from '../../pages/Register';
import Button from '../FormFields/Button';

interface UIProps {
    author: UserDetailsType,
    open: boolean
}

const UserDetailsModal: React.FC<UIProps> = ({
    author,
    open
}) => {
    return (
        <div className={`z-10 px-4 pt-4 w-72 bg-orange-100 border rounded-lg divide-y divide-gray-100 shadow-xl absolute left-14 top-0 ${!open ? 'hidden' : 'visible'}`}>
            <div className='flex gap-4'>
                <div className="flex-shrink-0 cursor-pointer">
                    <img className="w-20 h-20 rounded-full" src={author.avatar} alt="" />
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-lg font-bold text-gray-900 truncate">
                        {author.name}
                    </p>
                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                        @{author.username}
                    </p>
                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                        44.5k followers
                    </p>
                    <p className="text-sm text-violet-500 truncate dark:text-gray-400">
                        Published 100 Stories
                    </p>
                </div>
            </div>
            <div className='mt-4 py-2 grid grid-cols-2 gap-2'>
                <Button label="Follow" onClick={undefined} />
                <Button label="Unfollow" onClick={undefined} />
            </div>
        </div>
    )
}

export default UserDetailsModal