import { Button } from "@/components/ui/button";
import { SignOutButton } from "@clerk/nextjs";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const dashboard = ({ children }: Props) => {
  return (
    <div>
      <div className="nav">
        <Button className="btn-primary">
          <SignOutButton />
        </Button>
      </div>
      {children}
    </div>
  );
};

export default dashboard;
