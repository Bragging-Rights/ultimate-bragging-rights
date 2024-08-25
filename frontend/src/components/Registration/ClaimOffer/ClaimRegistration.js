import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import Swal from "sweetalert2";
import "../../Modal/Modal.css";
import { useQuery, useMutation } from "react-query";
import { getTeasmByLeage } from "../../../Apis/Teams";
import LeagueHandler from "../../Modal/LeagueHandler";
import ModalInput from "../../Modal/ModalInput";
import "../../Modal/ModalInput.css";
import PhoneNumber from "../../PhoneNumber/PhoneNumber";
import CitySelect from "../../Modal/CitySelect";
import StateSelect from "../../Modal/StateSelect";
import CountrySelect from "../../Modal/CountrySelect";
import ModalSelect from "../../Modal/ModalSelect";
import displayToast from "../../../components/Alert/Alert";
import { Register } from "../../../Apis/auth";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../Loader/Loader";
import Captcha from "./../Captcha";
import ModalPassword from "../../Modal/ModalPassword";
import EmailModalInput from "./EmailRegister";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, -50%)",
    borderRadius: "8px",
    border: "1px solid #BE8200",
    boxShadow: "0px 4px 40px 0px rgba(190, 130, 0, 0.60)",
    height: "85vh",
    width: "80vw",
    background: "#212227",
    padding: "20px",
  },
  overlay: {
    background: "rgba(33, 34, 39, 0.90)",
  },
};
const mobileStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, -50%)",
    borderRadius: "8px",
    border: "1px solid #BE8200",
    boxShadow: "0px 4px 40px 0px rgba(190, 130, 0, 0.60)",
    height: "80vh",
    width: "85vw",
    background: "#212227",
    padding: "10px",
  },
  overlay: {
    background: "rgba(33, 34, 39, 0.90)",
  },
};

const ClaimRegistration = (props) => {
  const { modalIsOpen, closeModal, email } = props; // Accept email as a prop
  const isMobile = window.innerWidth <= 600;
  const [selectedCountry, setSelectedCountry] = useState("");
  const [captchaState, setCaptchaState] = useState(false);
  const [showOtpInput, setShowOtpInput] = useState(false);

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
    { value: "nba", label: "NBA", isSelected: false },
    { value: "nfl", label: "NFL", isSelected: false },
    { value: "mlb", label: "MLB", isSelected: false },
    { value: "nhl", label: "NHL", isSelected: false },
  ]);

  const {
    isLoading: loadingTeams,
    isError: teamError,
    data: teamsData,
    refetch: refetchNhl,
  } = useQuery(["teams", league], getTeasmByLeage, {
    onError: (err) => {},
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

      setAvailableTeams({ ...availableTeams, nhl: [...rec.data] });
    },
  });

  const { refetch: refetchNba } = useQuery(["teams", "nba"], getTeasmByLeage, {
    onError: (err) => {},
    onSuccess: (rec) => {
      setAvailableTeams({ ...availableTeams, nba: [...rec.data] });
    },
  });

  const { refetch: refetchNfl } = useQuery(["teams", "nfl"], getTeasmByLeage, {
    onError: (err) => {},
    onSuccess: (rec) => {
      setAvailableTeams({ ...availableTeams, nfl: [...rec.data] });
    },
  });

  const { refetch: refetchMlb } = useQuery(["teams", "mlb"], getTeasmByLeage, {
    onError: (err) => {},
    onSuccess: (rec) => {
      setAvailableTeams({ ...availableTeams, mlb: [...rec.data] });
    },
  });

  useEffect(() => {
    refetchMlb();
    refetchNfl();
    refetchNba();
    refetchNhl();
  }, [league]);

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    couponcode: "",
    lastName: "",
    email: email || "", // Use the passed email
    city: "",
    country: "",
    province: "",
    postalCode: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    referralName: "",
    username: "",
    emailVerified: true,

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
  const handleCountryChange = (e) => {
    setCountryCode(e.value);
    setFormData((prevFormData) => ({
      ...prevFormData,
      country: e.label,
    }));
  };
  const handleCreateAccountClick = () => {
    // Logic to create account
    handleRegistration();
    // If OTP is needed, show the OTP input field
    setShowOtpInput(true);
  };

  const handleRemoveLeague = (index) => {
    if (userLeagues.length === 1) {
      displayToast("Can not remove League! One league is required!", "warning");
      return;
    }
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
      displayToast(" all the required fileds Please fill in the league.");
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
        displayToast(
          `An error occurred! ${err.response.data.message}`,
          "error"
        );
      },
      onSuccess: (rec) => {
        if (rec?.data?.hasErrors) {
          displayToast(rec?.data?.message, "error");
        } else {
          setShowOtpInput(true);
          // displayToast("Register successfully.", "success");
          displayToast(
            "Code Successfully sent! Please check your inbox",
            "success"
          );
          // window.location.reload(); // Add this line to refresh the page
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

      // "otpCode",
    ];

    const invalidFields = requiredFields.filter((field) => !formData[field]);

    if (invalidFields.length > 0) {
      displayToast(
        `Please fill in all required fields: ${invalidFields.join(" ")}`
      );
      return;
    }

    if (!validateLeagues(userLeagues)) {
      displayToast(
        `Please fill in all required fields in the leagues.`,
        "error"
      );
      return;
    }

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
    console.log("mutation is called");
    console.log(data);
    mutate(data);
  };

  const handleNextClick = () => {
    if (currentStep === 3 && userLeagues.length === 1) {
      Swal.fire({
        title: "You have only selected one league. Do you want to continue?",
        showDenyButton: true,
        confirmButtonText: "Yes",
        denyButtonText: "No",
      }).then((result) => {
        if (result.isConfirmed) {
          nextStep(); // Proceed to the next step
        } else if (result.isDenied) {
          Swal.fire("You can add more leagues before proceeding", "", "info");
          // Stay on the current page
        }
      });
    } else {
      nextStep(); // Proceed to the next step if more than one league is selected or not on the "Choose League" step
    }
  };

  const nextStep = () => {
    if (validateStep()) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const displayErrorMessage = (message) => {
    console.error(message);
  };

  const validateStep = () => {
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

    if (currentStep === 3) {
      if (!validateLeagues(userLeagues)) {
        displayToast(
          `Please fill in all required fields in the leagues.`,
          "error"
        );
        return false;
      }
    }
    if (currentStep === 4) {
      const requiredFields = [
        "email",
        "password",
        "confirmPassword",
        "termsAccepted",
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
    return true;
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      // className="custom-modal"
      style={isMobile ? mobileStyles : customStyles}
      onRequestClose={closeModal}
    >
      <div className="r-modal-header">
        <h2 className="title">SIGN IN</h2>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={25}
          viewBox="0 0 24 25"
          fill="none"
          className="cross-btn"
          onClick={closeModal}
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
      <form id="msform">
        <ul id="progressbar">
          <li
            className={`step ${currentStep === 1 ? "active" : ""}`}
            id="account"
          >
            <strong
              style={{
                color: currentStep === 1 ? "#FFAE00" : "inherit",
              }}
            >
              Account Owner
            </strong>
            <div className="logo-container">{/* Other content */}</div>
          </li>

          <li
            className={`step ${currentStep === 2 ? "active" : ""}`}
            id="personal"
          >
            <strong
              style={{
                color: currentStep === 2 ? "#FFAE00" : "inherit",
              }}
            >
              Location
            </strong>
            <div className="logo-container">{/* Other content */}</div>
          </li>

          <li
            className={`step ${currentStep === 3 ? "active" : ""}`}
            id="payment"
          >
            <strong
              style={{
                color: currentStep === 3 ? "#FFAE00" : "inherit",
              }}
            >
              Choose League
            </strong>
            <div className="logo-container">{/* Other content */}</div>
          </li>

          <li
            className={`step ${currentStep === 4 ? "active" : ""}`}
            id="confirm"
          >
            <strong
              style={{
                color: currentStep === 4 ? "#FFAE00" : "inherit",
              }}
            >
              Email & Password
            </strong>
            <div className="logo-container"></div>
          </li>
        </ul>

        {Array.from({ length: 4 }, (_, index) => (
          <fieldset
            key={index}
            className="register-data"
            style={{
              display: index + 1 === currentStep ? "block" : "none",
              padding: "0%",
            }}
          >
            <div className="form-card">
              {index === 0 && (
                <>
                  <p id="heading" className="signup-heading">
                    LET'S CREATE YOUR ACCOUNT!
                  </p>
                  <p className="signup-subtitle">
                    We just need some basic Info
                  </p>

                  <div className="label-container">
                    <label className="info-require">* Information Needed</label>
                    <div className="line"></div>
                  </div>

                  <div className="form-container">
                    <div className="form-row">
                      <ModalInput
                        label={
                          <h2
                            id="heading"
                            className="signup-heading"
                            style={{ fontSize: "14px", color: "#FFAE00" }}
                          >
                            * FIRST NAME
                          </h2>
                        }
                        placeholder={"First Name"}
                        name="firstName"
                        value={formData.firstName}
                        onChange={inputChangeHandler}
                        requiredFields
                      />
                      <ModalInput
                        label={
                          <h2
                            id="heading"
                            className="signup-heading"
                            style={{ fontSize: "14px", color: "#FFAE00" }}
                          >
                            * LAST NAME
                          </h2>
                        }
                        placeholder={"Last Name"}
                        name="lastName"
                        value={formData.lastName}
                        onChange={inputChangeHandler}
                      />
                      <ModalSelect
                        label={
                          <h2
                            id="heading"
                            className="signup-heading"
                            style={{ fontSize: "14px", color: "#FFAE00" }}
                          >
                            * SEX
                          </h2>
                        }
                        options={[
                          { value: "", label: "Gender" },
                          { value: "male", label: "Male" },
                          { value: "female", label: "Female" },
                        ]}
                        name="gender"
                        onChange={inputChangeHandler}
                      />
                      <ModalInput
                        label={
                          <h2
                            id="heading"
                            className="signup-heading"
                            style={{ fontSize: "14px", color: "#FFAE00" }}
                          >
                            REFER BY
                          </h2>
                        }
                        placeholder={"Refer by"}
                        name="referralName"
                        value={formData?.refer_by}
                        onChange={inputChangeHandler}
                      />
                      <ModalInput
                        label={
                          <h2
                            id="heading"
                            className="signup-heading"
                            style={{ fontSize: "14px", color: "#FFAE00" }}
                          >
                            COUPON CODE
                          </h2>
                        }
                        placeholder={"Coupon Code"}
                        name="couponCode"
                        onChange={inputChangeHandler}
                      />
                    </div>
                  </div>
                </>
              )}
              {index === 1 && (
                <>
                  <h2 id="heading" className="signup-heading">
                    WE NEED YOUR LOCATION!
                  </h2>
                  <p className="signup-subtitle">
                    To Determine Which Conference and Division you will play in
                  </p>

                  <div className="label-container">
                    <label className="info-require">* Information Needed</label>
                    <div className="line"></div>
                  </div>

                  <div className="form-container">
                    <div className="form-row">
                      <CountrySelect
                        value={selectedCountry}
                        onChange={(e) => handleCountryChange(e)}
                        defaultValue={{ value: "CA", label: "Canada" }}
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
                        style={{
                          position: "relative",
                          zIndex: 9999,
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
                        style={{
                          position: "relative",
                          zIndex: 9999,
                        }}
                      />
                    </div>
                  </div>

                  <div className="form-container">
                    <div className="form-row">
                      <ModalInput
                        label={
                          <h2
                            id="heading"
                            className="signup-heading"
                            style={{ fontSize: "14px", color: "#FFAE00" }}
                          >
                            * Postal/ZIP Code
                          </h2>
                        }
                        placeholder="Postal/ZIP code"
                        type="text"
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
                        className="phone-number"
                      />
                    </div>
                  </div>
                </>
              )}

              {index === 2 && (
                <>
                  <h2 id="heading" className="signup-heading">
                    Join the Leagues You want
                  </h2>
                  <p className="signup-subtitle">
                    by creating a username in that league{" "}
                  </p>

                  <div className="label-container">
                    <label className="info-require">
                      * You Must Join At least One League{" "}
                    </label>
                    <div className=" line"></div>
                  </div>

                  <div className="row">
                    <div className="col-md-4 col-lg-12">
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
                            isDisabled={true} // set input fields to be disabled
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
                  <h2 id="heading" className="signup-heading">
                    LOGIN INFORMATION TIME!
                  </h2>
                  <p className="signup-subtitle">
                    Make Sure You Create a STRONG Password (Use uppercase and
                    lowercase, numbers, and symbols) and never share it with
                    anyone.
                  </p>

                  <div className="label-container">
                    <label className="info-require">
                      * Information Needed{" "}
                    </label>
                    <div className=" line"></div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "16px",
                    }}
                  >
                    <div style={{ flex: "1", display: "flex", gap: "16px" }}>
                      <EmailModalInput
                        label={
                          <h2
                            id="heading"
                            className="signup-heading"
                            style={{ fontSize: "14px", color: "#FFAE00" }}
                          >
                            * EMAIL
                          </h2>
                        }
                        placeholder={"Email"}
                        name="email"
                        value={formData.email}
                        onChange={inputChangeHandler}
                        disabled // This line disables the email input field
                      />

                      <ModalPassword
                        label={
                          <h2
                            id="heading"
                            className="signup-heading"
                            style={{ fontSize: "14px", color: "#FFAE00" }}
                          >
                            CREATE PASSWORD
                          </h2>
                        }
                        placeholder={"Create Password"}
                        name="password"
                        value={formData.password}
                        onChange={inputChangeHandler}
                        type="password"
                      />
                      <ModalPassword
                        label={
                          <h2
                            id="heading"
                            className="signup-heading"
                            style={{ fontSize: "14px", color: "#FFAE00" }}
                          >
                            CONFIRM PASSWORD
                          </h2>
                        }
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
                  <div className="privacy-policy">
                    <input
                      type="checkbox"
                      name="termsAccepted"
                      checked={formData.termsAccepted}
                      onChange={handleTermsChange}
                      required // This makes the checkbox required
                    />

                    <br />
                    <br />
                    <div style={{ color: "white" }}>
                      I certify that I am at least 18 years old and that I agree
                      to the Terms of services and Privacy Policy.{" "}
                    </div>
                  </div>

                  <Captcha
                    setCaptchaState={setCaptchaState}
                    captchaState={captchaState}
                  />
                </>
              )}
            </div>
            <div className="button-layout">
              {index + 1 < 4 && (
                <div className="button-container">
                  <div className="button-next-prev">
                    {index > 0 && (
                      <input
                        type="button"
                        onClick={prevStep}
                        className="previous action-button-previous"
                        value="Previous"
                        style={{
                          position: "relative",
                          zIndex: 0,
                        }}
                      />
                    )}
                    <input
                      type="button"
                      onClick={handleNextClick}
                      className="next action-button"
                      value="Next"
                      style={{
                        position: "relative",
                        zIndex: 0,
                      }}
                    />
                  </div>
                </div>
              )}
              {index + 1 === 4 && (
                <div className="button-container">
                  <div className="button-next-prev">
                    {" "}
                    <input
                      type="button"
                      onClick={prevStep}
                      className="previous action-button-previous"
                      value="Previous"
                    />
                    <button
                      className={`submit action-button ${
                        !captchaState && "cursor-not-allowed"
                      }`}
                      onClick={handleRegistration}
                      type="button"
                    >
                      Create Account
                      {isLoading && <Loader />}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </fieldset>
        ))}
      </form>
    </Modal>
  );
};

export default ClaimRegistration;
