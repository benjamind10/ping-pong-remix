import { LinksFunction } from '@remix-run/node';
import { Link } from '@remix-run/react';
import type { Score } from '~/types';
import { useState } from 'react';

import styles from './ScoreCard.css';
import axios from 'axios';

type ScoreCardProps = {
  initialScores: Score[];
};

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: styles }];
};
function ScoreCard({ initialScores }: ScoreCardProps) {
  const [scores, setScores] = useState(initialScores);

  const handleDelete = async (gameId: undefined | string) => {
    try {
      const response = await axios.delete(`/api/delete/${gameId}`);
      if (response.status === 200) {
        const updatedScores = scores.filter((score) => score.id !== gameId);
        setScores(updatedScores);
      } else {
        console.error('Failed to delete score');
      }
    } catch (error) {
      console.error('Failed to delete score', error);
    }
  };

  return (
    <div id="score-card-container">
      {scores.map((score) => (
        <article key={score.gameId} className="score-card">
          <header>
            <Link to={`/scores/${score.gameId}`}>
              <h2>Game ID: {score.gameId}</h2>
            </Link>
            <h3>Game Type: {score.gameType}</h3>
          </header>
          <p>
            {score.player1} vs {score.player2}
          </p>
          <p>
            Score: {score.score1} - {score.score2}
          </p>
          <p>Winner: {score.winner}</p>
          <p>Loser: {score.loser}</p>
          <p>
            First Serve:
            {score.firstServe === 'Player1' ? score.player1 : score.player2}
          </p>
          <p>Date: {score.createdAt}</p>
          <button
            onClick={() => handleDelete(score.id)}
            className="delete-button"
          >
            Delete
          </button>
        </article>
      ))}
    </div>
  );
}

export default ScoreCard;
