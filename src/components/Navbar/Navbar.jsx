import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import useAuth from '../../hooks/useAuth';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth(); 

  const toggleMenu = () => setIsOpen(!isOpen);
  const extractNameFromEmail = (email) => {
    if (!email) return '';
    return email.split('@')[0];
  };

  return (
    <nav className='navbar'>
      <div className='container'>
        <h1 className='watch-list'>
          𝓦𝓪𝓽𝓬𝓱𝓵𝓲𝓼𝓽
        </h1>
        <div className='nav-left'>
          <Link to="/" className='nav-link'>Home</Link>
          <Link to='/watchlist' className='nav-link'>Watchlist</Link>
        </div>

        <div className='menu-toggle' onClick={toggleMenu}>
          <svg className='menu-icon' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 6h16M4 12h16m-7 6h7' />
          </svg>
        </div>

        <div className={`nav-right ${isOpen ? 'open' : ''}`}>
          <div className='nav-buttons'>
            {user ? (
              <>
                <span className='nav-user'>{extractNameFromEmail(user)}</span>
                <button className='btn btn-logout' onClick={logout}>Logout</button>
              </>
            ) : (
              <>
                <Link to='/login' className='btn btn-login'>Login</Link>
                <Link to='/signup' className='btn btn-signup'>Signup</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
