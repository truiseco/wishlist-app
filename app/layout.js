// app/layout.js
import { Providers } from './providers';
import './globals.css';

export const metadata = {
  title: 'Wishlist App',
  description: 'Secret Santa Wishlist Application',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}