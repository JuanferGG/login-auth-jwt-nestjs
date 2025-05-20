// TODO CSS
import { Route, Routes } from 'react-router-dom'
import './App.css'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'

// TODO Pages

// TODO libraries

function App() {
  

  return (
    <Routes>
      <Route path='/login' element={<LoginPage />} />
      <Route path='/' element={<HomePage />} />
    </Routes>
  )
}

export default App
