// import { LinksFunction, LoaderFunction, json } from '@remix-run/node';
// import { useLoaderData } from '@remix-run/react';
//
// import { links as gameFormStyles } from '~/components/GameForm';
// import { links as navStyles } from '~/components/MainNavigation';
// import { links as scoresStyles } from '~/components/Cards';
// import { getStoredScores } from '~/data/scores';
//
// export const links: LinksFunction = () => {
//     return [...gameFormStyles(), ...navStyles(), ...scoresStyles()];
// };
//
// export const loader: LoaderFunction = async ({ params }) => {
//     const scores: Score[] = await getStoredScores();
//     const gameID = params.gameID;
//     const score = scores.find((score) => score.gameId === gameID);
//
//     if (!score) {
//         throw json('Score not found', { status: 404 });
//     }
//
//     return score;
// };
//
// export default function EditScoreCard() {
//     const score = useLoaderData<Score>();
//     return (
//         <div>
//             <h1>Edit Score Card - Game ID: {score.gameId}</h1>
//             <p>{score.winner}</p>
//         </div>
//     );
// }
