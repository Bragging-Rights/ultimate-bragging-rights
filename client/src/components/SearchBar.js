import React, { useState, useEffect, useRef } from "react";
import "./SearchBar.css";

const SearchBar = () => {
  const [activeButton, setActiveButton] = useState(null);
  const [selectedWeekday, setSelectedWeekday] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  // ... other submenu states
  const menuRefs = {
    week: useRef(null),
    day: useRef(null),
    date: useRef(null),
    month: useRef(null),
    year: useRef(null),
    season: useRef(null),
    teams: useRef(null),
    divisions: useRef(null),
    conferences: useRef(null),
  };

  const handleButtonClick = (buttonName) => {
    if (activeButton === buttonName) {
      setActiveButton(null);
    } else {
      setActiveButton(buttonName);
    }
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        Object.values(menuRefs).every(
          (ref) => ref.current && !ref.current.contains(event.target)
        )
      ) {
        setActiveButton(null);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [menuRefs]);

  return (
    <div className="menu-container">
      <div className="menu-nav">
        <div className="menu-nav-buttons">
          {Object.keys(menuRefs).map((buttonName) => (
            <div
              key={buttonName}
              className={`nav-button-container ${
                activeButton === buttonName ? "active" : ""
              } ${menuRefs[buttonName].current ? "has-dropdown" : ""}`}
              ref={menuRefs[buttonName]}
            >
              <button
                className={`unset ${
                  activeButton === buttonName ? "active" : ""
                }`}
                name={buttonName}
                title={buttonName}
                onClick={() => handleButtonClick(buttonName)}
              >
                {activeButton === buttonName &&
                ((buttonName === "weekday" && selectedWeekday) ||
                  (buttonName === "date" && selectedDate))
                  ? buttonName === "weekday"
                    ? selectedWeekday
                    : selectedDate
                  : buttonName.charAt(0).toUpperCase() + buttonName.slice(1)}
              </button>
              <ul
                name={`${buttonName}-submenu`}
                className={`nav-button-submenu ${
                  activeButton === buttonName ? "show" : ""
                }`}
              >
                {buttonName === "week" && (
                  <>
                    <li
                      onClick={() => {
                        setSelectedWeekday("Sunday");
                        setActiveButton(null);
                      }}
                    >
                      Sunday
                    </li>
                    <li
                      onClick={() => {
                        setSelectedWeekday("Monday");
                        setActiveButton(null);
                      }}
                    >
                      Monday
                    </li>
                    {/* ... other days */}
                  </>
                )}
                {buttonName === "date" && (
                  <>
                    <li
                      onClick={() => {
                        setSelectedDate("1");
                        setActiveButton(null);
                      }}
                    >
                      1
                    </li>
                    <li
                      onClick={() => {
                        setSelectedDate("2");
                        setActiveButton(null);
                      }}
                    >
                      2
                    </li>
                    <li
                      onClick={() => {
                        setSelectedDate("3");
                        setActiveButton(null);
                      }}
                    >
                      3
                    </li>
                    {/* Add more dates */}
                  </>
                )}
                {/* Add more submenu options here */}
              </ul>
            </div>
          ))}
          <div className="nav-button-container">
            <button className="reset-button" name="reset" title="Reset">
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
