import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import Button from '../../../../components/FormFields/Button';
import { useUser } from '../../../../contexts/UserContext'
import { popupMessage } from '../../../../helpers/common.helper';
import { followUser, unfollowUser } from '../../../../helpers/user.helper';

const UserCard: React.FC<any> = ({ profileData, followers }) => {
    const { user } = useUser();

    const navigate = useNavigate();
    const [isFollowing, setIsFollowing] = useState(followers.includes(user._id));
    const [followersCount, setFollowersCount] = useState(followers.length);

    const handleFollowUser = async () => {
        try {
            const targetUserID = profileData._id;
            if(isFollowing) {
                await unfollowUser(targetUserID, user._id)
                setIsFollowing(false)
                setFollowersCount(followersCount-1)
                popupMessage("success", "Unfollowed successfully.")
            } else {
                await followUser(targetUserID, user._id);
                setIsFollowing(true)
                setFollowersCount(followersCount+1)
                popupMessage("success", "Followed successfully.")
            }
        } catch (err: any) {
            popupMessage('error', err.message)
        }
    }

    return (
        <div className='bg-white rounded-lg border border-gray-200 shadow-md p-4'>
            <div className="flex justify-center p-2 cursor-pointer relative">
                <img className="w-24 h-24 rounded-full" src={profileData.avatar} alt="" />
            </div>
            <div className="flex items-center gap-2 my-2">
                <div className="flex-1 min-w-0 text-center">
                    <p className="text-lg font-medium text-gray-900 truncate">
                        {profileData.name}
                    </p>
                    <p className="text-sm text-gray-500 truncate">
                        {profileData.username}
                    </p>
                    <p className="truncate bg-yellow-100 text-yellow-800 text-xs font-semibold px-2.5 py-1.5 rounded cursor-pointer w-max mx-auto mt-2">
                        {followersCount} Followers
                    </p>
                </div>
            </div>
            {user._id === profileData._id ? (
                <div className='mt-4 py-2'>
                    <Button label="Go To Profile" onClick={() => navigate(`/profile`)} fullWidth variant='success'/>
                </div>
            ) : (
                <div className='mt-4 py-2 grid grid-cols-2 gap-2'>
                    {isFollowing ? (
                        <Button label="Unollow" variant='danger' onClick={handleFollowUser} />
                    ) : <Button label="Follow" onClick={handleFollowUser} />}

                    <Button label="View" onClick={() => navigate(`/profile/${profileData._id}`)} />
                </div>
            )}
        </div>
    )
}

export default UserCard