import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar.jsx'
import ProductsListContainer from './components/ProductsContainer/ProductsListContainer.jsx'
import { useEffect, useState } from 'react'


function App() {

  const current_theme = localStorage.getItem('current_theme');
  const [theme, setTheme] = useState(current_theme ? current_theme : 'light')

  useEffect(() => {
    localStorage.setItem('current_theme', theme)
  },[theme])

  return (
    <>
      <BrowserRouter>
        <Navbar theme={theme} setTheme={setTheme}/>
        <ProductsListContainer/>
        <Routes>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
