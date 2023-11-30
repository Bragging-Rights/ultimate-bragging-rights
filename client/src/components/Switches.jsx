import React from "react";

const Switches = (props) => {
  const { league, season } = props;

  if (league === "NHL" && (season === "Regular" || season === "Pre Season")) {
    return (
      <div className="flex gap-5">
        <div className="flex mt-4 gap-1 items-center">
          <input type="radio" name="radio-group" value="Regular" />
          <label className="card-label">Reg</label>
        </div>
        <div className="flex mt-4 gap-1 items-center">
          <input type="radio" name="radio-group" value="O/T" />
          <label className="card-label">O/T</label>
        </div>
        <div className="flex mt-4 gap-1 items-center">
          <input type="radio" name="radio-group" value="S/O" />
          <label className="card-label">S/O</label>
        </div>
        <select>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
          <option value={6}>6</option>
          <option value={7}>7</option>
          <option value={8}>8</option>
          <option value={9}>9</option>
          <option value={10}>10</option>
          <option value={11}>11</option>
          <option value={12}>12</option>
          <option value={13}>13</option>
          <option value={14}>14</option>
          <option value={15}>15</option>
          <option value={16}>16</option>
          <option value={17}>17</option>
          <option value={18}>18</option>
          <option value={19}>19</option>
          <option value={20}>20</option>
          <option value={21}>21</option>
          <option value={22}>22</option>
          <option value={23}>23</option>
          <option value={24}>24</option>
          <option value={25}>25</option>
          <option value={26}>26</option>
          <option value={27}>27</option>
          <option value={28}>28</option>
          <option value={29}>29</option>
          <option value={30}>30</option>
        </select>
      </div>
    );
  }

  if (league === "NHL" && season === "Playoffs") {
    return (
      <div className="flex gap-5">
        <div className="flex mt-4 gap-1 items-center">
          <input type="radio" name="radio-group" value="Regular" />
          <label className="card-label">Reg</label>
        </div>
        <div className="flex mt-4 gap-1 items-center">
          <input type="radio" name="radio-group" value="O/T" />
          <label className="card-label">O/T</label>
        </div>

        <select>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
          <option value={6}>6</option>
          <option value={7}>7</option>
          <option value={8}>8</option>
          <option value={9}>9</option>
          <option value={10}>10</option>
        </select>
      </div>
    );
  }

  if (league === "NBA") {
    return (
      <div className="flex gap-5">
        <div className="flex mt-4 gap-1 items-center">
          <input type="radio" name="radio-group" value="Regular" />
          <label className="card-label">Reg</label>
        </div>
        <div className="flex mt-4 gap-1 items-center">
          <input type="radio" name="radio-group" value="O/T" />
          <label className="card-label">O/T</label>
        </div>

        <select>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
          <option value={6}>6</option>
          <option value={7}>7</option>
          <option value={8}>8</option>
          <option value={9}>9</option>
          <option value={10}>10</option>
        </select>
      </div>
    );
  }

  if (league === "NBA" && season === "Playoffs") {
    return (
      <div className="flex gap-5">
        <div className="flex mt-4 gap-1 items-center">
          <input type="radio" name="radio-group" value="Regular" />
          <label className="card-label">Reg</label>
        </div>
        <div className="flex mt-4 gap-1 items-center">
          <input type="radio" name="radio-group" value="OT" />
          <label className="card-label">OT</label>
        </div>
        <div className="flex mt-4 gap-1 items-center">
          <select>
            {Array.from({ length: 10 }, (_, i) => (
              <option key={i}>{i + 1}</option>
            ))}
          </select>
        </div>
      </div>
    );
  }

  if (league === "NFL" && (season === "Regular" || season === "Pre Season")) {
    return (
      <div className="flex gap-5">
        <div className="flex mt-4 gap-1 items-center">
          <input type="radio" name="radio-group" value="Regular" />
          <label className="card-label">Reg</label>
        </div>
        <div className="flex mt-4 gap-1 items-center">
          <input type="radio" name="radio-group" value="O/T" />
          <label className="card-label">O/T</label>
        </div>
      </div>
    );
  }

  if (league === "NFL" && season === "Playoffs") {
    return (
      <div className="flex gap-5">
        <div className="flex mt-4 gap-1 items-center">
          <input type="radio" name="radio-group" value="Regular" />
          <label className="card-label">Reg</label>
        </div>
        <div className="flex mt-4 gap-1 items-center">
          <input type="radio" name="radio-group" value="O/T" />
          <label className="card-label">O/T</label>
        </div>

        <select>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
          <option value={6}>6</option>
          <option value={7}>7</option>
          <option value={8}>8</option>
          <option value={9}>9</option>
          <option value={10}>10</option>
        </select>
      </div>
    );
  }

  if (league === "MLB") {
    return (
      <div className="flex gap-5">
        <div className="flex mt-4 gap-1 items-center">
          <input type="radio" name="radio-group" value="Regular" />
          <label className="card-label">Reg</label>
        </div>
        <div className="flex mt-4 gap-1 items-center">
          <input type="radio" name="radio-group" value="O/T" />
          <label className="card-label">E/I</label>
        </div>

        <select>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
          <option value={6}>6</option>
          <option value={7}>7</option>
          <option value={8}>8</option>
          <option value={9}>9</option>
          <option value={10}>10</option>
          <option value={11}>11</option>
          <option value={12}>12</option>
          <option value={13}>13</option>
          <option value={14}>14</option>
          <option value={15}>15</option>
          <option value={16}>16</option>
          <option value={17}>17</option>
          <option value={18}>18</option>
          <option value={19}>19</option>
          <option value={20}>20</option>
        </select>
      </div>
    );
  }

  return null;
};

export default Switches;
