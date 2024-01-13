import { json, ActionFunction } from '@remix-run/node';
import { deleteScore } from '~/data/scores.server';

export const action: ActionFunction = async ({ request, params }) => {
    if (request.method !== 'DELETE') {
        return json('Method Not Allowed', { status: 405 });
    }

    // Extract gameId from the dynamic segment
    const gameId = params.gameId;

    if (!gameId) {
        return json('Game ID is required', { status: 400 });
    }

    try {
        await deleteScore(gameId);
        return json('Score deleted successfully', { status: 200 });
    } catch (error) {
        console.error('Error deleting score:', error);
        return json('Error deleting score', { status: 500 });
    }
};
