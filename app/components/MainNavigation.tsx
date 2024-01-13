import { LinksFunction } from '@remix-run/node';
import { Link } from '@remix-run/react';

import navStyles from '~/components/MainNavigation.css';

export const links: LinksFunction = () => [
    { rel: 'stylesheet', href: navStyles },
];

const Header = () => {
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
                    <Link to="/auth" className="nav-link">
                        Auth Page
                    </Link>
                </nav>
            </header>
        </div>
    );
};

export default Header;
