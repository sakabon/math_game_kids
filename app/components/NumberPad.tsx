// components/NumberPad.tsx
import React from 'react';

interface NumberPadProps {
  onNumberClick: (num: number) => void;
  onDeleteClick: () => void;
  onEnterClick: () => void;
  answer: string;
}

const NumberPad = ({ onNumberClick, onDeleteClick, onEnterClick, answer }: NumberPadProps) => {
  return (
    <div className="w-full max-w-md">
      {/* 入力された数字を表示 */}
      <div className="w-full p-3 text-4xl font-bold border rounded mb-4 text-center bg-white">
        {answer || '0'}
      </div>
      
      {/* 数字パッド */}
      <div className="grid grid-cols-3 gap-2">
        {[7, 8, 9, 4, 5, 6, 1, 2, 3].map((num) => (
          <button
            key={num}
            onClick={() => onNumberClick(num)}
            className="bg-blue-500 text-white p-4 rounded text-2xl hover:bg-blue-600 transition-colors"
          >
            {num}
          </button>
        ))}
        <button
          onClick={onDeleteClick}
          className="bg-red-500 text-white p-4 rounded text-2xl hover:bg-red-600 transition-colors"
        >
          クリア
        </button>
        <button
          onClick={() => onNumberClick(0)}
          className="bg-blue-500 text-white p-4 rounded text-2xl hover:bg-blue-600 transition-colors"
        >
          0
        </button>
        <button
          onClick={onEnterClick}
          className="bg-green-500 text-white p-4 rounded text-2xl hover:bg-green-600 transition-colors"
        >
          決定
        </button>
      </div>
    </div>
  );
};

export default NumberPad;