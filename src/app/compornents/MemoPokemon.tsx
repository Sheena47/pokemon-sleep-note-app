// MemoInput.tsx
import React from 'react';

type MemoInputProps = {
  memo: string;
  onMemoChange: (value: string) => void;
};

const MemoInput: React.FC<MemoInputProps> = ({ memo, onMemoChange }) => {
  return (
    <textarea
      placeholder="メモを入力してください"
      value={memo}
      onChange={(e) => onMemoChange(e.target.value)}
      className="mt-2 px-4 py-2 rounded-md"
    />
  );
};

export default MemoInput;
