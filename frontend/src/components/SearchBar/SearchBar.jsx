import React, { useEffect, useState } from "react";
import "./SearchBar.css";
import imgDown from "../../assets/angle-down-solid.svg";
import { useDispatch, useSelector } from "react-redux";
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
import { setSearchBar } from "../../store/searchBarSlice";

const SearchBar = () => {
  const searchBarValues = useSelector((state) => state.searchBar);
  const weeks = populateWeeks();
  const { selectedLeague } = useLeagueContext();
  const dispatch = useDispatch();

  return (
    <div className="search-bar-container" style={{backgroundColor:"#1B1C21"}} >
      <div className="menu-container" >
        <div className="menu-nav">
          <div className="menu-nav-buttons">
            <div className="nav-button-container">
              <button
                className={`unset ${
                  searchBarValues.week !== "WEEK" && "clicked"
                }`}
                title="Week"
              >
                <a>{searchBarValues.week}</a>
                <img src={imgDown} alt="caret" />
              </button>
              <ul name="week-submenu" className="nav-button-submenu">
                {weeks?.map((item) => {
                  return (
                    <li
                      onClick={() =>
                        dispatch(
                          setSearchBar({
                            fieldName: "week",
                            value: item,
                          })
                        )
                      }
                    >
                      {item}
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="nav-button-container">
              <button
                className={`unset ${searchBarValues.week !== "DAY" && "clicked"}
                
                `}
                name="weekday"
                title="Day"
              >
                <a>{searchBarValues?.day}</a>
                <img src={imgDown} alt="caret" />
              </button>
              <ul name="weekday-submenu" className="nav-button-submenu">
                {days?.map((item) => {
                  return (
                    <li
                      key={item}
                      onClick={() =>
                        dispatch(
                          setSearchBar({
                            fieldName: "day",
                            value: item,
                          })
                        )
                      }
                    >
                      {item}
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="nav-button-container">
              <button
                className={`unset ${searchBarValues?.date && "clicked"}
                `}
                name="day"
                title="Date"
              >
                <a>{searchBarValues?.date}</a>
                <img src={imgDown} alt="caret" />
              </button>
              <ul name="day-submenu" className="nav-button-submenu">
                <li>All Dates</li>
                {Array.from({ length: 31 }, (_, index) => (
                  <li
                    key={index + 1}
                    onClick={() =>
                      dispatch(
                        setSearchBar({
                          fieldName: "date",
                          value: index + 1,
                        })
                      )
                    }
                  >
                    {index + 1}
                  </li>
                ))}
              </ul>
            </div>
            <div className="nav-button-container">
              <button
                className={`unset ${
                  searchBarValues?.month !== "MONTH" && "clicked"
                }
                `}
                name="month"
                title="Month"
              >
                <a>{searchBarValues?.month}</a>
                <img src={imgDown} alt="caret" />
              </button>
              <ul className="nav-button-submenu">
                {months.map((item) => {
                  return (
                    <li
                      key={item}
                      onClick={() =>
                        dispatch(
                          setSearchBar({
                            fieldName: "month",
                            value: item,
                          })
                        )
                      }
                    >
                      {item}
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="nav-button-container">
              <button
                title="Year"
                className={`unset ${
                  searchBarValues?.year !== "SELECT YEAR" && "clicked"
                } `}
              >
                <a>{searchBarValues?.year}</a>
                <img src={imgDown} alt="caret" />
              </button>
              <ul className="nav-button-submenu">
                <li
                  onClick={() =>
                    dispatch(
                      setSearchBar({
                        fieldName: "year",
                        value: "2024",
                      })
                    )
                  }
                >
                  2024
                </li>
              </ul>
            </div>
            <div className="nav-button-container">
              <button
                className={`unset ${
                  searchBarValues?.season !== "SEASON" && "clicked"
                }
          
                `}
                title="Season"
              >
                <a>{searchBarValues?.season}</a>
                <img src={imgDown} alt="caret" />
              </button>
              <ul className="nav-button-submenu">
                <li
                  onClick={() =>
                    dispatch(
                      setSearchBar({
                        fieldName: "season",
                        value: "All Season<",
                      })
                    )
                  }
                >
                  All Season
                </li>
                <li
                  onClick={() =>
                    dispatch(
                      setSearchBar({
                        fieldName: "season",
                        value: "Preseason",
                      })
                    )
                  }
                >
                  Preseason
                </li>
                <li
                  onClick={() =>
                    dispatch(
                      setSearchBar({
                        fieldName: "season",
                        value: "Regular Season",
                      })
                    )
                  }
                >
                  Regular Season
                </li>
                <li
                  onClick={() =>
                    dispatch(
                      setSearchBar({
                        fieldName: "season",
                        value: "Playoffs",
                      })
                    )
                  }
                >
                  Playoffs
                </li>
              </ul>
            </div>
            <div className="nav-button-container">
              <button
                className={`unset ${
                  searchBarValues?.team !== "ALL TEAMS" && "clicked"
                } `}
                title="All Teams"
              >
                <a>{searchBarValues?.team}</a>
                <img src={imgDown} alt="caret" />
              </button>
              <ul className="nav-button-submenu teams">
                {teamsData[selectedLeague]?.map((team) => {
                  return (
                    <li
                      key={team?.name}
                      onClick={() =>
                        dispatch(
                          setSearchBar({
                            fieldName: "team",
                            value: team.name,
                          })
                        )
                      }
                    >
                      {team?.name}
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="nav-button-container">
              <button
                className={`unset ${
                  searchBarValues?.division !== "ALL DIVSION" && "clicked"
                }
                
                `}
                title="All Divisions"
              >
                <a>{searchBarValues?.division}</a>
                <img src={imgDown} alt="caret" />
              </button>
              <ul className="nav-button-submenu divisions">
                {divisionsData[selectedLeague]?.map((division) => {
                  return (
                    <li
                      key={division.name}
                      onClick={() =>
                        dispatch(
                          setSearchBar({
                            fieldName: "division",
                            value: division.name,
                          })
                        )
                      }
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
                  searchBarValues?.conference !== "ALL CONFERENCE" && "clicked"
                }
               
                  `}
                name="all-conferences"
                title="All Conferences"
              >
                <a>{searchBarValues?.conference}</a>
                <img src={imgDown} alt="caret" />
              </button>
              <ul className="nav-button-submenu conferences">
                {conferencesData[selectedLeague]?.map((item) => {
                  return (
                    <li
                      key={item}
                      onClick={() =>
                        dispatch(
                          setSearchBar({
                            fieldName: "conference",
                            value: item,
                          })
                        )
                      }
                    >
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
                // onClick={restValues}
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
