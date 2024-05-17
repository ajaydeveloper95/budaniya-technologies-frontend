import Head from "next/head";
import styles from "../styles/Home.module.css";
import Home1 from "../src/component/home/Home"

export default function Home() {
  return (
    <div>
      <Head>
        <title>Budaniya Technologies</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Home1/>
    </div>
  );
}
