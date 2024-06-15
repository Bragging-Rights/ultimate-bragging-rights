import React from "react";
import { ImCancelCircle } from "react-icons/im";
import styled from "styled-components";
import ModalSelect from "./ModalSelect";
import ModalInput from "./ModalInput";

// Styled components
const Container = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  margin-bottom: 2rem;
  position: relative;
`;

const StyledButton = styled.button`
  background-color: #ff0000;
  color: #ffffff;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s;
  position: absolute;
  right: 0;
  top: 0;

  &:hover {
    background-color: #cc0000;
  }
`;

const StyledLabel = styled.h2`
  font-size: 14px;
  color: #ffaa00;
`;

const StyledModalSelect = styled(ModalSelect)`
  width: 100%;
`;

const StyledModalInput = styled(ModalInput)`
  width: 100%;
`;

const LeagueHandler = ({
  options,
  handleRemoveLeague,
  handleLeagueChange,
  availableTeams,
  info,
  index,
}) => {
  const onLeagueChange = (e) => {
    handleLeagueChange(e, index);
  };

  return (
    <Container key={index}>
      <StyledButton
        onClick={() => handleRemoveLeague(index)}
        aria-label="Remove League"
        type="button"
      >
        <ImCancelCircle />
      </StyledButton>
      <StyledModalSelect
        label={<StyledLabel>*</StyledLabel>}
        options={[
          { label: "Select league", value: "" }, // Placeholder option
          ...options, // Spread the existing options array
        ]}
        name={`league`}
        width="100%"
        value={info?.league || ""} // Ensure placeholder is selected if no league is set
        onChange={onLeagueChange} // Call the handler passed from parent component
      />
      <StyledModalInput
        label={<StyledLabel>* CREATE USERNAME</StyledLabel>}
        placeholder="Username"
        type="text"
        name={`username`}
        value={info?.username}
        onChange={onLeagueChange} // Call the handler passed from parent component
        aria-label="Create Username"
      />
      <StyledModalSelect
        label={<StyledLabel>* SELECT YOUR FAVOURITE TEAM</StyledLabel>}
        name={`team`}
        value={info?.team}
        options={[
          { label: "Select Team", value: "" },
          ...(availableTeams[info.league]?.map((team) => ({
            label: team?.displayName,
            value: team?.fullName,
          })) || [{ label: "No team available", value: "" }]),
        ]}
        onChange={onLeagueChange} // Call the handler passed from parent component
      />
    </Container>
  );
};

export default LeagueHandler;
