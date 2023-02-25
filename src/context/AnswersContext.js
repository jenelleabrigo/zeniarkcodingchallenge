import { createContext, useState } from "react";

export const AnswersContext = createContext();

function Context({ children }) {
  const [tenQuestions, setTenQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);

  return <AnswersContext.Provider value={{ answers, setAnswers, tenQuestions, setTenQuestions }}>{children}</AnswersContext.Provider>;
}

export default Context;
