import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';

export const metadata: Metadata = {
  title: 'Channel Manager Lite',
  description: 'Agenda unique, finances et messagerie pour locations courte durée.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <header className="topbar">
          <nav>
            <Link href="/">Tableau de bord</Link>
            <Link href="/calendar">Calendrier</Link>
            <Link href="/finance">Finances</Link>
            <Link href="/inbox">Messagerie</Link>
          </nav>
        </header>
        <main className="container">{children}</main>
        <footer className="foot">© {new Date().getFullYear()} Channel Manager Lite</footer>
      </body>
    </html>
  );
}
