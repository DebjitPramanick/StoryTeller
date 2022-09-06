import React from 'react';
import Tab from '../../components/Tab';
import PageLayout from '../../layouts/PageLayout';
import StoriesTab from './components/StoriesTab';
import EditProfileTab from './components/EditProfileTab';
import { GlobalUserType } from '../../utils/types';
import { StoriesDataType } from '.';

interface UIProps {
    user: GlobalUserType,
    fetchUserStories: () => void;
    storiesData: StoriesDataType;
    tabs: any[];
    currentTab: number;
    setCurTab: (val: number) => void
}

const ProfileUI: React.FC<UIProps> = ({
    user,
    fetchUserStories,
    storiesData,
    tabs,
    currentTab,
    setCurTab
}) => {

    const { stories, savedBy, likedBy } = storiesData;

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
                currentTab={currentTab}
                selectTab={(index: number) => setCurTab(index)} />

            <div className='mt-4 mx-auto' style={{ width: 'fit-content' }}>
                {currentTab === 0 ?
                    <StoriesTab
                        user={user}
                        stories={stories}
                        savedBy={savedBy}
                        likedBy={likedBy} />
                    : currentTab === 1 ?
                        <EditProfileTab user={user}
                            fetchUserStories={fetchUserStories} />
                        : null}
            </div>
        </PageLayout>
    )
}

export default ProfileUI