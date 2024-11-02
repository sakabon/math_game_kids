import { useState } from 'react';

export const useCalculation = () => {
  const [problem, setProblem] = useState("");
  const [answer, setAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [result, setResult] = useState("");

  const generateProblem = () => {
    const operations = ["+", "-", "×", "÷"];
    const operation = operations[Math.floor(Math.random() * operations.length)];
    let num1, num2, answer;

    switch (operation) {
      case "+":
      case "-":
        num1 = Math.floor(Math.random() * 20) + 1;
        num2 = Math.floor(Math.random() * 20) + 1;
        if (operation === "-" && num2 > num1) {
          [num1, num2] = [num2, num1];
        }
        break;
      
      case "×":
        num1 = Math.floor(Math.random() * 9) + 1;
        num2 = Math.floor(Math.random() * 9) + 1;
        break;
      
      case "÷":
        num2 = Math.floor(Math.random() * 9) + 1;
        answer = Math.floor(Math.random() * 9) + 1;
        num1 = num2 * answer;
        break;
    }

    setProblem(`${num1} ${operation} ${num2}`);
  };

  const checkAnswer = (callback?: () => void) => {
    if (!answer) return;

    const [num1, operation, num2] = problem.split(" ");
    let correctAnswer;

    switch (operation) {
      case "+":
        correctAnswer = parseInt(num1) + parseInt(num2);
        break;
      case "-":
        correctAnswer = parseInt(num1) - parseInt(num2);
        break;
      case "×":
        correctAnswer = parseInt(num1) * parseInt(num2);
        break;
      case "÷":
        correctAnswer = parseInt(num1) / parseInt(num2);
        break;
    }

    if (parseInt(answer) === correctAnswer) {
      setScore(prev => prev + 1);
      setResult("正解！");
    } else {
      setResult(`残念！正解は ${correctAnswer} でした。`);
    }
    setAnswer("");
    generateProblem();
    
    if (callback) {
      callback();
    }
  };

  const handleNumberClick = (num: number) => {
    if (answer.length < 3) {
      setAnswer(prev => prev + num.toString());
    }
  };

  const handleDeleteClick = () => {
    setAnswer(prev => prev.slice(0, -1));
  };

  const resetCalculation = () => {
    setScore(0);
    setAnswer("");
    setResult("");
    generateProblem();
  };

  return {
    problem,
    answer,
    score,
    result,
    generateProblem,
    checkAnswer,
    handleNumberClick,
    handleDeleteClick,
    resetCalculation,
  };
};