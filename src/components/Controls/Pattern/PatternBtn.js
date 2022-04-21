import React from 'react';
import PatternIcon from '../../Icons/PatternIcon';
import useModal from '../../../hooks/useModal';

const PatternBtn = () => {
  const { handleModal } = useModal();

  return (
    <>
      <button onClick={() => handleModal('pattern')} className='btn-warning'>
        <>
          <PatternIcon />
          Patterns
        </>
      </button>
    </>
  );
};

export default PatternBtn;
