import React, { useRef, useEffect } from 'react'
import PageLayout from '../../layouts/PageLayout'
import moment from 'moment';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { Link } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Button from '../../components/FormFields/Button';
import { useUser } from '../../contexts/UserContext';

const FeedPageUI: React.FC<any> = ({
    feed,
    handleLikeFeed,
    handleSaveFeed,
    isLiked,
    isSaved,
    likesCount,
    savesCount,
    handleFollowUser,
    isFollowing
}) => {

    const {user} = useUser();

    const contentRef = useRef<HTMLDivElement | null>(null);

    const getFeedTime = (time: string | undefined) => {
        if (time) {
            const d = new Date(time);
            return moment(d).format("Do MMMM, YYYY, HH:MM")
        }
        return '';
    }

    useEffect(() => {
        if (feed && feed.content && contentRef.current) {
            contentRef.current.innerHTML = feed.content;
        }
    }, [feed])

    const isCurUser = feed?.author._id === user._id

    return (
        <PageLayout>
            {!feed && (
                <p>No Feed</p>
            )}
            {feed && (
                <div className='max-w-4xl bg-white rounded-lg'>
                    <Link to={`/`} className="inline-flex items-center gap3 text-lg font-medium text-center text-gray-300 rounded hover:text-gray-800 hover:font-bold mb-5">
                        <ArrowBackIosIcon style={{ fontSize: '16px' }} />
                        Go Back
                    </Link>
                    <div className="py-5 flex justify-between">
                        <div>
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{feed.title}</h5>
                            <p className='text-sm italic text-gray-400'>By - {feed.author.name}</p>
                        </div>
                        <div className="inline-flex items-center text-base font-semibold text-gray-900 cursor-pointer gap-4">
                            <div onClick={handleLikeFeed}>
                                {!isLiked ? <FavoriteBorderIcon />
                                    : <FavoriteIcon style={{ color: "red" }} />}
                            </div>

                            <div onClick={handleSaveFeed}>
                                {!isSaved ? <BookmarkBorderIcon />
                                    : <BookmarkIcon style={{ color: "#00d0cd" }} />}
                            </div>
                        </div>
                    </div>

                    {feed.cover !== '' && (
                        <div className='block my-2 shadow-md rounded-lg overflow-hidden'>
                            <div className="h-44 flex items-center justify-center">
                                <img src={feed.cover} alt="/" className='h-full' />
                            </div>
                        </div>
                    )}


                    <div className="py-5">
                        <div className="mb-3" ref={contentRef}>
                        </div>
                    </div>

                    <div className='flex items-center py-2 gap-4'>
                        <p className='py-2 text-sm text-gray-400'>
                            <FavoriteIcon style={{ color: "red", fontSize: '18px', marginTop: '-4px' }} /> {likesCount}
                        </p>

                        <p className='py-2 text-sm text-gray-400'>
                            <BookmarkIcon style={{ color: "#00d0cd", fontSize: '18px', marginTop: '-4px' }} /> {savesCount}
                        </p>
                    </div>

                    <div className='py-2'>
                        <p className='text-sm text-gray-400 inline mr-4'>Tags:</p>
                        {feed.tags.map((tag: string) => (
                            <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-1 rounded" key={tag}>{tag}</span>
                        ))}
                    </div>

                    <div className="mt-4 flex items-center gap-2 px-4 py-2 rounded-lg" style={{background: '#c5fbd3'}}>
                        <div className="flex-shrink-0 cursor-pointer">
                            <img className="w-12 h-12 rounded-full" src={feed.author.avatar} alt="" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                                {feed.author.name}
                            </p>
                            <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                {feed.author.username} | {getFeedTime(feed.created_at)}
                            </p>
                        </div>
                        {!isCurUser && isFollowing ? (
                            <Button label='Unfollow' onClick={handleFollowUser} variant="danger" />
                        ) : !isCurUser ? (
                            <Button label='Follow' onClick={handleFollowUser} />
                        ) : null}

                    </div>
                </div>
            )}
        </PageLayout>
    )
}

export default FeedPageUI