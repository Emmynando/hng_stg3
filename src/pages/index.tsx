import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div style={{ textAlign: "center" }}>
      <h1 style={{ fontWeight: 700, fontSize: 60 }}>Welcome Home, Mentor</h1>
      <p style={{ fontWeight: 500, fontSize: 30 }}>
        To drag and drop? Click on Album... Have fun
      </p>
    </div>
  );
}
