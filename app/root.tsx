import { cssBundleHref } from '@remix-run/css-bundle';
import type { LinksFunction, LoaderFunction } from '@remix-run/node';
import {
  Link,
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

import MainNavigation from '~/components/MainNavigation';
import mainStyles from '~/styles/main.css';
import errorStyles from '~/styles/errorstyles.css';
import { getUserFromSession } from './data/auth.server';

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: 'stylesheet', href: cssBundleHref }] : []),
  { rel: 'stylesheet', href: mainStyles },
  { rel: 'stylesheet', href: errorStyles },
];

function isDefinitelyAnError(error: unknown): error is Error {
  return typeof error === 'object' && error !== null && 'message' in error;
}

export const loader: LoaderFunction = async ({ request }) => {
  return await getUserFromSession(request);
};

export const ErrorBoundary: ErrorBoundaryComponent = () => {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <html lang="en">
        <head>
          <Meta />
          <Links />
          <title>{error.statusText}</title>
        </head>
        <body>
          <main className="error-container">
            <h1>{error.statusText}</h1>
            <p>{error.data?.message || 'Something went wrong!'}</p>
            <p>
              Back to <Link to="/">safety</Link>!
            </p>
          </main>
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </body>
      </html>
    );
  }

  let errorMessage = 'Unknown error';
  if (isDefinitelyAnError(error)) {
    errorMessage = error.message;
  }

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
        <title>{errorMessage}</title>
      </head>
      <body>
        <main className="error-container">
          <h1>Unknown Error</h1>
          <p>{errorMessage || 'Something went wrong!'}</p>
          <p>
            Back to <Link to="/">safety</Link>!
          </p>
        </main>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
};

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
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
