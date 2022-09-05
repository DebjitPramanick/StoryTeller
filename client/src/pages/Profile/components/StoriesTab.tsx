import React from 'react'
import Feed from '../../../components/Feed'
import { StoryDetailsType } from '../../../utils/types'

const StoriesTab: React.FC<any> = ({
    stories
}) => {
    return (
        <div>
            {stories && stories.map((feed: StoryDetailsType) => (
                <Feed
                    key={feed._id}
                    feed={feed}
                    isLiked={false}
                    isSaved={true}
                    likeCounts={0}
                    savedCounts={0} />
            ))}
        </div>
    )
}

export default StoriesTab