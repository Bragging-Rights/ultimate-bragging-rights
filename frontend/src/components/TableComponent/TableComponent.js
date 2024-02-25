import React from "react";
import "./tableComponent.css"; // Assuming SVG paths are defined here

const headerOption = [
  "Visitor",
  "Home",
  "Final",
  "Prediction",
  "Time",
  "CO",
  "PROV",
  "STATE",
  "CITY",
  "PLAYER",
  "R",
  "TP",
  "BR",
  "F",
  "U",
  "ODDS",
  "ACCURACY",
  "SHUT-OUT",
  "Endings",
];

const rowData = {
  Visitor: "Minnesota",
  Home: "Detroit",
  Final: "1 - 5",
  Prediction: "0-5",
  Time: "8:12:15 AM",
  CO: "CA",
  PROV: "NL",
  STATE: "",
  CITY: "St. John’s",
  PLAYER: "Topdog",
  R: "1",
  TP: "97 PTS",
  BR: "",
  F: "",
  U: "",
  ODDS: "",
  ACCURACY: "",
  "SHUT-OUT": "",
  Endings: "",
};

const TableComponent = () => {
  const handleDrag = (e, ui) => {
    // Handle drag logic if needed
  };

  return (
    <div className="table-container">
      <table className="mt-5 w-full">
        <thead>
          <tr className="text-white">
            <td>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={20}
                height={21}
                viewBox="0 0 20 21"
                fill="none"
              >
                {/* ... SVG path definition in tableComponent.css ... */}
              </svg>
            </td>
            {headerOption.map((item, ind) => (
              <th
                key={ind}
                className="text-xs font-medium padding: 8px"
                style={{
                  background:
                    "linear-gradient(180deg, #181818 0%, #2C2C2C 100%)",
                  color: "#fff",
                }}
              >
                {item}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr className="h-14 even-row text-white">
            <td>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={20}
                height={21}
                viewBox="0 0 20 21"
                fill="none"
              >
                {/* ... SVG path definition in tableComponent.css ... */}
              </svg>
            </td>
            {headerOption.map((item, ind) => (
              <td
                key={ind}
                className="text-xs font-medium text-center padding: 8px"
                style={{ color: "#fff" }}
              >
                {rowData[item]}
              </td>
            ))}
          </tr>
          <tr className="h-14 odd-row text-white">
            <td>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={20}
                height={21}
                viewBox="0 0 20 21"
                fill="none"
              >
                {/* ... SVG path definition in tableComponent.css ... */}
              </svg>
            </td>
            {headerOption.map((item, ind) => (
              <td
                key={ind}
                className="text-xs font-medium text-center padding: 8px"
                style={{ color: "#fff" }}
              >
                {rowData[item]}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;
