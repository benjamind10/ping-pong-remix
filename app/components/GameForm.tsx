import { LinksFunction } from '@remix-run/node';
import { Form, useActionData, useNavigation } from '@remix-run/react';

import gameStyles from '~/components/GameForm.css';

type ActionData = {
  message?: string;
};

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: gameStyles },
];

export default function PingPongGameForm() {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  const data = useActionData<ActionData>();

  return (
    <Form method="post" id="pingpong-form" className="formContainer">
      {data?.message && <p>{data.message}</p>}

      <div>
        <label htmlFor="gameId" className="label">
          Game ID:
        </label>
        <input
          type="number"
          id="gameId"
          name="gameId"
          required
          className="input"
        />
      </div>

      <div>
        <label htmlFor="gameType" className="label">
          Game Type:
        </label>
        <select id="gameType" name="gameType" required className="select">
          <option value="11-point">11-point</option>
          <option value="21-point">21-point</option>
        </select>
      </div>

      <div>
        <label htmlFor="player1" className="label">
          Player 1:
        </label>
        <input
          type="text"
          id="player1"
          name="player1"
          required
          className="input"
        />
      </div>

      <div>
        <label htmlFor="player2" className="label">
          Player 2:
        </label>
        <input
          type="text"
          id="player2"
          name="player2"
          required
          className="input"
        />
      </div>

      <div>
        <label htmlFor="score1" className="label">
          Player 1 Score:
        </label>
        <input
          type="number"
          id="score1"
          name="score1"
          required
          className="input"
        />
      </div>

      <div>
        <label htmlFor="score2" className="label">
          Player 2 Score:
        </label>
        <input
          type="number"
          id="score2"
          name="score2"
          required
          className="input"
        />
      </div>

      <div>
        <label htmlFor="winner" className="label">
          Winner:
        </label>
        <input
          type="text"
          id="winner"
          name="winner"
          required
          className="input"
        />
      </div>

      <div>
        <label htmlFor="loser" className="label">
          Loser:
        </label>
        <input type="text" id="loser" name="loser" required className="input" />
      </div>

      <div>
        <label htmlFor="firstServe" className="label">
          First Serve:
        </label>
        <select id="firstServe" name="firstServe" required className="select">
          <option value="Player1">Player1</option>
          <option value="Player2">Player2</option>
        </select>
      </div>

      <button type="submit" className="button" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit Game'}
      </button>
    </Form>
  );
}
``;
