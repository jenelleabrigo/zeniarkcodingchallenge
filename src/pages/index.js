import Head from "next/head";
import Layout from "@/components/Layout";
import { Poppins, Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";

const poppins = Poppins({
  weight: ["400", "500"],
  subsets: ["latin"],
});
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return <Layout home></Layout>;
}
