import type {
    LinksFunction,
    LoaderFunction,
    MetaFunction,
} from '@remix-run/node';

import { links as navStyles } from '~/components/MainNavigation/MainNavigation';
import { links as scoresStyles } from '~/components/Cards/ScoreCard';
import { getAllUsers } from '~/data/users.server';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import UserCard from '~/components/Cards/UserCard';
import { UserType } from '~/types';

export const meta: MetaFunction = () => {
    return [
        { title: 'Ping-Pong Auth!' },
        { name: 'description', content: 'Lets play some Ping-Pong!' },
    ];
};

export const links: LinksFunction = () => {
    return [...scoresStyles(), ...navStyles()];
};

export const loader: LoaderFunction = async () => {
    try {
        const users = await getAllUsers();
        return json(users);
    } catch (error) {
        console.error('Failed to load users:', error);
        return json(
            { errors: { users: 'Failed to load users' } },
            { status: 500 }
        );
    }
};

export default function Users() {
    const users = useLoaderData<UserType[]>();

    return (
        <div>
            <h1>All Users Details:</h1>
            <div className="users-container">
                {users.map((user) => (
                    <UserCard key={user.id} userData={user} />
                ))}
            </div>
        </div>
    );
}
