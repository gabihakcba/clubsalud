import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Club Salud",
  description: "Gimnasio con seguimiento médico",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full w-full bg-white text-black">
      <body className={`${inter.className} h-full w-full bg-white text-black`}>{children}</body>
    </html>
  );
}
