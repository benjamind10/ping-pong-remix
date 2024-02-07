import {
    json,
    type LinksFunction,
    type LoaderFunction,
    type MetaFunction,
} from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { useState } from 'react';

import { links as gameFormStyles } from '~/components/GameForm/GameForm';
import { links as navStyles } from '~/components/MainNavigation/MainNavigation';
import ScoreCard, { links as scoresStyles } from '~/components/Cards/ScoreCard';
import { getStoredScores } from '~/data/scores.server';
import { getUserById } from '~/data/users.server';
import { ScoreTypeWithUsernames } from '~/types';

export const meta: MetaFunction = () => {
    return [
        { title: 'Ping-Pong Table!' },
        { name: 'description', content: 'Lets play some Ping-Pong!' },
    ];
};

export const links: LinksFunction = () => {
    return [...gameFormStyles(), ...navStyles(), ...scoresStyles()];
};

export const loader: LoaderFunction = async () => {
    try {
        const scores = await getStoredScores();
        const scoresWithUsernames = await Promise.all(
            scores.map(async (score) => {
                let winnerUsername = 'Unknown';
                let loserUsername = 'Unknown';

                if (score.winnerId) {
                    const winner = await getUserById(score.winnerId);
                    winnerUsername = winner?.username ?? 'Unknown';
                }

                if (score.loserId) {
                    const loser = await getUserById(score.loserId);
                    loserUsername = loser?.username ?? 'Unknown';
                }

                return {
                    ...score,
                    winnerUsername,
                    loserUsername,
                };
            })
        );

        return { scoresWithUsernames };
    } catch (error) {
        return json(
            { errors: { loader: 'Failed to load scores' } },
            { status: 500 }
        );
    }
};

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

export default function Scores() {
    const { scoresWithUsernames } = useLoaderData<{
        scoresWithUsernames: ScoreTypeWithUsernames[];
    }>();

    const [searchTerm, setSearchTerm] = useState('');

    const sortedScores = [...scoresWithUsernames].sort((a, b) => {
        const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return dateB - dateA;
    });

    const filteredScores = sortedScores.filter((score) => {
        return (
            score.winnerUsername
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
            score.loserUsername.toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

    let wins = 0;
    let losses = 0;
    filteredScores.forEach((score) => {
        if (score.winner.toLowerCase() === searchTerm.toLowerCase()) {
            wins++;
        } else if (
            (score.player1.toLowerCase() === searchTerm.toLowerCase() ||
                score.player2.toLowerCase() === searchTerm.toLowerCase()) &&
            score.loser.toLowerCase() === searchTerm.toLowerCase()
        ) {
            losses++;
        }
    });

    // Calculate win-loss ratio
    const ratio = losses !== 0 ? (wins / losses).toFixed(2) : 'N/A';

    return (
        <>
            <h1>Total Games: {sortedScores.length}</h1>
            <div>
                <input
                    type="text"
                    placeholder="Search by player name"
                    className="form-input"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            {searchTerm && (
                <div>
                    <p>Wins: {wins}</p>
                    <p>Losses: {losses}</p>
                    <p>W:L Ratio: {ratio}</p>
                </div>
            )}
            <div className="score-card-container">
                {filteredScores.map((score) => (
                    <div key={score._id} className="score-card">
                        <ScoreCard initialScores={[score]} />
                    </div>
                ))}
            </div>
            <button onClick={scrollToTop} className="scroll-to-top">
                ↑ Top
            </button>
        </>
    );
}
