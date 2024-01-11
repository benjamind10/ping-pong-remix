import fs from 'fs/promises'

export async function getStoredNotes() {
    const rawFileContent = await fs.readFile('scores.json', {
        encoding: 'utf-8',
    })
    const data = JSON.parse(rawFileContent)
    const storedScores = data.scores ?? []
    return storedScores
}

export function storeNotes(notes) {
    return fs.writeFile('notes.json', JSON.stringify({ scores: scores || [] }))
}
