import React from 'react'

const FeedUI: React.FC<any> = ({sampleImg}) => {
    return (
        <div className='mb-4'>
            <a href="/story/1" className="flex flex-col bg-white rounded-lg border shadow-md md:flex-row hover:bg-gray-100">
                <img className="object-cover w-full h-96 rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src={sampleImg} alt="" />
                <div className="flex flex-col justify-between p-4 leading-normal">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">Noteworthy technology acquisitions 2021</h5>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                </div>
            </a>
        </div>
    )
}

export default FeedUI