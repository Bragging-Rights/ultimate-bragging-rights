// import React from "react";
// import { format, parse } from "date-fns";
// import { utcToZonedTime } from "date-fns-tz";

const TimeFormat = (inputTime) => {
  // Check correct time format and split into components
  let time = inputTime
    .toString()
    .match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [inputTime];

  if (time.length > 1) {
    // If time format correct
    time = time.slice(1); // Remove full string match value
    time[5] = +time[0] < 12 ? " AM EST" : " PM EST"; // Set AM/PM
    time[0] = +time[0] % 12 || 12; // Adjust hours
  }
  return time.join("");

  // // Extracting hours and minutes from the time string
  // const [hours, minutes] = inputTime.split(":").map(Number);

  // // Checking if hours are greater than 12 to determine AM or PM
  // const period = hours >= 12 ? "PM" : "AM";

  // // Converting hours to 12-hour format
  // let hours12 = hours % 12;
  // hours12 = hours12 ? hours12 : 12; // If hours is 0, set it to 12 for 12-hour format

  // // Formatting the time in 12-hour format
  // const time12 = `${hours12}:${String(minutes).padStart(2, "0")} ${period}`;

  // return time12;
};

export default TimeFormat;
