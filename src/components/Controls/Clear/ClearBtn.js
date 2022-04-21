import React from 'react';
import useBoard from '../../../hooks/useBoard';
import ClearIcon from '../../Icons/ClearIcon';
const ClearBtn = () => {
  const { clearBoard } = useBoard();

  return (
    <button onClick={() => clearBoard()} className='btn-warning'>
      <>
        <ClearIcon />
        Clear
      </>
    </button>
  );
};

export default ClearBtn;
