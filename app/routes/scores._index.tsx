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
import { Score } from '~/types';

export const meta: MetaFunction = () => {
  return [
    { title: 'Ping-Pong Table!' },
    { name: 'description', content: 'Lets play some Ping-Pong!' },
  ];
};

export const links: LinksFunction = () => {
  return [...gameFormStyles(), ...navStyles(), ...scoresStyles()];
};

export const loader: LoaderFunction = async ({ request }) => {
  await requireUserSession(request);

  try {
    const scores = await getStoredScores();
    return { scores };
  } catch (error) {
    console.error('Error fetching scores:', error);
    // Return an empty array or a specific error message instead of throwing an error
    return {
      scores: [],
      error: 'Failed to load scores. Please try again later.',
    };
  }
};

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

export default function Scores() {
  const { scores } = useLoaderData<{
    scores: Score[];
  }>();

  const [searchTerm, setSearchTerm] = useState('');

  const sortedScores = [...scores].sort((a, b) => {
    const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
    const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
    return dateB - dateA;
  });

  const filteredScores = sortedScores.filter((score) => {
    const player1Match = score.player1
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());
    const player2Match = score.player2
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());
    return player1Match || player2Match;
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
          <div key={score.gameId} className="score-card">
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
