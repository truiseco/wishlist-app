import { Outfit } from 'next/font/google';
import { Providers } from './providers';
import './globals.css';

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
});

export const metadata = {
  title: 'Wishlist App',
  description: 'Secret Santa Wishlist Application',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={outfit.className}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}