import { AccountCircle, FeedRounded } from '@mui/icons-material';
import SearchIcon from '@mui/icons-material/Search';
import React, { useState } from 'react'
import InputField from '../../components/FormFields/InputField'
import Tab from '../../components/Tab';
import PageLayout from '../../layouts/PageLayout'
import StoryResults from './components/StoryResults';
import UserResults from './components/UserResults';

const ExploreUI: React.FC<any> = ({
    query,
    handleQuery,
}) => {

    const [currentTab, setCurrentTab] = useState(0)

    const tabs = [
        {
            title: `Users`,
            icon: <AccountCircle style={{ width: '16px' }} />
        },
        {
            title: 'Stories',
            icon: <FeedRounded style={{ width: '16px' }} />
        },
    ]

    return (
        <PageLayout pageTitle="Explore">
            <InputField
                value={query}
                setValue={handleQuery}
                placeholder={currentTab === 0 ? "Search users" : "Search stories"}
                leftIcon={<SearchIcon style={{ color: 'gray' }} />} />

            <Tab tabs={tabs}
                currentTab={currentTab}
                selectTab={(val) => setCurrentTab(val)}
                align='left' />

            {currentTab === 0 ? (
                <UserResults query={query}/>
            ) : currentTab === 1 ? (
                <StoryResults query={query}/>
            ) : null}
        </PageLayout>
    )
}

export default ExploreUI