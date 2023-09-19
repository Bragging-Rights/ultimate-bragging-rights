import GamesBanner from "../GamesBanner/GamesBanner";
import "./GameCard.css";

const GameCard = () => {
  return (
    <>
      <div className="game-card col-5">
        <div className=" w-100 d-flex justify-content-between ">
          <div className=" d-flex flex-column ">
            <span className=" game-time mb-3">7:00 PM EST</span>
            <input type="text" className=" card-input mb-3" value={100} />
          </div>

          <div className=" d-flex flex-column justify-content-start ">
            <span className=" game-date">April 4, 2023</span>
            <div className=" box">Toronto</div>
          </div>
          <div className=" d-flex flex-column justify-content-start ">
            <span className=" game-time ">Money Line</span>
            <div className=" box">+100 12 Pts</div>
          </div>
          <div className=" d-flex flex-column justify-content-start ">
            <span className=" game-time">Spread</span>
            <div className=" box ">+1.5 12 Pts</div>
          </div>
          <div className=" d-flex flex-column justify-content-start ">
            <span className=" game-time">Over/Under</span>

            <div className=" box ">5.5 Pts</div>
          </div>
        </div>

        <div className=" d-flex justify-content-between gap-5">
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

        <div className=" w-100 d-flex justify-content-between mt-3 ">
          <div className=" d-flex flex-column ">
            <input type="text" className=" card-input mb-3" value={100} />
          </div>

          <div className=" d-flex flex-column ">
            <div
              className=" box"
              style={{
                marginLeft: "30px",
              }}
            >
              Toronto
            </div>
          </div>
          <div className=" d-flex flex-column ">
            <div className=" box">+100 12 Pts</div>
          </div>
          <div className=" d-flex flex-column ">
            <div className=" box">+1.5 12 Pts</div>
          </div>
          <div className=" d-flex flex-column ">
            <div className=" box">5.5 Pts</div>
          </div>
        </div>

        <div className=" d-flex justify-content-between">
          <div className="card-id">ID: 625</div>
          <div className=" d-flex mt-4 gap-1 align-items-center">
            <input type="radio" />
            <label className="card-label">REG</label>
          </div>

          <div className=" d-flex mt-4 gap-1 align-items-center">
            <input type="radio" />
            <label className="card-label">OT</label>
          </div>
          <div className=" d-flex mt-4 gap-1 align-items-center">
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

export default GameCard;
