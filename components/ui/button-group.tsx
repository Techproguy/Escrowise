import React from 'react';

export interface ButtonGroupProps {
  children: React.ReactNode;
  className?: string;
}

export const ButtonGroup: React.FC<ButtonGroupProps> = ({ children, className }) => {
  return (
    <div
      className={`inline-flex rounded-lg shadow-sm bg-white border border-gray-200 overflow-hidden ${className || ''}`.trim()}
      role="group"
    >
      {React.Children.map(children, (child, idx) => (
        <div
          className={`first:rounded-l-lg last:rounded-r-lg border-r last:border-r-0 border-gray-200`}
          key={idx}
        >
          {child}
        </div>
      ))}
    </div>
  );
};

export default ButtonGroup;
