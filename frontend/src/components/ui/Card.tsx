import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`bg-white rounded-lg shadow-xl overflow-hidden ${className}`}
    >
      {children}
    </div>
  );
}

Card.Header = ({ children, className = "" }: CardProps) => (
  <div className={`p-4 border-b border-gray-200 ${className}`}>{children}</div>
);

Card.Body = ({ children, className = "" }: CardProps) => (
  <div className={`p-4 ${className}`}>{children}</div>
);

Card.Footer = ({ children, className = "" }: CardProps) => (
  <div className={`p-4 border-t border-gray-200 bg-gray-50 ${className}`}>
    {children}
  </div>
);

export default Card;
