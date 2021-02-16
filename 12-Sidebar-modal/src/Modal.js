import React from 'react'
import { FaTimes } from 'react-icons/fa'
import {AppProvider, useGlobalContext} from './context'
const Modal = () => {
  const {isModalOpen,closeModal}=useGlobalContext();
  return (
    <AppProvider>
    <div className={`${isModalOpen?'modal-overlay show-modal':'modal-overlay'}`}>
      <div className='modal-container'>
        <h3>modal content</h3>
        <button className='close-modal-btn' onClick={closeModal}>
          <FaTimes />
        </button>
      </div>
    </div>
    </AppProvider>
  );
}

export default Modal
