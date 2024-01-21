import {
  type ActionFunction,
  type LinksFunction,
  LoaderFunction,
  type MetaFunction,
  redirect,
} from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

import GameForm, {
  links as gameFormStyles,
} from '~/components/GameForm/GameForm';
import { links as navStyles } from '~/components/MainNavigation/MainNavigation';
import { requireUserSession } from '~/data/auth.server';
import { getStoredScores, storeScores } from '~/data/scores.server';
import { getAllUsers } from '~/data/users.server';
// import { Score } from '~/types';

type UserType = {
  id: string;
  username: string;
};

type LoaderData = {
  users: UserType[];
  // Include other fields if your loader returns more data
};

export const meta: MetaFunction = () => {
  return [
    { title: 'Ping-Pong Tracker!' },
    { name: 'description', content: 'Lets play some Ping-Pong!' },
  ];
};

export const links: LinksFunction = () => {
  return [...gameFormStyles(), ...navStyles()];
};

export const loader: LoaderFunction = async ({ request }) => {
  await requireUserSession(request);
  const scores = await getStoredScores();
  const users = await getAllUsers();

  // Assuming the last score contains the latest winner and loser
  let winner = '';
  let loser = '';

  if (scores.length > 0) {
    const lastScore = scores[scores.length - 1];
    winner = lastScore.winner; // username of the winner
    loser = lastScore.loser; // username of the loser
  }

  return { scores, users, winner, loser }; // Return winner and loser usernames
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  // Create a Score object from form data
  const scoreData = {
    gameId: Number(formData.get('gameId')),
    gameType: formData.get('gameType') as string,
    player1Id: formData.get('player1Id') as string, // Assuming the form now submits player IDs
    player2Id: formData.get('player2Id') as string, // Assuming the form now submits player IDs
    score1: Number(formData.get('score1')),
    score2: Number(formData.get('score2')),
    winnerId: formData.get('winnerId') as string, // Assuming the form now submits winner ID
    loserId: formData.get('loserId') as string, // Assuming the form now submits loser ID
    firstServe: formData.get('firstServe') as string,
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
  const { users } = useLoaderData<LoaderData>();

  return (
    <main>
      <h1>Enter Data: </h1>
      <GameForm users={users} />
    </main>
  );
}
