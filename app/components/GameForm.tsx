import { useEffect, useState, ChangeEvent } from 'react';
import { Form, useActionData, useNavigation } from '@remix-run/react';
import { LinksFunction } from '@remix-run/node';

import gameFormStyles from '~/components/GameForm.css';

type ActionData = {
    message?: string;
};

export const links: LinksFunction = () => [
    { rel: 'stylesheet', href: gameFormStyles },
];

export default function GameForm() {
    const navigation = useNavigation();
    const isSubmitting = navigation.state === 'submitting';
    const data = useActionData<ActionData>();

    const [gameId, setGameId] = useState<number>(0);
    const [player1, setPlayer1] = useState<string>('');
    const [player2, setPlayer2] = useState<string>('');
    const [score1, setScore1] = useState<number>(0);
    const [score2, setScore2] = useState<number>(0);
    const [winner, setWinner] = useState<string>('');
    const [loser, setLoser] = useState<string>('');

    const players: string[] = ['Goob', 'Ben', 'Ricky', 'Spare'];

    useEffect(() => {
        setGameId(Math.floor(Math.random() * 10000));
        setPlayer1(players[0]);
        setPlayer2(players[1]);
    }, []);

    useEffect(() => {
        if (player1 === player2) {
            const nextPlayer = players.find((p) => p !== player1);
            if (nextPlayer) {
                setPlayer2(nextPlayer);
            }
        }
    }, [player1, player2, players]);

    useEffect(() => {
        if (score1 !== 0 || score2 !== 0) {
            if (score1 > score2) {
                setWinner(player1);
                setLoser(player2);
            } else if (score2 > score1) {
                setWinner(player2);
                setLoser(player1);
            } else {
                setWinner('');
                setLoser('');
            }
        }
    }, [score1, score2, player1, player2]);

    const handlePlayerChange = (
        e: ChangeEvent<HTMLSelectElement>,
        playerSetter: (value: string) => void
    ) => {
        playerSetter(e.target.value);
    };

    const handleScoreChange = (
        e: ChangeEvent<HTMLInputElement>,
        scoreSetter: (value: number) => void
    ) => {
        scoreSetter(Number(e.target.value));
    };

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
                    value={gameId}
                    readOnly
                />
            </div>

            <div>
                <label htmlFor="gameType" className="label">
                    Game Type:
                </label>
                <select
                    id="gameType"
                    name="gameType"
                    required
                    className="select"
                >
                    <option value="11-point">11-point</option>
                    <option value="21-point">21-point</option>
                </select>
            </div>

            <div>
                <label htmlFor="player1" className="label">
                    Player 1:
                </label>
                <select
                    id="player1"
                    name="player1"
                    required
                    className="select"
                    value={player1}
                    onChange={(e) => handlePlayerChange(e, setPlayer1)}
                >
                    {players.map((player) => (
                        <option key={player} value={player}>
                            {player}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label htmlFor="player2" className="label">
                    Player 2:
                </label>
                <select
                    id="player2"
                    name="player2"
                    required
                    className="select"
                    value={player2}
                    onChange={(e) => handlePlayerChange(e, setPlayer2)}
                >
                    {players
                        .filter((p) => p !== player1)
                        .map((player) => (
                            <option key={player} value={player}>
                                {player}
                            </option>
                        ))}
                </select>
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
                    value={score1}
                    onChange={(e) => handleScoreChange(e, setScore1)}
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
                    value={score2}
                    onChange={(e) => handleScoreChange(e, setScore2)}
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
                    value={winner}
                    readOnly
                />
            </div>

            <div>
                <label htmlFor="loser" className="label">
                    Loser:
                </label>
                <input
                    type="text"
                    id="loser"
                    name="loser"
                    required
                    className="input"
                    value={loser}
                    readOnly
                />
            </div>

            <div>
                <label htmlFor="firstServe" className="label">
                    First Serve:
                </label>
                <select
                    id="firstServe"
                    name="firstServe"
                    required
                    className="select"
                >
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
