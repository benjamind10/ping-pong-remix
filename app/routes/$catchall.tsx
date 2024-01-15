// app/routes/$catchall.tsx
import { LoaderFunction } from '@remix-run/node';

export const loader: LoaderFunction = ({ request }) => {
  console.log(`Unmatched request URL: ${request.url}`);
  return new Response('Not Found', { status: 404 });
};

export default function CatchAll() {
  return <div>Page not found</div>;
}
