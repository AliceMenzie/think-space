import Link from 'next/link';
import './global.css';

export const metadata = {
  title: 'Hangman Game',
  description: 'Hangman Classic Game',
};

const routes = [
  {
    label: 'hangman',
    path: '/',
  },
  {
    label: 'tic-tac-toe',
    path: '/tic-tac-toe',
  },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header className="flex p-4 border">
          <nav>
            {routes.map((route) => (
              <Link className="p-4" href={route.path}>
                {route.label}
              </Link>
            ))}
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
