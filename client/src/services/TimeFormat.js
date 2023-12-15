import React from "react";
import { format, parse } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";

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
};

export default TimeFormat;
