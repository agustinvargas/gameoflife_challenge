import React, { createContext, useState } from 'react';
import Modal from '../components/Modal/Modal';

export const ModalContext = createContext();

const ModalCtx = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState('');

  const handleModal = (type = false) => {
    setOpen(!open);
    const body = document.querySelector('body');
    body.style.overflow === 'hidden'
      ? (body.style.overflow = 'auto')
      : (body.style.overflow = 'hidden'); // Avoid scrolling when the modal is open

    type && setType(type); // If modal has content, set it to the state
  };

  return (
    <ModalContext.Provider value={{ type, open, handleModal }}>
      <Modal />
      {children}
    </ModalContext.Provider>
  );
};

export default ModalCtx;
