import React from "react";

const GamerCardRight = () => {
  return (
    <>
      <div
        className="game-card"
        style={{
          boxShadow: "0px 4px 4px 0px #F8FA13",
        }}
      >
        <div className="flex justify-between">
          <div className=" flex flex-col ">
            <span className=" game-time mb-3">7:00 PM EST</span>
            <input type="text" className=" card-input mb-3" value={100} />
          </div>

          <div className=" flex flex-col justify-start ">
            <span className=" game-date">April 4, 2023</span>
            <div className=" box">
              <label>Toronto</label>
            </div>
          </div>
          <div className=" flex flex-col justify-start ">
            <span className=" game-time ">Money Line</span>
            <div className=" box ">
              <label>+100</label> <label>12 Pts</label>
            </div>
          </div>
          <div className=" flex flex-col justify-start ">
            <span className=" game-time">Spread</span>
            <div className=" box ">
              <label>+100</label> <label>12 Pts</label>
            </div>
          </div>
          <div className=" flex flex-col justify-start ">
            <span className=" game-time">Over/Under</span>

            <div className=" box ">
              <label>+100</label> <label>12 Pts</label>
            </div>
          </div>
        </div>

        <div className=" flex justify-between gap-1">
          <div
            className=" line "
            style={{
              width: "10%",
            }}
          ></div>
          <div
            className=" line "
            style={{
              width: "80%",
            }}
          ></div>
        </div>

        <div className=" w-full flex justify-between mt-3 ">
          <div className=" flex flex-col ">
            <input type="text" className=" card-input mb-3" value={100} />
          </div>

          <div className=" flex flex-col ">
            <div
              className=" box"
              style={{
                marginLeft: "25px",
              }}
            >
              <label>Toronto</label>
            </div>
          </div>
          <div className=" flex flex-col ">
            <div className=" box ">
              <label>+100</label> <label>12 Pts</label>
            </div>
          </div>
          <div className=" flex flex-col ">
            <div className=" box ">
              <label>+100</label> <label>12 Pts</label>
            </div>
          </div>
          <div className=" flex flex-col">
            <div className=" box ">
              <label>+100</label> <label>12 Pts</label>
            </div>
          </div>
        </div>

        <div className=" flex justify-between">
          <div className="card-id">ID: 625</div>
          <div className=" flex mt-4 gap-1 items-center">
            <input type="radio" />
            <label className="card-label">REG</label>
          </div>

          <div className=" flex mt-4 gap-1 items-center">
            <input type="radio" />
            <label className="card-label">OT</label>
          </div>
          <div className=" flex mt-4 gap-1 items-center">
            <input type="radio" />
            <label className="card-label">S/O</label>
          </div>
          <button className=" card-btn-outline mt-4 ">ENTER PICK</button>
          <button className=" card-btn mt-4 ">LOCK IT IN</button>
        </div>
      </div>
    </>
  );
};

export default GamerCardRight;
