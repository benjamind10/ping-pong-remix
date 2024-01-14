import { LinksFunction } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';

import navStyles from '~/components/MainNavigation.css';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: navStyles },
];

const Header = () => {
  const userId = useLoaderData();

  return (
    <div className="header-container">
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
          {!userId && (
            <Link to="/auth" className="nav-link">
              Login
            </Link>
          )}
        </nav>
      </header>
    </div>
  );
};

export default Header;
