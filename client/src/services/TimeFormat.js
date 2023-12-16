import React from "react";
import { format, parse } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";

const TimeFormat = (inputTime) => {
  if (!inputTime) return;
  // The input time string in "HH:mm" format
  // console.log("inputTime", inputTime);
  // Parse the input time string
  const parsedTime = parse(inputTime, "HH:mm", new Date());

  // Convert the time to the desired timezone (e.g., "EST")
  const timeZone = "America/New_York";
  const zonedTime = utcToZonedTime(parsedTime, timeZone);

  // Format the time in "h:mm a zzz" format
  const formattedTime = format(zonedTime, "h:mm a zzz", { timeZone });

  return formattedTime;
};

export default TimeFormat;
