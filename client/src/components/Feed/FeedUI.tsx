import React, { useEffect, useRef, useState } from 'react'
import { FeedProps } from './index'
import moment from 'moment';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DropDown from '../Dropdown';
import { Link } from 'react-router-dom';
import UserDetailsModal from '../Modals/UserDetailsModal';
import StoryEditModal from '../Modals/StoryEditModal';
import ConfirmationModal from '../Modals/ConfirmationModal';
import { FeedDetailsType } from '../../utils/types';

interface FeedUIProps extends FeedProps {
    handleLikeFeed: () => void;
    handleSaveFeed: () => void;
    handleDelete: (story: FeedDetailsType) => void;
    enableActions?: boolean;
    refetchUserStories?: () => void
}

const FeedUI: React.FC<FeedUIProps> = ({
    feed,
    isLiked,
    isSaved,
    likeCounts,
    savedCounts,
    handleLikeFeed,
    handleSaveFeed,
    handleDelete,
    enableActions = false,
    refetchUserStories
}) => {
    const contentRef = useRef<HTMLDivElement | null>(null);
    const [openMenu, setOpenMenu] = useState(false);
    const [showAuthor, setShowAuthor] = useState('');
    const [isEditting, setIsEditting] = useState('');
    const [confirmDelete, setConfirmDelete] = useState('');

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
    const toggleAuthorPopup = () => {
        if (showAuthor) {
            setShowAuthor('');
        } else {
            setShowAuthor(feed._id)
        }
    }

    const toggleEditModal = () => {
        if (isEditting) {
            setIsEditting('');
        } else {
            setIsEditting(feed._id)
        }
    }

    const toggleDeleteCofirmation = () => {
        if (confirmDelete) {
            setConfirmDelete('');
        } else {
            setConfirmDelete(feed._id)
        }
    }

    const actionItems = [
        { label: 'Edit', onClick: toggleEditModal },
        { label: 'Delete', onClick: toggleDeleteCofirmation }
    ]


    return (
        <div className='mb-4 max-w-4xl bg-white rounded-lg border border-gray-200 shadow-md'>
            <div className="flex items-center gap-2 px-4 py-2">
                <div className="flex-shrink-0 cursor-pointer relative">
                    <img className="w-12 h-12 rounded-full" src={feed.author.avatar} alt="" onClick={toggleAuthorPopup} />
                    <UserDetailsModal
                        author={feed.author}
                        open={feed._id === showAuthor} />
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                        {feed.author.name}
                    </p>
                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                        {feed.author.username} | {getFeedTime(feed.created_at)}
                    </p>
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

                    {enableActions && (
                        <div onClick={() => setOpenMenu(!openMenu)} className="relative">
                            <MoreVertIcon />
                            <DropDown
                                items={actionItems}
                                open={openMenu} />
                        </div>
                    )}
                </div>
            </div>
            <div className='px-4 py-2'>
                {feed.tags.map(tag => (
                    <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-1 rounded" key={tag}>{tag}</span>
                ))}
            </div>

            {feed.cover !== '' &&
                <div className='block mx-4 my-2 shadow-md rounded-lg overflow-hidden'>
                    <div className="h-44 flex items-center justify-center">
                        <img src={feed.cover} alt="/" className='h-full' />
                    </div>
                </div>
            }

            <div className='flex items-center px-4 py-2 gap-4'>
                <p className='py-2 text-sm text-gray-400'>
                    <FavoriteIcon style={{ color: "red", fontSize: '18px', marginTop: '-4px' }} /> {likeCounts}
                </p>

                <p className='py-2 text-sm text-gray-400'>
                    <BookmarkIcon style={{ color: "#00d0cd", fontSize: '18px', marginTop: '-4px' }} /> {savedCounts}
                </p>
            </div>

            <div className="p-5">
                <div>
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{feed.title}</h5>
                </div>
                <div className="mb-3 max-h-60 overflow-hidden relative">
                    <div className='from-white bg-gradient-to-t absolute bottom-0 w-full z-10 read-more-overlay'></div>
                    <div ref={contentRef}>
                    </div>
                </div>
                <Link to={`/feed/${feed._id}`} className="inline-flex items-center py-2 px-5 text-sm font-medium text-center text-black bg-blue-200 rounded hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300">
                    More
                    <svg aria-hidden="true" className="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                </Link>

            </div>

            <StoryEditModal
                open={isEditting === feed._id}
                closeModal={toggleEditModal}
                feed={feed}
                fetchUserStories={refetchUserStories ? refetchUserStories : () => { }}
            />

            <ConfirmationModal
                title={"Are you sure to delete this story?"}
                content="Once you delete the story, all related data will be deleted including likes and saves."
                onAccept={() => handleDelete(feed)}
                open={confirmDelete === feed._id}
                closeModal={toggleDeleteCofirmation}
                accpetLabel="Yes"
                rejectLabel="Cancel" />
        </div>
    )
}

export default FeedUI