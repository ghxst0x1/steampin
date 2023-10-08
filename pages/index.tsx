import type { NextPage } from "next";
import Head from "next/head";
import Links from "./links";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Steam Browser Shortcuts</title>
        <meta name="description" content="Created by GhxsT" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://imgur.com/ErdAEqi">SteamPin 📌!</a>
        </h1>

        <p className={styles.description}>
          Easy shortcut page for Steam (Overlay) Browser
        </p>
        <div className={styles.grid}>
        <Links/>
        </div>
        
        <p>
          NB: Some of these shortcut need Steam Authentication to use, I&apos;m
          not responsible if anything happend :&#41;
        </p>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://github.com/holyghxst"
          target="_blank"
          rel="noopener noreferrer"
        >
          Made with ❤️ by GhxsT
        </a>
      </footer>
    </div>
  );
};

export default Home;
