import React, { useState, useEffect } from "react";
import "./TableStyles.css";

export default function Fullleaderboard() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [sortedData, setSortedData] = useState([]);
  const [sortField, setSortField] = useState("TP");
  const [sortAscending, setSortAscending] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formattedDate = currentDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const mockData = [
    {
      a: "Team E",
      b: 18,
      c: 3,
      d: 215,
      e: 105,
      f: 22,
      g: 20,
      h: 11,
      i: 48,
      j: 30,
      k: 18,
      l: 20,
      m: 4,
      n: 9,
      o: 35,
      p: 85,
      q: 27,
      r: 45,
      s: 35,
      t: 12,
      u: 430,
      v: 240,
      w: 340,
      x: 40,
      y: 220,
      z: 14,
      a1: "Team F",
      b1: 16,
      c1: 2,
      d1: 198,
      e1: 95,
      f1: 20,
      g1: 17,
      h1: 10,
      i1: 42,
      j1: 27,
      k1: 16,
      l1: 18,
      m1: 3,
      n1: 6,
      o1: 33,
      p1: 83,
      q1: 25,
      r1: 42,
      s1: 32,
      t1: 11,
      u1: 410,
      v1: 230,
      w1: 330,
      x1: 38,
      y1: 210,
      z1: 13,
      a2: 22,
      b2: 14,
      c2: 14,
      d2: 14,
      e2: 14,
      f2: 14,
      g2: 14,
      h2: 14,
      i2: 14,
      j2: 14,
      k2: 14,
      l2: 14,
      m2: 32,
    },
    {
      a: "Team C",
      b: 20,
      c: 5,
      d: 199,
      e: 90,
      f: 18,
      g: 15,
      h: 8,
      i: 40,
      j: 25,
      k: 14,
      l: 15,
      m: 1,
      n: 5,
      o: 30,
      p: 80,
      q: 20,
      r: 35,
      s: 25,
      t: 8,
      u: 400,
      v: 200,
      w: 300,
      x: 30,
      y: 180,
      z: 10,
      a1: "Team D",
      b1: 18,
      c1: 4,
      d1: 210,
      e1: 100,
      f1: 20,
      g1: 18,
      h1: 10,
      i1: 45,
      j1: 28,
      k1: 15,
      l1: 17,
      m1: 3,
      n1: 7,
      o1: 32,
      p1: 82,
      q1: 22,
      r1: 40,
      s1: 30,
      t1: 10,
      u1: 420,
      v1: 220,
      w1: 320,
      x1: 35,
      y1: 200,
      z1: 12,
      a2: 25,
      b2: 15,
      c2: 15,
      d2: 15,
      e2: 15,
      f2: 15,
      g2: 15,
      h2: 15,
      i2: 15,
      j2: 15,
      k2: 15,
      l2: 15,
      m2: 12,
    },
    {
      a: "Team A",
      b: 12,
      c: 2,
      d: 232,
      e: 123,
      f: 23,
      g: 23,
      h: 12,
      i: 34,
      j: 23,
      k: 10,
      l: 20,
      m: 1,
      n: 7,
      o: 25,
      p: 75,
      q: 23,
      r: 42,
      s: 23,
      t: 12,
      u: 423,
      v: 234,
      w: 342,
      x: 43,
      y: 234,
      z: 12,
      a1: "Team B",
      b1: 15,
      c1: 3,
      d1: 245,
      e1: 134,
      f1: 25,
      g1: 25,
      h1: 15,
      i1: 37,
      j1: 25,
      k1: 13,
      l1: 23,
      m1: 2,
      n1: 8,
      o1: 29,
      p1: 71,
      q1: 25,
      r1: 47,
      s1: 29,
      t1: 14,
      u1: 456,
      v1: 267,
      w1: 367,
      x1: 54,
      y1: 276,
      z1: 16,
      a2: 23,
      b2: 12,
      c2: 12,
      d2: 12,
      e2: 12,
      f2: 12,
      g2: 12,
      h2: 12,
      i2: 12,
      j2: 12,
      k2: 12,
      l2: 12,
      m2: 32,
    },
  ];

  useEffect(() => {
    sortData(sortField);
  }, [sortField, sortAscending]);

  const sortData = (field) => {
    const sorted = [...mockData].sort((a, b) => {
      if (sortAscending) {
        return parseFloat(a[field]) - parseFloat(b[field]);
      } else {
        return parseFloat(b[field]) - parseFloat(a[field]);
      }
    });
    setSortedData(sorted);
  };

  const toggleSortOrder = (field) => {
    if (field === sortField) {
      setSortAscending(!sortAscending);
    } else {
      setSortAscending(true);
    }
    setSortField(field);
  };

  return (
    <div>
      <div
        style={{
          backgroundColor: "rgb(179, 179, 0)",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          padding: "10px",
        }}
      >
        <span>{formattedDate}</span>
        <span style={{ textAlign: "center", color: "black", flexGrow: 1 }}>
          Game Breakdowns
        </span>
      </div>
      <button
        style={{
          backgroundColor: "#1B1C21",
          color: "white",
          padding: "1rem",
          border: "none",
        }}
      >
        League
      </button>
      <button
        style={{
          backgroundColor: "#1B1C21",
          color: "white",
          padding: "1rem",
          border: "none",
        }}
      >
        Home
      </button>
      <button
        style={{
          backgroundColor: "#1B1C21",
          color: "white",
          padding: "1rem",
          border: "none",
        }}
      >
        Away
      </button>
      <div style={{ color: "white" }}>
        <div className="grid-item">
          <table className="custom-table">
            <thead>
              <tr>
                <th title="Visitor">V</th>
                <th
                  title="1 Score Zero"
                  onClick={() => toggleSortOrder("b")}
                  style={{ cursor: "pointer" }}
                >
                  1S
                </th>
                <th
                  title="1 Score Within 2"
                  onClick={() => toggleSortOrder("c")}
                  style={{ cursor: "pointer" }}
                >
                  1S0
                </th>
                <th
                  title="1 Score Within 3"
                  onClick={() => toggleSortOrder("d")}
                  style={{ cursor: "pointer" }}
                >
                  1SW2
                </th>
                <th
                  title="1 Score Within 7"
                  onClick={() => toggleSortOrder("e")}
                  style={{ cursor: "pointer" }}
                >
                  1SW3
                </th>
                <th
                  title="2 Game Winning Streak"
                  onClick={() => toggleSortOrder("f")}
                  style={{ cursor: "pointer" }}
                >
                  1SW7
                </th>
                <th
                  title="2 Scores 0"
                  onClick={() => toggleSortOrder("g")}
                  style={{ cursor: "pointer" }}
                >
                  2GWS
                </th>
                <th
                  title="2 Scores 0"
                  onClick={() => toggleSortOrder("h")}
                  style={{ cursor: "pointer" }}
                >
                  2S0
                </th>
                <th
                  title="2 Scores Within 2"
                  onClick={() => toggleSortOrder("i")}
                  style={{ cursor: "pointer" }}
                >
                  2SW2
                </th>
                <th
                  title="2 Scores Within 3"
                  onClick={() => toggleSortOrder("j")}
                  style={{ cursor: "pointer" }}
                >
                  2SW3
                </th>
                <th
                  title="2 Scores Within 7"
                  onClick={() => toggleSortOrder("k")}
                  style={{ cursor: "pointer" }}
                >
                  2SW7
                </th>
                <th
                  title="3  Game Winning Streak"
                  onClick={() => toggleSortOrder("l")}
                  style={{ cursor: "pointer" }}
                >
                  3GWS
                </th>
                <th
                  title="4  Game Winning Streak"
                  onClick={() => toggleSortOrder("m")}
                  style={{ cursor: "pointer" }}
                >
                  4GWS
                </th>
                <th
                  title="5  Game Winning Streak"
                  onClick={() => toggleSortOrder("n")}
                  style={{ cursor: "pointer" }}
                >
                  5GWS
                </th>
                <th
                  title="5  Game Winning Streak"
                  onClick={() => toggleSortOrder("o")}
                  style={{ cursor: "pointer" }}
                >
                  6GWS
                </th>
                <th
                  title="Away Games Played"
                  onClick={() => toggleSortOrder("p")}
                  style={{ cursor: "pointer" }}
                >
                  AGP
                </th>
                <th
                  title="Average Points per Conference"
                  onClick={() => toggleSortOrder("q")}
                  style={{ cursor: "pointer" }}
                >
                  APC
                </th>
                <th
                  title="Average Points per Division"
                  onClick={() => toggleSortOrder("r")}
                  style={{ cursor: "pointer" }}
                >
                  APD
                </th>
                <th
                  title="Average Points Per Game"
                  onClick={() => toggleSortOrder("s")}
                  style={{ cursor: "pointer" }}
                >
                  APG
                </th>
                <th
                  title="Average Points Per Month"
                  onClick={() => toggleSortOrder("t")}
                  style={{ cursor: "pointer" }}
                >
                  APM
                </th>
                <th
                  title="Average Points Per Night"
                  onClick={() => toggleSortOrder("u")}
                  style={{ cursor: "pointer" }}
                >
                  APN
                </th>
                <th
                  title="Average Points Per Season"
                  onClick={() => toggleSortOrder("v")}
                  style={{ cursor: "pointer" }}
                >
                  APS
                </th>
                <th
                  title="Average Points Per Team"
                  onClick={() => toggleSortOrder("w")}
                  style={{ cursor: "pointer" }}
                >
                  APT
                </th>
                <th
                  title="Average Points Per Week"
                  onClick={() => toggleSortOrder("x")}
                  style={{ cursor: "pointer" }}
                >
                  APW
                </th>
                <th
                  title="Current Games Played Streak"
                  onClick={() => toggleSortOrder("y")}
                  style={{ cursor: "pointer" }}
                >
                  CGS
                </th>
                <th
                  title="City"
                  onClick={() => toggleSortOrder("z")}
                  style={{ cursor: "pointer" }}
                >
                  CITY
                </th>
                <th
                  title="Current Losing Streak"
                  onClick={() => toggleSortOrder("a1")}
                  style={{ cursor: "pointer" }}
                >
                  CLS
                </th>
                <th
                  title="Country"
                  onClick={() => toggleSortOrder("b1")}
                  style={{ cursor: "pointer" }}
                >
                  CO
                </th>
                <th
                  title="Current Trend"
                  onClick={() => toggleSortOrder("c1")}
                  style={{ cursor: "pointer" }}
                >
                  CT
                </th>
                <th
                  title="Current Winning Streak"
                  onClick={() => toggleSortOrder("d1")}
                  style={{ cursor: "pointer" }}
                >
                  CWS
                </th>
                <th
                  title="Extra Innings"
                  onClick={() => toggleSortOrder("E1")}
                  style={{ cursor: "pointer" }}
                >
                  EI
                </th>
                <th
                  title="Favourite Losing percentage"
                  onClick={() => toggleSortOrder("f1")}
                  style={{ cursor: "pointer" }}
                >
                  FLP
                </th>
                <th
                  title="Favourite Winning percentage"
                  onClick={() => toggleSortOrder("g1")}
                  style={{ cursor: "pointer" }}
                >
                  FWP
                </th>
                <th
                  title="Games Played"
                  onClick={() => toggleSortOrder("h1")}
                  style={{ cursor: "pointer" }}
                >
                  GP
                </th>
                <th
                  title="Home Games Played"
                  onClick={() => toggleSortOrder("i1")}
                  style={{ cursor: "pointer" }}
                >
                  HGP
                </th>
                <th
                  title="Loses"
                  onClick={() => toggleSortOrder("j1")}
                  style={{ cursor: "pointer" }}
                >
                  L
                </th>
                <th
                  title="Last 10 Game Played"
                  onClick={() => toggleSortOrder("k1")}
                  style={{ cursor: "pointer" }}
                >
                  L10
                </th>
                <th
                  title="Longest Losing Streak"
                  onClick={() => toggleSortOrder("l1")}
                  style={{ cursor: "pointer" }}
                >
                  LLS
                </th>
                <th
                  title="Losing Percentage"
                  onClick={() => toggleSortOrder("m1")}
                  style={{ cursor: "pointer" }}
                >
                  LP
                </th>
                <th
                  title="Longest Winning Streak"
                  onClick={() => toggleSortOrder("n1")}
                  style={{ cursor: "pointer" }}
                >
                  LWS
                </th>
                <th
                  title="Money Line"
                  onClick={() => toggleSortOrder("o1")}
                  style={{ cursor: "pointer" }}
                >
                  ML
                </th>
                <th
                  title="Monthly Point Total"
                  onClick={() => toggleSortOrder("p1")}
                  style={{ cursor: "pointer" }}
                >
                  MPT
                </th>
                <th
                  title="Nightly Point Total"
                  onClick={() => toggleSortOrder("q1")}
                  style={{ cursor: "pointer" }}
                >
                  NPT
                </th>
                <th
                  title="Over / Under"
                  onClick={() => toggleSortOrder("r1")}
                  style={{ cursor: "pointer" }}
                >
                  O/U
                </th>
                <th
                  title="Overtime"
                  onClick={() => toggleSortOrder("s1")}
                  style={{ cursor: "pointer" }}
                >
                  OT
                </th>
                <th
                  title="Player"
                  onClick={() => toggleSortOrder("t1")}
                  style={{ cursor: "pointer" }}
                >
                  PLAYER
                </th>
                <th
                  title="Province"
                  onClick={() => toggleSortOrder("u1")}
                  style={{ cursor: "pointer" }}
                >
                  PROV
                </th>
                <th
                  title="Regulation"
                  onClick={() => toggleSortOrder("v1")}
                  style={{ cursor: "pointer" }}
                >
                  REG
                </th>
                <th
                  title="Shoot-Out"
                  onClick={() => toggleSortOrder("w1")}
                  style={{ cursor: "pointer" }}
                >
                  SO
                </th>
                <th
                  title="Spread"
                  onClick={() => toggleSortOrder("x1")}
                  style={{ cursor: "pointer" }}
                >
                  SPRD
                </th>
                <th
                  title="State"
                  onClick={() => toggleSortOrder("y1")}
                  style={{ cursor: "pointer" }}
                >
                  ST
                </th>
                <th
                  title="Tie"
                  onClick={() => toggleSortOrder("z1")}
                  style={{ cursor: "pointer" }}
                >
                  T
                </th>
                <th
                  title="Team's Average points"
                  onClick={() => toggleSortOrder("a2")}
                  style={{ cursor: "pointer" }}
                >
                  TAVGPTS
                </th>
                <th
                  title="Team"
                  onClick={() => toggleSortOrder("b2")}
                  style={{ cursor: "pointer" }}
                >
                  Team
                </th>
                <th
                  title="Team's Montly Points"
                  onClick={() => toggleSortOrder("c2")}
                  style={{ cursor: "pointer" }}
                >
                  TMP
                </th>
                <th
                  title="Total Points"
                  onClick={() => toggleSortOrder("d2")}
                  style={{ cursor: "pointer" }}
                >
                  TP
                </th>
                <th
                  title="Team's Total Points"
                  onClick={() => toggleSortOrder("e2")}
                  style={{ cursor: "pointer" }}
                >
                  TTP
                </th>
                <th
                  title="Team's Weekly Points"
                  onClick={() => toggleSortOrder("f2")}
                  style={{ cursor: "pointer" }}
                >
                  TWP
                </th>
                <th
                  title="Under Dog"
                  onClick={() => toggleSortOrder("g2")}
                  style={{ cursor: "pointer" }}
                >
                  U/D
                </th>
                <th
                  title="Ultimate Bragging Rights"
                  onClick={() => toggleSortOrder("h2")}
                  style={{ cursor: "pointer" }}
                >
                  UBR
                </th>
                <th
                  title="Visitor"
                  onClick={() => toggleSortOrder("i2")}
                  style={{ cursor: "pointer" }}
                >
                  V
                </th>
                <th
                  title="Wins"
                  onClick={() => toggleSortOrder("j2")}
                  style={{ cursor: "pointer" }}
                >
                  W
                </th>
                <th
                  title="Winning Percentage"
                  onClick={() => toggleSortOrder("k2")}
                  style={{ cursor: "pointer" }}
                >
                  WP
                </th>
                <th
                  title="Weekly Point Total"
                  onClick={() => toggleSortOrder("l2")}
                  style={{ cursor: "pointer" }}
                >
                  WPT
                </th>
                <th
                  title="Yearly Point Total"
                  onClick={() => toggleSortOrder("m2")}
                  style={{ cursor: "pointer" }}
                >
                  YPT
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedData.map((data, index) => (
                <tr key={index}>
                  <td>{data.a}</td>
                  <td>{data.b}</td>
                  <td>{data.c}</td>
                  <td>{data.d}</td>
                  <td>{data.e}</td>
                  <td>{data.f}</td>
                  <td>{data.g}</td>
                  <td>{data.h}</td>
                  <td>{data.i}</td>
                  <td>{data.j}</td>
                  <td>{data.k}</td>
                  <td>{data.l}</td>
                  <td>{data.m}</td>
                  <td>{data.n}</td>
                  <td>{data.o}</td>
                  <td>{data.p}</td>
                  <td>{data.q}</td>
                  <td>{data.r}</td>
                  <td>{data.s}</td>
                  <td>{data.t}</td>
                  <td>{data.u}</td>
                  <td>{data.v}</td>
                  <td>{data.w}</td>
                  <td>{data.x}</td>
                  <td>{data.y}</td>
                  <td>{data.z}</td>
                  <td>{data.a1}</td>
                  <td>{data.b1}</td>
                  <td>{data.c1}</td>
                  <td>{data.d1}</td>
                  <td>{data.e1}</td>
                  <td>{data.f1}</td>
                  <td>{data.g1}</td>
                  <td>{data.h1}</td>
                  <td>{data.i1}</td>
                  <td>{data.j1}</td>
                  <td>{data.k1}</td>
                  <td>{data.l1}</td>
                  <td>{data.m1}</td>
                  <td>{data.n1}</td>
                  <td>{data.o1}</td>
                  <td>{data.p1}</td>
                  <td>{data.q1}</td>
                  <td>{data.r1}</td>
                  <td>{data.s1}</td>
                  <td>{data.t1}</td>
                  <td>{data.u1}</td>
                  <td>{data.v1}</td>
                  <td>{data.w1}</td>
                  <td>{data.x1}</td>
                  <td>{data.y1}</td>
                  <td>{data.z1}</td>
                  <td>{data.a2}</td>
                  <td>{data.b2}</td>
                  <td>{data.c2}</td>
                  <td>{data.d2}</td>
                  <td>{data.e2}</td>
                  <td>{data.f2}</td>
                  <td>{data.g2}</td>
                  <td>{data.h2}</td>
                  <td>{data.i2}</td>
                  <td>{data.j2}</td>
                  <td>{data.k2}</td>
                  <td>{data.l2}</td>
                  <td>{data.m2}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
