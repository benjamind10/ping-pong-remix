import fs from 'fs/promises';

export async function getStoredScores() {
  const rawFileContent = await fs.readFile('scores.json', {
    encoding: 'utf-8',
  });
  const data = JSON.parse(rawFileContent);
  const storedScores = data.scores ?? [];
  return storedScores;
}

export function storeScores(scores) {
  return fs.writeFile('scores.json', JSON.stringify({ scores: scores || [] }));
}
