import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";
import App from './App.jsx';
import MoreInfo from './components/MoreInfo';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/moreInfo" element={<MoreInfo />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
