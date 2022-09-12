import { CloseOutlined } from '@mui/icons-material'
import React, { useState, useEffect } from 'react'
import { popupMessage } from '../../helpers/common.helper'
import { updateStory } from '../../helpers/story.helper'
import ModalLayout from '../../layouts/ModalLayout'
import { StoryDetailsType } from '../../pages/Editor'
import Button from '../FormFields/Button'
import StoryEditor from '../StoryEditor'

const initialData: StoryDetailsType = {
    title: '',
    content: '',
    cover: '',
    tags: [],
}

const StoryEditModal: React.FC<any> = ({
    open,
    closeModal,
    feed
}) => {

    const [data, setData] = useState(initialData)

    useEffect(() => {
      setData(feed)
    }, [feed])

    const handleUpdate = async() => {
        try{
            await updateStory(feed._id, data)
            popupMessage("success", "Updated story successfully.")
            closeModal();
        }catch(err: any) {
            popupMessage("error", err.message)
        }
    }
    

    const handleChangeData = (field: string, value: string) => {
        setData({ ...data, [field]: value })
    }

    if (!open || !data) return null;
    return (
        <ModalLayout isDarkBG={true}>
            <div className="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Edit Story
                </h3>
                <CloseOutlined onClick={closeModal} className="cursor-pointer" />
            </div>
            <div className="p-6 space-y-6">
                <StoryEditor data={data} handleChangeData={handleChangeData} />
            </div>
            <div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 justify-end">
                <Button onClick={closeModal} label="Cancel" variant='danger' />
                <Button onClick={handleUpdate} label="Update" />
            </div>
        </ModalLayout>
    )
}

export default StoryEditModal