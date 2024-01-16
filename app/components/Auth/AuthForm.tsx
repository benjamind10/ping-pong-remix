import {
    Form,
    Link,
    useActionData,
    useSearchParams,
    useNavigation,
} from '@remix-run/react';
import { FaLock, FaUserPlus } from 'react-icons/fa';
import { LinksFunction } from '@remix-run/node';
import { ValidationErrors } from '~/data/validation.server';

import authFormStyles from '~/components/Auth/AuthForm.css';

type ActionData = {
    errors?: ValidationErrors;
};

export const links: LinksFunction = () => [
    { rel: 'stylesheet', href: authFormStyles },
];

function AuthForm() {
    const [searchParams] = useSearchParams();
    const navigation = useNavigation();
    const validationErrors = useActionData<ActionData>();

    const authMode = searchParams.get('mode') || 'login';
    const submitBtnCaption = authMode === 'login' ? 'Login' : 'Create User';
    const toggleBtnCaption =
        authMode === 'login'
            ? 'Create a new user'
            : 'Log in with existing user';
    const isSubmitting = navigation.state !== 'idle';

    return (
        <Form method="post" className="form" id="auth-form">
            <div className="icon-img">
                {authMode === 'login' ? <FaLock /> : <FaUserPlus />}
            </div>

            {authMode === 'signup' && (
                <p>
                    <label className="heading-text" htmlFor="username">
                        Username
                    </label>
                    <input type="text" id="username" name="username" required />
                </p>
            )}

            <p>
                <label className="heading-text" htmlFor="email">
                    Email Address
                </label>
                <input type="email" id="email" name="email" required />
            </p>

            <p>
                <label className="heading-text" htmlFor="password">
                    Password
                </label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    minLength={7}
                    required
                />
            </p>

            {validationErrors?.errors && (
                <ul>
                    {Object.entries(validationErrors.errors).map(
                        ([key, error]) => (
                            <li className="error-label" key={key}>
                                {error}
                            </li>
                        )
                    )}
                </ul>
            )}

            <div className="form-actions">
                <button
                    type="submit"
                    style={{ marginRight: 1 + 'em' }}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Authenticating...' : submitBtnCaption}
                </button>
                <Link
                    to={authMode === 'login' ? '?mode=signup' : '?mode=login'}
                >
                    {toggleBtnCaption}
                </Link>
            </div>
        </Form>
    );
}

export default AuthForm;
