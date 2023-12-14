import React from "react";
import { format, parse } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";

const TimeFormat = (inputTime) => {
  if (!inputTime) return;

  // Assuming the input time is in "HH:mm" format
  const inputTimeParsed = parse(inputTime, "HH:mm", new Date());

  // Converting input time to Eastern Standard Time (America/New_York)
  const easternTime = utcToZonedTime(inputTimeParsed, "America/New_York");

  // Formatting the Eastern Standard Time (EST)
  const formattedTime = format(easternTime, "h:mm a", {
    timeZone: "America/New_York",
  });

  // Adding the "EST" abbreviation to the formatted time
  const formattedTimeWithEST = formattedTime + " EST";

  return formattedTimeWithEST;
};

export default TimeFormat;
