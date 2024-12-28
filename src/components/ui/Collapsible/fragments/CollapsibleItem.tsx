import clsx from "clsx";
import React, { useContext } from "react";
import { CollapsibleContext } from "../contexts/CollapsibleContext";

type CollapsibleItemProps = {
  children: React.ReactNode;
  className?: string;
  
};

const CollapsibleItem = ({
  children,
  className = "",

}: CollapsibleItemProps) => {
  const { rootClass } = useContext(CollapsibleContext);

  return (
    <div className={clsx(`${rootClass}-item`, className)} >{children}</div>
  );
};

export default CollapsibleItem;
