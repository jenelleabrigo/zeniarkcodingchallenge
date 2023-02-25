import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import text_logo from "../images/common/zeniark-logo.png";
import style_home from "../styles/Home.module.css";
import { useContext } from "react";
import { AnswersContext } from "@/context/AnswersContext";

export default function Layout({ children, home }) {
  const { setTenQuestions } = useContext(AnswersContext);

  return (
    <div className="main">
      <Head>
        <title>Zeniark | Coding Challenge</title>
        <meta name="description" content="Zeniark coding challenge using Nextjs." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      {home ? (
        <section className={`container ${style_home.container}`}>
          <div className="u-text-center">
            <h1 className={style_home.text_logo}>
              <Image alt="Zeniark Logo" src={text_logo} width="100%" height="100%"></Image>
            </h1>
            <p className={style_home.title}>Welcome to the Trivia Challenge!</p>
            <p className={style_home.text}>You will be presented with 10 True or False questions.</p>
            <div className={style_home.blue_box}>Can you score 10/10?</div>
            <Link href="/question/1" className="link" onClick={() => setTenQuestions([])}>
              LET’S START!
            </Link>
          </div>
        </section>
      ) : (
        <main>{children}</main>
      )}
    </div>
  );
}
