import { connectToDatabase } from './mongodb'
import { ObjectId } from 'mongodb'
import { Score } from '~/types'
// import fs from 'fs/promises'

export async function getStoredScores() {
    const db = await connectToDatabase()
    const scores = await db.collection('Score').find({}).toArray()
    return scores
}

export async function deleteScore(gameId: string) {
    try {
        const db = await connectToDatabase()
        const objectId = new ObjectId(gameId)
        await db.collection('Score').deleteOne({ _id: objectId })
    } catch (error) {
        console.error('Error deleting score:', error)
        // Handle the error appropriately
    }
}

export async function storeScores(scoreData: Score): Promise<void> {
    const db = await connectToDatabase()
    await db.collection('Score').insertOne(scoreData)
}
