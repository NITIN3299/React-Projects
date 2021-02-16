import React, { useContext } from 'react';
import { FaBars } from 'react-icons/fa';
import { useGlobalContext } from './context';
import {AppProvider} from '../src/context';
const Home = () => {
  const {openSidebar,openModal}=useGlobalContext();
  return (
    <AppProvider>
    <main>
      <button className='sidebar-toggle' onClick={openSidebar}>
        <FaBars />
      </button>
      <button className="btn" onClick={openModal}>
        show modal
      </button>
    </main>
    </AppProvider>
  );
}

export default Home
