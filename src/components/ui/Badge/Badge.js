const Badge = ({ children, ...props }) => {
  return <span className='rui-badge'{...props}>

    {children}
  </span>;
};

export default Badge;
