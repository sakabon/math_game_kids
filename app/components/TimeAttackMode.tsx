"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import NumberPad from "./NumberPad";
import { useCalculation } from "../hooks/useCalculation";
import Image from "next/image";

const TimeAttackMode = () => {
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

  const [timeLeft, setTimeLeft] = useState(20);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isPlaying) {
      setIsGameOver(true);
      setIsPlaying(false);
    }
    return () => clearInterval(timer);
  }, [timeLeft, isPlaying]);

  const startGame = () => {
    setTimeLeft(20);
    setIsGameOver(false);
    setIsPlaying(true);
    resetCalculation();
  };

  const handleCheckAnswer = () => {
    if (!isPlaying) return;
    checkAnswer();
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
          タイムアタック
        </h1>

        {!isPlaying && !isGameOver && (
          <div className="flex justify-center mb-6">
            <Image
              src="/images/fire_ganzi.png"
              alt="タイムアタック"
              width={300}
              height={300}
              className="animate-pluse"
              priority
            />
          </div>
        )}

        {!isPlaying && !isGameOver && (
          <div className="text-center">
            <p className="text-xl mb-4">20秒間で何問解けるかな？</p>
            <button
              onClick={startGame}
              className="bg-green-500 text-white p-3 rounded text-xl hover:bg-green-600 transition-colors"
            >
              スタート
            </button>
          </div>
        )}

        {isPlaying && (
          <>
            <div className="flex justify-between items-center mb-4">
              <p className="text-2xl text-gray-700">残り時間: {timeLeft}秒</p>
              <p className="text-2xl text-blue-800">スコア: {score}</p>
            </div>
            <p className="text-5xl font-bold mb-4 text-center text-gray-700">
              {problem} = ?
            </p>

            <NumberPad
              onNumberClick={handleNumberClick}
              onDeleteClick={handleDeleteClick}
              onEnterClick={handleCheckAnswer}
              answer={answer}
              result={result}
            />
          </>
        )}

        {isGameOver && (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4 text-blue-800">
              タイムアップ！
            </h2>
            <div className="flex justify-center mb-6">
              <Image
                src="/images/fire_ganzi.png"
                alt="タイムアタック"
                width={300}
                height={300}
                className="animate-pluse"
                priority
              />
            </div>
            <p className="text-xl mb-4 font-bold">20秒間で {score}問 正解！</p>
            <button
              onClick={startGame}
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

export default TimeAttackMode;
