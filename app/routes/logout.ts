import { ActionFunction } from '@remix-run/node';
import { destroyUserSession } from '~/data/auth.server';

export const action: ActionFunction = async ({ request }) => {
    // Perform logout and destroy the user session
    return await destroyUserSession(request);
};

export default function Logout() {
    // You can render a simple message or just redirect
    return null;
}
