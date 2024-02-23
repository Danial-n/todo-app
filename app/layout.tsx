import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Menu from './components/Menu';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ToDoList App',
  description: 'todo list',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={`bg-thebackground ${inter.className}`}>
        <div className='max-h-screen'>{children}</div>
      </body>
    </html>
  );
}
