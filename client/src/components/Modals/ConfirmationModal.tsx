import React from 'react'
import ModalLayout from '../../layouts/ModalLayout'
import { ModalBasicPropsType } from '../../utils/types'
import Button from '../FormFields/Button';

interface UIProps extends ModalBasicPropsType {
    title: string;
    content?: string;
    onAccept: () => void;
    accpetLabel?: string;
    rejectLabel?: string
}

const ConfirmationModal: React.FC<UIProps> = ({
    open,
    closeModal,
    title,
    content,
    onAccept,
    accpetLabel = "Accept",
    rejectLabel = "Decline"
}) => {
    if (!open) return null;
    return (
        <ModalLayout>
            <div className="flex justify-between items-start p-4 rounded-t border-b">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {title}
                </h3>
            </div>
            {content && (
                <div className="p-6 space-y-6">
                    <p className="text-md text-gray-500">
                        {content}
                    </p>
                </div>
            )}
            <div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 justify-end">
                <Button onClick={closeModal} label={rejectLabel} variant='danger' />
                <Button onClick={onAccept} label={accpetLabel} />
            </div>
        </ModalLayout>
    )
}

export default ConfirmationModal