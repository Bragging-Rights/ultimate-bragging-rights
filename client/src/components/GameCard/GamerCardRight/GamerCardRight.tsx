import React, {useState} from "react";
import TimeFormat from "../../../services/TimeFormat";
import Switches from "../../Switches";


const GamerCardRight = ({ gameData }) => {
  const [pick_visitor, setPickVisitor] = useState("");
  const [pick_home, setPickHome] = useState("");

  const handleInputChange = (e) => {
    setPickVisitor(e.target.value);
  };
  const handleHomeChange = (e) => {
    setPickHome(e.target.value);
  };
  
  return (
    <>
      <div
        className="game-card"
        style={{
          boxShadow: "0px 4px 4px 0px #A2EB38",
        }}
      >
        <div className="flex justify-between">
          <div className=" flex flex-col ">
            <span className=" game-time mb-3">
              {TimeFormat(gameData?.time)}
            </span>
            <input
              type="text"
              className="card-input mb-3"
              value={pick_visitor}
              onChange={handleInputChange}
            />          </div>

          <div className=" flex flex-col justify-start " >
            <span className=" game-date">{gameData?.gamedate}</span>
            <div className=" box box h-12 w-24">
              <label>{gameData?.visitor}</label>
            </div>
          </div>
          <div className=" flex flex-col justify-start ">
            <span className=" game-time ">Money Line</span>
            <div className=" box box h-12 w-24">
              <label>{gameData?.["v-ml"]}</label> <label> Pts</label>
            </div>
          </div>
          <div className=" flex flex-col justify-start ">
            <span className=" game-time">Spread</span>
            <div className=" box box h-12 w-24">
              <label>{gameData?.["v-sprd"]}</label> <label> Pts</label>
              {/* <label>____</label>
              <label>{gameData?.["v-sprd-odds"]}</label> */}
            </div>
          </div>
          <div className=" flex flex-col justify-start ">
            <span className=" game-time">Over/Under</span>

            <div className=" box box h-12 w-24">
              <label>{gameData?.["v-ou"]}</label><label> Pts</label>
              {/* <label>____</label>
              <label>{gameData?.["v-ou-odds"]}</label> */}
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
          <input
              type="text"
              id="pick-home"
              className="card-input mb-3"
              value={pick_home}
              onChange={handleHomeChange}
            />{" "}          </div>

          <div className=" flex flex-col justify-between">
            <div
              className=" box box h-12 w-24"
              style={{
                marginLeft: "25px",
              }}
            >
              <label>{gameData?.home}</label>
            </div>
          </div>
          <div className=" flex flex-col ">
            <div className=" box box h-12 w-24">
              <label>{gameData?.["h-ml"]}</label> 
              <label> Pts</label>            </div>
          </div>
          <div className=" flex flex-col ">
            <div className=" box box h-12 w-24">
              <label>{gameData?.["h-sprd"]}</label><label> Pts</label>
              {/* <label>____</label>
              <label>{gameData?.["h-sprd-odds"]}</label> */}
            </div>
          </div>
          <div className=" flex flex-col">
            <div className=" box box h-12 w-24">
              <label>{gameData?.["h-ou"]}</label><label> Pts</label>
              {/* <label>____</label>
              <label>{gameData?.["h-ou-odds"]}</label> */}
            </div>
          </div>
        </div>

        <div className=" flex justify-between">
          <div className="card-id">ID: 625</div>
          <Switches leage="Hocky" season={gameData?.seasonflag} />

          <button className=" card-btn-outline mt-4 ">ENTER PICK</button>
          <button className=" card-btn mt-4 ">LOCK IT IN</button>
        </div>
      </div>
    </>
  );
};

export default GamerCardRight;
