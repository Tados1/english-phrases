import './Navbar.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Navbar = () => {
  const [toggle, setToggle] = useState(false)

  const toggleFunction = () => {
    setToggle(!toggle)
  }

  const burgerContainerClass = `burger ${toggle ? 'open' : ''}`;
  const navContainerClasss = `${toggle ? 'open' : ''}`

  return <header>
          <h1>GUESS THE CORRECT PHRASE</h1>
          <div className={`burger ${burgerContainerClass}`} onClick={toggleFunction}>
            <span></span>
            <span></span>
            <span></span>
          </div>

          <nav className={navContainerClasss}>
            <Link to='/'>Home</Link>
            <Link to='/all-phrases'>All Phrases</Link>
            <Link to='/add-phrases'>Add Phrase</Link>
          </nav>
        </header>
        
};

export default Navbar;