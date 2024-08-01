import React from "react";
import "./Styles.css"; // Import the CSS file containing the hide-scrollbar class

const StandingsTables = () => {
  return (
    <div
      className="hide-scrollbar"
      style={{ color: "white", marginTop: "10px", overflowX: "auto" }}
    >
      <table className="custom-table ">
        <thead>
          <tr>
            <th style={{ cursor: "pointer" }}>TEAMS</th>
            <th style={{ cursor: "pointer" }}>CO</th>
            <th style={{ cursor: "pointer" }}>CTY/PROV</th>
            <th style={{ cursor: "pointer" }}>FAV</th>
            <th style={{ cursor: "pointer" }}>RANK</th>
            <th style={{ cursor: "pointer" }}>PLAYER</th>
            <th style={{ cursor: "pointer" }}>WPT</th>
            <th style={{ cursor: "pointer" }}>GP</th>
            <th style={{ cursor: "pointer" }}>BR</th>
            <th style={{ cursor: "pointer" }}>W</th>
            <th style={{ cursor: "pointer" }}>L</th>
            <th style={{ cursor: "pointer" }}>CS</th>
            <th style={{ cursor: "pointer" }}>WS</th>
            <th style={{ cursor: "pointer" }}>LS</th>
            <th style={{ cursor: "pointer" }}>1S </th>
            <th style={{ cursor: "pointer" }}>1S0</th>
            <th style={{ cursor: "pointer" }}>2S0</th>
            <th style={{ cursor: "pointer" }}>1SW2</th>
            <th style={{ cursor: "pointer" }}>2SW2</th>
            <th style={{ cursor: "pointer" }}>1SW3</th>
            <th style={{ cursor: "pointer" }}>2SW3</th>
            <th style={{ cursor: "pointer" }}>1SW7</th>
            <th style={{ cursor: "pointer" }}>2SW7</th>
            <th style={{ cursor: "pointer" }}>ML</th>
            <th style={{ cursor: "pointer" }}>SPRD</th>
            <th style={{ cursor: "pointer" }}>O/U</th>
            <th style={{ cursor: "pointer" }}>APN</th>
            <th style={{ cursor: "pointer" }}>APG</th>
            <th style={{ cursor: "pointer" }}>F</th>
            <th style={{ cursor: "pointer" }}>U</th>
            <th style={{ cursor: "pointer" }}>REG</th>
            <th style={{ cursor: "pointer" }}>OT</th>
            <th style={{ cursor: "pointer" }}>S/O</th>
            <th style={{ cursor: "pointer" }}>EI</th>
            <th style={{ cursor: "pointer" }}>L10</th>
            <th style={{ cursor: "pointer" }}>FPTS</th>
            <th style={{ cursor: "pointer" }}>UPTS</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          <tr>
            <td
              colSpan={37}
              className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center border border-black"
            >
              No data available
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default StandingsTables;
