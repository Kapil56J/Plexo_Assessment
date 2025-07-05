import React from 'react'
import Dashboard from './components/Dashboard'
import ContentPreviewModal from './components/ContentPreviewModal'
import UndoToast from './components/UndoToast'
import './App.css'

function App() {
  return (
    <div className="App">
      <Dashboard />
      <ContentPreviewModal />
      <UndoToast />
    </div>
  )
}

export default App
