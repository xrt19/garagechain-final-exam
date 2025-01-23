import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';
import Logo from './Logo'; // Import Logo component

const Header = () => {
  return (
    <header className="app-header">
      <div className="logo-container">
        <Link to="/" className="logo">
          <Logo /> {/* Gunakan komponen Logo */}
        </Link>
      </div>
      <nav className="nav-bar">
        <ul className="nav-list">
          <li><Link to="/new-listing">Add New Listing [Seller]</Link></li>
          <li><Link to="/manage-listings">Manage Listings [Seller]</Link></li>
          <li><Link to="/newly-added-cars">Newly Added Cars [Buyer]</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
