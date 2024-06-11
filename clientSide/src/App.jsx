import './App.css'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { useState } from 'react';

import Login from './Components/LoginPage/Login';
import Signup from './Components/SignupPage/Signup';
import Documents from './Components/DocumentsPage/Documents'

function App() {

  const [user, setUser] = useState({});

  const ChangeCommonUser = (user) => setUser(user);

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Login setUser={ChangeCommonUser}/>} />
          <Route path='/Login' element={<Login setUser={ChangeCommonUser}/>} />
          <Route path='/Signup' element={<Signup />} />
          <Route path='/Documents' element={<Documents setUser={ChangeCommonUser} user={user}/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
