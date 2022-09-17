import SearchIcon from '@mui/icons-material/Search';
import React from 'react'
import InputField from '../../components/FormFields/InputField'
import { ExploreResultsLoader } from '../../components/Loaders';
import PageLayout from '../../layouts/PageLayout'
import UserCard from './components/UserCard';

const ExploreUI: React.FC<any> = ({
    query,
    handleQuery,
    data,
    loading
}) => {

    const { users, followers } = data;

    return (
        <PageLayout pageTitle="Explore">
            <InputField
                value={query}
                setValue={handleQuery}
                placeholder="Search users by username or name"
                leftIcon={<SearchIcon style={{ color: 'gray' }} />} />

            {loading ? <ExploreResultsLoader /> :
                <div className='grid grid-cols-1 gap-4 lg:grid-cols-3 md:grid-cols-2'>
                    {users.map((user: any) => (
                        <UserCard
                            profileData={user}
                            followers={followers[user._id]} />
                    ))}
                </div>
            }
        </PageLayout>
    )
}

export default ExploreUI