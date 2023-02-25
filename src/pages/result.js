import Layout from "@/components/Layout";
import Link from "next/link";
import logo from "../images/common/logo.png";
import icn_true from "../images/result/icn-true.svg";
import icn_false from "../images/result/icn-false.svg";
import Image from "next/image";
import result from "../styles/Result.module.css";
import { useContext, useEffect } from "react";
import { AnswersContext } from "@/context/AnswersContext";
import { useRouter } from "next/router";
import { decode } from "html-entities";

export default function results() {
  const { tenQuestions, setTenQuestions, answers } = useContext(AnswersContext);
  const router = useRouter();

  const countCorrectAns = () => {
    let count = 0;
    for (let index = 0; index < tenQuestions.length; index++) {
      if (tenQuestions[index].correct_answer === answers[index]) {
        count++;
      }
    }
    return count;
  };

  useEffect(() => {
    if (tenQuestions.length === 0) {
      router.push("/");
    }
  }, [tenQuestions]);

  return (
    <Layout>
      <div className={`container ${result.container}`}>
        <div className="subpage-heading">
          <Link href="/">
            <Image src={logo} alt="logo" height="65" width="60" className="subpage-heading__logo"></Image>
          </Link>
          <div className="subpage-heading__txt-container is-center">
            <p className="subpage-heading__txt-container__txt is-big u-font-inter">Final Results</p>
          </div>
        </div>
        <div className={result.score_container}>
          <p className={result.score_container__number}>{countCorrectAns()}/10</p>
          <p className={result.score_container__text}>Your Score</p>
        </div>
        <div className={result.result_container}>
          {tenQuestions.map((item, index) => (
            <div key={index} className={result.result_container__item}>
              <div className={result.result_container__item__inner}>
                <p className={result.result_container__item__num}>{index + 1}.</p>
                <p className={result.result_container__item__text}>
                  <span className={result.result_container__item__text__question}>{decode(item.question)}</span>
                  <span className={result.result_container__item__text__conc}>
                    The correct answer is{" "}
                    <span className={`${item.correct_answer === "True" && "u-text-green"} ${item.correct_answer === "False" && "u-text-red"} ${result.result_container__item__text__conc__correct}`}>
                      {item.correct_answer}
                    </span>
                    . You answered{" "}
                    <span
                      className={`${answers[index] === "True" && "u-text-green"} ${answers[index] === "False" && "u-text-red"} ${result.result_container__item__text__conc__answer}`}
                    >{`${answers[index]}`}</span>
                    .
                  </span>
                </p>
              </div>
              <Image src={item.correct_answer === answers[index] ? icn_true : icn_false} alt="logo" height="30" width="30"></Image>
            </div>
          ))}
        </div>
        <div className="u-text-center">
          <Link href="/" className="link">
            PLAY AGAIN
          </Link>
        </div>
      </div>
    </Layout>
  );
}
