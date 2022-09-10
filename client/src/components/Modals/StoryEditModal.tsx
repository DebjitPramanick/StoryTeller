import { CloseOutlined } from '@mui/icons-material'
import React from 'react'
import ModalLayout from '../../layouts/ModalLayout'
import EditorUI from '../../pages/Editor/EditorUI'
import Button from '../FormFields/Button'

const StoryEditModal: React.FC<any> = ({
    open
}) => {
    return (
        <ModalLayout>
            <div className="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Terms of Service
                </h3>
                <CloseOutlined />
            </div>
            {/* <EditorUI /> */}
            <div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 justify-end">
                <Button onClick={undefined} label="Cancel" variant='danger'/>
                <Button onClick={undefined} label="Update" />
            </div>
        </ModalLayout>
    )
}

export default StoryEditModal