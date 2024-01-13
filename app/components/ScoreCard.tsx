import { LinksFunction } from '@remix-run/node'
import styles from './ScoreCard.css'
import { Link } from '@remix-run/react'
import type { Score } from '~/types'
import { ObjectId } from 'mongodb'
import { useState } from 'react'

type ScoreCardProps = {
    initialScores: Score[]
}

export const links: LinksFunction = () => {
    return [{ rel: 'stylesheet', href: styles }]
}
function ScoreCard({ initialScores }: ScoreCardProps) {
    const [scores, setScores] = useState(initialScores)
    const handleDelete = async (gameId: ObjectId | string) => {
        const response = await fetch(`/api/delete/${gameId}`, {
            method: 'DELETE',
        })
        if (response.ok) {
            const updatedScores = scores.filter((score) => score._id !== gameId)
            setScores(updatedScores)
        } else {
            // Handle error
            console.error('Failed to delete score')
        }
    }

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
                    <button
                        onClick={() => handleDelete(score._id)}
                        className="delete-button"
                    >
                        Delete
                    </button>
                </article>
            ))}
        </div>
    )
}

export default ScoreCard
