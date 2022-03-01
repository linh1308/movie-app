import React, { useRef } from 'react';
import { FaTimes } from 'react-icons/fa';
import './Modal.scss';

const Modal = ({ id, activeModal, children }) => {
    return (
        <div id={id} className='modal'>
            {children}
        </div>
    )
}

export const ModalContent = ({ onCloseModal, children }) => {
    const modalRef = useRef();

    const handleCloseModal = () => {
        modalRef.current.parentNode.classList.remove('active');
        if (onCloseModal) onCloseModal();
    }

    return (
        <div ref={modalRef} className='modal-content'>
            {children}
            <div className="modal-content__close">
                <FaTimes onClick={handleCloseModal}/>
            </div>
        </div>
    )
};

export default Modal;