import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";
import App from './App.jsx';
import MoreInfo from './components/MoreInfo';
import Login from './components/Login.jsx';
import SignupForm from './components/SignupForm.jsx';
import { ToastContainer, Bounce } from 'react-toastify';
import EditProfile from './components/editProfile/EditProfile.jsx';




createRoot(document.getElementById('root')).render(
  <StrictMode>

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/moreInfo" element={<MoreInfo />} />
        <Route path="/login" element={<Login />} />
        <Route path='/signup' element={<SignupForm />} />

        <Route path='/editProfile' element={<EditProfile />} />

      </Routes>
    </BrowserRouter>
    <ToastContainer
      position="top-right"
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
      transition={Bounce}
    />

  </StrictMode>,
)
