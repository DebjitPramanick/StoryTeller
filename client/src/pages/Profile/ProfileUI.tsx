import React, { useState } from 'react';
import Tab from '../../components/Tab';
import PageLayout from '../../layouts/PageLayout';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';

const ProfileUI: React.FC<any> = ({
    user
}) => {

    const [curTab, setCurTab] = useState<number>(0)

    const tabs = [
        {
            title: 'Stories',
            icon: <AutoStoriesIcon style={{width: '16px'}}/>
        },
        {
            title: 'Edit',
            icon: <ModeEditIcon style={{width: '16px'}}/>
        },
    ]
    return (
        <PageLayout>
            <div className='flex flex-col items-center gap-6 shadow px-4 py-4 '>
                <div style={{ width: 'fit-content' }}>
                    <img className="w-40 h-40 rounded-full" src="https://api.multiavatar.com/BinxBond.svg" alt="/" />
                </div>
                <div style={{ width: 'fit-content' }} className='text-center'>
                    <p className='text-2xl font-bold'>{user.name}</p>
                    <p className='text-md font-semibold text-gray-500'>
                        @{user.username} | {user.email}
                    </p>
                    <p className='my-4 text-sm font-normal text-gray-500 max-w-sm'>{user.bio}</p>
                </div>
            </div>
            <Tab
                tabs={tabs}
                currentTab={curTab}
                selectTab={(index: number) => setCurTab(index)} />
        </PageLayout>
    )
}

export default ProfileUI