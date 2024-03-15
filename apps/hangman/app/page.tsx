import { promises as fs } from 'fs';
import Game from './components/game';

export default async function Page() {
  const file = await fs.readFile(process.cwd() + '/app/data.json', 'utf8');
  const data = JSON.parse(file);

  return <Game data={data} />;
}
