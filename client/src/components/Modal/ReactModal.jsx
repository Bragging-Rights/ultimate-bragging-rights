import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import "./Modal.css";
import ModalInput from "./ModalInput";
import ModalSelect from "./ModalSelect";
import CountrySelect from "./CountrySelect";
import { RegionDropdown } from "react-country-region-selector";
import PhoneInput from "react-phone-input-2";
import logo3 from "../../assets/logo.png";
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getTeasmByLeage } from "../../services/Teams";
import { useMutation, useQuery } from "react-query";
import { Register } from "../../services/auth";
import displayToast from "../../components/Alert/Alert";
import StateSelect from "./StateSelect";
import CitySelect from "./CitySelect";
import PhoneNumber from "../PhoneNumber/PhoneNumber";
import { ImCancelCircle } from "react-icons/im";
import Loader from "../Loader/Loader";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "8px",
    border: "1px solid #BE8200",
    boxShadow: "0px 4px 40px 0px rgba(190, 130, 0, 0.60)",
    height: "90vh",
    width: "70%",
    background: "#212227",
    padding: "30px",
  },
  overlay: {
    background: " rgba(33, 34, 39, 0.90)",
  },
};
const leaguesOptions = [
  { value: "nba", label: "NBA" },
  { value: "nfl", label: "NFL" },
  { value: "mlb", label: "MLB" },
  { value: "nhl", label: "NHL" },
];
const ReactModal = (props) => {
  const { isOpen, onRequestClose } = props;
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [availableTeams, setAvailableTeams] = useState([]);
  const [selectedLeague, setSelectedLeague] = useState("");
  const [selectedTeam, setSelectedTeam] = useState("");
  const [league, setLeague] = useState("NHL");

  const {
    isLoading: loadingTeams,
    isError: teamError,
    data: teamsData,
    refetch,
  } = useQuery(["teams", league], getTeasmByLeage, {
    onError: (err) => {
      displayToast("An error occurred while getting the game.", "error");
    },
    onSuccess: (rec) => {
      const sortedTeams = rec.data.sort((a, b) => {
        const nameA = a?.displayName;
        const nameB = b?.displayName;

        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });

      setAvailableTeams(sortedTeams);
    },
  });

  useEffect(() => {
    refetch();
  }, [league]);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    city: "",
    country: "",
    province: "",
    postalCode: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    referralName: "",
    termsAccepted: false,
  });

  const [userLeagues, setUserLeagues] = useState([
    { league: "", team: "", username: "" },
  ]);

  const [countryCode, setCountryCode] = useState("");
  const [stateCode, setStateCode] = useState("");

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleTermsChange = (e) => {
    setFormData({
      ...formData,
      termsAccepted: e.target.checked,
    });
  };

  const handleCountryChange = (e) => {
    setCountryCode(e.value);
    setFormData((prevFormData) => ({
      ...prevFormData,
      country: e.label,
      selectedRegion: "",
    }));
  };

  const addAnotherLeague = () => {
    setUserLeagues([
      ...userLeagues,
      { league: "nba", team: "Anaheim Ducks", username: "" },
    ]);
  };

  const handleRemoveLeague = (index) => {
    const updatedLeaguesInfo = [...userLeagues];
    updatedLeaguesInfo.splice(index, 1);
    setUserLeagues(updatedLeaguesInfo);
  };

  const handleLeagueChange = (e, index) => {
    const temp = [...userLeagues];
    const { name, value } = e.target;
    temp[index] = { ...temp[index], [name]: value };
    setUserLeagues(temp);
  };

  const validateLeagues = (leagues) => {
    for (const league of leagues) {
      if (
        league.league.trim() === "" ||
        league.team.trim() === "" ||
        league.username.trim() === ""
      ) {
        return false;
      }
    }
    return true;
  };

  const { mutate, isLoading, isError, data, error, reset } = useMutation(
    (data) => Register(data),
    {
      onError: (err) => {
        displayToast("An error occurred in the registration", "error");
      },
      onSuccess: (rec) => {
        if (rec?.data?.hasErrors) {
          displayToast(rec?.data?.message, "error");
        } else {
          displayToast("Register successfully.", "success");
        }
      },
    }
  );

  const handleRegistration = async () => {
    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "city",
      "country",
      "province",
      "postalCode",
      "phoneNumber",
      "password",
      "confirmPassword",
      "referralName",
      "termsAccepted",
    ];

    // leagues

    const invalidFields = requiredFields.filter((field) => !formData[field]);

    if (invalidFields.length > 0) {
      displayToast(
        `Please fill in all required fields: ${invalidFields.join(" ")}`
      );
      return;
    }

    if (!validateLeagues(userLeagues)) {
      displayToast(
        `Please fill in all required fields in the leages,`,
        "error"
      );
    }

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      displayToast(
        "Passwords do not match. Please enter matching passwords.",
        "error"
      );
      return;
    }

    const data = {
      ...formData,
      leagues: [...userLeagues],
    };

    mutate(data);
  };

  return (
    <Modal isOpen={isOpen} style={customStyles}>
      <div className="r-modal-header">
        <h2 className=" title">PLAYER REGISTRATION FORM</h2>
        <img
          src={logo3}
          alt="logo-img"
          style={{
            width: "99px",
            height: "76px",
          }}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={25}
          viewBox="0 0 24 25"
          fill="none"
          className="cross-btn"
          onClick={onRequestClose}
        >
          <path
            d="M7 7.5L17 17.5M7 17.5L17 7.5"
            stroke="#E61C1C"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div className="label-container">
        <label className="star">*</label>
        <label className="info-require">Mandatory information Required </label>
        <div className=" line"></div>
      </div>
      <div className=" modal-form-container">
        <ModalInput
          label={"FIRST NAME"}
          placeholder={"First Name"}
          name="firstName"
          value={formData.firstName}
          onChange={inputChangeHandler}
        />
        <ModalInput
          label={"LAST NAME"}
          placeholder={"Last Name"}
          name="lastName"
          value={formData.lastName}
          onChange={inputChangeHandler}
        />
        <ModalInput
          label={"Email"}
          placeholder={"Email"}
          value={formData.email}
          onChange={inputChangeHandler}
          type="email"
          name="email"
        />
        <ModalSelect
          label={"SEX"}
          options={[
            { value: "", label: "Select Gender" },
            { value: "male", label: "Male" },
            { value: "female", label: "Female" },
            { value: "other", label: "Rather Not Say" },
          ]}
          name="gender"
          onChange={inputChangeHandler}
        />
        <CountrySelect
          value={selectedCountry}
          onChange={(e) => handleCountryChange(e)}
        />
        <StateSelect
          country={countryCode}
          onChange={(e) => {
            setStateCode(e.value);
            setFormData({
              ...formData,
              province: e.label,
            });
          }}
        />

        <CitySelect
          onChange={(e) =>
            setFormData({
              ...formData,
              city: e.label,
            })
          }
          state={stateCode}
          countryCode={countryCode}
          stateCode={stateCode}
        />

        <ModalInput
          label={"Postal/ZIP Code"}
          placeholder={"Postal/ZIP code"}
          type="number"
          name="postalCode"
          value={formData.postalCode}
          onChange={inputChangeHandler}
        />

        <PhoneNumber
          value={formData.phoneNumber}
          onChange={(e) => {
            setFormData({
              ...formData,
              phoneNumber: e,
            });
          }}
        />
        <ModalInput
          label={"Refer By"}
          placeholder={"Refer by"}
          name="referralName"
          value={formData?.refer_by}
          onChange={inputChangeHandler}
        />
        <div className="line"></div>
      </div>
      <h2 className="leage-option text-white">
        CHOICE LEAGUES YOU WANT TO PLAY IN
      </h2>
      <div>
        {userLeagues?.map((info, index) => {
          console.log("info", info);
          return (
            <div className="modal-bottom relative mb-2" key={index}>
              <button
                onClick={() => handleRemoveLeague(index)}
                className="bg-red-500 text-white w-7 h-7 rounded-full flex items-center justify-center transition-colors hover:bg-red-600
                 absolute right-0
                "
              >
                <ImCancelCircle />
              </button>
              <ModalSelect
                label="Select League"
                options={leaguesOptions}
                name={`league`}
                value={info.selectedLeague}
                onChange={(e) => handleLeagueChange(e, index)}
              />
              <ModalInput
                label="Create Unique Username"
                placeholder="User Name"
                type="text"
                name={`username`}
                value={info.username}
                onChange={(e) => handleLeagueChange(e, index)}
              />
              <ModalSelect
                label="Select Your Favorite Team"
                name={`team`}
                value={info.team}
                options={availableTeams.map((team) => {
                  return {
                    label: team?.displayName,
                    value: team?.fullName,
                  };
                })}
                onChange={(e) => handleLeagueChange(e, index)}
              />
            </div>
          );
        })}
        <div className="add-another-league" onClick={addAnotherLeague}>
          +Add Another League
        </div>
      </div>
      <div className="line"></div>
      <div className="password-section">
        <h2>Create strong password</h2>
        <div className="warn">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            viewBox="0 0 20 20"
            fill="none"
          >
            <circle
              cx={10}
              cy={10}
              r="7.5"
              stroke="white"
              strokeWidth="1.66667"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <rect
              x={10}
              y="6.66748"
              width="0.00890625"
              height="0.00890625"
              stroke="white"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            <path
              d="M10 10V13.3333"
              stroke="white"
              strokeWidth="1.66667"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div>Use uppercase and lowercase, numbers, and symbols</div>
        </div>
        <div className="password-inputs">
          <ModalInput
            label={"Create Password"}
            placeholder={"Create Password"}
            name="password"
            value={formData.password}
            onChange={inputChangeHandler}
          />
          <ModalInput
            label={"Confirm Password"}
            placeholder={"Confirm Password"}
            type="password"
            name="confirmPassword"
            onChange={(e) =>
              setFormData({
                ...formData,
                confirmPassword: e.target.value,
              })
            }
            value={formData.confirmPassword}
          />
        </div>
        <div className="line"></div>
        <div className="privacy-policy">
          <input
            type="checkbox"
            checked={formData.termsAccepted}
            onChange={handleTermsChange}
          />
          <div>
            I certify that I am at least 18 years old and that I agree to the
            Terms of services and Privacy Policy.{" "}
          </div>
        </div>
      </div>
      <button className="submit-btn" onClick={handleRegistration}>
        GET ACCESS TO BRAGGING RIGHTS NOW!
        {isLoading && <Loader />}
      </button>
    </Modal>
  );
};

export default ReactModal;
