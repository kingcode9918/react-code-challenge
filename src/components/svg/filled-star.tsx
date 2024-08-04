import React from 'react';

const FilledStarIcon: React.FC<{ color?: string; size?: number }> = ({
  color = 'yellow',
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
      <path d="M12 .587l3.668 7.568L24 9.748l-6 6.012L19.335 24 12 20.012 4.665 24 6 15.76 0 9.748l8.332-1.593L12 .587z" />
    </svg>
  );
};

export default FilledStarIcon;
