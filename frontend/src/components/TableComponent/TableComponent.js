import React, { useEffect, useState } from "react";
import "./tableComponent.css";
import { useLeagueContext } from "../LeagueContext"; // Import LeagueContext
import { headerOptions } from "./data"; // Import headerOptions
import { getUserById } from "../../Apis/auth";

const TableComponent = () => {
  const { selectedLeague } = useLeagueContext();
  const [filteredHeaderOptions, setFilteredHeaderOptions] = useState([]);
  const id = localStorage.getItem("_id");

  const getUser = () => {
    getUserById(id).then((res) => {
      console.log(res);
    });
  };

  useEffect(() => {
    if (selectedLeague && headerOptions[selectedLeague]) {
      setFilteredHeaderOptions(headerOptions[selectedLeague]);
    } else {
      setFilteredHeaderOptions([]); // Set empty array for consistency
    }
    getUser();
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

              <td
                className="text-xs font-medium text-center"
              >
                {row.visitor}
              </td>
              <td
                className="text-xs font-medium text-center"
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
              >
                {row.player}
              </td>
              <td className="text-xs font-medium text-center">{row.r}</td>
              <td className="text-xs font-medium text-center">{row.tp}</td>
              <td
              
              >
                {row.br && (
                  <span className="flex justify-center items-center">
                  </span>
                )}
              </td>
              <td
                className="text-xs font-medium text-center"
              >
                {row.odds}
              </td>
              <td
                className="text-xs font-medium text-center"
                
              >
                {row.accuracy}
              </td>
              <td
                className="text-xs font-medium text-center"
                
              >
                {row.shutOut}
              </td>
              <td
                className="text-xs font-medium text-center"
                
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
