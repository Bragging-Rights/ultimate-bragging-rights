import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "react-query";
import { getTeasmByLeage } from "../../services/Teams";
import LeagueHandler from "../Modal/LeagueHandler";
import ModalInput from "../Modal/ModalInput";
import Input from "../Input";
import "../Modal/ModalInput.css";
import PhoneNumber from "../PhoneNumber/PhoneNumber";
import CitySelect from "../Modal/CitySelect";
import StateSelect from "../Modal/StateSelect";
import CountrySelect from "../Modal/CountrySelect";
import ModalSelect from "../Modal/ModalSelect";
import displayToast from "../../components/Alert/Alert";
import { Register } from "../../services/auth";
import "react-toastify/dist/ReactToastify.css";
import logo from "../../assets/logo.png";

const Registration = (props) => {
  const { isOpen, onRequestClose } = props;
  const [selectedCountry, setSelectedCountry] = useState("");
  const [availableTeams, setAvailableTeams] = useState([
    {
      label: "Select your favourite team",
      key: "",
    },
  ]);

  const [league, setLeague] = useState("NHL");
  const [userLeagues, setUserLeagues] = useState([
    { league: "", team: "", username: "" },
  ]);

  const [leaguesOptions, setLeaguesOptions] = useState([
    { value: "", label: "Select league" },
    { value: "nba", label: "NBA", isSelected: false },
    { value: "nfl", label: "NFL", isSelected: false },
    { value: "mlb", label: "MLB", isSelected: false },
    { value: "nhl", label: "NHL", isSelected: false },
  ]);

  const {
    isLoading: loadingTeams,
    isError: teamError,
    data: teamsData,
    refetch,
  } = useQuery(["teams", league], getTeasmByLeage, {
    enabled: !!league,
    onError: () => {
      displayErrorMessage("An error occurred while getting the teams.");
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

      setAvailableTeams([...sortedTeams]);
    },
  });

  useEffect(() => {
    refetchMlb();
    refetchNfl();
    refetchNba();
    refetchNhl();
    refetch();
  }, [league]);

  const [currentStep, setCurrentStep] = useState(1);
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

  const addAnotherLeague = () => {
    const resp = userLeagues.some((item) => {
      if (item.league == "" || item.team == "" || item.username == "") {
        return true;
      }
    });

    if (resp) {
      displayToast("Please fill all the required fileds in the league.");
      return;
    }

    if (userLeagues.length < 4) {
      setUserLeagues([...userLeagues, { league: "", team: "", username: "" }]);
    }
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

    const { confirmPassword, termsAccepted, ...rest } = formData;

    const data = {
      ...rest,
      leagues: [...userLeagues],
    };

    mutate(data);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCountryChange = (e) => {
    setCountryCode(e.value);
    setFormData((prevFormData) => ({
      ...prevFormData,
      country: e.label,
    }));
  };

  const nextStep = () => {
    if (validateStep()) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  // const handleSubmit = () => {
  //   // Add your form submission logic here
  //   console.log("Form submitted", formData);
  // };
  const displayErrorMessage = (message) => {
    // Implement your error display mechanism here
    console.error(message);
  };

  const validateStep = () => {
    // Validation for the first step
    if (currentStep === 1) {
      const requiredFields = ["firstName", "lastName", "gender"];
      const invalidFields = requiredFields.filter((field) => !formData[field]);

      if (invalidFields.length > 0) {
        displayToast(
          `Please fill in all required fields: ${invalidFields.join(" ")}`,
          "error"
        );
        return false;
      }
    }

    // Validation for the second step
    if (currentStep === 2) {
      const requiredFields = [
        "country",
        "province",
        "city",
        "postalCode",
        "phoneNumber",
      ];
      const invalidFields = requiredFields.filter((field) => !formData[field]);

      if (invalidFields.length > 0) {
        displayToast(
          `Please fill in all required fields: ${invalidFields.join(" ")}`,
          "error"
        );
        return false;
      }
    }

    // Validation for the third step
    if (currentStep === 3) {
      if (!validateLeagues(userLeagues)) {
        displayToast(
          `Please fill in all required fields in the leagues.`,
          "error"
        );
        return false;
      }
    }

    // Validation for the fourth step
    if (currentStep === 4) {
      const requiredFields = [
        "email",
        "password",
        "confirmPassword",
        "referralName",
      ];
      const invalidFields = requiredFields.filter((field) => !formData[field]);

      if (invalidFields.length > 0) {
        displayToast(
          `Please fill in all required fields: ${invalidFields.join(" ")}`,
          "error"
        );
        return false;
      }

      // Check if passwords match
      if (formData.password !== formData.confirmPassword) {
        displayToast(
          "Passwords do not match. Please enter matching passwords.",
          "error"
        );
        return false;
      }
    }

    return true;
  };

  return (
    <section>
      <form id="msform">
        <ul id="progressbar">
          <li className={currentStep === 1 ? "active" : ""} id="account">
            <strong>1: Account Owners</strong>
            <div className="logo-container">
              <img
                src={logo}
                className="logo1"
                alt="Logo"
                style={{
                  width: "61px",
                  marginTop: "-75px",
                  marginLeft: "71px",
                }}
              />
            </div>
          </li>
          <li className={currentStep === 2 ? "active" : ""} id="personal">
            <strong>2: Location</strong>
            <div className="logo-container">
              <img
                src={logo}
                className="logo1"
                alt="Logo"
                style={{
                  width: "61px",
                  marginTop: "-75px",
                  marginLeft: "71px",
                }}
              />
            </div>
          </li>
          <li className={currentStep === 3 ? "active" : ""} id="payment">
            <strong>3: Choose League</strong>
            <div className="logo-container">
              <img
                src={logo}
                className="logo1"
                alt="Logo"
                style={{
                  width: "61px",
                  marginTop: "-75px",
                  marginLeft: "71px",
                }}
              />
            </div>
          </li>
          <li className={currentStep === 4 ? "active" : ""} id="confirm">
            <strong>4: Email & Password</strong>
            <div className="logo-container">
              <img
                src={logo}
                className="logo1"
                alt="Logo"
                style={{
                  width: "61px",
                  marginTop: "-75px",
                  marginLeft: "71px",
                }}
              />
            </div>
          </li>
          <br /> <br />
          <br />
          <br />
        </ul>

        {/* <h2 id="heading" className="signup-heading">
          Sign Up Your User Account
        </h2>
        <p className="signup-subtitle">
          Fill all form fields to go to the next step
        </p> */}

        {/* <div className="progress">
          <div
            className="progress-bar progress-bar-striped progress-bar-animated"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            style={{ width: `${setProgressBar()}%` }}
          />
        </div> */}

        {Array.from({ length: 4 }, (_, index) => (
          <fieldset
            key={index}
            style={{ display: index + 1 === currentStep ? "block" : "none" }}
          >
            <div className="form-card">
              {index === 0 && (
                <>
                  <h2
                    id="heading"
                    className="signup-heading"
                    style={{ marginRight: "564px" }}
                  >
                    LET'S CREATE YOUR ACCOUNT!
                  </h2>
                  <p className="signup-subtitle">
                    We just need some basic Info
                  </p>
                  <br />
                  <div className="label-container">
                    <label className="star">*</label>
                    <label className="info-require">
                      Mandatory information Required{" "}
                    </label>
                    <div className=" line"></div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "10px",
                      maxWidth: "1200px",
                    }}
                  >
                    <ModalInput
                      label={"FIRST NAME"}
                      placeholder={"First Name"}
                      name="firstName"
                      value={formData.firstName}
                      onChange={inputChangeHandler}
                      style={{ flex: "1" }}
                      requiredFields
                    />
                    <ModalInput
                      label={"LAST NAME"}
                      placeholder={"Last Name"}
                      name="lastName"
                      value={formData.lastName}
                      onChange={inputChangeHandler}
                      style={{ flex: "1" }}
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
                      style={{ flex: "1" }}
                    />
                    <ModalInput
                      label={"Refer By"}
                      placeholder={"Refer by"}
                      name="referralName"
                      value={formData?.refer_by}
                      onChange={inputChangeHandler}
                    />
                  </div>
                </>
              )}

              {index === 1 && (
                <>
                  <h2
                    id="heading"
                    className="signup-heading"
                    style={{ marginRight: "564px" }}
                  >
                    WE NEED YOUR LOCATION!
                  </h2>
                  <p className="signup-subtitle">
                    To Determine Which Conference and Division you will play in
                  </p>
                  <br />
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      flexWrap: "wrap",
                      gap: "15px",
                      maxWidth: "1200px",
                    }}
                  >
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
                      type="string"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={inputChangeHandler}
                      className="zip-code"
                      style={{ height: "59px" }}
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
                  </div>
                </>
              )}
              {index === 2 && (
                <>
                  <h2
                    id="heading"
                    className="signup-heading"
                    style={{ marginRight: "490px" }}
                  >
                    PLAY AS MANY LEAGUES AS YOU WANT!
                  </h2>
                  <p className="signup-subtitle">
                    Create a Unique Username in Each League{" "}
                  </p>
                  <br />
                  <div className="row">
                    <div className="col-md-4 col-lg-6">
                      <h2 className="leage-option text-white">ALMOST DONE </h2>
                      {userLeagues.map((info, innerIndex) => {
                        const unselectedLeagues = [...leaguesOptions];
                        userLeagues
                          .slice(0, innerIndex)
                          .forEach((userLeague) => {
                            unselectedLeagues.splice(
                              unselectedLeagues.findIndex(
                                (option) => option.value === userLeague.league
                              ),
                              1
                            );
                          });

                        return (
                          <LeagueHandler
                            key={innerIndex}
                            options={unselectedLeagues}
                            handleRemoveLeague={() =>
                              handleRemoveLeague(innerIndex)
                            }
                            handleLeagueChange={(e) =>
                              handleLeagueChange(e, innerIndex)
                            }
                            availableTeams={availableTeams}
                            info={info}
                            index={innerIndex}
                            addAnotherLeague={addAnotherLeague}
                          />
                        );
                      })}

                      <div
                        className="add-another-league"
                        onClick={addAnotherLeague}
                      >
                        +Add Another League
                      </div>
                    </div>
                  </div>
                </>
              )}
              {index === 3 && (
                <>
                  <h2
                    id="heading"
                    className="signup-heading"
                    style={{ marginRight: "490px" }}
                  >
                    LOGIN INFORMATION TIME!
                  </h2>
                  <p className="signup-subtitle">
                    Make Sure You Create a STRONG Password (Use uppercase and
                    lowercase, numbers, and symbols) and never share it with
                    anyone.
                  </p>
                  <br />
                  <div className="label-container">
                    <label className="info-require">
                      Mandatory information Required{" "}
                    </label>
                    <div className=" line"></div>
                  </div>
                  <div className="flex">
                    <div
                      style={{ display: "flex", gap: "5px", width: "828px" }}
                    >
                      <ModalInput
                        label={"Email"}
                        placeholder={"Email"}
                        value={formData.email}
                        onChange={inputChangeHandler}
                        type="email"
                        name="email"
                        style
                      />
                    </div>
                  </div>

                  <div className="line"></div>
                  <div className="password-section">
                    <div className="password-inputs">
                      <ModalInput
                        label={"Create Password"}
                        type="password"
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
                  </div>
                  <div className="line"></div>
                  <div className="privacy-policy">
                    <input
                      type="checkbox"
                      checked={formData.termsAccepted}
                      onChange={handleTermsChange}
                    />
                    <div>
                      I certify that I am at least 18 years old and that I agree
                      to the Terms of services and Privacy Policy.{" "}
                    </div>
                  </div>
                </>
              )}
            </div>

            {index + 1 < 4 && (
              <>
                <input
                  type="button"
                  onClick={nextStep}
                  className="next action-button"
                  value="Next"
                />
                {index > 0 && (
                  <input
                    type="button"
                    onClick={prevStep}
                    className="previous action-button-previous"
                    value="Previous"
                  />
                )}
              </>
            )}
            {index + 1 === 4 && (
              <>
                {/* <input
                  type="button"
                  onClick={handleSubmit}
                  className="submit action-button"
                  value="Submit"
                /> */}
                <button
                  className="submit action-button"
                  onClick={handleRegistration}
                >
                  GET ACCESS TO BRAGGING RIGHTS NOW!
                  {isLoading && <Loader />}
                </button>
                <input
                  type="button"
                  onClick={prevStep}
                  className="previous action-button-previous"
                  value="Previous"
                />
              </>
            )}
          </fieldset>
        ))}
      </form>
    </section>
  );
};
export default Registration;
