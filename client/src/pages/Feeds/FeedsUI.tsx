import React from 'react'
import Feed from '../../components/Feed'
import InputField from '../../components/FormFields/InputField'
import { FeedsLazyLoader } from '../../components/Loaders'
import { gtCounts, handleCheck } from '../../helpers/common.helper'
import PageLayout from '../../layouts/PageLayout'
import { FeedDetailsType, GlobalUserType } from '../../utils/types';
import SearchIcon from '@mui/icons-material/Search';

interface FeedsUIProps {
    user: GlobalUserType,
    feeds: FeedDetailsType[],
    savedBy: any,
    likedBy: any,
    fetching: boolean
}

const FeedsUI: React.FC<FeedsUIProps> = ({
    user,
    feeds,
    likedBy,
    savedBy,
    fetching
}) => {

    return (
        <PageLayout pageTitle="Feeds">
            <div className='flex items-center gap-2 justify-end'>
                <InputField
                    value={''}
                    setValue={(val) => { }}
                    placeholder="Search feeds"
                    leftIcon={<SearchIcon style={{ color: 'gray' }} />} />
            </div>
            {fetching ? <FeedsLazyLoader /> :
                feeds.length > 0 ? feeds.map((feed: FeedDetailsType) => (
                    <Feed
                        key={feed._id}
                        feed={feed}
                        isLiked={handleCheck(feed._id, 'like', likedBy, user._id)}
                        isSaved={handleCheck(feed._id, 'save', savedBy, user._id)}
                        likeCounts={gtCounts(feed._id, 'like', likedBy)}
                        savedCounts={gtCounts(feed._id, 'save', savedBy)} />
                )) : <p className='mt-6 text-xl'>No Feeds</p>
            }
        </PageLayout>
    )
}

export default FeedsUI