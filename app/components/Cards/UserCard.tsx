import { LinksFunction } from '@remix-run/node';
import type { UserType } from '~/types';
import styles from './Card.css'; // Adjust the CSS as needed

type UserCardProps = {
    userData: UserType;
};

export const links: LinksFunction = () => {
    return [{ rel: 'stylesheet', href: styles }];
};

const calculateRatio = (
    wins: number | undefined,
    losses: number | undefined
): string => {
    // Treat undefined as 0
    const totalWins = wins || 0;
    const totalLosses = losses || 0;

    if (totalLosses === 0) {
        return 'N/A';
    } else {
        return (totalWins / totalLosses).toFixed(2);
    }
};

function UserCard({ userData }: UserCardProps) {
    const ratio = calculateRatio(userData.wins, userData.losses);
    return (
        <div className="user-card-container">
            <article className="user-card">
                <header>
                    <h2>Username: {userData.username}</h2>
                </header>
                <p>ID: {userData.id}</p>
                <p>Email: {userData.email}</p>
                <p>Created At: {userData.createdAt}</p>
                <p>Wins: {userData.wins}</p>
                <p>Losses: {userData.losses}</p>
                <p>W:L Ratio: {ratio}</p>
            </article>
        </div>
    );
}

export default UserCard;
