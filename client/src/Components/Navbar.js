import { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const pathname = window.location.pathname;

  const path = pathname === '/' ? 'home' : pathname.substr(1);
  const [activeItem, setActiveItem] = useState(path);

  const handleItemClick = () => setActiveItem(path);

  return (
    <Navbar className="Navbar">
      
      <div className="" onClick={handleItemClick} active={activeItem === 'home'}>
        <Link to ="/"> Home </Link>
      </div>
      
      <div className="login" onClick={handleItemClick} active={activeItem === 'login'}>
        <Link to ="/login">Login</Link>
      </div>
      
      <div className="register" onClick={handleItemClick} active={activeItem === 'register'}>
        <Link to ="/register">Register</Link>
      </div>
      
    </Navbar>
  );
}

export default Navbar;