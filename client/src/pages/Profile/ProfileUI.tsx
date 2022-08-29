import React from 'react'
import PageLayout from '../../layouts/PageLayout'

const ProfileUI: React.FC<any> = ({
    user
}) => {

    return (
        <PageLayout>
            <div className='flex gap-6'>
                <div>
                    <img className="w-12 h-12 rounded-full" src="https://api.multiavatar.com/BinxBond.svg" alt="/" />
                </div>
                <div>
                    <p className='text-2xl font-bold'>{user.name}</p>
                    <p className='text-md font-semibold text-gray-500'>
                        @{user.username} | {user.email}
                    </p>
                    <p className='my-4 text-sm font-normal text-gray-500'>{user.bio}</p>
                </div>
            </div>
        </PageLayout>
    )
}

export default ProfileUI