import React, { useEffect, useState } from "react";
import "./tableComponent.css";
import { useLeagueContext } from "../LeagueContext"; // Import LeagueContext

const headerOptions = {
  NHL: [
    "Visitor",
    "Home",
    "Final",
    "Prediction",
    "Time",
    "CO",
    "CITY",
    "PROV",
    "STATE",
    "PLAYER",
    "R",
    "TP",

    "BR",
    "ML",
    "O/U",
    "Sprd",
    "1S",
    "1S 0", // Added for Hockey
    "Reg",
    "OT",
    "SO",
    // "PLAYOFFS",
    // "VISITOR",
    // "HOME",
    // "Final",
    // "Prediction",
    // "Time",
    // "CO",
    // "CITY",
    // "PROV",
    // "STATE",    // "PLAYER",
    // "R",
    // "TP",
    // "BR",
    // "ML",
    // "O/U",
    // "Sprd",
    // "1S",
    // "1S 0",
    // "Reg",
    // "OT",
  ],
  NBA: [
    "Visitor",
    "Home",
    "Final",
    "Prediction",
    "Time",
    "CO",
    "CITY",
    "PROV",
    "STATE",
    "PLAYER",
    "R",
    "TP",
    "BR",
    "ML",
    "Sprd",
    "1S",
    "1S 0",
    "1SW3",
    "2SW3",
    "1SW7",
    "2SW7",
    "Reg", // Remove EI (Keep OT)
    "OT",
  ],
  MLB: [
    "Visitor",
    "Home",
    "Final",
    "Prediction",
    "Time",
    "CO",
    "CITY",
    "PROV",
    "STATE",
    "PLAYER",
    "R",
    "TP",
    "BR",
    "ML",
    "O/U",
    "Sprd",
    "1S",
    "1S0",
    "1SW2",
    "2SW2",

    "Reg",
    "EI",
  ],
  NFL: [
    // REGULAR SEASON
    "Visitor",
    "Home",
    "Final",
    "Prediction",
    "Time",
    "CO",
    "CITY",
    "PROV",
    "STATE",
    "PLAYER",
    "R",
    "TP",
    "BR",
    "ML",
    "O/U",
    "Sprd",
    "1S",
    "1S0",
    "2S0",
    "1SW3",
    "2SW3",
    "1SW7",
    "2SW7",
    "Reg",
    "OT",

    // Play Offs
    // "Visitor",
    // "Home",
    // "Final",
    // "Prediction",
    // "Time",
    // "CO",
    // "CITY PROV/STATE",
    // "PLAYER",
    // "R",
    // "TP",
    // "BR",
    // "ML",
    // "O/U",
    // "Sprd",
    // "1S",
    // "1S0",
    // "2S0",
    // "1SW3",
    // "2SW3",
    // "1SW7",
    // "2SW7",
    // "Reg",
    // "OT",
  ],
  WNBA: [
    "Visitor",
    "Home",
    "Final",
    "Prediction",
    "Time",
    "CO",
    "CITY",
    "PROV",
    "STATE",
    "PLAYER",
    "R",
    "TP",
    "BR",
    "ML",
    "Sprd",
    "1S",
    "1S 0",
    "1SW3",
    "2SW3",
    "1SW7",
    "2SW7",
    "Reg", // Remove EI (Keep OT)
    "OT",
  ],
  CFL: [
    // REGULAR SEASON
    "Visitor",
    "Home",
    "Final",
    "Prediction",
    "Time",
    "CO",
    "CITY",
    "PROV",
    "STATE",
    "PLAYER",
    "R",
    "TP",
    "BR",
    "ML",
    "O/U",
    "Sprd",
    "1S",
    "1S0",
    "2S0",
    "1SW3",
    "2SW3",
    "1SW7",
    "2SW7",
    "Reg",
    "OT",

    // Play Offs
    // "Visitor",
    // "Home",
    // "Final",
    // "Prediction",
    // "Time",
    // "CO",
    // "CITY PROV/STATE",
    // "PLAYER",
    // "R",
    // "TP",
    // "BR",
    // "ML",
    // "O/U",
    // "Sprd",
    // "1S",
    // "1S0",
    // "2S0",
    // "1SW3",
    // "2SW3",
    // "1SW7",
    // "2SW7",
    // "Reg",
    // "OT",
  ],
  NCAAF: [
    // REGULAR SEASON
    "Visitor",
    "Home",
    "Final",
    "Prediction",
    "Time",
    "CO",
    "CITY",
    "PROV",
    "STATE",
    "PLAYER",
    "R",
    "TP",
    "BR",
    "ML",
    "O/U",
    "Sprd",
    "1S",
    "1S0",
    "2S0",
    "1SW3",
    "2SW3",
    "1SW7",
    "2SW7",
    "Reg",
    "OT",

    // Play Offs
    // "Visitor",
    // "Home",
    // "Final",
    // "Prediction",
    // "Time",
    // "CO",
    // "CITY PROV/STATE",
    // "PLAYER",
    // "R",
    // "TP",
    // "BR",
    // "ML",
    // "O/U",
    // "Sprd",
    // "1S",
    // "1S0",
    // "2S0",
    // "1SW3",
    // "2SW3",
    // "1SW7",
    // "2SW7",
    // "Reg",
    // "OT",
  ],
  UFL: [
    // REGULAR SEASON
    "Visitor",
    "Home",
    "Final",
    "Prediction",
    "Time",
    "CO",
    "CITY",
    "PROV",
    "STATE",
    "PLAYER",
    "R",
    "TP",
    "BR",
    "ML",
    "O/U",
    "Sprd",
    "1S",
    "1S0",
    "2S0",
    "1SW3",
    "2SW3",
    "1SW7",
    "2SW7",
    "Reg",
    "OT",

    // Play Offs
    // "Visitor",
    // "Home",
    // "Final",
    // "Prediction",
    // "Time",
    // "CO",
    // "CITY PROV/STATE",
    // "PLAYER",
    // "R",
    // "TP",
    // "BR",
    // "ML",
    // "O/U",
    // "Sprd",
    // "1S",
    // "1S0",
    // "2S0",
    // "1SW3",
    // "2SW3",
    // "1SW7",
    // "2SW7",
    // "Reg",
    // "OT",
  ],
  NCCA: [
    // NCCA header options
  ],
  NCAAB: [
    "Visitor",
    "Home",
    "Final",
    "Prediction",
    "Time",
    "CO",
    "CITY",
    "PROV",
    "STATE",
    "PLAYER",
    "R",
    "TP",
    "BR",
    "ML",
    "Sprd",
    "1S",
    "1S 0",
    "1SW3",
    "2SW3",
    "1SW7",
    "2SW7",
    "Reg", // Remove EI (Keep OT)
    "OT",
  ],
};

const TableComponent = () => {
  const { selectedLeague } = useLeagueContext();
  const [filteredHeaderOptions, setFilteredHeaderOptions] = useState([]);

  useEffect(() => {
    if (selectedLeague && headerOptions[selectedLeague]) {
      setFilteredHeaderOptions(headerOptions[selectedLeague]);
    } else {
      setFilteredHeaderOptions([]); // Set empty array for consistency
    }
  }, [selectedLeague]);

  const dataRows = [
    {
      visitor: "Toronto",
      home: "Detroit",
      final: "1 - 5",
      prediction: "0-5",
      time: "8:12:15 AM",
      co: "CA",
      city: "NL",
      prov: "NL",
      state: "NL",
      player: "Topdog",
      r: "45 Pts",
      tp: "24 Pts",
      br: true,
      odds: "43",
      accuracy: "43",
      shutOut: "Regulation",
      endings: "Regulation",
    },
    {
      visitor: "Minnesota",
      home: "Saint. Catherines",
      final: "1 - 5",
      prediction: "0-5",
      time: "8:12:15 AM",
      co: "CA",
      city: "NL",
      prov: "NL",
      state: "NL",
      player: "Topdog",
      r: "45 Pts",
      tp: "24 Pts",
      br: false,
      odds: "43",
      accuracy: "43",
      shutOut: "Regulation",
      endings: "Regulation",
    },
    // Add more rows here up to 580 lines...
  ];
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            {/* <td>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={20}
                height={21}
                viewBox="0 0 20 21"
                fill="none"
              >
                <path
                  d="M17.5 18L12.5 13M17.5 18V14M17.5 18H13.5M2.5 14V18M2.5 18H6.5M2.5 18L7.5 13M17.5 7V3M17.5 3H13.5M17.5 3L12.5 8M2.5 7V3M2.5 3H6.5M2.5 3L7.5 8"
                  stroke="#737373"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </td> */}
            {filteredHeaderOptions.map((item, ind) => (
              <th key={ind} className="text-xs font-medium">
                {item}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dataRows.map((row, index) => (
            <tr key={index} className="h-14 bg-[#181818] text-white separator">
              {/* <td>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={20}
                height={21}
                viewBox="0 0 20 21"
                fill="none"
              >
                <path
                  d="M17.5 18L12.5 13M17.5 18V14M17.5 18H13.5M2.5 14V18M2.5 18H6.5M2.5 18L7.5 13M17.5 7V3M17.5 3H13.5M17.5 3L12.5 8M2.5 7V3M2.5 3H6.5M2.5 3L7.5 8"
                  stroke="#737373"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </td> */}
              <td
                className="text-xs font-medium text-center"
                // style={{ color: "#ffb800" }}
              >
                {row.visitor}
              </td>
              <td
                className="text-xs font-medium text-center"
                // style={{ color: "#ffb800" }}
              >
                {row.home}
              </td>
              <td
                className="text-xs font-medium text-center"
                style={{ color: "#ffff00" }}
              >
                {row.final}
              </td>
              <td className="text-xs font-medium text-center">
                {row.prediction}
              </td>
              <td className="text-xs font-medium text-center">{row.time}</td>
              <td className="text-xs font-medium text-center">{row.co}</td>
              <td className="text-xs font-medium text-center">{row.prov}</td>
              <td className="text-xs font-medium text-center">{row.state}</td>
              <td className="text-xs font-medium text-center">{row.city}</td>
              <td className="text-xs font-medium text-center">{row.prov}</td>

              <td
                className="text-xs font-medium text-center"
                // style={{ color: "#ffb800" }}
              >
                {row.player}
              </td>
              <td className="text-xs font-medium text-center">{row.r}</td>
              <td className="text-xs font-medium text-center">{row.tp}</td>
              <td
              // style={{
              //   background: row.br
              //     ? "linear-gradient(180deg, #BE8200 0%, #FEF098 47.4%, #EFD261 100%)"
              //     : "transparent",
              // }}
              >
                {row.br && (
                  <span className="flex justify-center items-center">
                    {/* <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={39}
                      height={39}
                      viewBox="0 0 39 39"
                      fill="none"
                    >
                      <circle
                        cx="19.1313"
                        cy="19.1875"
                        r="14.2617"
                        stroke="black"
                        strokeWidth={4}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M23.8853 16.0181L17.5467 22.3566L14.3774 19.1873"
                        stroke="black"
                        strokeWidth={4}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg> */}
                  </span>
                )}
              </td>
              <td
                className="text-xs font-medium text-center"
                // style={{
                //   backgroundColor: "rgb(98 197 85 / 100%)",
                //   color: "rgb(248 250 19 / 100%)",
                // }}
              >
                {row.odds}
              </td>
              <td
                className="text-xs font-medium text-center"
                // style={{
                //   backgroundColor: "rgb(98 197 85 / 100%)",
                //   color: "rgb(248 250 19 / 100%)",
                // }}
              >
                {row.accuracy}
              </td>
              <td
                className="text-xs font-medium text-center"
                // style={{
                //   backgroundColor: "rgb(230 28 28 / 100%)",
                //   color: "rgb(248 250 19 / 100%)",
                // }}
              >
                {row.shutOut}
              </td>
              <td
                className="text-xs font-medium text-center"
                // style={{
                //   backgroundColor: "rgb(98 197 85 / 100%)",
                //   color: "rgb(248 250 19 / 100%)",
                // }}
              >
                {row.endings}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;
