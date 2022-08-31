import React, { useEffect, useState } from 'react';
import Tab from '../../components/Tab';
import PageLayout from '../../layouts/PageLayout';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import StoriesTab from './components/StoriesTab';
import EditProfileTab from './components/EditProfileTab';
import { StoryDetailsType } from '../../utils/types';
import { getAuthorStories } from '../../helpers/story.helper';
import { toast } from 'react-toastify';

const ProfileUI: React.FC<any> = ({
    user
}) => {

    const [curTab, setCurTab] = useState<number>(0)
    const [userStories, setUserStories] = useState<StoryDetailsType[]>([]);

    const tabs = [
        {
            title: `Stories (${userStories.length})`,
            icon: <AutoStoriesIcon style={{ width: '16px' }} />
        },
        {
            title: 'Edit',
            icon: <ModeEditIcon style={{ width: '16px' }} />
        },
    ]

    useEffect(() => {
        fetchUserStoies()
    }, [])

    const fetchUserStoies = async () => {
        try {
            const res = await getAuthorStories(user._id)
            setUserStories(res.data)
        } catch (err: any) {
            toast.error(err.message, {
                autoClose: 3500,
                pauseOnHover: true,
            })
        }
    }

    console.log(userStories)


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
            <div className='mt-4'>
                {curTab === 0 ? <StoriesTab
                    stories={userStories} />
                    : curTab === 1 ? <EditProfileTab />
                        : null}
            </div>
        </PageLayout>
    )
}

export default ProfileUI