import {
  type LinksFunction,
  type LoaderFunction,
  type MetaFunction,
} from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

import { links as gameFormStyles } from '~/components/GameForm';
import { links as navStyles } from '~/components/MainNavigation';
import { links as scoresStyles } from '~/components/ScoreCard';
import ScoreCard from '~/components/ScoreCard';
import { getUserFromSession } from '~/data/auth.server';
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
  try {
    const scores = await getStoredScores();
    const userId = await getUserFromSession(request);
    console.log(userId);

    return {
      scores: scores || [],
      userId: userId || null,
    };
  } catch (error) {
    console.error(error);
    return { scores: [], userId: null };
  }
};

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

export default function Scores() {
  const { scores } = useLoaderData<{
    scores: Score[];
  }>();

  return (
    <>
      <h1>Total Games: {scores.length}</h1>
      <div className="score-card-container">
        {scores.map((score) => (
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
