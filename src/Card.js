import React from "react";

const Card = ({ children, className }) => (
  <div className={`bg-white p-2 rounded overflow-hidden ${className}`}>
    {children}
  </div>
);

export default Card;
