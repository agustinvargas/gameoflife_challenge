import Board from './components/Board/Board';

import Header from './components/Header/Header';

// import Modal from './components/Modal/Modal';

function App() {
  // const [openModal, setOpenModal] = useState(false);

  // const handleModal = () => {
  //   setOpenModal(!openModal);
  // };

  return (
    <div>
      <Header />
      <Board />
      {/* <button onClick={handleModal}>Modal</button>
      {openModal &&
        createPortal(
          <Modal handleModal={handleModal} />,
          document.getElementById('modal')
        )} */}
    </div>
  );
}

export default App;
