import { Inter, Space_Grotesk, Space_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const spaceMono = Space_Mono({
  subsets: ['latin'],
  variable: '--font-space-mono',
  weight: ['400', '700'],
  display: 'swap',
});

export const metadata = {
  title: 'Siddhanta Chandra - Full Stack Developer',
  description: 'Modern portfolio showcasing innovative web development projects and technical expertise.',
  keywords: ['Full Stack Developer', 'Web Development', 'React', 'Next.js', 'Portfolio'],
  authors: [{ name: 'Siddhanta Chandra' }],
  creator: 'Siddhanta Chandra',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://siddhantachandra.dev',
    title: 'Siddhanta Chandra - Full Stack Developer',
    description: 'Modern portfolio showcasing innovative web development projects and technical expertise.',
    siteName: 'Siddhanta Chandra Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Siddhanta Chandra - Full Stack Developer',
    description: 'Modern portfolio showcasing innovative web development projects and technical expertise.',
    creator: '@siddhantachandra',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body 
        className={`${inter.variable} ${spaceGrotesk.variable} ${spaceMono.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
