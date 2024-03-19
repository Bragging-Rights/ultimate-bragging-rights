import React from "react";
import "./NightResult.css"

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
  const tableCellStyle = {
    fontSize: '0.75rem',
    fontWeight: '500',
    textAlign: 'center',
    padding: '0.5rem',
    border: '1px   #ddd', // Border color
  };

  const headerCellStyle = {
    ...tableCellStyle,
    backgroundColor: '#181818',
    color: 'white',
    height: '2.5rem',
  };


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
            >
              {/* {item} */}
            </th>
            );
          })}
          <th
             style={{
                textTransform: "uppercase",
                fontSize: "0.75rem",
                fontWeight: "500",
                color: "#FEF098",
              }}
          >
            MINNESOTA <br /> vs <br />
            Tampa bay
          </th>
          <th
             style={{
                textTransform: "uppercase",
                fontSize: "0.75rem",
                fontWeight: "500",
                color: "#FEF098",
              }}
          >
            MINNESOTA <br /> vs <br />
            Tampa bay
          </th>
          <th
             style={{
                textTransform: "uppercase",
                fontSize: "0.75rem",
                fontWeight: "500",
                color: "#FEF098",
              }}
          >
            MINNESOTA <br /> vs <br />
            Tampa bay
          </th>
          <th
             style={{
                textTransform: "uppercase",
                fontSize: "0.75rem",
                fontWeight: "500",
                color: "#FEF098",
              }}
          >
            MINNESOTA <br /> vs <br />
            Tampa bay
          </th>
          <th
             style={{
                textTransform: "uppercase",
                fontSize: "0.75rem",
                fontWeight: "500",
                color: "#FEF098",
              }}
          >
            MINNESOTA <br /> vs <br />
            Tampa bay
          </th>
          <th
             style={{
                textTransform: "uppercase",
                fontSize: "0.75rem",
                fontWeight: "500",
                color: "#FEF098",
              }}
          >
            MINNESOTA <br /> vs <br />
            Tampa bay
          </th>
          <th
             style={{
                textTransform: "uppercase",
                fontSize: "0.75rem",
                fontWeight: "500",
                color: "#FEF098",
              }}
          >
            MINNESOTA <br /> vs <br />
            Tampa bay
          </th>
        </tr>
      </thead>
      <tbody>
      <tr style={headerCellStyle}>
      {/* <td style={tableCellStyle}>CO</td> */}
      <td style={tableCellStyle}>
  City <br /> Prov/State
</td>  
    <td style={tableCellStyle}>PLAYER</td>
      <td style={tableCellStyle}>Rank</td>
      <td style={tableCellStyle}>TP</td>
      <td style={tableCellStyle}>BR</td>
      <td style={tableCellStyle}>W%</td>
      <td style={tableCellStyle}>W-#</td>
      <td style={tableCellStyle}>L-#</td>
      <td style={tableCellStyle}>APG</td>
      <td style={tableCellStyle}>CS</td>
      <td style={tableCellStyle}>Game 1 <br/> Visitor/Home(pts)</td>
      <td style={tableCellStyle}>Game 2 <br/> Visitor/Home(pts)</td>
      <td style={tableCellStyle}>Game 3 <br/> Visitor/Home(pts)</td>
      <td style={tableCellStyle}>Game 4 <br/> Visitor/Home(pts)</td>

    
    </tr>
    <tr>
      <td
        style={{
          fontSize: '0.75rem',
          fontWeight: 'bold',
          textAlign: 'center',
          color: '#FFB800',
        }}
      >
        CA
      </td>
      <td
        style={{
          fontSize: '0.75rem',
          fontWeight: 'bold',
          textAlign: 'center',
          color: 'white',
        }}
      >
        St. John’s NL
      </td>
      <td
        style={{
          fontSize: '0.75rem',
          fontWeight: 'bold',
          textAlign: 'center',
          color: '#FFB800',
        }}
      >
        Topdog
      </td>
      <td
        style={{
          fontSize: '0.75rem',
          fontWeight: 'bold',
          textAlign: 'center',
          color: 'white',
        }}
      >
        2
      </td>
      <td
        style={{
          fontSize: '0.75rem',
          fontWeight: 'bold',
          textAlign: 'center',
          color: 'white',
        }}
      >
        24 Pts
      </td>
      <td
        style={{
          background:
            'linear-gradient(180deg, #BE8200 0%, #FEF098 47.4%, #EFD261 100%)',
        }}
      >

          <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
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
          backgroundColor: '#62C555',
          fontSize: '1rem',
          fontWeight: 'bold',
          width: '2.5rem',
          textAlign: 'center',
          textShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
          color: 'black',
        }}
      >
        36
      </td>
      <td
        style={{
          backgroundColor: '#62C555',
          fontSize: '1rem',
          fontWeight: 'bold',
          width: '2.5rem',
          textAlign: 'center',
          textShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
          color: '#F8FA13',
        }}
      >
        36
      </td>
      <td
        style={{
          backgroundColor: '#E61C1C',
          fontSize: '1rem',
          fontWeight: 'bold',
          width: '2.5rem',
          textAlign: 'center',
          textShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
          color: '#F8FA13',
        }}
      >
        2
      </td>
      <td
  style={{
    background:
      'linear-gradient(180deg, #BE8200 0%, #FEF098 47.4%, #EFD261 100%)',
    fontSize: '1rem',
    fontWeight: 'bold',
    width: '2.5rem',
    textAlign: 'center',
    textShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    color: 'black',
    filter: 'blur(2px)',
  }}
>
  23
</td>
      <td
  style={{
    backgroundColor: '#62C555',
    fontSize: '1rem',
    fontWeight: 'bold',
    width: '2.5rem',
    textAlign: 'center',
    textShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    color: '#F8FA13',
  }}
>
  0
</td>
<td
  style={{
    backgroundColor: '#62C555',
    fontSize: '1rem',
    fontWeight: 'bold',
    width: '2.5rem',
    textAlign: 'center',
    textShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    color: '#F8FA13',
  }}
>
  2
</td>
<td
  style={{
    backgroundColor: '#62C555',
    fontSize: '1rem',
    fontWeight: 'bold',
    width: '2.5rem',
    textAlign: 'center',
    textShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    color: '#F8FA13',
  }}
>
  2
</td>
<td
  style={{
    backgroundColor: '#62C555',
    fontSize: '1rem',
    fontWeight: 'bold',
    width: '2.5rem',
    textAlign: 'center',
    textShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    color: '#F8FA13',
  }}
>
  2
</td>
        </tr>
        <tr style={{ backgroundColor: '#1B1C21' }}>
      <td
        style={{
          fontSize: '0.75rem',
          fontWeight: 'bold',
          textAlign: 'center',
          color: '#FFB800',
        }}
      >
        CA
      </td>
      <td
        style={{
          fontSize: '0.75rem',
          fontWeight: 'bold',
          textAlign: 'center',
          color: 'white',
        }}
      >
        St. John’s NL
      </td>
      <td
        style={{
          fontSize: '0.75rem',
          fontWeight: 'bold',
          textAlign: 'center',
          color: '#FFB800',
        }}
      >
        Topdog
      </td>
      <td
        style={{
          fontSize: '0.75rem',
          fontWeight: 'bold',
          textAlign: 'center',
          color: 'white',
        }}
      >
        2
      </td>
      <td
        style={{
          fontSize: '0.75rem',
          fontWeight: 'bold',
          textAlign: 'center',
          color: 'white',
        }}
      >
        24 Pts
      </td>
      <td
        style={{
          background:
            'linear-gradient(180deg, #BE8200 0%, #FEF098 47.4%, #EFD261 100%)',
        }}
      >
        <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
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
    backgroundColor: '#62C555',
    fontSize: '1rem',
    fontWeight: 'bold',
    width: '2.5rem',
    textAlign: 'center',
    textShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    color: 'black',
  }}
>
  36
</td>
<td
  style={{
    backgroundColor: '#62C555',
    fontSize: '1rem',
    fontWeight: 'bold',
    width: '2.5rem',
    textAlign: 'center',
    textShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    color: '#F8FA13',
  }}
>
  36
</td>
<td
  style={{
    backgroundColor: '#E61C1C',
    fontSize: '1rem',
    fontWeight: 'bold',
    width: '2.5rem',
    textAlign: 'center',
    textShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    color: '#F8FA13',
  }}
>
  2
</td>
<td
  style={{
    background:
      'linear-gradient(180deg, #BE8200 0%, #FEF098 47.4%, #EFD261 100%)',
    fontSize: '1rem',
    fontWeight: 'bold',
    width: '2.5rem',
    textAlign: 'center',
    textShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    color: 'black',
    filter: 'blur(2px)',
  }}
>
  23
</td>
<td
  style={{
    backgroundColor: '#62C555',
    fontSize: '1rem',
    fontWeight: 'bold',
    width: '2.5rem',
    textAlign: 'center',
    textShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    color: '#F8FA13',
  }}
>
  0
</td>
<td
  style={{
    backgroundColor: '#62C555',
    fontSize: '1rem',
    fontWeight: 'bold',
    width: '2.5rem',
    textAlign: 'center',
    textShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    color: '#F8FA13',
  }}
>
  2
</td>
<td
  style={{
    backgroundColor: '#62C555',
    fontSize: '1rem',
    fontWeight: 'bold',
    width: '2.5rem',
    textAlign: 'center',
    textShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    color: '#F8FA13',
  }}
>
  2
</td>
<td
  style={{
    backgroundColor: '#62C555',
    fontSize: '1rem',
    fontWeight: 'bold',
    width: '2.5rem',
    textAlign: 'center',
    textShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    color: '#F8FA13',
  }}
>
  23
</td>
        </tr>
      </tbody>
    </table>
  );
};

export default NightResult;
