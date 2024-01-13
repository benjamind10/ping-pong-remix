import { LinksFunction } from '@remix-run/node'
import styles from './ScoreCard.css'
import { Link } from '@remix-run/react'

type ScoreCardProps = {
    scores: Score[]
}

export const links: LinksFunction = () => {
    return [{ rel: 'stylesheet', href: styles }]
}
function ScoreCard({ scores }: ScoreCardProps) {
    return (
        <div id="score-card-container">
            {scores.map((score) => (
                <article key={score.gameId} className="score-card">
                    <header>
                        <Link to={`/scores/${score.gameId}`}>
                            <h2>Game ID: {score.gameId}</h2>
                        </Link>
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
                        {score.firstServe === 'Player1'
                            ? score.player1
                            : score.player2}
                    </p>
                    <p>Date: {score.dateTime}</p>
                </article>
            ))}
        </div>
    )
}

export default ScoreCard
