import React from 'react';
import Tab from '../../components/Tab';
import PageLayout from '../../layouts/PageLayout';
import StoriesTab from './components/StoriesTab';
import EditProfileTab from './components/EditProfileTab';
import { GlobalUserType } from '../../utils/types';
import { StoriesDataType } from '.';
import Button from '../../components/FormFields/Button';

interface UIProps {
    user: GlobalUserType,
    fetchUserStories: () => void;
    storiesData: StoriesDataType;
    tabs: any[];
    currentTab: number;
    setCurTab: (val: number) => void;
    fetchingStories: boolean;
    isOtherUser: boolean;
    handleFollowUser: () => void
}

const ProfileUI: React.FC<UIProps> = ({
    user,
    fetchUserStories,
    storiesData,
    tabs,
    currentTab,
    setCurTab,
    fetchingStories,
    isOtherUser,
    handleFollowUser
}) => {

    const { stories, savedBy, likedBy } = storiesData;

    const filteredTabs = isOtherUser ? tabs.filter(t => t.title !== 'Settings') : tabs

    return (
        <PageLayout>
            <div className={`flex flex-col items-center gap-6 shadow px-4 py-4 rounded-lg relative ${isOtherUser ? 'bg-violet-200' : 'bg-orange-200'}`}>
                <div style={{ width: 'fit-content' }}>
                    <img className="w-40 h-40 rounded-full border-violet-300 border-2" src={user.avatar} alt="/" />
                </div>
                <div style={{ width: 'fit-content' }} className='text-center'>
                    <p className='text-2xl font-bold'>{user.name}</p>
                    <div className='mt-4'>
                        <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold mr-2 px-2.5 py-2.5 rounded cursor-pointer">
                            @{user.username}
                        </span>
                        <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold mr-2 px-2.5 py-2.5 rounded cursor-pointer">
                            {user.email}
                        </span>
                    </div>
                    <p className='mt-8 text-sm font-normal text-gray-500 max-w-sm italic'>{user.bio}</p>
                    <div className='mx-auto flex justify-center'>
                        <Button label={`Follow ${user.name.split(" ")[0]}`} onClick={handleFollowUser} />
                    </div>
                </div>
            </div>
            <Tab
                tabs={filteredTabs}
                currentTab={currentTab}
                selectTab={(index: number) => setCurTab(index)} />

            <div className='mt-4 mx-auto w-full'>
                {currentTab === 0 ?
                    <StoriesTab
                        stories={stories}
                        savedBy={savedBy}
                        likedBy={likedBy}
                        fetchingStories={fetchingStories}
                        fetchUserStories={fetchUserStories} />
                    : currentTab === 1 ?
                        <EditProfileTab user={user}
                            fetchUserStories={fetchUserStories} />
                        : null}
            </div>
        </PageLayout>
    )
}

export default ProfileUI