import React, { useState, useEffect } from 'react'
import { ExploreResultsLoader } from '../../../../components/Loaders'
import { popupMessage } from '../../../../helpers/common.helper';
import { getUsersByNameQuery } from '../../../../helpers/user.helper';
import { GlobalUserType } from '../../../../utils/types';
import UserCard from './UserCard'

const UserResults: React.FC<any> = ({
    query,
}) => {

    const [data, setData] = useState<{users: GlobalUserType[], followers: any}>({
        users: [],
        followers: {}
    })
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (query) setLoading(true);
        else {
            setLoading(false);
            setData({
                users: [],
                followers: {}
            })
        }
        let delay = setTimeout(() => {
            if (query) fetchUsersByQuery()
        }, 2000)

        return () => clearTimeout(delay)
    }, [query])

    const fetchUsersByQuery = async () => {
        try {
            const res = await getUsersByNameQuery(query)
            if (res.data) {
                setData(res.data);
            }

            setLoading(false)
        } catch (err: any) {
            popupMessage('error', err.message)
            setLoading(false)
        }
    }

    return (
        <div className='mt-4'>
            {loading ? <ExploreResultsLoader /> :
                <div className='grid grid-cols-1 gap-4 lg:grid-cols-3 md:grid-cols-2'>
                    {data.users.map((user: any) => (
                        <UserCard
                            profileData={user}
                            followers={data.followers[user._id]} />
                    ))}
                </div>
            }
        </div>
    )
}

export default UserResults