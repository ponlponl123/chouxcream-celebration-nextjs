import {
  Itim as ThaiFont,
  Inter as FontSans,
  Darumadrop_One as JapaneseSans,
} from "next/font/google";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const fontThai = ThaiFont({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-itim",
});

export const fontJapanese = JapaneseSans({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-japanese",
});
