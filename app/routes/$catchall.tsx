// app/routes/$catchall.tsx
import { json, LoaderFunction } from '@remix-run/node';
import { Link } from '@remix-run/react';
import stylesUrl from '~/styles/errorstyles.css';

export const loader: LoaderFunction = async ({ request }) => {
    console.log(`Unmatched request URL: ${request.url}`);
    // This response is for server-side logging and won't affect what's rendered on the client side
<<<<<<< HEAD
=======
    // return new Response('Not Found', { status: 404 });
>>>>>>> fe95ccb684d9aedcd9df3c562b6ed8987d0bdf4a
    return json({ errors: { page: 'Not Found' } }, { status: 404 });
};

export function links() {
    return [{ rel: 'stylesheet', href: stylesUrl }];
}

export default function CatchAll() {
    return (
        <main className="error-container">
            <h1>Page Not Found</h1>
            <p>
                Oops! The page you're looking for does not exist. You can go
                back to <Link to="/">home</Link>.
            </p>
        </main>
    );
}
