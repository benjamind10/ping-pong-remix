import type {
  ActionFunction,
  LinksFunction,
  MetaFunction,
} from '@remix-run/node';
import { json, redirect } from '@remix-run/node';

import { ValidationErrors } from '~/data/validation.server';
import { login, signup } from '~/data/auth.server';
import { UserExistsError } from '~/data/customError.server';
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
  const credentials = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    username: formData.get('username') as string,
  };

  try {
    if (authMode === 'signup') {
      return await signup(credentials);
    } else {
      return await login(credentials);
    }
  } catch (error) {
    if (error instanceof UserExistsError) {
      return json(
        { errors: { email: error.message } },
        { status: error.status }
      );
    } else if (error instanceof Error) {
      try {
        const errorObj: ValidationErrors = JSON.parse(error.message);
        return json({ errors: errorObj });
      } catch (parseError) {
        return json({ errors: { form: error.message } }, { status: 500 });
      }
    } else {
      return json(
        { errors: { form: 'An unexpected error occurred.' } },
        { status: 500 }
      );
    }
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
