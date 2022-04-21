import { useState } from 'react';
import { createPortal } from 'react-dom';
import Modal from '../components/Modal/Modal';
const useModal = ({ isSettings, isAbout, isPattern }) => {
  const [openModal, setOpenModal] = useState(false);

  const handleModal = () => {
    setOpenModal(!openModal);
    const body = document.querySelector('body');
    body.style.overflow === 'hidden'
      ? (body.style.overflow = 'auto')
      : (body.style.overflow = 'hidden'); // Avoid scrolling when the modal is open
  };

  const modal =
    openModal &&
    createPortal(
      <Modal
        handleModal={handleModal}
        isSettings={isSettings}
        isAbout={isAbout}
        isPattern={isPattern}
      />,
      document.getElementById('modal') // Create a portal to render the modal
    );
  return { handleModal, modal };
};

export default useModal;
