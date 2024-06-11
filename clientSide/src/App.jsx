import './App.css'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Login from './Components/LoginPage/Login';
import Signup from './Components/SignupPage/Signup';
import Documents from './Components/DocumentsPage/Documents'

function App() {


  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/Login' element={<Login />} />
          <Route path='/Signup' element={<Signup />} />
          <Route path='/Documents' element={<Documents />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
