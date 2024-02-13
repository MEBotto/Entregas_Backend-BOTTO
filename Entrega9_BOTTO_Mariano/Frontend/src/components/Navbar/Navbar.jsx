import './Navbar.css'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import logo_light from '../../assets/logo-black.png'
import logo_dark from '../../assets/logo-white.png'
import search_icon_light from '../../assets/search-w.png'
import search_icon_dark from '../../assets/search-b.png'
import toogle_light from '../../assets/night.png'
import toogle_dark from '../../assets/day.png'
import cart_light from '../../assets/cart-b.png'
import cart_dark from '../../assets/cart-w.png'

function NavbarExport({ theme, setTheme }) {

  const toogle_mode = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light')
  }

  return (
    <Navbar expand="lg" className={`${theme}`}>
      <Container className='container-navbar'>
        <img src={theme === 'light' ? logo_light : logo_dark} className='logo'/>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className='custom-navbar-toggle'/>
        <Navbar.Collapse id="basic-navbar-nav">
          <ul>
            <li>Products</li>
            <li>Profile</li>
          </ul>
          <div className='search-box'>
            <input type="text" placeholder='Search'/>
            <img src={theme === 'light' ? search_icon_light : search_icon_dark}/>
          </div>
          <img src={theme === 'light' ? cart_light : cart_dark} className='toggle-icon' />
          <img onClick={() => {toogle_mode()}} src={theme === 'light' ? toogle_light : toogle_dark} className='toggle-icon' />

          <div className='loginRegister'>
            <ul>
              <li>Login</li>
              <li>Register</li>
            </ul> 
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarExport;