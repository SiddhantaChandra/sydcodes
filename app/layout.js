import { Inter, Oswald } from "next/font/google";
import "./globals.css";
import SmoothScroll from "./components/SmoothScroll";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://www.siddhantachandra.com"),
  title: "Siddhanta Chandra - Full-stack Developer",
  description:
    "Portfolio of Siddhanta Chandra, a full-stack developer crafting robust backends, creative designs and intuitive user interfaces.",
  icons: {
    icon: [
      { url: "/favicons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicons/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/favicons/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/favicons/icon-512x512.png", sizes: "512x512", type: "image/png" },
      { url: "/favicons/fav_16x16.ico", sizes: "16x16" },
      { url: "/favicons/fav_32x32.ico", sizes: "32x32" },
      { url: "/favicons/fav_48x48.ico", sizes: "48x48" },
    ],
    shortcut: [
      { url: "/favicons/fav_16x16.ico", sizes: "16x16" },
      { url: "/favicons/fav_32x32.ico", sizes: "32x32" },
      { url: "/favicons/fav_48x48.ico", sizes: "48x48" },
    ],
    apple: [
      {
        url: "/favicons/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
  openGraph: {
    title: "Siddhanta Chandra - Full-stack Developer",
    description:
      "Portfolio of Siddhanta Chandra, a full-stack developer crafting robust backends, creative designs and intuitive user interfaces.",
    url: "/",
    siteName: "Siddhanta Chandra - Full-stack Developer",
    images: [
      {
        url: "/og/og-image-home.jpg",
        width: 1200,
        height: 630,
        alt: "Siddhanta Chandra - Full-stack Developer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Siddhanta Chandra - Full-stack Developer",
    description:
      "Portfolio of Siddhanta Chandra, a full-stack developer crafting robust backends, creative designs and intuitive user interfaces.",
    images: ["/og/og-image-home.jpg"],
  },
  manifest: "/manifest.json",
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  themeColor: "#000000",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${oswald.variable} antialiased`}>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
