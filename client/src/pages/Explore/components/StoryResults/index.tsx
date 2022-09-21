import React, {useState, useEffect} from 'react'
import { popupMessage } from '../../../../helpers/common.helper';
import { FeedDetailsType, GlobalUserType } from '../../../../utils/types';

const StoryResults: React.FC<any> = ({
    query
}) => {

    const [data, setData] = useState<{ stories: FeedDetailsType[] }>({
        stories: [],
    })
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (query) setLoading(true);
        else {
            setLoading(false);
            setData({
                stories: [],
            })
        }
        let delay = setTimeout(() => {
            if (query) fetchStoriesByQuery()
        }, 2000)

        return () => clearTimeout(delay)
    }, [query])

    const fetchStoriesByQuery = async () => {
        try {
            // const res = await getUsersByNameQuery(query)
            // if (res.data) {
            //     setData(res.data);
            // }

            setLoading(false)
        } catch (err: any) {
            popupMessage('error', err.message)
            setLoading(false)
        }
    }

    return (
        <div className='mt-4'></div>
    )
}

export default StoryResults