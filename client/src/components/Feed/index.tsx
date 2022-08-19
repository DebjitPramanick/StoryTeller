import React from 'react'
import FeedUI from './FeedUI'

const Feed: React.FC<any> = () => {

    const sampleImg = 'https://kathakids.com/static/story-images/2020/10/Four_Friends_01-800x600.jpg'

    return (
        <FeedUI sampleImg={sampleImg}/>
    )
}

export default Feed