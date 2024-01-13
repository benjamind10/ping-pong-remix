import { ObjectId } from 'mongodb'

export type Score = {
    _id: ObjectId | string
    gameId: number
    gameType: string
    player1: string
    player2: string
    score1: number
    score2: number
    winner: string
    loser: string
    firstServe: string
    dateTime: string
}
