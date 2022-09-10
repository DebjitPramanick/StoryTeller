import { CloseOutlined } from '@mui/icons-material'
import React from 'react'
import { useModal } from '../../contexts/ModalContext'
import ModalLayout from '../../layouts/ModalLayout'
import EditorUI from '../../pages/Editor/EditorUI'
import Button from '../FormFields/Button'

const StoryEditModal: React.FC<any> = ({
    open,
    closeModal
}) => {

    if(!open) return null;
    return (
        <ModalLayout isDarkBG={true}>
            <div className="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Edit Story
                </h3>
                <CloseOutlined onClick={closeModal} className="cursor-pointer"/>
            </div>
            {/* <EditorUI /> */}
            <div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 justify-end">
                <Button onClick={closeModal} label="Cancel" variant='danger'/>
                <Button onClick={undefined} label="Update" />
            </div>
        </ModalLayout>
    )
}

export default StoryEditModal