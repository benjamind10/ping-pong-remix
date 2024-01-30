import type {
    LinksFunction,
    LoaderFunction,
    MetaFunction,
} from '@remix-run/node';

import { links as navStyles } from '~/components/MainNavigation/MainNavigation';
import { links as scoresStyles } from '~/components/Cards/ScoreCard';
import { useLoaderData } from '@remix-run/react';
import UserCard from '~/components/Cards/UserCard';
import { getUserById } from '~/data/users.server';
import { UserType } from '~/types';
import { requireUserSession } from '~/data/auth.server';

export const meta: MetaFunction = () => {
    return [
        { title: 'Ping-Pong User Profile!' },
        { name: 'description', content: 'Lets play some Ping-Pong!' },
    ];
};

export const links: LinksFunction = () => {
    return [...scoresStyles(), ...navStyles()];
};

export const loader: LoaderFunction = async ({ request }) => {
    await requireUserSession(request);
    const url = new URL(request.url);
    const userId = url.searchParams.get('id');
    return getUserById(userId || '');
};

export default function Users() {
    const userData = useLoaderData<UserType>();

    return (
        <div>
            <h1>User Details:</h1>
            <UserCard userData={userData} />
        </div>
    );
}
