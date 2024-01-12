import type { LinksFunction, MetaFunction } from '@remix-run/node';
import { links as gameFormStyles } from '~/components/GameForm';
import { links as navStyles } from '~/components/MainNavigation';

export const meta: MetaFunction = () => {
  return [
    { title: 'Ping-Pong Analytics!' },
    { name: 'description', content: 'Lets play some Ping-Pong!' },
  ];
};

export const links: LinksFunction = () => {
  return [...gameFormStyles(), ...navStyles()];
};

export default function Analytics() {
  return (
    <main>
      <h1>Analytics Page</h1>
    </main>
  );
}
