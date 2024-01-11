import { Link } from '@remix-run/react';

const Header = () => {
  return (
    <header className="header">
      <nav className="navbar">
        <Link to="/" className="nav-link">
          Home
        </Link>
        <Link to="/analytics" className="nav-link">
          Analytics
        </Link>
        <Link to="/table" className="nav-link">
          Table View
        </Link>
      </nav>
    </header>
  );
};

export default Header;
