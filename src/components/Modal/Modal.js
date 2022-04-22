import React, { useRef } from 'react';
import { about, rules } from '../../utils/contents/aboutContent';
import { parseSettings } from '../../utils/parseSettings';
import { gridOpt, speedOpt } from '../../utils/contents/settingsContent';
import SaveIcon from '../Icons/SaveIcon';
import ResetIcon from '../Icons/ResetIcon';
import CloseIcon from '../Icons/CloseIcon';
import PatternOption from '../Pattern/PatternOption';
import useBoard from '../../hooks/useBoard';
import useModal from '../../hooks/useModal';
import { createPortal } from 'react-dom';
import { usePatterns } from '../../hooks/usePatterns';
import { generatesGrid } from '../../utils/generatesGrid';

const Modal = () => {
  const { type, open, handleModal } = useModal(); // handle modal state
  const { initialValues, board, setBoard } = useBoard(); // handle board state
  const patterns = usePatterns();

  const gridRef = useRef(); // handle the grid size
  const speedRef = useRef(); // handle the speed

  const handleSaveSettings = () => {
    const { rows, cols } = JSON.parse(gridRef.current.value); // get the grid size
    setBoard({
      generation: 0, // reset the generation
      speed: speedRef.current.value,
      rows: rows,
      cols: cols,
      grid: generatesGrid(rows, cols, 0), // reset the grid
    });

    // Save the settings in localStorage
    const data = [
      { gridSize: gridRef.current.value },
      { speed: speedRef.current.value },
    ];
    localStorage.setItem('settings', JSON.stringify(data));
    handleModal(); // Close the modal
  };

  const handleResetSettings = () => {
    localStorage.removeItem('settings'); // Remove the settings from localStorage
    setBoard(initialValues);

    // gridRef.current.value = JSON.stringify({
    //   rows: regularGrid?.size.rows,
    //   cols: regularGrid?.size.cols,
    // }); // Reset input value inmediately.
    handleModal(); // Close the modal
  };

  if (open) {
    return createPortal(
      <div
        onClick={handleModal}
        className='modal-container'
        // Allow clicking outside of the modal to close it
      >
        <div
          onClick={e => e.stopPropagation()} // Avoid closing the modal when clicking inside it (stop bubbling)
          className='modal-content-container'
        >
          <div className='modal-content-container__header'>
            <h2>
              {type === 'about' && 'About Life'}
              {type === 'settings' && 'Settings'}
              {type === 'pattern' && 'Examples of patterns'}
            </h2>
          </div>
          <div className='modal-content-container__body'>
            {type === 'about' && (
              <>
                {about.map((content, i) => (
                  <p key={i}>{content}</p>
                ))}
                <h3>Rules</h3>
                <ol>
                  {rules.map((rule, i) => (
                    <li key={i}>{rule}</li>
                  ))}
                </ol>
              </>
            )}

            {type === 'settings' && (
              <>
                <h3 className='setting-title'>Execution time</h3>
                <div className='content-select'>
                  <label htmlFor='speed'>
                    <select
                      id='speed'
                      ref={speedRef}
                      defaultValue={parseSettings()?.speed || board.speed}
                    >
                      {speedOpt?.map((option, i) => (
                        <option key={i} value={option?.speed}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
                <h3 className='setting-title'>Grid size</h3>
                <div className='content-select'>
                  <label htmlFor='grid'>
                    <select
                      id='grid'
                      ref={gridRef}
                      defaultValue={
                        JSON.stringify(parseSettings()?.gridSize) || // object to string from localStorage
                        JSON.stringify({ rows: board.rows, cols: board.cols }) // current or initial grid size
                      }
                    >
                      {gridOpt?.map((option, i) => (
                        <option key={i} value={JSON.stringify(option?.size)}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
              </>
            )}

            {type === 'pattern' &&
              patterns.map((pattern, i) => (
                <PatternOption
                  key={i}
                  title={pattern.title}
                  img={pattern.img}
                  description={pattern.description}
                  fc={pattern.fc}
                />
              ))}
          </div>
          <div className='modal-content-container__footer'>
            <button className='btn-danger' onClick={handleModal}>
              <CloseIcon />
              Close
            </button>
            {type === 'settings' && (
              <>
                <button onClick={handleResetSettings} className='btn-warning'>
                  <ResetIcon />
                  Reset
                </button>
                <button onClick={handleSaveSettings} className='btn-success'>
                  <SaveIcon />
                  Save
                </button>
              </>
            )}
          </div>
        </div>
      </div>,
      document.getElementById('modal')
    );
  } else return null;
};

export default Modal;
