import "./App.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from "react";

import Login from "./Components/LoginPage/Login";
import Signup from "./Components/SignupPage/Signup";
import Documents from "./Components/DocumentsPage/Documents";
import TypingArea from "./Components/TypingAreaPage/TypingArea";

function App() {
  const [user, setUser] = useState({});
  const [document, setDocument] = useState({});

  const ChangeCommonUser = (user) => setUser(user);
  const ChangeDocument = (doc) => setDocument(doc);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login setUser={ChangeCommonUser} />} />
          <Route path="/Login" element={<Login setUser={ChangeCommonUser} />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Documents" element={<Documents setUser={ChangeCommonUser} setDocument={ChangeDocument} user={user} />} />
          <Route path={`/TypingArea/${document.documentId}`} element={<TypingArea user={user} document={document} setUser={ChangeCommonUser} />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
