import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import AuthProvider from "./providers/AuthProvider";
import { dbConnect } from "@/services/mongo";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Momentous - Home",
  description: "An Event Booking Application",
};

export default async function RootLayout({ children }) {
  await dbConnect();
  return (
    <html lang="en">
      <body className={inter.className}>
      <AuthProvider>
        <Navbar />
        <main className="py-8">
          {children}
        </main>
        </AuthProvider> 
      </body>
    </html>
  );
}
