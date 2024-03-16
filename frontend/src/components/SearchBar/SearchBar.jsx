import React, { useEffect, useState } from "react";
import "./SearchBar.css";
import imgDown from "../../assets/angle-down-solid.svg";
import {
  populateWeeks,
  monthNums,
  teamsData,
  conferencesData,
  divisionsData,
  months,
  days,
} from "./Services";
import { useLeagueContext } from "../LeagueContext";

const SearchBar = () => {
  const initialValues = {
    week: "WEEK",
    day: "DAY",
    monthDate: "DATE",
    month: "MONTH",
    year: "SELECT YEAR",
    season: "SEASON",
    team: "ALL TEAMS",
    division: "ALL DIVSION",
    conference: "ALL CONFERENCE",
  };
  const [disable, setDisable] = useState({
    week: false,
    day: false,
    monthDate: false,
    month: false,
    year: false,
    season: false,
    team: false,
    division: false,
    conference: false,
  });
  const [weeks, setWeeks] = useState([]);
  const [week, setWeek] = useState("WEEK");
  const [day, setDay] = useState("DAY");
  const [monthDate, setMonthDate] = useState("DATE");
  const [month, setMonth] = useState("MONTH");
  const date = new Date();
  const [year, setYear] = useState("SELECT YEAR");
  const yearsOption = [date.getFullYear + "-" + date.getFullYear + 1];
  const [season, setSeason] = useState("SEASON");
  const [team, setTeam] = useState("ALL TEAMS");
  const [devision, setDevision] = useState("ALL DIVSION");
  const [conference, setConference] = useState("ALL CONFERENCE");
  const { selectedLeague } = useLeagueContext();

  const restValues = () => {
    setWeek(initialValues.week);
    setDay(initialValues.day);
    setMonthDate(initialValues.monthDate);
    setMonth(initialValues.month);
    setYear(initialValues.year);
    setSeason(initialValues.season);
    setTeam(initialValues.team);
    setDevision(initialValues.division);
    setConference(initialValues.conference);
    setDisable({
      week: false,
      day: false,
      monthDate: false,
      month: false,
      year: false,
      season: false,
      team: false,
      division: false,
      conference: false,
    });
  };

  function updateAllButtons() {
    if (week !== initialValues.week) {
      setDisable({
        week: false,
        day: true,
        monthDate: true,
        month: true,
        year: true,
        season: true,
        team: false,
        division: false,
        conference: false,
      });
    }

    if (day !== initialValues.day) {
      setDisable({
        ...disable,
        week: true,
      });
    }

    if (monthDate !== initialValues.monthDate) {
      setDisable({
        ...disable,
        week: true,
      });
    }

    if (month !== initialValues.month) {
      setDisable({
        ...disable,
        week: true,
      });
    }

    if (season !== initialValues.season) {
      setDisable({
        ...disable,
        week: true,
      });
    }

    if (team !== initialValues.team) {
      setDisable({
        ...disable,
        devision: true,
        conference: true,
      });
    }

    if (devision !== initialValues.division) {
      setDisable({
        ...disable,
        conference: true,
      });
      updateTeamsBasedOnDivision();
    }
  }

  useEffect(() => {
    updateAllButtons();
  }, [week, day, monthDate, month, year, season, team, devision, conference]);

  useEffect(() => {
    const resp = populateWeeks();
    setWeeks([...resp]);
  }, []);

  function updateTeamsBasedOnDivision() {
    console.log(devision, teamsData);
  }
  useEffect(() => {
    // Get all nav buttons
    const navButtonContainers = document.querySelectorAll(
      ".menu-nav-buttons > .nav-button-container"
    );
    const buttons = document.querySelectorAll("button");

    // Make all list items tabbable
    const listItems = document.getElementsByTagName("li");
    for (let i = 0; i < listItems.length; i++) {
      listItems[i].setAttribute("tabindex", "0");
    }

    navButtonContainers.forEach((buttonContainer) => {
      const button = buttonContainer.querySelector("button");
      const submenu = buttonContainer.querySelector(".nav-button-submenu");
      submenuEventListener(button, buttonContainer, submenu);
    });

    function submenuEventListener(button, buttonContainer, submenu) {
      // Reset button doesn't have a submenu
      if (submenu == null) {
        return;
      }
      buttonContainer.addEventListener("mouseover", () => {
        if (!isGreyedOut(button)) {
          buttonContainer.classList.add("hover");
          navButtonContainers.forEach((navButton) => {
            navButton.classList.remove("active");
          });
        }
      });
      buttonContainer.addEventListener("mouseout", () => {
        buttonContainer.classList.remove("hover");
      });

      // Do the same at Enter as is done at Click
      submenu.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          event.preventDefault();
          const focusedElement = document.activeElement;
          if (focusedElement.tagName.toLowerCase() == "li") {
            const target = focusedElement;
            setClicked(button);
            const value = target.innerHTML;

            updateAllButtons();
            // Close submenu
            buttonContainer.classList.remove("active");
          }
        }
      });
    }

    function isGreyedOut(button) {
      return button.classList.contains("greyed-out");
    }

    function setClicked(button) {
      removeAttributes(button);
      button.classList.add("clicked");
    }

    function removeAttributes(button) {
      button.classList.remove("greyed-out", "clicked");
      toDefaultValue(button);
    }

    function toDefaultValue(button) {}
  }, []);
  return (
    <div className="search-bar-container">
      <div className="menu-container">
        <div className="menu-nav">
          <div className="menu-nav-buttons">
            <div className="nav-button-container">
              <button
                className={`unset ${week !== "WEEK" && "clicked"}
                ${disable.week && "greyed-out"}
                `}
                title="Week"
              >
                <a>{week}</a>
                <img src={imgDown} alt="caret" />
              </button>
              <ul name="week-submenu" className="nav-button-submenu">
                {weeks?.map((item) => {
                  return <li onClick={() => setWeek(item)}>{item}</li>;
                })}
              </ul>
            </div>
            <div className="nav-button-container">
              <button
                className={`unset ${day !== "DAY" && "clicked"}
                  ${disable.day && "greyed-out"}
                `}
                name="weekday"
                title="Day"
              >
                <a>{day}</a>
                <img src={imgDown} alt="caret" />
              </button>
              <ul name="weekday-submenu" className="nav-button-submenu">
                {days?.map((item) => {
                  return (
                    <li key={item} onClick={() => setDay(item)}>
                      {item}
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="nav-button-container">
              <button
                className={`unset ${monthDate !== "DATE" && "clicked"}
                ${disable.monthDate && "greyed-out"}
                `}
                name="day"
                title="Date"
              >
                <a>{monthDate}</a>
                <img src={imgDown} alt="caret" />
              </button>
              <ul name="day-submenu" className="nav-button-submenu">
                {Array.from({ length: 31 }, (_, index) => (
                  <li key={index + 1} onClick={() => setMonthDate(index + 1)}>
                    {index + 1}
                  </li>
                ))}
              </ul>
            </div>
            <div className="nav-button-container">
              <button
                className={`unset ${month !== "MONTH" && "clicked"}
                ${disable.month && "greyed-out"}
                `}
                name="month"
                title="Month"
              >
                <a>{month}</a>
                <img src={imgDown} alt="caret" />
              </button>
              <ul className="nav-button-submenu">
                {months.map((item) => {
                  return (
                    <li key={item} onClick={() => setMonth(item)}>
                      {item}
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="nav-button-container">
              <button
                title="Year"
                className={`unset ${year !== "SELECT YEAR" && "clicked"}
                ${disable.year && "greyed-out"}
                `}
              >
                <a>{year}</a>
                <img src={imgDown} alt="caret" />
              </button>
              <ul className="nav-button-submenu">
                <li onClick={() => setYear("2024-2025")}>2024-2025</li>
              </ul>
            </div>
            <div className="nav-button-container">
              <button
                className={`unset ${season !== "SEASON" && "clicked"}
                ${disable.season && "greyed-out"}
                `}
                title="Season"
              >
                <a>{season}</a>
                <img src={imgDown} alt="caret" />
              </button>
              <ul className="nav-button-submenu">
                <li onClick={() => setSeason("Preseason")}>Preseason</li>
                <li onClick={() => setSeason("Regular Season")}>
                  Regular Season
                </li>
                <li onClick={() => setSeason("Playoffs")}>Playoffs</li>
              </ul>
            </div>
            <div className="nav-button-container">
              <button
                className={`unset ${team !== "ALL TEAMS" && "clicked"}
                ${disable.team && "greyed-out"}
                `}
                title="All Teams"
              >
                <a>{team}</a>
                <img src={imgDown} alt="caret" />
              </button>
              <ul className="nav-button-submenu teams">
                {devision !== "ALL DIVSION"
                  ? teamsData[selectedLeague]
                      ?.filter((item) => item.division === devision)
                      .map((team) => (
                        <li
                          key={team?.name}
                          onClick={() => setTeam(team?.name)}
                        >
                          {team?.name}
                        </li>
                      ))
                  : teamsData[selectedLeague]?.map((team) => {
                      return (
                        <li
                          key={team?.name}
                          onClick={() => setTeam(team?.name)}
                        >
                          {team?.name}
                        </li>
                      );
                    })}
              </ul>
            </div>
            <div className="nav-button-container">
              <button
                className={`unset ${devision !== "ALL DIVSION" && "clicked"}
                ${disable.division && "greyed-out"}
                `}
                title="All Divisions"
              >
                <a>{devision}</a>
                <img src={imgDown} alt="caret" />
              </button>
              <ul className="nav-button-submenu divisions">
                {divisionsData[selectedLeague]?.map((division) => {
                  return (
                    <li
                      key={division.name}
                      onClick={() => setDevision(division.name)}
                    >
                      {division.name}
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="nav-button-container">
              <button
                className={`unset ${
                  conference !== "ALL CONFERENCE" && "clicked"
                }
                  ${disable.conference && "greyed-out"}
                  `}
                name="all-conferences"
                title="All Conferences"
              >
                <a>{conference}</a>
                <img src={imgDown} alt="caret" />
              </button>
              <ul className="nav-button-submenu conferences">
                {conferencesData[selectedLeague]?.map((item) => {
                  return (
                    <li key={item} onClick={() => setConference(item)}>
                      {item}
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="nav-button-container">
              <button
                className="reset-button"
                title="Reset"
                onClick={restValues}
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
