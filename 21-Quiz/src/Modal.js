import React from 'react'
import { useGlobalContext } from './context'

const Modal = () => {
  const {ismodal,closemodal,correct,questions}=useGlobalContext()

  return (
    <div className={`${ismodal?'modal-container isOpen':'modal-container'}`}>
      <div className='modal-content'>
        <h2>congrats!</h2>
        <p>
          You answered {((correct/questions.length)*100).toFixed(0)}% of 
          questions correctly
        </p>
        <button className='close-btn' onClick={closemodal}>
          play again
        </button>
      </div>
    </div>
  )
}
export default Modal 