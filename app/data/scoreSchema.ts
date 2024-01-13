import mongoose from 'mongoose'

// Define the schema
const scoreSchema = new mongoose.Schema({
    gameId: { type: Number, required: true },
    gameType: { type: String, required: true },
    player1: { type: String, required: true },
    player2: { type: String, required: true },
    score1: { type: Number, required: true },
    score2: { type: Number, required: true },
    winner: { type: String, required: true },
    loser: { type: String, required: true },
    firstServe: { type: String, required: true },
    dateTime: { type: Date, required: true },
})

// Create the model
const Score = mongoose.model('Score', scoreSchema)

export default Score
