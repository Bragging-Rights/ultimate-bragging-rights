import React, { useState, useEffect, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { Link } from "react-router-dom";
import axios from "axios"; // Import axios library
import Input from "./components/Input";
import PhoneInput from "react-phone-input-2"; // Import the ReactPhoneInput component
import "bootstrap-icons/font/bootstrap-icons.css";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import { useMutation } from "react-query";
import { createUser } from "./services/auth";

const leaguesOptions = [
  { value: "nba", label: "NBA" },
  { value: "nfl", label: "NFL" },
  { value: "mlb", label: "MLB" },
  { value: "nhl", label: "NHL" },
  // Add more options as needed
];

const SignUp = ({ onSignUp }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      ctx.fillStyle = "#ffb300";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
  }, []);
  // Move the complex expression to a separate variable
  const [captchaValue, setCaptchaValue] = useState(null);
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
  const [selectedLeague, setSelectedLeague] = useState("");
  const [selectedTeam, setSelectedTeam] = useState("");
  const [availableTeams, setAvailableTeams] = useState([]);
  const [usernameAvailable, setUsernameAvailable] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");

  const handleCountryChange = (country) => {
    setSelectedCountry(country);
    setSelectedRegion(""); // Reset the selected region when the country changes

    // Update formData
    setFormData((prevFormData) => ({
      ...prevFormData,
      selectedCountry: country,
      selectedRegion: "", // Reset the selected region in formData
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

  // Move the useEffect hook above the 'formData' definition
  // useEffect(() => {
  //   fetch(`http://localhost:5001/api/teams?leagues=${leagueValues}`)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setTeamsOptions(data); // Assuming that data contains an array of teams
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching teams:", error);
  //     });
  // }, []); // Include 'formData.leagues' in the dependency array
  // Check if passwords match

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

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleTermsChange = (e) => {
    setFormData({
      ...formData,
      termsAccepted: e.target.checked,
    });
  };

  const handleCaptchaChange = (value) => {
    setCaptchaValue(value);
  };

  const { mutate, isLoading, isError, data, error, reset } = useMutation(
    (user) => createUser(user)
  );
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform password validation
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    // Make the API call to sign up
    try {
     

       mutate(JSON.stringify(formData));
    } catch (error) {
      console.error("Error making API call:", error);
      // Handle error case here
    }

    // Instead of using fetch, you can use axios to make the POST request
  

    if (!formData.termsAccepted) {
      alert("Please accept the Terms of Use and Privacy Policy.");
      return;
    }

    if (!captchaValue) {
      alert("Please complete the CAPTCHA to sign up.");
      return;
    }

    // Perform email validation on the frontend (basic example)
    if (!validateEmail(formData.email)) {
      alert("Please enter a valid email.");
      return;
    }

    // Call the backend API to check if the email exists in the database
    // For demonstration purposes, we'll use a mock API function that simulates the request
    const emailExists = await checkEmailExists(formData.email);
    if (emailExists) {
      alert("This email is already registered. Please use a different email.");
      return;
    }

    // Call the backend API to store the form data in the database
    // For testing purposes, we'll just log the data for now
    console.log(formData);
    onSignUp(formData);
  };

  const validateEmail = (email) => {
    // This is a simple email validation regex pattern
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const checkEmailExists = async (email) => {
    // Simulate an API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // For demonstration purposes, we'll assume the email exists if it contains "existing" in it
    return email.includes("existing");
  };

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

  const checkUsernameAvailability = async (username) => {
    // Simulate checking username availability
    // Replace this with your actual API call to the backend
    // In the real implementation, you should call your backend API to check if the username exists
    const isAvailable = !username.includes("taken");
    setUsernameAvailable(isAvailable);
  };

  return (
    <>
      <br></br>
      <div
        className="container-main bg-dark bg-gradient
                    w-100 p-5 text-light"
      >
        <div className="row">
          <div className="col-md-6 col-lg-12 text-center">
            <h3 className="heading-1 bg-dark bg-gradient w-30 p-5">
              BRAGGING RIGHTS LEAGUE REGISTRATION FORM
            </h3>
            <div
              className="bar"
              style={{ margin: "20px", color: "#ffb300" }}
            ></div>
            <br></br>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-4 col-lg-6">
                <Input
                  label="First Name"
                  type="text"
                  name="firstName"
                  id="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required={true}
                  className="text-warning bg-white"
                />
              </div>
              <div className="col-md-4 col-lg-6">
                <Input
                  label="Last Name"
                  type="text"
                  name="lastName"
                  id="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required={true}
                  className="text-warning bg-white"
                />
              </div>
              <div className="col-md-4 col-lg-6">
                <label htmlFor="gender">Gender</label>
                <select
                  className="form-control text-warning bg-white"
                  name="gender"
                  id="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  required={true}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Rather Not Say</option>
                </select>
              </div>
              <div className="col-md-4 col-lg-6">
                <Input
                  label="City"
                  type="text"
                  name="city"
                  id="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  required={true}
                  className="custom-dropdown-style text-warning bg-white"
                />
              </div>

              <div className="col-md-4 col-lg-6">
                <label>Country:</label>
                <CountryDropdown
                  value={selectedCountry}
                  onChange={handleCountryChange}
                  classes="custom-dropdown-style text-warning bg-white " // Add classes to style the dropdown
                />
              </div>

              <div className="col-md-4 col-lg-6">
                <label>Province/State:</label>
                <RegionDropdown
                  country={selectedCountry}
                  value={selectedRegion}
                  onChange={handleRegionChange}
                  classes="custom-dropdown-style text-warning bg-white" // Add classes to style the dropdown
                />
              </div>

              <div className="col-md-4 col-lg-6">
                <Input
                  label="Postal/Zip Code"
                  type="number"
                  name="postalCode"
                  id="postalCode"
                  value={formData.postalCode}
                  onChange={handleInputChange}
                  required={true}
                  className="text-warning bg-white"
                />
              </div>

              <div className="col-md-4 col-lg-6">
                <div className="form-group">
                  <label>Phone</label>
                  <PhoneInput
                    className="w-100"
                    label="Phone Number"
                    country={"us"} // Default country code (optional)
                    value={formData.phoneNumber} // Pass the phone number state
                    onChange={(phone) =>
                      handleInputChange({
                        target: { name: "phoneNumber", value: phone },
                      })
                    } // Handle phone number changes
                    name="phoneNumber"
                    id="phoneNumber"
                    required={true}
                  />
                </div>
              </div>

              <div className="col-md-4 col-lg-6">
                <Input
                  label="Email"
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required={true}
                  className="text-warning bg-white"
                  placeholder="name@example.com"
                />
              </div>

              <div className="col-md-4 col-lg-4">
                <Input
                  label="Create Password"
                  type={passwordVisible ? "text" : "password"}
                  name="password"
                  id="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required={true}
                  className="text-warning bg-white"
                />
              </div>
              <div className="col-md-4 col-lg-2 align-self-end">
                <button
                  className="btn btn-warning"
                  type="button"
                  id="toggleconfirmPassword"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                >
                  {passwordVisible ? (
                    <i className="bi bi-eye"></i>
                  ) : (
                    <i className="bi bi-eye-slash"></i>
                  )}
                </button>
              </div>

              <div className="col-md-4 col-lg-6">
                <Input
                  label="Confirm Password"
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  value={formData.confirmPassword}
                  required={true}
                  className="text-warning bg-white"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <br></br>
            <div
              className="bar"
              style={{ margin: "20px", color: "#ffb300" }}
            ></div>
            <br></br>
            <div className="row">
              <div className="col-md-4 col-lg-4">
                <div className="form-group">
                  <label htmlFor="league">Select League</label>
                  <select
                    className="form-control"
                    name="league"
                    value={selectedLeague}
                    onChange={(e) => {
                      setSelectedLeague(e.target.value);
                    }}
                    required
                  >
                    <option value="">Select League</option>
                    {leaguesOptions.map((leagueOption) => (
                      <option
                        key={leagueOption.value}
                        value={leagueOption.value}
                      >
                        {leagueOption.label}
                      </option>
                    ))}
                  </select>
                  <a href="#" class="link-warning onClick={handleAddLeague}">
                    + Add League
                  </a>
                </div>
              </div>

              <div className="col-md-4 col-lg-4">
                <div className="form-group">
                  <label htmlFor="team">Select Team</label>
                  <select
                    className="form-control"
                    name="team"
                    value={selectedTeam}
                    onChange={(e) => setSelectedTeam(e.target.value)}
                    required
                  >
                    <option value="">Select Team</option>
                    {availableTeams.map((team) => (
                      <option key={team.value} value={team.value}>
                        {team.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="col-md-4 col-lg-4">
                <div className="form-group">
                  <label htmlFor="username">Select Username</label>
                  <input
                    type="text"
                    className="form-control"
                    name="username"
                    value={formData.username}
                    onChange={(e) => {
                      setFormData({ ...formData, username: e.target.value });
                    }}
                    required
                  />
                  <p>
                    {formData.username === "Fasih"
                      ? "Username is available"
                      : "Username not available"}
                  </p>
                </div>
              </div>

              <div className="col-md-4 col-lg-3">
                {/* <button
                  type="button"
                  onClick={handleAddLeague}
                  className="btn btn-warning me-3"
                >
                  Add League
                </button> */}
                {/* <button
                  type="button"
                  onClick={handleRemoveLeague}
                  className="btn btn-secondary"
                >
                  Cancel
                </button> */}
              </div>
            </div>

            <br></br>
            <div
              className="bar"
              style={{ margin: "20px", color: "#ffb300" }}
            ></div>
            <div>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <ReCAPTCHA
                    sitekey="6Ldl04cnAAAAAAGgO-8KtPl2fNY4X7bkeEtBm6SX"
                    onChange={handleCaptchaChange}
                    required
                  />
                </div>
              </form>
            </div>
            <div className="row">
              <div className="col-lg-6">
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="termsCheck"
                    checked={formData.termsAccepted}
                    onChange={handleTermsChange}
                    required
                  />
                  <label className="form-check-label" htmlFor="termsCheck">
                    By clicking CREATE ACCOUNT, you acknowlege you have read and
                    agreed to our{" "}
                    <Link
                      to="/terms"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-warning link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
                    >
                      Terms of Use
                    </Link>{" "}
                    and{" "}
                    <Link
                      to="/privacy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-warning link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
                    >
                      Privacy Policy
                    </Link>
                  </label>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="ageCheck"
                  checked={formData.ageAcknowledged}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      ageAcknowledged: e.target.checked,
                    })
                  }
                  required
                />
                <label className="form-check-label" htmlFor="ageCheck">
                  I am 18 years old or older.
                </label>
              </div>
            </div>
          </form>
        </div>

        <div className="form-container-border">
          <div className="create-button col-md-4 col-lg-6 d-grid gap-2 col-6 mx-auto">
            <button
              type="submit"
              className="btn bg-dark bg-gradient"
              disabled={!formData.termsAccepted}
              onClick={handleSubmit}
            >
              CREATE ACCOUNT
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
