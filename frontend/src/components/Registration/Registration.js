import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import "./Modal/Modal.css";
import { useQuery, useMutation } from "react-query";
import { getTeasmByLeage } from "../../api/Teams";
import LeagueHandler from "./Modal/LeagueHandler";
import ModalInput from "./Modal/ModalInput";
import "../Modal/ModalInput.css";
import PhoneNumber from "../PhoneNumber/PhoneNumber";
import CitySelect from "../Modal/CitySelect";
import StateSelect from "../Modal/StateSelect";
import CountrySelect from "../Modal/CountrySelect";
import ModalSelect from "../Modal/ModalSelect";
import displayToast from "../../components/Alert/Alert";
import { Register } from "../../api/auth";
import "react-toastify/dist/ReactToastify.css";

const Registration = (props) => {
    const { isOpen, onRequestClose } = props;
    const [selectedCountry, setSelectedCountry] = useState("");
    const [captchaState, setCaptchaState] = useState(false);
  
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
      // { value: "", label: "Select league" },
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
      // enabled: false,
      onError: (err) => {
        // displayToast("An error occurred while getting the teams.", "error");
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
  
        setAvailableTeams({ ...availableTeams, nhl: [...rec.data] });
      },
    });
  
    const { refetch: refetchNba } = useQuery(["teams", "nba"], getTeasmByLeage, {
      // enabled: false,
      onError: (err) => {
        // displayToast("An error occurred while getting the teams.", "error");
      },
      onSuccess: (rec) => {
        setAvailableTeams({ ...availableTeams, nba: [...rec.data] });
      },
    });
  
    const { refetch: refetchNfl } = useQuery(["teams", "nfl"], getTeasmByLeage, {
      // enabled: false,
      onError: (err) => {
        // displayToast("An error occurred while getting the teams.", "error");
      },
      onSuccess: (rec) => {
        setAvailableTeams({ ...availableTeams, nfl: [...rec.data] });
      },
    });
  
    const { refetch: refetchMlb } = useQuery(["teams", "mlb"], getTeasmByLeage, {
      // enabled: false,
      onError: (err) => {
        // displayToast("An error occurred while getting the teams.", "error");
      },
      onSuccess: (rec) => {
        setAvailableTeams({ ...availableTeams, mlb: [...rec.data] });
      },
    });
  
    useEffect(() => {
      refetchMlb();
      refetchNfl();
      refetchNba();
      refetchNhl();
      // refetch();
    }, [league]);
  
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
      firstName: "",
      couponcode: "",
  
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
    const handleCountryChange = (e) => {
      setCountryCode(e.value);
      setFormData((prevFormData) => ({
        ...prevFormData,
        country: e.label,
      }));
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
        displayToast(" all the required fileds Please fillin the league.");
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
        return;
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
  
    const nextStep = () => {
      if (validateStep()) {
        setCurrentStep(currentStep + 1);
      }
    };
  
    const prevStep = () => {
      setCurrentStep(currentStep - 1);
    };
  
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
      <Modal isOpen={isOpen} className="custom-modal">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={25}
          viewBox="0 0 24 25"
          fill="none"
          className="cross-btn cursor-pointer absolute right-2 top-1"
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
  
            {/* <li
              className={`step ${currentStep === 5 ? "active" : ""}`}
              id="confirm"
            >
              <strong
                style={{
                  color: currentStep === 5 ? "#FFAE00" : "inherit",
                }}
              >
                Setup Account
              </strong>
              <div className="logo-container"></div>
            </li> */}
  
            <br />
            <br />
            <br />
            <br />
          </ul>
  
          {Array.from({ length: 4 }, (_, index) => (
            <fieldset
              key={index}
              style={{ display: index + 1 === currentStep ? "block" : "none" }}
            >
              <div className="form-card">
                <br /> <br />
                {index === 0 && (
                  <>
                    <h2 id="heading" className="signup-heading">
                      LET'S CREATE YOUR ACCOUNT!
                    </h2>
                    <p className="signup-subtitle">
                      We just need some basic Info
                    </p>
                    <br />
                    <div className="label-container">
                      <label className="info-require">
                        * Information Needed{" "}
                      </label>
                      <div className=" line"></div>
                    </div>
                    <br />
                    <div className="form-container">
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
                        style={{ flex: "1" }}
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
                        style={{ flex: "1" }}
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
                          { value: "", label: "Select Gender" },
                          { value: "male", label: "Male" },
                          { value: "female", label: "Female" },
                        ]}
                        name="gender"
                        onChange={inputChangeHandler}
                        style={{ flex: "1" }}
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
                        // value={formData.couponcode}
                        // onChange={inputChangeHandler}
                        style={{ flex: "1" }}
                        requiredFields
                      />
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
  
                    <br />
                    <div className="label-container">
                      <label className="info-require">
                        * Information Needed{" "}
                      </label>
                      <div className=" line"></div>
                    </div>
                    <br />
                    <div className="form-container">
                      <CountrySelect
                        value={selectedCountry}
                        onChange={(e) => handleCountryChange(e)}
                        defaultValue={{ value: "CA", label: "Canada" }} // Set the default value to Canada
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
                        type="text" // Assuming "string" was a typo, and you intended to use "text" as the type
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
                    <h2 id="heading" className="signup-heading">
                      Join the Leagues You want
                    </h2>
                    <p className="signup-subtitle">
                      by creating a username in that league{" "}
                    </p>
                    <br />
                    <div className="label-container">
                      <label className="info-require">
                        * You Must Join At least One League{" "}
                      </label>
                      <div className=" line"></div>
                    </div>
                    <br />
                    <div className="row">
                      <div className="col-md-4 col-lg-6">
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
                    <br />
                    <div className="label-container">
                      <label className="info-require">
                        * Information Needed{" "}
                      </label>
                      <div className=" line"></div>
                    </div>
                    <br />
                    <div className="form-container">
                      <ModalInput
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
                        value={formData.email}
                        onChange={inputChangeHandler}
                        type="email"
                        name="email"
                      >
                        <div className="email-modal"></div>
                      </ModalInput>
                    </div>
                    <div className="password-section">
                      <div className="password-inputs">
                        <ModalInput
                          label={
                            <h2
                              id="heading"
                              className="signup-heading"
                              style={{ fontSize: "14px", color: "#FFAE00" }}
                            >
                              * CREATE PASSWORD
                            </h2>
                          }
                          placeholder={"Create Password"}
                          name="password"
                          value={formData.password}
                          onChange={inputChangeHandler}
                          type="password"
                        />
                        <ModalInput
                          label={
                            <h2
                              id="heading"
                              className="signup-heading"
                              style={{ fontSize: "14px", color: "#FFAE00" }}
                            >
                              * CONFIRM PASSWORD
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
                      />
                      <br /> <br />
                      <br /> <br />
                      <div style={{ color: "white" }}>
                        I certify that I am at least 18 years old and that I agree
                        to the Terms of services and Privacy Policy.{" "}
                      </div>
                    </div>
                    <br />
                    <Captcha
                      setCaptchaState={setCaptchaState}
                      captchaState={captchaState}
                    />
                  </>
                )}
                {/* {index === 4 && (
                  <>
                    <h2 id="heading" className="signup-heading">
                      PLEASE CHECK YOUR EMAIL FOR THE CONFIRMATION CODE
                    </h2>
                    <p className="signup-subtitle">
                      Once Enter We Will Setup Your Account. Enter Confirmation
                      Code Below
                    </p>
                    <br />
                    <div className="label-container">
                      <label className="info-require">
                        * Information Needed{" "}
                      </label>
                      <div className=" line"></div>
                    </div>
                    <div className="form-container">
                    <ModalInput
                        label={
                          <h2
                            id="heading"
                            className="signup-heading"
                            style={{ fontSize: "14px", color: "#FFAE00" }}
                          >
                            * ENTER YOUR VERIFICATION CODE
                          </h2>
                        }
                        placeholder={"Enter Your Verification Code"}
                        name="code"
                        value={formData.verifyCode}
                        onChange={inputChangeHandler}
                        style={{ flex: "1" }}
                      />
                    </div>
                    <br />
                    <div style={{ color: "red", textAlign: "center" }}>
                      * If you close this window without entering the confirmation
                      code, you will have to start the whole process all over
                      again!
                      <br />
                      Please go check your email now for the code. If you do not
                      see it, please check your Spam or Junk Folder.
                    </div>
                  </>
                )} */}
                <br />
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
              </div>
              {index + 1 === 4 && (
                <>
                  <button
                    className={`submit action-button ${
                      !captchaState && "cursor-not-allowed"
                    }`}
                    onClick={handleRegistration}
                    type="button"
                    disabled={!captchaState}
                  >
                    Create Account {isLoading && <Loader />}
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
      </Modal>
    );
  };
  export default Registration;
  