import React from "react";

type Props = {
  children: React.ReactNode;
};

const dashboard = ({ children }: Props) => {
  return (
    <div>
      <div className="w-full">{children}</div>
    </div>
  );
};

export default dashboard;
