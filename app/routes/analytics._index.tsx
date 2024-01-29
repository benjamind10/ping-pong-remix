import {
    json,
    type LinksFunction,
    type LoaderFunction,
    type MetaFunction,
} from '@remix-run/node';

import { useLoaderData } from '@remix-run/react';
import { links as gameFormStyles } from '~/components/GameForm/GameForm';
import { links as navStyles } from '~/components/MainNavigation/MainNavigation';
import BarChart from '~/components/Charts/BarChart';
import { links as chartStyles } from '~/components/Charts/BarChart';

import { getStoredScores } from '~/data/scores.server';
import { ScoreTypeWithUsernames } from '~/types';
import { getUserById } from '~/data/users.server';

export const meta: MetaFunction = () => {
    return [
        { title: 'Ping-Pong Analytics!' },
        { name: 'description', content: 'Lets play some Ping-Pong!' },
    ];
};

export const links: LinksFunction = () => {
    return [...gameFormStyles(), ...navStyles(), ...chartStyles()];
};

export const loader: LoaderFunction = async () => {
    try {
        let scores = await getStoredScores();
        scores = await Promise.all(
            scores.map(async (score) => {
                if (score.winnerId) {
                    const winnerUser = await getUserById(score.winnerId);
                    return {
                        ...score,
                        winnerUsername: winnerUser?.username ?? 'Unknown',
                    };
                } else {
                    return { ...score, winnerUsername: 'Unknown' };
                }
            })
        );
        return json(scores);
    } catch (error) {
        console.error(error);
        return json([]);
    }
};

const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
        y: {
            beginAtZero: true,
        },
    },
};

function countWins(scores: ScoreTypeWithUsernames[]): Record<string, number> {
    const winCounts: Record<string, number> = {};

    scores.forEach((score) => {
        winCounts[score.winnerUsername] =
            (winCounts[score.winnerUsername] || 0) + 1;
    });

    return winCounts;
}

function transformScoresToChartData(scores: ScoreTypeWithUsernames[]) {
    const winCounts = countWins(scores);

    const players = Object.keys(winCounts);
    const wins = players.map((player) => winCounts[player]);

    const chartData = {
        labels: players,
        datasets: [
            {
                label: 'Number of Wins',
                data: wins,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 2,
            },
        ],
    };

    return chartData;
}

export default function Analytics() {
    const scores = useLoaderData<ScoreTypeWithUsernames[]>();

    const chartData = transformScoresToChartData(scores);

    return (
        <main>
            <h1>Analytics Page</h1>
            <div className="chart-container">
                <BarChart data={chartData} options={chartOptions} />
            </div>
        </main>
    );
}
