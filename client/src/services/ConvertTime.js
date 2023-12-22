function handleTimeConversionToLocal(time) {
  // Get the selected time (in local time)
  const options = { timeZone: "America/New_York", hour12: true }; // Include hour12: true for AM/PM format

  // Constructing a date with an arbitrary date (01 Jan 2000) and the selected time
  const arbitraryDate = new Date(`2000-01-01T${time}:00`);
  const estTime = arbitraryDate.toLocaleTimeString("en-US", options);
  return estTime;
}

export default handleTimeConversionToLocal;
