import React from 'react';
import useModal from '../../hooks/useModal';

const MenuIcon = ({ icon, isSettings, isAbout }) => {
  const { handleModal, modal } = useModal({
    isSettings,
    isAbout,
  });

  // const [openModal, setOpenModal] = useState(false);

  // const handleModal = () => {
  //   setOpenModal(!openModal);
  //   const body = document.querySelector('body');
  //   body.style.overflow === 'hidden'
  //     ? (body.style.overflow = 'auto')
  //     : (body.style.overflow = 'hidden'); // Avoid scrolling when the modal is open
  // };

  return (
    <>
      <span className='icon' onClick={handleModal}>
        {icon}
      </span>
      {modal}
    </>
  );
};

export default MenuIcon;
