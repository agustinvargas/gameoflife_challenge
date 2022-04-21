import { useContext } from 'react';
import { BoardContext } from '../contexts/BoardCtx';

const useBoard = () => {
  return useContext(BoardContext);
};

export default useBoard;
