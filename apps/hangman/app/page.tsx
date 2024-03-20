import { promises as fs } from 'fs';
import Game from './components/game';
import HangmanContextProvider from './context/hangman-context';
import { Data } from './types';

export default async function Page() {
  const file = await fs.readFile(process.cwd() + '/app/data.json', 'utf8');
  const data: Data  = JSON.parse(file);

  return (
    <HangmanContextProvider data={data}>
      <Game data={data} />
    </HangmanContextProvider>
  );
}
