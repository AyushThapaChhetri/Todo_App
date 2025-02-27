import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";
import App from './App.jsx';
import MoreInfo from './components/MoreInfo';
import Login from './components/Login.jsx';
import SignupForm from './components/SignupForm.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/moreInfo" element={<MoreInfo />} />
        <Route path="/login" element={<Login />} />
        <Route path='/signup' element={<SignupForm />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
