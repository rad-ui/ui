'use client'
import React from 'react';

const Button = ({ onClick, children }) => {
  return (
    <button className="px-2 py-2" onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
