import React from "react";

const headerOption = [
  "Visitor",
  "Home",
  "Final",
  "Prediction",
  "Time",
  "CO",
  "PROV",
];
const NightResult = () => {
  return (
    <table className=" mt-5 w-full table-auto border-separate ">
      <thead>
        <tr>
          {headerOption?.map((item, ind) => {
            return (
              <th
                key={ind}
                className=" text-xs font-medium"
                style={{
                  background:
                    "linear-gradient(180deg, #BE8200 0%, #FEF098 47.4%, #EFD261 100%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {/* {item} */}
              </th>
            );
          })}
          <th
            className="  uppercase text-xs font-medium
            text-[#FEF098]
          "
          >
            MINNESOTA <br /> vs <br />
            Tampa bay
          </th>
          <th
            className="  uppercase text-xs font-medium
            text-[#FEF098]
          "
          >
            MINNESOTA <br /> vs <br />
            Tampa bay
          </th>
          <th
            className="  uppercase text-xs font-medium
            text-[#FEF098]
          "
          >
            MINNESOTA <br /> vs <br />
            Tampa bay
          </th>
          <th
            className="  uppercase text-xs font-medium
            text-[#FEF098]
          "
          >
            MINNESOTA <br /> vs <br />
            Tampa bay
          </th>
          <th
            className="  uppercase text-xs font-medium
            text-[#FEF098]
          "
          >
            MINNESOTA <br /> vs <br />
            Tampa bay
          </th>
          <th
            className="  uppercase text-xs font-medium
            text-[#FEF098]
          "
          >
            MINNESOTA <br /> vs <br />
            Tampa bay
          </th>
          <th
            className="  uppercase text-xs font-medium
            text-[#FEF098]
          "
          >
            MINNESOTA <br /> vs <br />
            Tampa bay
          </th>
        </tr>
      </thead>
      <tbody>
        <tr className=" h-14 bg-[#181818] text-white  separator">
          <td className=" text-xs font-medium text-center">CO</td>
          <td className=" text-xs font-medium text-center">City Prov/State</td>
          <td className=" text-xs font-medium text-center">PLAYER</td>
          <td className=" text-xs font-medium text-center">R</td>
          <td className=" text-xs font-medium text-center">F</td>
          <td className=" text-xs font-medium text-center">1-5 (SO)</td>
          <td className=" text-xs font-medium text-center">1-5 (OT)</td>
          <td className=" text-xs font-medium text-center">1-5</td>
          <td className=" text-xs font-medium text-center">1-5</td>
          <td className=" text-xs font-medium text-center">1-5</td>
          <td className=" text-xs font-medium text-center">1-5</td>
          <td className=" text-xs font-medium text-center">1-5</td>
          <td className=" text-xs font-medium text-center">1-5</td>
          <td className=" text-xs font-medium text-center">1-5</td>
        </tr>
        <tr>
          <td
            className=" text-xs font-medium text-center
            text-[#FFB800]
          "
          >
            CA
          </td>
          <td className=" text-xs font-medium text-center text-white">
            St. John’s NL
          </td>
          <td
            className=" text-xs font-medium text-center
           text-[#FFB800]
          "
          >
            Topdog
          </td>
          <td className=" text-xs font-medium text-center text-white">2</td>
          <td className=" text-xs font-medium text-center text-white">
            24 Pts
          </td>

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
            className=" bg-[#62C555] text-base font-extrabold w-14 text-center"
            style={{
              textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            }}
          >
            36
          </td>
          <td
            className=" bg-[#62C555] text-base font-extrabold w-14 text-center text-[#F8FA13]"
            style={{
              textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            }}
          >
            36
          </td>
          <td
            className=" bg-[#E61C1C] text-base font-extrabold w-14 text-center text-[#F8FA13]"
            style={{
              textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            }}
          >
            2
          </td>
          <td
            className="  text-base font-extrabold w-14 text-center text-black"
            style={{
              background:
                " linear-gradient(180deg, #BE8200 0%, #FEF098 47.4%, #EFD261 100%)",
              filter: " blur(2px)",
            }}
          >
            23
          </td>
          <td
            className=" bg-[#62C555] text-base font-extrabold w-14 text-center text-[#F8FA13]"
            style={{
              textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            }}
          >
            0
          </td>
          <td
            className=" bg-[#62C555] text-base font-extrabold w-14 text-center text-[#F8FA13]"
            style={{
              textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            }}
          >
            2
          </td>
          <td
            className=" bg-[#62C555] text-base font-extrabold w-14 text-center text-[#F8FA13]"
            style={{
              textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            }}
          >
            2
          </td>
          <td
            className=" bg-[#62C555] text-base font-extrabold w-14 text-center text-[#F8FA13]"
            style={{
              textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            }}
          >
            2
          </td>
        </tr>
        <tr className=" bg-[#1B1C21]">
          <td
            className=" text-xs font-medium text-center
            text-[#FFB800]
          "
          >
            CA
          </td>
          <td className=" text-xs font-medium text-center text-white">
            St. John’s NL
          </td>
          <td
            className=" text-xs font-medium text-center
           text-[#FFB800]
          "
          >
            Topdog
          </td>
          <td className=" text-xs font-medium text-center text-white">2</td>
          <td className=" text-xs font-medium text-center text-white">
            24 Pts
          </td>

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
            className=" bg-[#62C555] text-base font-extrabold w-14 text-center"
            style={{
              textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            }}
          >
            36
          </td>
          <td
            className=" bg-[#62C555] text-base font-extrabold w-14 text-center text-[#F8FA13]"
            style={{
              textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            }}
          >
            36
          </td>
          <td
            className=" bg-[#E61C1C] text-base font-extrabold w-14 text-center text-[#F8FA13]"
            style={{
              textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            }}
          >
            2
          </td>
          <td
            className="  text-base font-extrabold w-14 text-center text-black"
            style={{
              background:
                " linear-gradient(180deg, #BE8200 0%, #FEF098 47.4%, #EFD261 100%)",
              filter: " blur(2px)",
            }}
          >
            23
          </td>
          <td
            className=" bg-[#62C555] text-base font-extrabold w-14 text-center text-[#F8FA13]"
            style={{
              textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            }}
          >
            0
          </td>
          <td
            className=" bg-[#62C555] text-base font-extrabold w-14 text-center text-[#F8FA13]"
            style={{
              textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            }}
          >
            2
          </td>
          <td
            className=" bg-[#62C555] text-base font-extrabold w-14 text-center text-[#F8FA13]"
            style={{
              textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            }}
          >
            2
          </td>
          <td
            className=" bg-[#62C555] text-base font-extrabold w-14 text-center text-[#F8FA13]"
            style={{
              textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            }}
          >
            2
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default NightResult;
