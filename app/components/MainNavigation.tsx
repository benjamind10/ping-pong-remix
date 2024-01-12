import { LinksFunction } from '@remix-run/node';
import { Link } from '@remix-run/react';

import navStyles from '~/components/MainNavigation.css';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: navStyles },
];

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
        <Link to="/scores" className="nav-link">
          Score Cards
        </Link>
      </nav>
    </header>
  );
};

export default Header;
