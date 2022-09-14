import React from 'react'
import Button from '../../../components/FormFields/Button';
import { useUser } from '../../../contexts/UserContext'

const UserCard: React.FC<any> = ({ u }) => {
    const { user } = useUser();
    return (
        <div className='bg-white rounded-lg border border-gray-200 shadow-md p-4'>
            <div className="flex justify-center p-2 cursor-pointer relative">
                <img className="w-24 h-24 rounded-full" src={user.avatar} alt="" />
            </div>
            <div className="flex items-center gap-2 my-2">
                <div className="flex-1 min-w-0 text-center">
                    <p className="text-lg font-medium text-gray-900 truncate">
                        {user.name}
                    </p>
                    <p className="text-sm text-gray-500 truncate">
                        {user.username}
                    </p>
                    <p className="truncate bg-yellow-100 text-yellow-800 text-xs font-semibold px-2.5 py-1.5 rounded cursor-pointer w-max mx-auto mt-2">
                        41k Followers
                    </p>
                </div>
            </div>
            <div className='mt-4 py-2 grid grid-cols-2 gap-2'>
                <Button label="Follow" onClick={undefined} />
                <Button label="View" onClick={undefined} />
            </div>
        </div>
    )
}

export default UserCard