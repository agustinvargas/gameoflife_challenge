import { useContext } from 'react';
import { ModalContext } from '../contexts/ModalCtx';

const useModal = () => useContext(ModalContext);

export default useModal;
