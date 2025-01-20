import React, { useContext } from 'react';
import PopperContext from './PopperContext';

export default function usePopper() {
  const ctx = useContext(PopperContext);
  if (ctx == null) throw new Error('Popper connot be used outside of popper context provider');

  return ctx;
}
