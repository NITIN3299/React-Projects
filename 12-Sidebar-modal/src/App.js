import React from 'react'
import Modal from './Modal'
import Sidebar from './Sidebar'
import Home from './Home'

import {AppProvider} from '../src/context'
function App() {
  return (
    <AppProvider>
      <Home />
      <Modal />
      <Sidebar />
    </AppProvider>
  )
}

export default App
