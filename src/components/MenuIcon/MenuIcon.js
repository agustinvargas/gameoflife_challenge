import React from 'react';
import useModal from '../../hooks/useModal';

const MenuIcon = ({ icon, type }) => {
  const { handleModal } = useModal();

  return (
    <>
      <span className='icon' onClick={() => handleModal(type)}>
        {icon}
      </span>
    </>
  );
};

export default MenuIcon;
