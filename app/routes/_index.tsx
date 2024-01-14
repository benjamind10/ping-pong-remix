import {
  type ActionFunction,
  type LinksFunction,
  LoaderFunction,
  type MetaFunction,
  redirect,
} from '@remix-run/node';

import GameForm, { links as gameFormStyles } from '~/components/GameForm';
import { links as navStyles } from '~/components/MainNavigation';
import { getStoredScores, storeScores } from '~/data/scores.server';
import { Score } from '~/types';

export const meta: MetaFunction = () => {
  return [
    { title: 'Ping-Pong Tracker!' },
    { name: 'description', content: 'Lets play some Ping-Pong!' },
  ];
};

export const links: LinksFunction = () => {
  return [...gameFormStyles(), ...navStyles()];
};

export const loader: LoaderFunction = async () => {
  return await getStoredScores();
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  // Create a Score object from form data
  const scoreData: Score = {
    gameId: Number(formData.get('gameId')),
    gameType: formData.get('gameType') as string,
    player1: formData.get('player1') as string,
    player2: formData.get('player2') as string,
    score1: Number(formData.get('score1')),
    score2: Number(formData.get('score2')),
    winner: formData.get('winner') as string,
    loser: formData.get('loser') as string,
    firstServe: formData.get('firstServe') as string,
    // id: '',
  };

  // Validation: Check if scores and gameId are valid numbers
  if (
    isNaN(scoreData.gameId) ||
    isNaN(scoreData.score1) ||
    isNaN(scoreData.score2)
  ) {
    return new Response(
      JSON.stringify({
        message: 'Invalid input - gameId and scores must be numbers.',
      }),
      {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }

  await storeScores(scoreData);

  return redirect('/scores');
};

export default function Index() {
  return (
    <main>
      <h1>Enter Data: </h1>
      <GameForm />
    </main>
  );
}
