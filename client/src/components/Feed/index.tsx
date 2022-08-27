import React from 'react'
import { FeedDetailsType } from '../../utils/types'
import FeedUI from './FeedUI'

export interface FeedProps {
    feed: FeedDetailsType
}

const Feed: React.FC<FeedProps> = ({
    feed
}) => {

    return (
        <FeedUI
            feed={feed} />
    )
}

export default Feed