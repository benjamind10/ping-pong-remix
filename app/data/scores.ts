import { connectToDatabase } from './mongodb'
// import fs from 'fs/promises'

export async function getStoredScores() {
    const db = await connectToDatabase()
    const scores = await db.collection('Score').find({}).toArray()
    return scores
}

// export async function getStoredScores() {
//     const rawFileContent = await fs.readFile('scores.json', {
//         encoding: 'utf-8',
//     })
//     const data = JSON.parse(rawFileContent)
//     const storedScores = data.scores ?? []
//     return storedScores
// }
// // Old
// export function storeScores(scores) {
//   return fs.writeFile('scores.json', JSON.stringify({ scores: scores || [] }));
// }

// Function to store scores in MongoDB
export async function storeScores(scoreData: Score): Promise<void> {
    const db = await connectToDatabase()
    await db.collection('Score').insertOne(scoreData)
}
