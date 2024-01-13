import type {
    ActionFunction,
    LinksFunction,
    MetaFunction,
} from '@remix-run/node';
import { links as gameFormStyles } from '~/components/GameForm';
import { links as navStyles } from '~/components/MainNavigation';
import AuthForm, { links as authFormStyles } from '~/components/AuthForm';

export const meta: MetaFunction = () => {
    return [
        { title: 'Ping-Pong Auth!' },
        { name: 'description', content: 'Lets play some Ping-Pong!' },
    ];
};

export const links: LinksFunction = () => {
    return [...gameFormStyles(), ...navStyles(), ...authFormStyles()];
};

export const action: ActionFunction = async ({ request }) => {
    const searchParams = new URL(request.url).searchParams;
    const authMode = searchParams.get('mode') || 'login';

    const formData = await request.formData();
    const credentials = Object.fromEntries(formData);
    console.log(credentials);
    if (authMode === 'login') {
        // login logic
    } else {
        //signup logic
    }
};

export default function Analytics() {
    return (
        <main>
            <h1>Auth Page</h1>
            <AuthForm />
        </main>
    );
}
