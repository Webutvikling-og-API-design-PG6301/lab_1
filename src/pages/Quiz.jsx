import React, { useState } from "react";
import {
  randomQuestion,
  isCorrectAnswer,
  Questions,
} from "../components/api/questions";

import styled from "styled-components";

const Quiz = () => {
  const [color, setColor] = useState(false);
  const [saveAnswer, setSaveAnswer] = useState(undefined);
  const [question, useQuestion] = useState(randomQuestion());

  const handleAnswerCheck = (answer) => {
    if (isCorrectAnswer(question, answer)) {
      setSaveAnswer("Korrekt svar");
      setColor(true);
    } else {
      setSaveAnswer("Feil svar");
      setColor(false);
    }
  };

  const handleNextQuestion = () => {
    useQuestion(randomQuestion());
    setSaveAnswer(undefined);
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Container>
        <h1>{question.question}</h1>
        <Answers>
          {Object.keys(question.answers)
            .filter((value) => question.answers[value])
            .map((answer) => {
              return (
                <button onClick={() => handleAnswerCheck(answer)} key={answer}>
                  {question.answers[answer]}
                </button>
              );
            })}
        </Answers>

        <div style={{ textAlign: "center", marginTop: 40 }}>
          <Button onClick={handleNextQuestion}>Neste spørsmål</Button>
        </div>
        <Result active={color}>{saveAnswer}</Result>
      </Container>
    </div>
  );
};

export default Quiz;

const Container = styled.div`
  margin: 0 20px;
  h1 {
    font-family: "Roboto Mono", monospace;
    text-align: center;
  }
`;

const Button = styled.button`
  padding: 10px 25px;
  border-radius: 5px;
  outline: none;
  border: 1px solid purple;
  background: none;
  transition: 0.3s ease;
  font-weight: bold;
  font-family: "Roboto Mono", monospace;
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
    transition: 0.3s ease;
  }
`;

const Result = styled.h1`
  width: 100vw;
  text-align: center;
  color: ${(props) => (props.active ? "green" : "red")};
`;

const Answers = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 600px;
  margin: 0 auto;

  button {
    margin: 0 20px;
    padding: 20px;
    border: 1px solid purple;
    outline: none;
    padding: 5px 0;
    border-radius: 10px;
    margin-bottom: 5px;
    background: white;
    cursor: pointer;
    font-family: "Roboto Mono", monospace;
  }
`;
