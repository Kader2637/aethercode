import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";
import { Plus_Jakarta_Sans } from 'next/font/google'

const jakarta = Plus_Jakarta_Sans({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
})

// --- SEO & METADATA MASTER CONFIG ---
export const metadata = {
  title: {
    default: "AETHER CODE | IT Community & Premium Creative Services",
    template: "%s | AETHER CODE"
  },
  description: "Ekosistem IT & Agensi Kreatif UNMER. Solusi modern untuk Web Development, UI/UX Design, Video Editing, dan Marketplace Template Premium.",
  keywords: ["Aether Code", "Agensi IT Malang", "Web Development Indonesia", "Jasa UI/UX", "Video Editing Cinematic", "UNMER IT Community"],
  authors: [{ name: "AETHER CODE Team" }],
  creator: "AETHER CODE",
  
  // OpenGraph (Buat tampilan pas share link ke Sosmed/WA)
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://aethercode.com", // Ganti dengan domain asli lo nanti
    title: "AETHER CODE | Precision Digital Engineering",
    description: "Membangun masa depan digital dengan presisi. Solusi Web, Design, dan Video kelas dunia.",
    siteName: "AETHER CODE",
    images: [
      {
        url: "/og-image.png", // Taruh file og-image.png di folder public
        width: 1200,
        height: 630,
        alt: "AETHER CODE Studio",
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "AETHER CODE | Creative Tech Studio",
    description: "Precision in every pixel, excellence in every line.",
    images: ["/og-image.png"],
  },

  // --- ICON & FAVICON CONFIG ---
  icons: {
    icon: [
      { url: "/favicon.ico" }, // Standar favicon
      { url: "/logo.png", type: "image/png" }, // Logo lo jadi icon
    ],
    apple: [
      { url: "/logo.png" }, // Icon buat pengguna iPhone pas save to homescreen
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className="scroll-smooth">
      <body className={jakarta.className}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}