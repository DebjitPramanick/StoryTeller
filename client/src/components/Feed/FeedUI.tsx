import React, { useEffect, useRef } from 'react'
import { FeedProps } from '.'

const FeedUI: React.FC<FeedProps> = ({
    feed
}) => {

    const contentRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if(feed && contentRef.current) {
            contentRef.current.innerHTML = feed.content
        }
    }, [feed])
    

    const sampleImg = 'https://us.123rf.com/450wm/iconcraftstudio/iconcraftstudio1507/iconcraftstudio150701224/42984554-icon-of-image-photo.jpg?ver=6'

    return (
        <div className='mb-4'>
            <a href="/story/1" className="flex flex-col bg-white rounded-lg border shadow-md md:flex-row">
                <img className="object-cover w-full h-96 rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src={sampleImg} alt="" />
                <div className="flex flex-col justify-between p-4 leading-normal">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{feed.title}</h5>
                    <div className="mb-3" ref={contentRef}>
                    </div>
                </div>
            </a>
        </div>
    )
}

export default FeedUI