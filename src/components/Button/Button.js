import React from 'react';


import { styled, darkTheme } from '@/stitches';


const StyledButton = styled('button', {
  backgroundColor: '$gray4',
  border: '0',
  display: 'inline-flex',
  alignItems: 'center',
  height: '2.25rem',
  cursor:"pointer",
  borderRadius:"5px",
  padding:"0px 10px",
  '&:hover': {
    backgroundColor: '$gray7',
  },
  '&:focus': {
    backgroundColor: '$gray8',
  },
  // 
  variants: {
    type: {
      primary: {
        backgroundColor: '$blue4',
        color: '$blue11',
        '&:hover': {
          backgroundColor: '$blue7',
        },
        '&:focus': {
          backgroundColor: '$blue8',
        },
      },
      secondary: {
        backgroundColor: '$red4',
        color: '$red11',
        '&:hover': {
          backgroundColor: '$red7',
        },
        '&:focus': {
          backgroundColor: '$red8',
        },
      },
    },
    size: {
      small: {
        height: '1.5rem',
      },
      medium: {
        height: '2.25rem',
      },
      large: {
        height: '3rem',
      },
    },
  }
});


const Button = ({ onClick, type="secondary", size="medium", children }) => {
 
  return (
    <StyledButton  type={type} size={size} onClick={onClick}>
      {children}
    </StyledButton>
  );
};

export default Button;
