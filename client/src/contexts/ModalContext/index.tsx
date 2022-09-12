import React, { useContext, createContext, useState } from "react";

export interface ModalContextProps {
    isModalOpen: (name: string) => boolean;
    getModalStateData: (name: string) => any;
    toggleModal: (name: string, data?: any | null) => void;
    Modals: ModalsType
}

interface ModalsType {
    STORY_EDIT: 'story_edit_modal',
    USER_DETAILS: 'user_details_modal',
    CNF_MODAL: 'confirmation_modal'
}

const Modals: ModalsType = {
    STORY_EDIT: 'story_edit_modal',
    USER_DETAILS: 'user_details_modal',
    CNF_MODAL: 'confirmation_modal'
}

const ModalContext = createContext<ModalContextProps>({
    isModalOpen: (name: string) => false,
    getModalStateData: (name: string) => null,
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
    const [userDetailsModal, setUserDetailsModal] = useState(initialModalState);
    const [confirmationModal, setConfirmaionModal] = useState(initialModalState);

    const isModalOpen = (name: string) => {
        switch (name) {
            case Modals.STORY_EDIT:
                return storyEditModal.isOpen;
            case Modals.CNF_MODAL:
                return confirmationModal.isOpen;
            case Modals.USER_DETAILS:
                return userDetailsModal.isOpen;
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
            case Modals.CNF_MODAL:
                if(confirmationModal.isOpen) setConfirmaionModal(initialModalState)
                else setConfirmaionModal({isOpen: true, data: data})
                break;
            case Modals.USER_DETAILS:
                if(userDetailsModal.isOpen) setUserDetailsModal(initialModalState)
                else setUserDetailsModal({isOpen: true, data: data})
                break;
            default:
                break;
        }
    }

    const getModalStateData = (name: string) => {
        switch (name) {
            case Modals.STORY_EDIT:
                return storyEditModal.data;
            case Modals.CNF_MODAL:
                return confirmationModal.data;
            case Modals.USER_DETAILS:
                return userDetailsModal.data;
            default:
                return false;
        }
    }

    const values = {
        isModalOpen,
        getModalStateData,
        toggleModal,
        Modals
    }

    return (
        <ModalContext.Provider value={values}>
            {children}
        </ModalContext.Provider>
    )
};
