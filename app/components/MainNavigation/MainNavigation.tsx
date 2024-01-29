import { useState } from 'react';
import { LinksFunction, LoaderFunction } from '@remix-run/node';
import { Link, Form, useLoaderData } from '@remix-run/react';
import navStyles from '~/components/MainNavigation/MainNavigation.css';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: navStyles },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const userId = useLoaderData<LoaderFunction>();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="header-container">
      <header className="header">
        <button
          className="hamburger"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>
        <nav className={`navbar ${isMenuOpen ? 'is-active' : ''}`}>
          <Link
            to="/"
            className="nav-link"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/analytics"
            className="nav-link"
            onClick={() => setIsMenuOpen(false)}
          >
            Analytics
          </Link>
          <Link
            to="/scores"
            className="nav-link"
            onClick={() => setIsMenuOpen(false)}
          >
            Score Cards
          </Link>
          <Link
            to={`/scores/${userId}`}
            className="nav-link"
            onClick={() => setIsMenuOpen(false)}
          >
            User Profile
          </Link>
          {userId ? (
            <Form action="/logout" method="post">
              <button
                type="submit"
                className="nav-link"
                onClick={() => setIsMenuOpen(false)}
              >
                Logout
              </button>
            </Form>
          ) : (
            <Link
              to="/auth"
              className="nav-link"
              onClick={() => setIsMenuOpen(false)}
            >
              Login
            </Link>
          )}
        </nav>
      </header>
    </div>
  );
};

export default Header;
