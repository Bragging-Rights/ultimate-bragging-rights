import React from "react";
import { ImCancelCircle } from "react-icons/im";
import ModalSelect from "./ModalSelect";
import ModalInput from "./ModalInput";

const LeagueHandler = ({
  options,
  handleRemoveLeague,
  handleLeagueChange,
  availableTeams,
  info,
  index,
}) => {
  console.log("availableTeams", availableTeams);
  return (
    <div className="modal-bottom relative mb-2" key={index}>
      <button
        onClick={() => handleRemoveLeague(index)}
        className="bg-red-500 text-white w-7 h-7 rounded-full flex items-center justify-center transition-colors hover:bg-red-600 absolute right-0"
        aria-label="Remove League"
      >
        <ImCancelCircle />
      </button>
      <ModalSelect
        label="Select League"
        options={options}
        name={`league`}
        value={info?.league}
        onChange={(e) => {
          handleLeagueChange(e, index);
        }}
      />
      <ModalInput
        label="Create Unique Username"
        placeholder="Username"
        type="text"
        name={`username`}
        value={info?.username}
        onChange={(e) => handleLeagueChange(e, index)}
        aria-label="Create Unique Username"
      />
      <ModalSelect
        label="Select Your Favorite Team"
        name={`team`}
        value={info?.team}
        options={[
          {
            label: "Select Team",
            value: "",
          },
          ...(availableTeams[info.league]?.map((team) => ({
            label: team?.displayName,
            value: team?.fullName,
          })) || [
            {
              label: "No team available",
              value: "",
            },
          ]),
        ]}
        onChange={(e) => handleLeagueChange(e, index)}
      />
    </div>
  );
};

export default LeagueHandler;
