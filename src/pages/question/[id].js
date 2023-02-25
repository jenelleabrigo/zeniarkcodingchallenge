import Layout from "@/components/Layout";
import Link from "next/link";
import logo from "../../images/common/logo.png";
import icn_true from "../../images/question/icn-true.svg";
import icn_false from "../../images/question/icn-false.svg";
import Image from "next/image";
import questionStyle from "../../styles/Question.module.css";
import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { AnswersContext } from "../../context/AnswersContext";
import { decode } from "html-entities";

export async function getStaticPaths() {
  const arr = Array.from({ length: 10 }, (_, i) => i + 1);

  return {
    paths: arr.map((i) => {
      return {
        params: { id: `${i}` },
      };
    }),
    fallback: false,
  };
}

export async function getStaticProps() {
  const response = await fetch(`${process.env.HOST}/api/data`);
  const data = await response.json();

  return {
    props: {
      data,
    },
  };
}

export default function Questions({ data }) {
  const { tenQuestions, setTenQuestions, answers, setAnswers } = useContext(AnswersContext);
  var router = useRouter();
  var id = router.query["id"];
  const [question, setQuestion] = useState([]);
  const questionList = data.results;

  useEffect(() => {
    if (questionList && tenQuestions.length === 0) {
      setTenQuestions(questionList);
    }
  }, [data]);

  useEffect(() => {
    if (tenQuestions.length !== 0) {
      setQuestion(tenQuestions[id - 1]);
    }
  }, [id, tenQuestions]);

  useEffect(() => {
    if (tenQuestions.length === 0 && id !== 1) {
      router.push("/question/1");
    }
  }, [tenQuestions]);

  const getAnswerTrue = () => {
    return getAnswer("True");
  };

  const getAnswerFalse = () => {
    return getAnswer("False");
  };

  const getAnswer = (answer) => {
    if (id < questionList.length) {
      setAnswers((answers) => [...answers, answer]);
      router.push(`${Number(id) + 1}`);
      return;
    }
    setAnswers((answers) => [...answers, answer]);
    router.push("/result");
  };

  return (
    <Layout>
      <div className={`container ${questionStyle.container}`}>
        <div className="subpage-heading">
          <Link href="/">
            <Image src={logo} alt="logo" height="65" width="60" className="subpage-heading__logo"></Image>
          </Link>
          <div className="subpage-heading__txt-container">
            <p className="subpage-heading__txt-container__txt">Category: {question.category}</p>
            <span className="subpage-heading__txt-container__count">
              {id} of {questionList.length}
            </span>
          </div>
        </div>
        <p className={questionStyle.text}> {decode(question.question)}</p>
        <div className={questionStyle.buttons}>
          <button onClick={getAnswerTrue} type="button" className={`${questionStyle.buttons__btn} ${questionStyle.buttons__btn__true}`}>
            <p className={questionStyle.buttons__btn__txt}>
              <span className={questionStyle.buttons__btn__txt__icon}>
                <Image src={icn_true} alt="logo" height="40" width="40"></Image>
              </span>
              True
            </p>
          </button>
          <button onClick={getAnswerFalse} type="button" className={`${questionStyle.buttons__btn} ${questionStyle.buttons__btn__false}`}>
            <p className={questionStyle.buttons__btn__txt}>
              <span className={questionStyle.buttons__btn__txt__icon}>
                <Image src={icn_false} alt="logo" height="35" width="35"></Image>
              </span>
              False
            </p>
          </button>
        </div>
      </div>
    </Layout>
  );
}
