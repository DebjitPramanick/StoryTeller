import React, { useEffect, useRef } from 'react'
import { FeedProps } from './index'
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';
import { useUser } from '../../contexts/UserContext';
import moment from 'moment';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';

const FeedUI: React.FC<FeedProps> = ({
    feed
}) => {
    const { user } = useUser();
    const contentRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (feed && contentRef.current) {
            contentRef.current.innerHTML = feed.content
        }
    }, [feed])

    const getFeedTime = (time: string | undefined) => {
        if (time) {
            const d = new Date(time);
            return moment(d).format("Do MMMM, YYYY, HH:MM")
        }
        return '';
    }

    return (
        <div className='mb-4 max-w-4xl bg-white rounded-lg border border-gray-200 shadow-md'>
            <div className="flex items-center gap-2 px-4 py-2">
                <div className="flex-shrink-0">
                    <img className="w-12 h-12 rounded-full" src="https://api.multiavatar.com/BinxBond.svg" alt="" />
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                        {feed.author?.name}
                    </p>
                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                        {feed.author?.username} | {getFeedTime(feed.created_at)}
                    </p>
                </div>
                <div className="inline-flex items-center text-base font-semibold text-gray-900 cursor-pointer gap-4">
                    <FavoriteBorderIcon />
                    <BookmarkBorderIcon />
                </div>
            </div>
            <div className='px-4 py-2'>
                {feed.tags?.map(tag => (
                    <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-1 rounded" key={tag}>{tag}</span>
                ))}
            </div>

            <a href="/">
                {feed.cover !== '' ? (
                    <div className="rounded-t-lg h-44 flex items-center justify-center">
                        <img src={feed.cover} alt="/" className='h-full' />
                    </div>
                ) : (
                    <div className="rounded-t-lg h-44 flex items-center justify-center">
                        <ImageNotSupportedIcon style={{ fontSize: '80px', color: 'grey' }} />
                    </div>
                )}
            </a>
            <div className="p-5">
                <a href="/">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{feed.title}</h5>
                </a>
                <div className="mb-3" ref={contentRef}>
                </div>
                <a href="/" className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Read more
                    <svg aria-hidden="true" className="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                </a>
            </div>
        </div>
    )
}

export default FeedUI