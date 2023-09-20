import React, { useState } from "react";
import Select from "react-select";
import "./checkSlots.css"; // Import your custom CSS file

const CustomNavbar = () => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [slotsAvailable, setSlotsAvailable] = useState(null);

  const handleRegionChange = (selectedOption) => {
    setSelectedRegion(selectedOption);
  };

  const handleCountryChange = (country) => {
    setSelectedCountry(country);
    setSelectedRegion(null); // Reset selected region when country changes
    setSlotsAvailable(null); // Reset slots availability when country changes
  };

  // Define the options for regions based on the selected country
  const regionOptions =
    selectedCountry === "Canada" ? CANADA_REGIONS : USA_STATES;

  // Simulated function to fetch available slots
  const fetchSlots = async (country, region) => {
    try {
      // Replace with your actual API endpoint and request headers
      const response = await fetch(`YOUR_API_ENDPOINT`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // Add any other required headers here
        },
      });

      if (!response.ok) {
        throw new Error("Error fetching data");
      }

      const data = await response.json();

      // Assuming your API response contains a property called 'slots'
      const slots = data.slots;

      return slots;
    } catch (error) {
      console.error("Error fetching slots:", error);
      return null; // Return null or a default value in case of an error
    }
  };

  const getAvailableSlots = async () => {
    if (selectedCountry && selectedRegion) {
      const slots = await fetchSlots(selectedCountry, selectedRegion.value);
      setSlotsAvailable(slots);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
       
      }}
    >
      {/* Red background bar */}
      <div className="nav2">
        <div style={{ textAlign: "center" }}>
          <p className="additional-bar-text">
            Giving Away 100 Free Lifetime Memberships in Every Province and
            State!
            <br></br>
            <br></br>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginRight: "10px",
                }}
              >
                {/* <label htmlFor="form2Example1" className="form-label">
                  Email:
                </label> */}
                <input
                  type="email"
                  id="form2Example1"
                  className="form-control custom-input"
                  placeholder="user@mail.com"
                  style={{
                    height: "25px", // Adjust the height value as needed
                  }}
                />
              </div>
              <div className="form-outline me-2">
                {/* <label className="form-label">Country:</label> */}
                <div>
                  <input
                    type="radio"
                    id="usa"
                    name="country"
                    value="USA"
                    checked={selectedCountry === "USA"}
                    onChange={() => handleCountryChange("USA")}
                  />
                  <label htmlFor="usa" className="me-2">
                    USA
                  </label>

                  <input
                    type="radio"
                    id="canada"
                    name="country"
                    value="Canada"
                    checked={selectedCountry === "Canada"}
                    onChange={() => handleCountryChange("Canada")}
                  />
                  <label htmlFor="canada">Canada</label>
                </div>
              </div>

              {selectedCountry && (
                <div className="form-outline me-2">
                  {/* <label className="form-label">Province/State:</label> */}
                  <Select
                    value={selectedRegion}
                    onChange={handleRegionChange}
                    options={regionOptions}
                    classNamePrefix="react-select"
                    className="custom-select" // Add this class
                  />
                </div>
              )}

              <button
                type="button"
                className="btn btn-danger custom-input"
                onClick={getAvailableSlots}
                style={{
                  height: "px", // Adjust the height value as needed
                }}
              >
                Check Availability!
              </button>

              {slotsAvailable !== null && (
                <p style={{ marginLeft: "10px" }}>
                  Slots Available: {slotsAvailable}
                </p>
              )}
            </div>
          </p>
        </div>

        {/* Form */}
      </div>
    </div>
  );
};

// Define CANADA_REGIONS and USA_STATES here
const CANADA_REGIONS = [
  { value: "AB", label: "Alberta" },
  { value: "BC", label: "British Columbia" },
  { value: "MB", label: "Manitoba" },
  { value: "NB", label: "New Brunswick" },
  { value: "NL", label: "Newfoundland and Labrador" },
  { value: "NS", label: "Nova Scotia" },
  { value: "NT", label: "Northwest Territories" },
  { value: "NU", label: "Nunavut" },
  { value: "ON", label: "Ontario" },
  { value: "PE", label: "Prince Edward Island" },
  { value: "QC", label: "Quebec" },
  { value: "SK", label: "Saskatchewan" },
  { value: "YT", label: "Yukon" },
];

const USA_STATES = [
  { value: "AL", label: "Alabama" },
  { value: "AK", label: "Alaska" },
  { value: "AZ", label: "Arizona" },
  { value: "AR", label: "Arkansas" },
  { value: "CA", label: "California" },
  { value: "CO", label: "Colorado" },
  { value: "CT", label: "Connecticut" },
  { value: "DE", label: "Delaware" },
  { value: "FL", label: "Florida" },
  { value: "GA", label: "Georgia" },
  { value: "HI", label: "Hawaii" },
  { value: "ID", label: "Idaho" },
  { value: "IL", label: "Illinois" },
  { value: "IN", label: "Indiana" },
  { value: "IA", label: "Iowa" },
  { value: "KS", label: "Kansas" },
  { value: "KY", label: "Kentucky" },
  { value: "LA", label: "Louisiana" },
  { value: "ME", label: "Maine" },
  { value: "MD", label: "Maryland" },
  { value: "MA", label: "Massachusetts" },
  { value: "MI", label: "Michigan" },
  { value: "MN", label: "Minnesota" },
  { value: "MS", label: "Mississippi" },
  { value: "MO", label: "Missouri" },
  { value: "MT", label: "Montana" },
  { value: "NE", label: "Nebraska" },
  { value: "NV", label: "Nevada" },
  { value: "NH", label: "New Hampshire" },
  { value: "NJ", label: "New Jersey" },
  { value: "NM", label: "New Mexico" },
  { value: "NY", label: "New York" },
  { value: "NC", label: "North Carolina" },
  { value: "ND", label: "North Dakota" },
  { value: "OH", label: "Ohio" },
  { value: "OK", label: "Oklahoma" },
  { value: "OR", label: "Oregon" },
  { value: "PA", label: "Pennsylvania" },
  { value: "RI", label: "Rhode Island" },
  { value: "SC", label: "South Carolina" },
  { value: "SD", label: "South Dakota" },
  { value: "TN", label: "Tennessee" },
  { value: "TX", label: "Texas" },
  { value: "UT", label: "Utah" },
  { value: "VT", label: "Vermont" },
  { value: "VA", label: "Virginia" },
  { value: "WA", label: "Washington" },
  { value: "WV", label: "West Virginia" },
  { value: "WI", label: "Wisconsin" },
  { value: "WY", label: "Wyoming" },
];

export default CustomNavbar;
