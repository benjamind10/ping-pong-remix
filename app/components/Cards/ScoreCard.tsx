import { LinksFunction } from '@remix-run/node';
import { Link } from '@remix-run/react';
import type { ScoreTypeWithUsernames } from '~/types';
import { useState } from 'react';

import styles from './Card.css';
import axios from 'axios';

type ScoreCardProps = {
    initialScores: ScoreTypeWithUsernames[];
};

export const links: LinksFunction = () => {
    return [{ rel: 'stylesheet', href: styles }];
};

function ScoreCard({ initialScores }: ScoreCardProps) {
    const [scores, setScores] = useState(initialScores);

    const handleDelete = async (gameId: string) => {
        try {
            const response = await axios.delete(`/api/delete/${gameId}`);
            if (response.status === 200) {
                const updatedScores = scores.filter(
                    (score) => `${score._id}` !== gameId
                );
                setScores(updatedScores);
            } else {
                console.error('Failed to delete score');
            }
        } catch (error) {
            console.error('Failed to delete score', error);
        }
    };

    return (
        <div id="score-card-container">
            {scores.map((score) => (
                <article key={score._id} className="score-card">
                    <header>
                        <Link to={`/scores/${score._id}`}>
                            <h2>Game ID: {score._id?.slice(-4)}</h2>
                        </Link>
                        <h3>Game Type: {score.gameType}</h3>
                    </header>
                    <p>
                        {score.player1} vs {score.player2}
                    </p>
                    <p>
                        Score: {score.score1} - {score.score2}
                    </p>
                    <p>Winner: {score.winnerUsername}</p>
                    <p>Loser: {score.loserUsername}</p>
                    <p>
                        First Serve:
                        {score.firstServe === 'Player1'
                            ? score.player1
                            : score.player2}
                    </p>
                    <p>
                        Date:{' '}
                        {score.createdAt
                            ? score.createdAt.toLocaleString()
                            : 'N/A'}
                    </p>
                    <button
                        onClick={() => handleDelete(String(score._id))}
                        className="delete-button"
                    >
                        Delete
                    </button>
                </article>
            ))}
        </div>
    );
}

export default ScoreCard;
