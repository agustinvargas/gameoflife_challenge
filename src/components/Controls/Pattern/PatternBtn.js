import React from 'react';
import PatternIcon from '../../Icons/PatternIcon';
// import useModal from '../../../hooks/useModal';

const PatternBtn = () => {
  // const { handleModal, modal } = useModal({ isPattern: true });

  return (
    <>
      <button className='btn-warning'>
        <>
          <PatternIcon />
          Patterns
        </>
      </button>
      {/* {modal} */}
    </>
  );
};

export default PatternBtn;
