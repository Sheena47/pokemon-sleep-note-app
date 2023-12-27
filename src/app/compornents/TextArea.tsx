import React, { TextareaHTMLAttributes } from 'react';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

const TextArea: React.FC<TextAreaProps> = ({ label, ...props }) => {
  return (
    <div className="mb-4">
      {label && <label className="block text-gray-700 text-sm font-bold mb-2">{label}</label>}
      <textarea
        {...props}
        className="resize-none border rounded-md w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
      />
    </div>
  );
};

export default TextArea;

