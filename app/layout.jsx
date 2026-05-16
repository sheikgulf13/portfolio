import "./globals.css";
import { Instrument_Serif, Inter, JetBrains_Mono } from "next/font/google";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-inter",
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata = {
  title: "Sheik — Fullstack Developer, Chennai",
  description:
    "Fullstack developer building React, Node.js, MERN, React Native, and n8n automation systems for startups worldwide. Based in Chennai, IN.",
  icons: {
    icon:
      "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><circle cx='16' cy='16' r='16' fill='%230A0A0A'/><text x='50%' y='50%' dominant-baseline='central' text-anchor='middle' font-family='Georgia,serif' font-size='18' fill='%23C8A04A'>S</text></svg>",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{var t=localStorage.getItem('theme');if(t==='light'){document.documentElement.setAttribute('data-theme','light');}}catch(e){}})();",
          }}
        />
      </head>
      <body className={`${instrumentSerif.variable} ${inter.variable} ${jetBrainsMono.variable}`}>{children}</body>
    </html>
  );
}