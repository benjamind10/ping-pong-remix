import {
    type LinksFunction,
    type LoaderFunction,
    type MetaFunction,
} from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { links as gameFormStyles } from '~/components/GameForm'
import { links as navStyles } from '~/components/MainNavigation'
import { links as scoresStyles } from '~/components/ScoreCard'
import ScoreCard from '~/components/ScoreCard'
import { getStoredScores } from '~/data/scores'
import { Score } from '~/types'

export const meta: MetaFunction = () => {
    return [
        { title: 'Ping-Pong Table!' },
        { name: 'description', content: 'Lets play some Ping-Pong!' },
    ]
}

export const links: LinksFunction = () => {
    return [...gameFormStyles(), ...navStyles(), ...scoresStyles()]
}

export const loader: LoaderFunction = async () => {
    try {
        const scores = await getStoredScores()
        return scores || []
    } catch (error) {
        console.error(error)
        return []
    }
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
}

export default function Scores() {
    const scores = useLoaderData<Score[]>()
    console.log(scores)

    return (
        <>
            <h1>Total Games: {scores.length}</h1>
            <div className="score-card-container">
                {scores.map((score) => (
                    <div key={score.gameId} className="score-card">
                        <ScoreCard initialScores={[score]} />
                    </div>
                ))}
            </div>
            <button onClick={scrollToTop} className="scroll-to-top">
                ↑ Top
            </button>
        </>
    )
}
