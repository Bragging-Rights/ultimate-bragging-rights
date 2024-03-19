import React from "react";
import "./NightResult.css";
const { data, headers, headerOption } = require("./dump");

const NightResult = () => {
  const tableCellStyle = {
    fontSize: "0.75rem",
    fontWeight: "500",
    textAlign: "center",
    padding: "0.5rem",
    border: "1px   #ddd", // Border color
  };

  const headerCellStyle = {
    ...tableCellStyle,
    backgroundColor: "#181818",
    color: "white",
    height: "2.5rem",
  };

  const SvgIcon = () => (
    <svg
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
    </svg>
  );

  return (
    <table className=" mt-5 w-full table-auto border-separate ">
      <thead>
        <tr>
          {headerOption?.map((item, ind) => {
            return (
              <th
                key={ind}
                style={{
                  background:
                    "linear-gradient(180deg, #BE8200 0%, #FEF098 47.4%, #EFD261 100%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontSize: "0.75rem",
                  fontWeight: "500",
                  color: "#FEF098",
                }}
              ></th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        <tr style={headerCellStyle}>
          {headers.map((header, index) => (
            <td key={index} style={tableCellStyle}>
              {header.split("\n").map((text, i) => (
                <React.Fragment key={i}>
                  {text}
                  <br />
                </React.Fragment>
              ))}
            </td>
          ))}
        </tr>
        {data.map((item, index) => (
          <tr
            key={index}
            style={{
              backgroundColor: item.backgroundColor,
            }}
          >
            <td className="nr-state-rank">{item.city}</td>
            <td className="nr-player-tp-rank">{item.player}</td>
            <td className="nr-state-rank">{item.rank}</td>
            <td className="nr-player-tp-rank">{item.tp}</td>
            <td className="nr-player-tp-rank">{item.br}</td>
            <td className="nr-bg">
              <span className="nr-svg-span">
                <SvgIcon />
              </span>
            </td>
            <td className="nr-details-2">{item.w}</td>
            <td className="nr-details">{item.l}</td>
            <td className="nr-details-3">{item.apg}</td>
            <td className="nr-details-1">{item.cs}</td>
            <td className="nr-details">{item.game1}</td>
            <td className="nr-details">{item.game2}</td>
            <td className="nr-details">{item.game3}</td>
            <td className="nr-details">{item.game4}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default NightResult;
