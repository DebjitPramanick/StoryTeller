import React, { useContext, createContext, useState } from "react";

export interface ModalContextProps {
    isModalOpen: (name: string) => boolean;
    toggleModal: (name: string, data?: any | null) => void;
    Modals: ModalsType
}

interface ModalsType {
    STORY_EDIT: 'story_edit_modal',
    STORY_DELETE: 'story_edit_modal',
    USER_DETAILS: 'user_details_modal',
    DELETE_ACCOUNT: 'delete_account_modal',
}

const Modals: ModalsType = {
    STORY_EDIT: 'story_edit_modal',
    STORY_DELETE: 'story_edit_modal',
    USER_DETAILS: 'user_details_modal',
    DELETE_ACCOUNT: 'delete_account_modal',
}

const ModalContext = createContext<ModalContextProps>({
    isModalOpen: (name: string) => false,
    toggleModal: (name: string, data?: any | null) => { },
    Modals: Modals
});

export const useModal = () => {
    return useContext(ModalContext);
}

const initialModalState = {
    isOpen: false,
    data: null
}

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [storyEditModal, setStoryEditModal] = useState(initialModalState);
    const [storyDeleteModal, setStoryDeleteModal] = useState(initialModalState);
    const [userDetailsModal, setUserDetailsModal] = useState(initialModalState);
    const [deleteAccountConfirm, setDeleteAccountConfirm] = useState(initialModalState);

    const isModalOpen = (name: string) => {
        switch (name) {
            case Modals.STORY_EDIT:
                return storyEditModal.isOpen;
            case Modals.STORY_DELETE:
                return storyDeleteModal.isOpen;
            case Modals.USER_DETAILS:
                return userDetailsModal.isOpen;
            case Modals.DELETE_ACCOUNT:
                return deleteAccountConfirm.isOpen;
            default:
                return false;
        }
    }

    const toggleModal = (name: string, data?: any) => {
        switch (name) {
            case Modals.STORY_EDIT:
                if(storyEditModal.isOpen) setStoryEditModal(initialModalState)
                else setStoryEditModal({isOpen: true, data: data})
                break;
            case Modals.STORY_DELETE:
                if(storyDeleteModal.isOpen) setStoryDeleteModal(initialModalState)
                else setStoryDeleteModal({isOpen: true, data: data})
                break;
            case Modals.USER_DETAILS:
                if(userDetailsModal.isOpen) setUserDetailsModal(initialModalState)
                else setUserDetailsModal({isOpen: true, data: data})
                break;
            case Modals.DELETE_ACCOUNT:
                if(deleteAccountConfirm.isOpen) setDeleteAccountConfirm(initialModalState)
                else setDeleteAccountConfirm({isOpen: true, data: data})
                break;
            default:
                break;
        }
    }

    const values = {
        isModalOpen,
        toggleModal,
        Modals
    }

    return (
        <ModalContext.Provider value={values}>
            {children}
        </ModalContext.Provider>
    )
};
