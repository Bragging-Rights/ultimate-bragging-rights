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
  const [selectedCountryCode, setSelectedCountryCode] = useState({
    label: "+1",
    value: "US",
  }); // Default to US country code

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    city: "",
    country: "",
    province: "",
    postalCode: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    referralName: "",
    leagues: [{ league: "", team: "", username: "" }],
    termsAccepted: false,
  });

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    const getTeams = async () => {
      // const response = await axios.get(
      //   `http://localhost:5001/api/teams?league=${selectedLeague}`
      // );
      const response = {
        data: fetchTeams(),
      };
      const data = response.data;
      console.log("team data", selectedLeague, data);
      setAvailableTeams(data);
    };

    console.log("selectedLeague", selectedLeague);
    // get teams of selected league
    getTeams();
  }, [selectedLeague]);

  const fetchTeams = (selectedLeague) => {
    // Simulate fetching teams based on the selected league
    // Replace this with your actual API call to the backend
    // In the real implementation, you should call your backend API to get teams for the selected league
    const teams = [
      { value: "team1", label: "Team 1" },
      { value: "team2", label: "Team 2" },
      { value: "team3", label: "Team 3" },
      // Add more options as needed
    ];
    return teams;
  };

  const handleTermsChange = (e) => {
    setFormData({
      ...formData,
      termsAccepted: e.target.checked,
    });
  };

  const handleCountryChange = (country) => {
    console.log(country);
    setSelectedCountry(country);
    setSelectedRegion("");
    setFormData((prevFormData) => ({
      ...prevFormData,
      selectedCountry: country,
      selectedRegion: "",
    }));
  };

  const handleRegionChange = (region) => {
    setSelectedRegion(region);

    // Update formData
    setFormData((prevFormData) => ({
      ...prevFormData,
      selectedRegion: region,
      selectedCity: "", // Reset the selected city in formData
    }));
  };
  const countryCodes = [
    { label: "+1", value: "US" },
    { label: "+44", value: "UK" },
    // Add more country code options as needed
  ];
  const handleCountryCodeChange = (selectedOption) => {
    setSelectedCountryCode(selectedOption);
    // Update the phone number in formData when the country code changes
    setFormData({
      phoneNumber: selectedOption.label + formData.phoneNumber,
    });
  };

  const [leaguesInfo, setLeaguesInfo] = useState([
    {
      selectedLeague: "",
      formData: { username: "", team: "" },
    },
  ]);

  const addAnotherLeague = () => {
    setLeaguesInfo([
      ...leaguesInfo,
      { selectedLeague: "", formData: { username: "", team: "" } },
    ]);
  };

  const handleRemoveLeague = (index) => {
    const updatedLeaguesInfo = [...leaguesInfo];
    updatedLeaguesInfo.splice(index, 1);
    setLeaguesInfo(updatedLeaguesInfo);
  };

  const handleRegistration = async () => {
    // Simulated registration logic (replace this with your actual registration API call)
    try {
      // Simulate a successful registration (replace this with your actual registration logic)
      const response = await fetch("https://api.example.com/register", {
        method: "POST",
        // Add your registration data here
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          // Add other registration fields
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        // Registration is successful
        toast.success("User is registered!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } else {
        // Registration failed
        toast.error("Registration failed. Please try again.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (error) {
      // Handle registration error (e.g., network error)
      toast.error("Registration failed. Please try again.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const [leagueTeams, setLeagueTeams] = useState({
    nba: [], // Initialize with empty arrays for each league
    nfl: [],
    mlb: [],
    nhl: [],
  });

  useEffect(() => {
    const fetchAllTeams = async () => {
      // Fetch teams for each league and update the state
      const nbaTeams = await getTeasmByLeage("nba");
      const nflTeams = await getTeasmByLeage("nfl");
      const mlbTeams = await getTeasmByLeage("mlb");
      const nhlTeams = await getTeasmByLeage("NHL");

      setLeagueTeams({
        nba: nbaTeams,
        nfl: nflTeams,
        mlb: mlbTeams,
        nhl: nhlTeams,
      });
    };

    fetchAllTeams();
  }, []);

  const getTeams = async (selectedLeague) => {
    try {
      const response = await getTeamsByLeague(selectedLeague);
      const data = response.data;
      setAvailableTeams(data);
    } catch (error) {
      // Handle any errors
      console.error("Error fetching teams:", error);
    }
  };

  useEffect(() => {
    if (selectedLeague) {
      const fetchTeams = async () => {
        try {
          const response = await getTeasmByLeage(selectedLeague); // Pass the selected league to the function
          const data = response.data;
          setAvailableTeams(data);
        } catch (error) {
          // Handle any errors
          console.error("Error fetching teams:", error);
        }
      };

      fetchTeams();
    }
  }, [selectedLeague]);

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
        <lable className="info-require">Mandatory information Required </lable>
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
        <ModalInput
          label={"CITY"}
          placeholder={"City"}
          name="city"
          value={formData.city}
          onChange={inputChangeHandler}
        />
        <CountrySelect value={selectedCountry} onChange={handleCountryChange} />
        <div className="element-container">
          <div>
            <label className="star">*</label>
            <label className="input-label">Province/State</label>
          </div>
          <RegionDropdown
            country={selectedCountry}
            value={selectedRegion}
            onChange={handleRegionChange}
          />
        </div>
        <ModalInput
          label={"Postal/ZIP Code"}
          placeholder={"Postal/ZIP code"}
          type="number"
          name="postalCode"
          value={formData.postalCode}
          onChange={inputChangeHandler}
        />

        <div
          className="element-container"
          // style={{ display: "flex", alignItems: "center" }}
        >
          {/* <div style={{ marginRight: "10px" }}>
            <label className="star">*</label>
            <label className="input-label">Phone Number</label>
          </div> */}
          <div style={{ display: "flex", gap: "5px", paddingTop: "5px" }}>
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="country-select"
              style={{ width: "50px" }}
            >
              <option value="US">United States (+1)</option>
              <option value="CA">Canada (+1)</option>
              {/* Add more options for other countries as needed */}
            </select>
            <ModalInput
              className="w-100 phone-input"
              label="Phone Number"
              country={selectedCountry}
              value={formData.phoneNumber}
              onChange={(phone) =>
                inputChangeHandler({
                  target: { value: phone, name: "phoneNumber" },
                })
              }
              name="phoneNumber"
              id="phoneNumber"
              required={true}
            />
          </div>
        </div>

        <ModalInput
          label={"Email"}
          placeholder={"Email"}
          value={formData.email}
          onChange={inputChangeHandler}
          type="email"
          name="email"
        />

        <div className="line"></div>
      </div>
      <h2 className="leage-option text-white">
        CHOICE LEAGUES YOU WANT TO PLAY IN
      </h2>
      <div>
        {leaguesInfo.map((info, index) => (
          <div className="modal-bottom" key={index}>
            <button
              onClick={() => handleRemoveLeague(index)}
              className="bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:bg-red-600"
            >
              X
            </button>
            <ModalSelect
              label="Select League"
              options={leaguesOptions}
              name={`league_${index}`}
              value={info.selectedLeague}
              onChange={(e) => {
                const updatedLeaguesInfo = [...leaguesInfo];
                updatedLeaguesInfo[index].selectedLeague = e.target.value;
                setLeaguesInfo(updatedLeaguesInfo);
              }}
            />
            <ModalInput
              label="Create Unique Username"
              placeholder="User Name"
              type="text"
              name={`username_${index}`}
              value={info.formData.username}
              onChange={(e) => {
                const updatedLeaguesInfo = [...leaguesInfo];
                updatedLeaguesInfo[index].formData.username = e.target.value;
                setLeaguesInfo(updatedLeaguesInfo);
              }}
            />
            <ModalSelect
              label="Select Your Favorite Team"
              name={`team_${index}`}
              value={info.formData.team}
              onChange={(e) => {
                const updatedLeaguesInfo = [...leaguesInfo];
                updatedLeaguesInfo[index].formData.team = e.target.value;
                setLeaguesInfo(updatedLeaguesInfo);
              }}
              options={leagueTeams[info.selectedLeague] || []}
            />
          </div>
        ))}
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
      </button>
      <ToastContainer />{" "}
    </Modal>
  );
};

export default ReactModal;
