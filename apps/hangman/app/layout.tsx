import './global.css';

export const metadata = {
  title: 'Hangman Game',
  description: 'Hangman Classic Game',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
