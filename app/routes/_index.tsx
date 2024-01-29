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
import { ScoreData } from '~/types';
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
    winner = lastScore.winner || '';
    loser = lastScore.loser || '';
  }

  return { scores, users, winner, loser }; // Return winner and loser usernames
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  // Extract values from formData
  const player1Id = formData.get('player1Id') as string;
  const player2Id = formData.get('player2Id') as string;
  const score1 = Number(formData.get('score1'));
  const score2 = Number(formData.get('score2'));

  // Determine winner and loser based on scores
  const winnerId = score1 > score2 ? player1Id : player2Id;
  const loserId = score1 > score2 ? player2Id : player1Id;

  const scoreData: ScoreData = {
    // gameId: Number(formData.get('gameId')),
    gameType: formData.get('gameType') as string,
    player1Id: player1Id,
    player2Id: player2Id,
    score1: score1,
    score2: score2,
    winnerId: winnerId, // Assign winnerId
    loserId: loserId, // Assign loserId
    firstServe: formData.get('firstServe') as string,
  };

  if (isNaN(scoreData.score1) || isNaN(scoreData.score2)) {
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
