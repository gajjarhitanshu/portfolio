import React from "react";

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="">
      <div>{children}</div>
    </div>
  );
};

export default MainLayout;
