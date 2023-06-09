'use client'
import React from 'react';

const Button = ({ onClick, children }) => {
  return (
    <button className="px-2 py-2 bg-black text-white" onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
