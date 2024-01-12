import {
  redirect,
  type ActionFunction,
  type LinksFunction,
  type MetaFunction,
} from '@remix-run/node';
import GameForm, { links as gameFormStyles } from '~/components/GameForm';
import { links as navStyles } from '~/components/MainNavigation';
import { getStoredScores, storeScores } from '~/data/scores';

export const meta: MetaFunction = () => {
  return [
    { title: 'Ping-Pong Tracker!' },
    { name: 'description', content: 'Lets play some Ping-Pong!' },
  ];
};

export const links: LinksFunction = () => {
  return [...gameFormStyles(), ...navStyles()];
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  // Create a Score object from form data
  const scoreData: Score = {
    gameId: formData.get('gameId') as string,
    gameType: formData.get('gameType') as string,
    player1: formData.get('player1') as string,
    player2: formData.get('player2') as string,
    score1: Number(formData.get('score1')),
    score2: Number(formData.get('score2')),
    winner: formData.get('winner') as string,
    loser: formData.get('loser') as string,
    firstServe: formData.get('firstServe') as string,
    id: formData.get('gameId') as string,
    dateTime: new Date().toISOString(),
  };

  // Validation: Check if scores are valid numbers
  if (isNaN(scoreData.score1) || isNaN(scoreData.score2)) {
    return new Response(
      JSON.stringify({
        message: 'Invalid scores - scores must be numbers.',
      }),
      {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }

  const existingScores: Score[] = await getStoredScores();
  const updatedScores = existingScores.concat(scoreData);
  await storeScores(updatedScores);

  return redirect('/scores');
};

export default function Index() {
  return (
    <main>
      <h1>Enter Data:</h1>
      <GameForm />
    </main>
  );
}
