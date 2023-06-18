import React from 'react';
import  Button  from './Button';

export default {
  title: 'Components/Button',
  component: Button,
};

export const Primary = () => <Button type="primary">Primary Button</Button>;

export const Secondary = () => <Button>Secondary Button</Button>;

export const Small = () => <Button size="small">Secondary Button</Button>;

export const Medium = () => <Button >Medium Button</Button>;

export const Large = () => <Button size="large">Large Button</Button>;


export const DarkMode = () => <div className='dark-theme'><Button size="large">Large Button</Button></div>
