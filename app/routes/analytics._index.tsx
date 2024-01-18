import {
  json,
  type LinksFunction,
  type LoaderFunction,
  type MetaFunction,
} from '@remix-run/node';

import { useLoaderData } from '@remix-run/react';
import { links as gameFormStyles } from '~/components/GameForm/GameForm';
import { links as navStyles } from '~/components/MainNavigation/MainNavigation';
// import LineChart from '~/components/Charts/LineChart';
import BarChart from '~/components/Charts/BarChart';
import { links as chartStyles } from '~/components/Charts/BarChart';

import { getStoredScores } from '~/data/scores.server';
import { Score } from '~/types';
import { CSSProperties } from 'react';

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
    const scores = await getStoredScores();
    return scores || [];
  } catch (error) {
    console.error(error);
    return [];
  }
};

const chartOptions = {
  responsive: true, // Add this line
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

function countWins(scores: Score[]): Record<string, number> {
  const winCounts: Record<string, number> = {};

  scores.forEach((score) => {
    // Increment win count for the winner
    winCounts[score.winner] = (winCounts[score.winner] || 0) + 1;
  });

  return winCounts;
}

function transformScoresToChartData(scores: Score[]) {
  const winCounts = countWins(scores);

  // Get unique player names and their respective win counts
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
        borderWidth: 1,
      },
    ],
  };

  return chartData;
}

export default function Analytics() {
  const scores = useLoaderData<Score[]>();

  // Transform the scores data to the chart data format
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
