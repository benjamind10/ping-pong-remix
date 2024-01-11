import type { LinksFunction, MetaFunction } from '@remix-run/node';
import GameForm, { links as gameFormStyles } from '~/components/GameForm';
import { links as navStyles } from '~/components/MainNavigation';

export const meta: MetaFunction = () => {
  return [
    { title: 'Ping-Pong Tracker' },
    { name: 'description', content: 'Lets play some Ping-Pong!' },
  ];
};

export const links: LinksFunction = () => {
  return [...gameFormStyles(), ...navStyles()];
};

export default function Index() {
  return (
    <main>
      <h1>Enter Data:</h1>
      <GameForm />
    </main>
  );
}
