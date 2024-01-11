import type { MetaFunction } from '@remix-run/node';
import PingPongGameForm from '~/components/GameForm';

export const meta: MetaFunction = () => {
  return [
    { title: 'Ping-Pong Tracker' },
    { name: 'description', content: 'Lets play some Ping-Pong!' },
  ];
};

export default function Index() {
  return (
    <main>
      <h1>Main Page</h1>
      <PingPongGameForm />
    </main>
  );
}
