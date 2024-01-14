import User from '~/data/userSchema.server';
import { compare, hash } from 'bcrypt';

import {
    AuthenticationError,
    UserExistsError,
} from '~/data/customError.server';

interface SignupCredentials {
    email: string;
    password: string;
    username: string;
}

interface LoginCredentials {
    email: string;
    password: string;
}

export async function signup({ email, password, username }: SignupCredentials) {
    console.log('Test');
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new UserExistsError(
                'A user with the provided email address exists already.',
                422
            );
        }

        const user = new User({ email, password, username });
        console.log('User: ' + user.toString());
        await user.save();
        return {
            userId: user._id.toString(),
            redirectPath: '/', // Redirect to the path you want after successful signup
        };
    } catch (error) {
        console.error('Signup Error:', error);
        // Depending on your error handling strategy, you might want to throw the error
        // or return a specific response indicating the failure
        throw error; // or return a custom error response
    }
}

// export async function login({ email, password }: LoginCredentials) {
//     const existingUser = await User.findOne({ email }).exec();
//
//     if (!existingUser) {
//         throw new AuthenticationError(
//             'Could not log you in, please check the provided credentials.'
//         );
//     }
//
//     const passwordCorrect = await compare(password, existingUser.password);
//
//     if (!passwordCorrect) {
//         throw new AuthenticationError(
//             'Could not log you in, please check the provided credentials.'
//         );
//     }
//
//     // Assuming createUserSession creates a session and returns a redirect path
//     // return createUserSession(existingUser._id.toString(), '/expenses');
// }
