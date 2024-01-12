import {
  json,
  type LinksFunction,
  type LoaderFunction,
  type MetaFunction,
} from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { links as gameFormStyles } from '~/components/GameForm';
import { links as navStyles } from '~/components/MainNavigation';
import { links as scoresStyles } from '~/components/ScoreCard';
import ScoreCard from '~/components/ScoreCard';
import { getStoredScores } from '~/data/scores';

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
    return scores || [];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export default function Scores() {
  const scores = useLoaderData<Score[]>();

  return (
    <div className="score-card-container">
      {scores.map((score, index) => (
        <div key={score.id} className="score-card">
          <ScoreCard scores={[score]} /> 
        </div>
      ))}
    </div>
  );
}
