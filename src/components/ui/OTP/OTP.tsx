'use client';

import React, { useState, useRef, DetailedHTMLProps, InputHTMLAttributes } from 'react';
import { customClassSwitcher } from '~/core';

const COMPONENT_NAME = 'Otp';

export type OtpProps = {
  length?: number;
  onComplete?: (otp: string) => void; 
  customRootClass?: string; 
  size?: 'small' | 'medium' | 'large'; 
  color?: string;
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

const Otp = ({
  length = 6,
  onComplete,
  customRootClass = '',
  className = '',
  color,
  size = 'medium',
  ...props
}: OtpProps) => {
  const [otp, setOtp] = useState<string[]>(Array(length).fill(''));
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);

  const handleChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value.length === 1 && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }

    if (newOtp.join('').length === length) {
      onComplete && onComplete(newOtp.join(''));
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (event.key === 'Backspace' && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    const pastedData = event.clipboardData.getData('Text').slice(0, length).split('');
    setOtp((prevOtp) => {
      const newOtp = [...prevOtp];
      pastedData.forEach((char, idx) => {
        if (idx < length) newOtp[idx] = char;
      });
      return newOtp;
    });
    event.preventDefault();
  };

  return (
    <div
      className={`${rootClass} otp-${size} flex space-x-2 ${className}`}
      data-accent-color={color ?? undefined}
    >
      {otp.map((digit, index) => (
        <input
          key={index}
          type="text"
          value={digit}
          onChange={(e) => handleChange(e.target.value.slice(0, 1), index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={handlePaste}
          ref={(el) => (inputsRef.current[index] = el)}
          className="w-10 h-12 text-center border rounded-md focus:ring-2 focus:outline-none text-lg"
          {...props}
        />
      ))}
    </div>
  );
};

Otp.displayName = COMPONENT_NAME;

export default Otp;
