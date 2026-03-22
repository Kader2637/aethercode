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
    default: "AETHER NUSANTARA | Beyond Code, Beyond Creation",
    template: "%s | AETHER NUSANTARA"
  },
  description: "Ekosistem Inovasi Digital. Kami meramu baris kode menjadi mahakarya visual. Spesialis Web Dev, UI/UX Design, dan Video Production.",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "AETHER NUSANTARA | Beyond Code, Beyond Creation",
    description: "Dimana logika bertemu dengan estetika. Bangun visi digital Anda bersama kami.",
    url: "http://aethernusantara.web.id/",
    siteName: "AETHER NUSANTARA",
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
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}