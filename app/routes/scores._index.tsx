import {
  type LinksFunction,
  type LoaderFunction,
  type MetaFunction,
} from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { useState } from 'react';

import { links as gameFormStyles } from '~/components/GameForm/GameForm';
import { links as navStyles } from '~/components/MainNavigation/MainNavigation';
import { links as scoresStyles } from '~/components/ScoreCard/ScoreCard';
import ScoreCard from '~/components/ScoreCard/ScoreCard';
import { requireUserSession } from '~/data/auth.server';
import { getStoredScores } from '~/data/scores.server';
import { getUserById } from '~/data/users.server';
import { ScoreType, ScoreTypeWithUsernames } from '~/types';

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
    throw new Error('Failed to load scores');
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
      score.winnerUsername.toLowerCase().includes(searchTerm.toLowerCase()) ||
      score.loserUsername.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <>
      <h1>Total Games: {filteredScores.length}</h1>
      <div className="form">
        <input
          type="text"
          placeholder="Search by player name"
          className="form-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
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
