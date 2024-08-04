import React from "react";

const CircleCheckIcon: React.FC<{ color?: string; size?: number }> = ({
  color = "green",
  size = 40,
}) => {
  return (
    <svg
      height={size}
      viewBox="0 0 24 24"
      width={size}
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="10" fill={color} />
      <path d="M10 14l2 2l4 -4" stroke="white" strokeWidth="2" fill="none" />
    </svg>
  );
};

export default CircleCheckIcon;
