import Image from "next/image";
import React, { useState } from "react";

interface NumberPadProps {
  onNumberClick: (num: number) => void;
  onDeleteClick: () => void;
  onEnterClick: () => void;
  answer: string;
  result?: {
    isCorrect: boolean;
    show: boolean;
  };
}

const NumberPad = ({
  onNumberClick,
  onDeleteClick,
  onEnterClick,
  answer,
  result,
}: NumberPadProps) => {
  const [isMoving, setIsMoving] = useState(false);

  const handleTouchMove = () => {
    setIsMoving(true);
  };

  const handleTouchEnd = (
    event: React.TouchEvent<HTMLButtonElement>,
    action: () => void
  ) => {
    if (!isMoving) {
      event.preventDefault();
      action();
    }
    setIsMoving(false);
  };

  return (
    <div className="w-full max-w-md">
      {/* 入力された数字を表示 */}
      <div className="relative w-full mb-4">
        <div className="w-full p-3 text-4xl font-bold border rounded text-center bg-white text-gray-900">
          {answer || "0"}
        </div>
        {/* 結果画像 */}
        {result?.show && (
          <div className="absolute -top-10 -right-4 w-32 h-32">
            <Image
              src={result.isCorrect ? "/images/correct_ganzi.png" : "/images/incorrect_ganzi.png"}
              alt={result.isCorrect ? "正解" : "不正解"}
              width={128}
              height={128}
              // className="animate-bounce"
            />
          </div>
        )}
      </div>
      {/* 数字パッド */}
      <div className="grid grid-cols-3 gap-2">
        {[7, 8, 9, 4, 5, 6, 1, 2, 3].map((num) => (
          <button
            key={num}
            onTouchMove={handleTouchMove}
            onTouchEnd={(e) => handleTouchEnd(e, () => onNumberClick(num))}
            onClick={() => onNumberClick(num)}
            className="touch-manipulation bg-blue-500 text-white p-4 rounded text-2xl hover:bg-blue-600 transition-colors"
          >
            {num}
          </button>
        ))}
        <button
          onClick={onDeleteClick}
          className="touch-manipulation bg-red-500 text-white p-4 rounded text-xl hover:bg-red-600 transition-colors"
        >
          クリア
        </button>
        <button
          onClick={() => onNumberClick(0)}
          className="touch-manipulation bg-blue-500 text-white p-4 rounded text-2xl hover:bg-blue-600 transition-colors"
        >
          0
        </button>
        <button
          onClick={onEnterClick}
          className="touch-manipulation bg-green-500 text-white p-4 rounded text-2xl hover:bg-green-600 transition-colors"
        >
          決定
        </button>
      </div>
    </div>
  );
};

export default NumberPad;
