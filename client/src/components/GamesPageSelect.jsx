import React, { useState, useEffect, useRef } from "react";

const GamesPageSelect = ({ label, options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="w-28 relative" ref={dropdownRef}>
      <div
        className={`flex justify-center items-center h-10 rounded bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-300 cursor-pointer ${
          isOpen ? "border-t" : ""
        }`}
        onClick={toggleDropdown}
      >
        <label className=" text-[#1B1C21] text-xs font-extrabold">
          {label}
        </label>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={25}
          height={24}
          viewBox="0 0 25 24"
          fill="none"
        >
          <path
            d="M17.2501 10L12.2501 15L7.25012 10"
            stroke="#737373"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      {isOpen && (
        <ul className="border rounded mt-1 absolute">
          {options?.map((option) => (
            <li
              key={option}
              className="p-2 w-28 cursor-pointer hover:bg-gray-200
              bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-300 
              "
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GamesPageSelect;
