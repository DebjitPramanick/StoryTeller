import React, { useState, useEffect } from 'react'
import { ExploreResultsLoader } from '../../../../components/Loaders';
import { popupMessage } from '../../../../helpers/common.helper';
import { searchStories } from '../../../../helpers/story.helper';
import { FeedDetailsType, GlobalUserType } from '../../../../utils/types';
import StoryCard from './StoryCard';

const StoryResults: React.FC<any> = ({
    query
}) => {

    const [data, setData] = useState<FeedDetailsType[] >([])
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (query) setLoading(true);
        else {
            setLoading(false);
            setData([])
        }
        let delay = setTimeout(() => {
            if (query) fetchStoriesByQuery()
        }, 2000)

        return () => clearTimeout(delay)
    }, [query])

    const fetchStoriesByQuery = async () => {
        try {
            const res = await searchStories(query)
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
                    {data.map((story: FeedDetailsType) => (
                        <StoryCard story={story}/>
                    ))}
                    {query !== '' && data.length === 0 && "No user found."}
                </div>
            }
        </div>
    )
}

export default StoryResults