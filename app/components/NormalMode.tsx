"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import NumberPad from "./NumberPad";
import { useCalculation } from "../hooks/useCalculation";

const NormalMode = () => {
  const {
    problem,
    answer,
    score,
    result,
    generateProblem,
    checkAnswer,
    handleNumberClick,
    handleDeleteClick,
    resetCalculation,
  } = useCalculation();

  const [questionCount, setQuestionCount] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const TOTAL_QUESTIONS = 20;

  useEffect(() => {
    generateProblem();
  }, []);

  const handleCheckAnswer = () => {
    checkAnswer(() => {
      const newQuestionCount = questionCount + 1;
      setQuestionCount(newQuestionCount);
      if (newQuestionCount >= TOTAL_QUESTIONS) {
        setIsGameOver(true);
      }
    });
  };

  const restartGame = () => {
    setQuestionCount(0);
    setIsGameOver(false);
    resetCalculation();
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-blue-50">
      <Link
        href="/"
        className="mb-4 px-4 py-2 font-bold text-blue-600 hover:text-blue-800 flex items-center transition-colors"
      >
        ホームに戻る
      </Link>
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-800">
          サクッと20問
        </h1>

        {!isGameOver ? (
          <>
            <p className="text-lg text-center text-gray-600 mb-2">
              問題 {questionCount + 1} / {TOTAL_QUESTIONS}
            </p>
            <p className="text-6xl font-bold mb-4 text-center text-gray-700">
              {problem} = ?
            </p>
            <NumberPad
              onNumberClick={handleNumberClick}
              onDeleteClick={handleDeleteClick}
              onEnterClick={handleCheckAnswer}
              answer={answer}
            />

            <p className="mt-4 text-center text-lg text-gray-700">{result}</p>
            <p className="mt-2 text-center text-lg text-blue-800">{score} 点</p>
          </>
        ) : (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4 text-blue-800">
              ゲーム終了！
            </h2>
            <p className="text-xl mb-4 font-bold">
              20問中 {score}問 正解！
              <br />
              正答率: {Math.round((score / TOTAL_QUESTIONS) * 100)}%
            </p>
            <button
              onClick={restartGame}
              className="bg-green-500 text-white p-3 rounded text-xl hover:bg-green-600 transition-colors"
            >
              もう一度挑戦する
            </button>
          </div>
        )}
      </div>
    </main>
  );
};

export default NormalMode;
