import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';
import { popupMessage } from '../../helpers/common.helper';
import { checkIfFollowing, followUser, getFollowersByUserID, unfollowUser } from '../../helpers/user.helper';
import { GlobalUserType } from '../../utils/types';
import Button from '../FormFields/Button';

interface UIProps {
    author: GlobalUserType,
    open: boolean
}

const UserDetailsModal: React.FC<UIProps> = ({
    author,
    open
}) => {

    const navigate = useNavigate();
    const { user } = useUser();
    const [isFollowing, setIsFollowing] = useState(false);
    const [followers, setFollowers] = useState<{ count: number, users: GlobalUserType[] }>({
        count: 0,
        users: []
    });

    useEffect(() => {
        fetchFollowers();
        handleCheckIfFollowing();
    }, [])


    const fetchFollowers = async () => {
        try {
            const res = await getFollowersByUserID(author._id)
            if (res.data.followers) {
                setFollowers({
                    count: res.data.count,
                    users: res.data.followers
                })
            }
        } catch (err: any) {
            popupMessage('error', err.message);
        }
    }

    const handleCheckIfFollowing = async () => {
        try {
            const res = await checkIfFollowing(author._id, user._id)
            if (res.data.isFollowing) {
                setIsFollowing(true)
            } else {
                setIsFollowing(false);
            }
        } catch (err: any) {
            popupMessage('error', err.message);
        }
    }

    const handleFollowUser = async () => {
        try {
            const targetUserID = author._id;
            if (!isFollowing) {
                await followUser(targetUserID, user._id);
                popupMessage("success", "Followed successfully.")
                setIsFollowing(true);
                let newFollowers = followers.users;
                newFollowers.push(user);
                setFollowers({
                    count: followers.count + 1,
                    users: newFollowers
                })
            } else {
                await unfollowUser(targetUserID, user._id);
                popupMessage("success", "Unfollowed successfully.")
                setIsFollowing(false);
                let newFollowers = followers.users.filter((u: any) => u._id !== user._id);
                newFollowers.push(user);
                setFollowers({
                    count: followers.count - 1,
                    users: newFollowers,
                })
            }
        } catch (err: any) {
            popupMessage('error', err.message)
        }
    }

    return (
        <div className={`z-10 px-4 pt-4 w-72 bg-orange-100 border rounded-lg divide-y divide-gray-100 shadow-xl absolute left-14 top-0 ${!open ? 'hidden' : 'visible'}`}>
            <div className='flex gap-4'>
                <div className="flex-shrink-0 cursor-pointer">
                    <img className="w-20 h-20 rounded-full" src={author.avatar} alt="" />
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-lg font-bold text-gray-900 truncate">
                        {author.name}
                    </p>
                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                        @{author.username}
                    </p>
                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                        {followers.count} followers
                    </p>
                </div>
            </div>
            <div className='mt-4 py-2 grid grid-cols-2 gap-2'>
                {isFollowing ? (<Button label="Unfollow" onClick={handleFollowUser} variant="danger"/>)
                    : (<Button label="Follow" onClick={handleFollowUser} />)}
                <Button label="View" onClick={() => navigate(`/profile/${author._id}`)} />
            </div>
        </div>
    )
}

export default UserDetailsModal