import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";
import { Plus_Jakarta_Sans } from 'next/font/google';

const jakarta = Plus_Jakarta_Sans({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
});

export const metadata = {
  title: {
    default: "AETHER CODE | IT Community & Creative Agency",
    template: "%s | AETHER CODE"
  },
  description: "Ekosistem IT & Agensi Kreatif. Solusi modern untuk Web Dev, UI/UX, dan Video Editing.",
  icons: {
    icon: [
      { url: "/logo.png", type: "image/png" },
    ],
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "AETHER CODE | Precision Digital Engineering",
    description: "Membangun masa depan digital dengan presisi.",
    url: "https://aethercode.com",
    siteName: "AETHER CODE",
    images: [{ url: "/logo.png", width: 800, height: 800 }],
    locale: "id_ID",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className="scroll-smooth">
      <body className={`${jakarta.className} antialiased bg-white`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}