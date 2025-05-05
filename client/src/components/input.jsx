import React from 'react';

export const Input = ({ id, name, type, placeholder, autoComplete, required, className }) => {
  return (
    <input
      id={id}
      name={name}
      type={type}
      placeholder={placeholder}
      autoComplete={autoComplete}
      required={required}
      className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-2 focus:ring-secondary focus:border-secondary ${className}`}
    />
  );
};
