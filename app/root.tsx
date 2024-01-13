import { cssBundleHref } from '@remix-run/css-bundle';
import type { LinksFunction } from '@remix-run/node';
import {
    Links,
    LiveReload,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
    isRouteErrorResponse,
    useRouteError,
} from '@remix-run/react';
import { ErrorBoundaryComponent } from '@remix-run/react/dist/routeModules';

//Push Test

import MainNavigation from '~/components/MainNavigation';
import mainStyles from '~/styles/main.css';

export const links: LinksFunction = () => [
    ...(cssBundleHref ? [{ rel: 'stylesheet', href: cssBundleHref }] : []),
    { rel: 'stylesheet', href: mainStyles },
];

function isDefinitelyAnError(error: unknown): error is Error {
    return typeof error === 'object' && error !== null && 'message' in error;
}

export const ErrorBoundary: ErrorBoundaryComponent = () => {
    const error = useRouteError();

    if (isRouteErrorResponse(error)) {
        return (
            <div className="error-container">
                <h1>Uh oh ...</h1>
                <p>Something went wrong.</p>
                <pre>{error.data.message}</pre>
                <a href="/" className="back-button">
                    Back to Home
                </a>
            </div>
        );
    }

    let errorMessage = 'Unknown error';
    if (isDefinitelyAnError(error)) {
        errorMessage = error.message;
    }

    return (
        <div className="error-container">
            <h1>Uh oh ...</h1>
            <p>Something went wrong.</p>
            <pre>{errorMessage}</pre>
            <a href="/" className="back-button">
                Back to Home
            </a>
        </div>
    );
};

export default function App() {
    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <Meta />
                <Links />
            </head>
            <body>
                <header>
                    <MainNavigation />
                </header>
                <Outlet />
                <ScrollRestoration />
                <Scripts />
                <LiveReload />
            </body>
        </html>
    );
}
