import { Inter, Instrument_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { OrderProvider } from "@/context/OrderContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata = {
  title: "EatUp ",
  description: "Experience the art of food delivery with EatUp.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${instrumentSans.variable} h-full antialiased`}>
      <body className={`min-h-full flex flex-col font-sans`}>
        <ThemeProvider>
          <OrderProvider>
            {children}
          </OrderProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
