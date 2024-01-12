import { LinksFunction } from '@remix-run/node';
import styles from './ScoreCard.css';
import { Link } from '@remix-run/react';

type ScoreCardProps = {
  scores: Score[];
};

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: styles }];
};

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function ScoreCard({ scores }: ScoreCardProps) {
  return (
    <div id="score-card-container">
      {scores.map((score, index) => (
        <div key={score.gameId} className="score-card">
          <article>
            <header>
              <h2>
                Game {index + 1}: {score.gameType}
              </h2>
              <p>Game ID: {score.gameId}</p>
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
              First Serve:{' '}
              {score.firstServe === 'player1' ? score.player1 : score.player2}
            </p>
            <p>Date: {score.dateTime}</p>
          </article>
        </div>
      ))}
    </div>
  );
}

export default ScoreCard;
