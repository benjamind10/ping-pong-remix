const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const scores = [
    {
        gameId: 8891,
        gameType: '11-point',
        player1: 'Ricky',
        player2: 'Ben',
        score1: 9,
        score2: 11,
        winner: 'Ben',
        loser: 'Ricky',
        firstServe: 'Player1',
        dateTime: '2024-01-12T14:02:13.726Z',
    },
    {
        gameId: 4102,
        gameType: '11-point',
        player1: 'Goob',
        player2: 'Ben',
        score1: 12,
        score2: 10,
        winner: 'Goob',
        loser: 'Ben',
        firstServe: 'Player2',
        dateTime: '2024-01-12T14:21:30.400Z',
    },
    {
        gameId: 3031,
        gameType: '11-point',
        player1: 'Ricky',
        player2: 'Ben',
        score1: 8,
        score2: 11,
        winner: 'Ben',
        loser: 'Ricky',
        firstServe: 'Player1',
        dateTime: '2024-01-12T16:38:12.634Z',
    },
    {
        gameId: 4482,
        gameType: '11-point',
        player1: 'Goob',
        player2: 'Ben',
        score1: 11,
        score2: 4,
        winner: 'Goob',
        loser: 'Ben',
        firstServe: 'Player1',
        dateTime: '2024-01-12T16:40:01.463Z',
    },
    {
        gameId: 5873,
        gameType: '11-point',
        player1: 'Ricky',
        player2: 'Ben',
        score1: 9,
        score2: 11,
        winner: 'Ben',
        loser: 'Ricky',
        firstServe: 'Player1',
        dateTime: '2024-01-12T16:40:27.330Z',
    },
    {
        gameId: 6395,
        gameType: '11-point',
        player1: 'Ricky',
        player2: 'Ben',
        score1: 7,
        score2: 11,
        winner: 'Ben',
        loser: 'Ricky',
        firstServe: 'Player1',
        dateTime: '2024-01-12T16:48:44.976307Z',
    },
    {
        gameId: 4326,
        gameType: '11-point',
        player1: 'Goob',
        player2: 'Ben',
        score1: 14,
        score2: 12,
        winner: 'Goob',
        loser: 'Ben',
        firstServe: 'Player1',
        dateTime: '2024-01-12T16:48:44.976325Z',
    },
    {
        gameId: 3062,
        gameType: '11-point',
        player1: 'Goob',
        player2: 'Ben',
        score1: 12,
        score2: 10,
        winner: 'Goob',
        loser: 'Ben',
        firstServe: 'Player2',
        dateTime: '2024-01-12T16:48:44.976342Z',
    },
    {
        gameId: 3871,
        gameType: '11-point',
        player1: 'Goob',
        player2: 'Ricky',
        score1: 10,
        score2: 12,
        winner: 'Ricky',
        loser: 'Goob',
        firstServe: 'Player2',
        dateTime: '2024-01-12T16:48:44.976348Z',
    },
    {
        gameId: 2662,
        gameType: '11-point',
        player1: 'Goob',
        player2: 'Ricky',
        score1: 11,
        score2: 8,
        winner: 'Goob',
        loser: 'Ricky',
        firstServe: 'Player1',
        dateTime: '2024-01-12T16:48:44.976353Z',
    },
    {
        gameId: 2900,
        gameType: '11-point',
        player1: 'Goob',
        player2: 'Ben',
        score1: 11,
        score2: 5,
        winner: 'Goob',
        loser: 'Ben',
        firstServe: 'Player1',
        dateTime: '2024-01-12T16:48:44.976358Z',
    },
    {
        gameId: 3742,
        gameType: '11-point',
        player1: 'Ricky',
        player2: 'Ben',
        score1: 8,
        score2: 11,
        winner: 'Ben',
        loser: 'Ricky',
        firstServe: 'Player2',
        dateTime: '2024-01-12T16:48:44.976363Z',
    },
    {
        gameId: 7028,
        gameType: '11-point',
        player1: 'Goob',
        player2: 'Ben',
        score1: 11,
        score2: 7,
        winner: 'Goob',
        loser: 'Ben',
        firstServe: 'Player1',
        dateTime: '2024-01-12T16:48:44.976368Z',
    },
    {
        gameId: 4678,
        gameType: '11-point',
        player1: 'Goob',
        player2: 'Ben',
        score1: 11,
        score2: 4,
        winner: 'Goob',
        loser: 'Ben',
        firstServe: 'Player1',
        dateTime: '2024-01-12T16:48:44.976373Z',
    },
    {
        gameId: 1001,
        gameType: '11-point',
        player1: 'Goob',
        player2: 'Ben',
        score1: 11,
        score2: 8,
        winner: 'Goob',
        loser: 'Ben',
        firstServe: 'Player1',
        dateTime: '2024-01-12T16:48:44.976466Z',
    },
    {
        gameId: 3677,
        gameType: '11-point',
        player1: 'Goob',
        player2: 'Ben',
        score1: 11,
        score2: 7,
        winner: 'Goob',
        loser: 'Ben',
        firstServe: 'Player1',
        dateTime: '2024-01-12T16:48:44.976471Z',
    },
    {
        gameId: 4143,
        gameType: '21-point',
        player1: 'Goob',
        player2: 'Ricky',
        score1: 21,
        score2: 15,
        winner: 'Goob',
        loser: 'Ricky',
        firstServe: 'Player1',
        dateTime: '2024-01-12T18:03:38.504Z',
    },
    {
        gameId: 139,
        gameType: '11-point',
        player1: 'Ricky',
        player2: 'Spare',
        score1: 21,
        score2: 6,
        winner: 'Ricky',
        loser: 'Spare',
        firstServe: 'Player1',
        dateTime: '2024-01-12T18:20:51.922Z',
    },
    {
        gameId: 9422,
        gameType: '11-point',
        player1: 'Ricky',
        player2: 'Goob',
        score1: 15,
        score2: 21,
        winner: 'Goob',
        loser: 'Ricky',
        firstServe: 'Player1',
        dateTime: '2024-01-12T18:26:19.136Z',
    },
    {
        gameId: 5680,
        gameType: '11-point',
        player1: 'Goob',
        player2: 'Spare',
        score1: 11,
        score2: 3,
        winner: 'Goob',
        loser: 'Spare',
        firstServe: 'Player2',
        dateTime: '2024-01-12T18:26:42.080Z',
    },
];

async function main() {
    for (const score of scores) {
        await prisma.score.create({
            data: {
                gameId: score.gameId,
                gameType: score.gameType,
                player1: score.player1,
                player2: score.player2,
                score1: score.score1,
                score2: score.score2,
                winner: score.winner,
                loser: score.loser,
                firstServe: score.firstServe,
            },
        });
    }
}

main()
    .catch((e) => {
        console.error(e);
        // eslint-disable-next-line no-undef
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
