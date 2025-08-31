import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/contexts/AuthContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vertias Today - The Middle East's largest student-led academic journal",
  description: "Delivering trustworthy journalism through articles, videos, and podcasts with a focus on user experience and accessibility.",
  keywords: "journalism, academic journal, Middle East, student-led, articles, videos, podcasts, STEM, politics, philosophy, women rights",
  authors: [{ name: "Vertias Today Editorial Team" }],
  openGraph: {
    title: "Vertias Today",
    description: "The Middle East's largest student-led academic journal",
    type: "website",
    locale: "en_US",
    siteName: "Vertias Today",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vertias Today",
    description: "The Middle East's largest student-led academic journal",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <AuthProvider>
          <Navigation />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
} 