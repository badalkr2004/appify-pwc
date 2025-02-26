import React from "react";

type Props = {
  children: React.ReactNode;
};

const dashboard = ({ children }: Props) => {
  return (
    <div>
      <div className="nav"></div>
      {children}
    </div>
  );
};

export default dashboard;
