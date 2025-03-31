import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Jiahua Duojie - Data Scientist',
  description: 'Portfolio of Jiahua Duojie, a data scientist specializing in machine learning and data analysis.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-100 text-gray-900 min-h-screen`}>
        {children}
      </body>
    </html>
  );
}