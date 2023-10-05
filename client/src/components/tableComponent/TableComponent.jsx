import "./tableComponent.css";

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

const TableComponent = () => {
  return (
    <table className=" mt-5 w-full table-auto border-separate ">
      <thead>
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
                {item}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
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
          <td className=" text-xs font-medium text-center">Minnesota</td>
          <td className=" text-xs font-medium text-center">Detroit</td>
          <td className=" text-xs font-medium text-center">1 - 5</td>
          <td className=" text-xs font-medium text-center">0-5</td>
          <td className=" text-xs font-medium text-center">8:12:15 AM </td>
          <td className=" text-xs font-medium text-center">CA</td>
          <td className=" text-xs font-medium text-center">NL</td>
          <td className=" text-xs font-medium text-center"></td>
          <td className=" text-xs font-medium text-center">St. John’s</td>
          <td className=" text-xs font-medium text-center">Topdog</td>
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
          <td className=" text-xs font-medium text-center">Minnesota</td>
          <td className=" text-xs font-medium text-center">Detroit</td>
          <td className=" text-xs font-medium text-center">1 - 5</td>
          <td className=" text-xs font-medium text-center">0-5</td>
          <td className=" text-xs font-medium text-center">8:12:15 AM </td>
          <td className=" text-xs font-medium text-center">CA</td>
          <td className=" text-xs font-medium text-center">NL</td>
          <td className=" text-xs font-medium text-center"></td>
          <td className=" text-xs font-medium text-center">St. John’s</td>
          <td className=" text-xs font-medium text-center">Topdog</td>
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
        </tr>
        <tr className=" h-14 bg-[#181818] text-white">
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
          <td className=" text-xs font-medium text-center">Minnesota</td>
          <td className=" text-xs font-medium text-center">Detroit</td>
          <td className=" text-xs font-medium text-center">1 - 5</td>
          <td className=" text-xs font-medium text-center">0-5</td>
          <td className=" text-xs font-medium text-center">8:12:15 AM </td>
          <td className=" text-xs font-medium text-center">CA</td>
          <td className=" text-xs font-medium text-center">NL</td>
          <td className=" text-xs font-medium text-center"></td>
          <td className=" text-xs font-medium text-center">St. John’s</td>
          <td className=" text-xs font-medium text-center">Topdog</td>
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
        </tr>
      </tbody>
    </table>
  );
};

export default TableComponent;
