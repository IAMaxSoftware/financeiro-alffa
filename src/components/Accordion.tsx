import React, { useState, ReactNode } from 'react';

interface AccordionProps {
  title: string;
  children: ReactNode;
}

const Accordion: React.FC<AccordionProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border rounded-md mb-4">
      <button
        className="w-full text-left p-4 focus:outline-none focus:bg-gray-200"
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
      </button>
      {isOpen && (
        <div className="p-4 bg-gray-100">
          {children}
        </div>
      )}
    </div>
  );
};

export default Accordion;