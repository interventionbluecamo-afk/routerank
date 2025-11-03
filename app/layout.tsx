import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "RouteRank - Track Your Grind. Climb the Ranks.",
  description: "Competitive delivery driver tracking app. Upload verified route screenshots, compete on leaderboards, and earn badges. Strava meets Duolingo for delivery drivers.",
  openGraph: {
    title: "RouteRank - Track Your Grind. Climb the Ranks.",
    description: "Competitive delivery driver tracking app. Compete on leaderboards and earn badges.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 4000,
            style: {
              background: "#000000",
              color: "#ffffff",
              borderRadius: "12px",
              padding: "16px 20px",
              fontSize: "14px",
              fontWeight: "500",
            },
            success: {
              iconTheme: {
                primary: "#10b981",
                secondary: "#ffffff",
              },
            },
          }}
        />
      </body>
    </html>
  );
}
