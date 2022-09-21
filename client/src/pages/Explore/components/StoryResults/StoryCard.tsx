import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../../../contexts/UserContext'

const StoryCard: React.FC<any> = ({ story }) => {
    const { user } = useUser();

    const navigate = useNavigate();


    return (
        <div className='bg-white rounded-lg border border-gray-200 shadow-md p-4 cursor-pointer' onClick={() => navigate(`/feed/${story._id}`)}>
            <div className="flex justify-center p-2 cursor-pointer relative">
                <img className="w-24 h-24 rounded-full" src={"https://img.freepik.com/free-vector/vector-illustration-mountain-landscape_1441-72.jpg?w=2000"} alt="" />
            </div>
            <div className="flex items-center gap-2 my-2">
                <div className="flex-1 min-w-0 text-center">
                    <p className="text-lg font-semibold text-gray-900 truncate">
                        {story.title}
                    </p>
                    <p className="text-sm text-gray-500 truncate italic">
                        By {story.author.name}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default StoryCard