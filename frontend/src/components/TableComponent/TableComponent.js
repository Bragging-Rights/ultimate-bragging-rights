import React, { useState } from "react";
import Button from "@mui/material/Button";
import "./tableComponent.css";

const headerOption = [
  "Visitor",
  "Home",
  "Final",
  "Prediction",
  "Time",
  "CO",
  "CITY PROV/STATE",
  "PLAYER",
  "Rank",
  "TP",
  "BR",
  "Fav",
  "UD",
  "Sprd",
  "O/U",
  "1S",
  "1SW2",
  "2SW2",
  "1SW3",
  "2SW3",
  "1SW7",
  "2SW7",
  "1SHO",
  "2SHO",
  "Reg",
  "SO",
  "OT/EI",
  "UD",
];

const TableComponent = () => {
  const [openDialog, setOpenDialog] = useState(false);

  const handleDrag = (e, ui) => {
    // Handle drag logic if needed
  };


  return (
    <div
      className="table-container"
      style={{ marginTop: "1.25rem", width: "100%" }}
    >
      

      <table style={{ borderCollapse: "separate", width: "100%" }}>
        <thead style={{ fontSize: "0.8rem" }}>
          <tr>
            <td>
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
            </td>
            {headerOption?.map((item, ind) => (
              <th
                key={ind}
                className="text-xs font-medium"
                style={{
                  background:
                    "linear-gradient(180deg, #BE8200 0%, #FEF098 47.4%, #EFD261 100%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                
                {item}
              </th>
            ))}
          </tr>
        </thead>
        <tbody style={{ fontSize: "0.8rem" }}>
          <tr className=" h-14 bg-[#181818] text-white  separator">
            <td>
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
            </td>
            <td
              className=" text-xs font-medium text-center"
              style={{ color: "#ffb800" }}
            >
              Minnesota
            </td>
            <td
              className=" text-xs font-medium text-center"
              style={{ color: "#ffb800" }}
            >
              Detroit
            </td>
            <td
              className=" text-xs font-medium text-center"
              style={{ color: "#ffff00" }}
            >
              1 - 5
            </td>
            <td className=" text-xs font-medium text-center">0-5</td>
            <td className=" text-xs font-medium text-center">8:12:15 AM </td>
            <td className=" text-xs font-medium text-center">CA</td>
            <td className=" text-xs font-medium text-center">NL</td>
            <td className=" text-xs font-medium text-center"></td>
            <td className=" text-xs font-medium text-center">St. John’s</td>
            <td
              className=" text-xs font-medium text-center"
              style={{ color: "#ffb800" }}
            >
              Topdog
            </td>
            <td className=" text-xs font-medium text-center">1</td>
            <td className=" text-xs font-medium text-center">97 PTS</td>
            <td
              className=""
              style={{
                background:
                  "linear-gradient(180deg, #BE8200 0%, #FEF098 47.4%, #EFD261 100%)",
              }}
            >
              <span className=" flex justify-center items-center">
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
              </span>
            </td>
            <td
              style={{
                backgroundColor: "rgb(98 197 85 / 100%)",
                fontSize: "1rem",
                fontWeight: 800,
                lineHeight: "1.5rem",
                textAlign: "center",
                width: "3.5rem",
                textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                padding: "5px",
              }}
            >
              36
            </td>
            <td
              style={{
                backgroundColor: "rgb(98 197 85 / 100%)",
                fontSize: "1rem",
                fontWeight: 800,
                lineHeight: "1.5rem",
                textAlign: "center",
                width: "3.5rem",
                textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                color: "rgb(248 250 19 / 100%)",
                padding: "5px",
              }}
            >
              36
            </td>
            <td
              style={{
                backgroundColor: "rgb(230 28 28 / 100%)",
                fontSize: "1rem",
                fontWeight: 800,
                lineHeight: "1.5rem",
                textAlign: "center",
                width: "3.5rem",
                textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                color: "rgb(248 250 19 / 100%)",
                padding: "5px",
              }}
            >
              2
            </td>
            <td
              style={{
                background:
                  "linear-gradient(rgb(190, 130, 0) 0%, rgb(254, 240, 152) 47.4%, rgb(239, 210, 97) 100%)",
                filter: "blur(2px)",
                fontSize: "1rem",
                fontWeight: 800,
                lineHeight: "1.5rem",
                textAlign: "center",
                width: "3.5rem",
                color: "rgb(0 0 0 / 100%)",
                padding: "5px",
              }}
            >
              23
            </td>
            <td
              style={{
                backgroundColor: "rgb(98 197 85 / 100%)",
                fontSize: "1rem",
                fontWeight: 800,
                lineHeight: "1.5rem",
                textAlign: "center",
                width: "3.5rem",
                textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                color: "rgb(248 250 19 / 100%)",
                padding: "5px",
              }}
            >
              0
            </td>
            <td
              style={{
                backgroundColor: "rgb(98 197 85 / 100%)",
                fontSize: "1rem",
                fontWeight: 800,
                lineHeight: "1.5rem",
                textAlign: "center",
                width: "3.5rem",
                textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                color: "rgb(248 250 19 / 100%)",
                padding: "5px",
              }}
            >
              2
            </td>
          </tr>

          <tr className=" h-14  text-white">
            <td>
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
            </td>
            <td
              className=" text-xs font-medium text-center"
              style={{ color: "#ffb800" }}
            >
              Minnesota
            </td>
            <td
              className=" text-xs font-medium text-center"
              style={{ color: "#ffb800" }}
            >
              Detroit
            </td>
            <td
              className=" text-xs font-medium text-center"
              style={{ color: "#ffff00" }}
            >
              1 - 5
            </td>
            <td className=" text-xs font-medium text-center">0-5</td>
            <td className=" text-xs font-medium text-center">8:12:15 AM </td>
            <td className=" text-xs font-medium text-center">CA</td>
            <td className=" text-xs font-medium text-center">NL</td>
            <td className=" text-xs font-medium text-center"></td>
            <td className=" text-xs font-medium text-center">St. John’s</td>
            <td
              className=" text-xs font-medium text-center"
              style={{ color: "#ffb800" }}
            >
              Topdog
            </td>
            <td className=" text-xs font-medium text-center">1</td>
            <td className=" text-xs font-medium text-center">97 PTS</td>
            <td
              className=""
              style={{
                background:
                  "linear-gradient(180deg, #BE8200 0%, #FEF098 47.4%, #EFD261 100%)",
              }}
            >
              <span className=" flex justify-center items-center">
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
              </span>
            </td>
            <td
              style={{
                backgroundColor: "rgb(98 197 85 / 100%)",
                fontSize: "1rem",
                fontWeight: 800,
                lineHeight: "1.5rem",
                textAlign: "center",
                width: "3.5rem",
                textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                padding: "5px",
              }}
            >
              36
            </td>
            <td
              style={{
                backgroundColor: "rgb(98 197 85 / 100%)",
                fontSize: "1rem",
                fontWeight: 800,
                lineHeight: "1.5rem",
                textAlign: "center",
                width: "3.5rem",
                textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                color: "rgb(248 250 19 / 100%)",
                padding: "5px",
              }}
            >
              36
            </td>
            <td
              style={{
                backgroundColor: "rgb(230 28 28 / 100%)",
                fontSize: "1rem",
                fontWeight: 800,
                lineHeight: "1.5rem",
                textAlign: "center",
                width: "3.5rem",
                textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                color: "rgb(248 250 19 / 100%)",
                padding: "5px",
              }}
            >
              2
            </td>
            <td
              style={{
                background:
                  "linear-gradient(rgb(190, 130, 0) 0%, rgb(254, 240, 152) 47.4%, rgb(239, 210, 97) 100%)",
                filter: "blur(2px)",
                fontSize: "1rem",
                fontWeight: 800,
                lineHeight: "1.5rem",
                textAlign: "center",
                width: "3.5rem",
                color: "rgb(0 0 0 / 100%)",
                padding: "5px",
              }}
            >
              23
            </td>
            <td
              style={{
                backgroundColor: "rgb(98 197 85 / 100%)",
                fontSize: "1rem",
                fontWeight: 800,
                lineHeight: "1.5rem",
                textAlign: "center",
                width: "3.5rem",
                textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                color: "rgb(248 250 19 / 100%)",
                padding: "5px",
              }}
            >
              0
            </td>
            <td
              style={{
                backgroundColor: "rgb(98 197 85 / 100%)",
                fontSize: "1rem",
                fontWeight: 800,
                lineHeight: "1.5rem",
                textAlign: "center",
                width: "3.5rem",
                textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                color: "rgb(248 250 19 / 100%)",
                padding: "5px",
              }}
            >
              2
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;
