import React from 'react';
import useModal from '../../hooks/useModal';
import { SelectIcon } from '../Icons/SelectIcon';

const PatternOption = ({ title, description, img, fc }) => {
  const { handleModal } = useModal();

  const handleSelection = fc => {
    fc();

    handleModal();
  };

  return (
    <div className='pattern-container'>
      <div className='pattern_container__exp'>
        <h3 className='pattern_container__exp__title'>{title}</h3>
        <p className='pattern_container__exp__description'>{description}</p>
      </div>
      <div className='pattern-container__select'>
        <img src={img} alt={title} />

        <span onClick={() => handleSelection(fc)} className='icon-big'>
          <SelectIcon />
        </span>
      </div>
    </div>
  );
};

export default PatternOption;
