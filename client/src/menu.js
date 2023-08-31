import { teamsData, divisionsData, conferencesData } from "./data";

document.addEventListener("DOMContentLoaded", function () {

	
  // Get all nav buttons
  const navButtonContainers = document.querySelectorAll(
    ".menu-nav-buttons > .nav-button-container"
  );


  const buttons = document.querySelectorAll("button");

  // Define months
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  const monthNums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

  // Get each nav button
  const weekButton = getButtonByName("week");
  const weekdayButton = getButtonByName("weekday");
  const dayButton = getButtonByName("day");
  const monthButton = getButtonByName("month");
  const yearButton = getButtonByName("year");
  const seasonButton = getButtonByName("season");
  const teamButton = getButtonByName("all-teams");
  const divisionButton = getButtonByName("all-divisions");
  const conferenceButton = getButtonByName("all-conferences");
  const resetButton = getButtonByName("reset");
  const locationButton = getButtonByName("location");

  // Get each submenu
  const teamSubmenu = document.querySelector(".teams");
  const divisionSubmenu = document.querySelector(".divisions");
  const conferenceSubmenu = document.querySelector(".conferences");

  // Set selected league of user (NHL, NFL, NBA, MLB)
  const LEAGUE = "NBA";

  // Define season dates
  const preSeasonStart = new Date("2022-09-30T00:00:00");
  const preSeasonEnd = new Date("2022-10-14T00:00:00");
  const regularSeasonStart = new Date("2022-10-07T00:00:00");
  const regularSeasonEnd = new Date("2023-04-15T00:00:00");
  const playoffsStart = new Date("2023-04-16T00:00:00");
  const playoffsEnd = new Date("2023-06-30T00:00:00");

  // Get current dates
  const currentDay = new Date().getDay();
  const currentMonth = months[new Date().getMonth()];
  const currentYear = new Date().getFullYear();

  // Fill in the submenus
  populateWeeks();
  populateDays();
  populateMonths();
  populateYears();
  populateTeams();
  populateDivisions();
  populateConferences();

  // The current week can only be defined after the weeks have been populated
  const currentWeek = getWeekFromDate(currentDay, currentMonth, currentYear);

  // Set the week and year to the current week and year
  setValue(weekButton, currentWeek);
  setValue(yearButton, currentYear, "year");

  // If clicked on reset button
  resetButton.addEventListener("click", () => {
    // Reset all buttons
    buttons.forEach((element) => {
      unsetButton(element);
    });
    // Set the week and year to the current week and year
    setValue(weekButton, currentWeek);
    setValue(yearButton, currentYear, "year");
    // Show all options of each submenu
    showAllSubmenuItems();
  });

  // Make all list items tabbable
  const listItems = document.getElementsByTagName("li");
  for (let i = 0; i < listItems.length; i++) {
    listItems[i].setAttribute("tabindex", "0");
  }

  navButtonContainers.forEach((buttonContainer) => {
    const button = buttonContainer.querySelector("button");
    const submenu = buttonContainer.querySelector(".nav-button-submenu");
    submenuEventListener(button, buttonContainer, submenu);
  });

  function getWeekFromDate(day, month, year) {
    const date = new Date(year, months.indexOf(month), day);
    const weekList = document.querySelector('ul[name="week-submenu"]');
    const weekListArray = Array.from(weekList.querySelectorAll("li"));
    for (let i = 0; i < weekListArray.length; i++) {
      const listItem = weekListArray[i];
      const startEndOfWeek = getStartEndOfWeekFromWeekString(
        listItem.textContent
      );
      if (date >= startEndOfWeek[0] && date <= startEndOfWeek[1]) {
        return listItem.textContent;
      }
    }
    return "";
  }

  function populateWeeks() {
    const today = new Date();
    const weekList = document.querySelector('ul[name="week-submenu"]');

    // Set the date to the first day of the year
    const startDate = new Date(today.getFullYear(), 0, 1);

    // Add week by week until today's date is reached
    while (startDate <= today) {
      const weekEnd = new Date(startDate.getTime() + 6 * 24 * 60 * 60 * 1000); // 6 days in milliseconds

      const startMonth = new Intl.DateTimeFormat("en-US", {
        month: "short",
      }).format(startDate);
      const endMonth = new Intl.DateTimeFormat("en-US", {
        month: "short",
      }).format(weekEnd);
      var liText =
        startMonth +
        " " +
        startDate.getDate() +
        " - " +
        endMonth +
        " " +
        weekEnd.getDate();

      const li = document.createElement("li");
      li.appendChild(document.createTextNode(liText));

      weekList.appendChild(li);

      startDate.setDate(startDate.getDate() + 7); // Set the date to the beginning of the next week
    }
  }

  function populateDays() {
    const dayList = document.querySelector('ul[name="day-submenu"]');
    for (let i = 1; i < 32; i++) {
      const li = document.createElement("li");
      li.appendChild(document.createTextNode(i.toString()));
      dayList.appendChild(li);
    }
  }

  function populateMonths() {
    const dayList = document.querySelector('ul[name="month-submenu"]');
    months.forEach((month) => {
      const li = document.createElement("li");
      li.appendChild(document.createTextNode(month));
      dayList.appendChild(li);
    });
  }

  function populateYears() {
    const yearList = document.querySelector('ul[name="year-submenu"]');
    const yearStart = 2019;
    const yearStop = currentYear;
    for (let i = yearStart; i < yearStop + 1; i++) {
      const li = document.createElement("li");
      let text = i.toString();
      if (LEAGUE != "MLB") {
        text += " - " + (i + 1).toString();
      }
      li.appendChild(document.createTextNode(text));
      yearList.appendChild(li);
    }
  }

  function populateTeams() {
    if (teamsData[LEAGUE] == undefined) {
      return;
    }
    // Sort teams alphabetically by name
    teamsData[LEAGUE].sort((a, b) => a.name.localeCompare(b.name));

    // Create and add list items for each team
    teamsData[LEAGUE].forEach((team) => {
      const li = document.createElement("li");
      li.textContent = team.name;
      li.classList.add(
        team.conference.replaceAll(" ", "_"),
        team.division.replaceAll(" ", "_")
      );
      teamSubmenu.appendChild(li);
    });
  }

  function populateDivisions() {
    // Sort division alphabetically by name
    divisionsData[LEAGUE].sort((a, b) => a.name.localeCompare(b.name));

    // Create and add list items for each division
    divisionsData[LEAGUE].forEach((division) => {
      const li = document.createElement("li");
      li.textContent = division.name;
      li.classList.add(division.conference.replaceAll(" ", "_"));
      divisionSubmenu.appendChild(li);
    });
  }

  function populateConferences() {
    // Sort conference alphabetically by name
    conferencesData[LEAGUE].sort();

    // Create and add list items for each conference
    conferencesData[LEAGUE].forEach((conference) => {
      const li = document.createElement("li");
      li.textContent = conference;
      li.classList.add(conference.replaceAll(" ", "_"));
      conferenceSubmenu.appendChild(li);
    });
  }

  function updateAllButtons() {
    // Reset the buttons that are greyed out
    buttons.forEach((element) => {
      if (element.classList.contains("greyed-out")) {
        element.classList.remove("greyed-out");
        toDefaultValue(element);
      }
    });

    if (isClicked(weekButton)) {
      greyOut(weekdayButton);
      greyOut(dayButton);
      greyOut(monthButton);
      greyOut(yearButton);
      setValue(yearButton, currentYear, "year");
      greyOut(seasonButton);
      const weekInDate = getStartEndOfWeekFromWeekString(
        weekButton.querySelector("a").textContent
      );
      setValue(
        seasonButton,
        getCurrentSeason(null, weekInDate[0], weekInDate[1])
      );
    }

    if (isClicked(weekdayButton)) {
      if (isNotClicked(weekButton)) {
        greyOut(weekButton);
      }
      if (isNotClicked(yearButton) && !isGreyedOut(yearButton)) {
        setClicked(yearButton);
        setValue(yearButton, currentYear, "year");
      }
    }

    if (isClicked(dayButton)) {
      greyOut(weekButton);
      if (!isClicked(yearButton)) {
        setClicked(yearButton);
        setValue(yearButton, currentYear, "year");
      }
    }

    if (isClicked(monthButton)) {
      greyOut(weekButton);
      if (!isClicked(yearButton)) {
        setClicked(yearButton);
        setValue(yearButton, currentYear, "year");
      }
    }

    if (isClicked(seasonButton)) {
      greyOut(weekButton);
    }

    if (isClicked(teamButton)) {
      greyOut(divisionButton);
      setValue(divisionButton, getDivisionOfTeam());
      greyOut(conferenceButton);
      setValue(conferenceButton, getConferenceOfDivision());
    }

    if (isClicked(divisionButton)) {
      greyOut(conferenceButton);
      setValue(conferenceButton, getConferenceOfDivision());
      updateTeamsBasedOnDivision();
    }

    if (isClicked(conferenceButton)) {
      updateDivisionsBasedOnConference();
      updateTeamsBasedOnConference();
    }

    // Set season when date is given
    if (
      isClicked(dayButton) &&
      isClicked(monthButton) &&
      isClicked(yearButton)
    ) {
      const date = getDateFromButtons(dayButton, monthButton, yearButton);
      greyOut(seasonButton);
      setValue(seasonButton, getCurrentSeason(date, null, null));
    }
  }

  function getDateFromButtons(dayButton, monthButton, yearButton) {
    let day = dayButton.querySelector("a").textContent;
    let month = (
      parseInt(months.indexOf(monthButton.querySelector("a").textContent)) + 1
    ).toString();
    const year = yearButton.querySelector("a").textContent.slice(0, 4);
    day = ("0" + day).slice(-2);
    month = ("0" + month).slice(-2);
    const date = new Date(year + "-" + month + "-" + day + "T00:00:00");
    return date;
  }

  function showAllSubmenuItems() {
    [teamSubmenu, divisionSubmenu, conferenceSubmenu].forEach((submenuDiv) => {
      // Show all items of the league of each submenu
      const listItems = submenuDiv.querySelectorAll("li");
      listItems.forEach((item) => {
        item.classList.remove("hide");
      });
    });
  }

  function updateDivisionsBasedOnConference() {
    const conference = conferenceButton.querySelector("a").textContent;
    const divisions = divisionSubmenu.querySelectorAll("li");
    const classToFind = conference.replaceAll(" ", "_");
    // Hide each division that is not from the right conference
    divisions.forEach((division) => {
      division.classList.toggle(
        "hide",
        !division.classList.contains(classToFind)
      );
    });
  }

  function updateTeamsBasedOnConference() {
    const conference = conferenceButton.querySelector("a").textContent;
    const teams = teamSubmenu.querySelectorAll("li");
    const classToFind = conference.replaceAll(" ", "_");
    // Hide each team that is not from the right conference
    teams.forEach((team) => {
      team.classList.toggle("hide", !team.classList.contains(classToFind));
    });
  }

  function updateTeamsBasedOnDivision() {
    const division = divisionButton.querySelector("a").textContent;
    const teams = teamSubmenu.querySelectorAll("li");
    const classToFind = division.replaceAll(" ", "_");
    // Hide each team that is not from the right division
    teams.forEach((team) => {
      team.classList.toggle("hide", !team.classList.contains(classToFind));
    });
  }

  function getDivisionOfTeam() {
    const selectedTeam = teamButton.querySelector("a").textContent;
    const teams = teamSubmenu.querySelectorAll("li");
    for (let i = 0; i < teams.length; i++) {
      const team = teams[i];
      if (team.textContent == selectedTeam) {
        const teamClasses = team.classList;
        return teamClasses[teamClasses.length - 1].replaceAll("_", " ");
      }
    }
    return "";
  }

  function getConferenceOfDivision() {
    const selectedDivision = divisionButton.querySelector("a").textContent;
    const divisions = divisionSubmenu.querySelectorAll("li");
    for (let i = 0; i < divisions.length; i++) {
      const division = divisions[i];
      if (division.textContent == selectedDivision) {
        return division.classList[0].replaceAll("_", " ");
      }
    }
    return "";
  }

  function getStartEndOfWeekFromWeekString(dateString) {
    if (dateString == "") {
      return null;
    }
    var dateParts = dateString.split(" - ");

    var datePartsStartMonth = dateParts[0].split(" ")[0];
    var datePartsStartDay = dateParts[0].split(" ")[1];
    var datePartsEndMonth = dateParts[1].split(" ")[0];
    var datePartsEndDay = dateParts[1].split(" ")[1];
    var startMonthIndex = monthNums[months.indexOf(datePartsStartMonth)];
    var endMonthIndex = monthNums[months.indexOf(datePartsEndMonth)];
    const startDay = parseInt(datePartsStartDay);
    const endDay = parseInt(datePartsEndDay);

    const startOfWeek = new Date(
      new Date().getFullYear(),
      startMonthIndex,
      startDay
    );
    const endOfWeek = new Date(new Date().getFullYear(), endMonthIndex, endDay);

    startOfWeek.setHours(0, 0, 0, 0);
    endOfWeek.setHours(0, 0, 0, 0);
    return [startOfWeek, endOfWeek];
  }

  function getCurrentSeason(singleDate, startDate, endDate) {
    if (singleDate != null) {
      startDate = singleDate;
      endDate = singleDate;
    }

    if (startDate >= preSeasonStart && endDate <= preSeasonEnd) {
      return "Preseason";
    }
    if (startDate >= regularSeasonStart && endDate <= regularSeasonEnd) {
      return "Regular Season";
    }
    if (startDate >= playoffsStart && endDate <= playoffsEnd) {
      return "Playoffs";
    }
    return "Offseason";
  }

  function submenuEventListener(button, buttonContainer, submenu) {
    // Reset button doesn't have a submenu
    if (submenu == null) {
      return;
    }
    buttonContainer.addEventListener("mouseover", () => {
      if (!isGreyedOut(button)) {
        buttonContainer.classList.add("hover");
        navButtonContainers.forEach((navButton) => {
          navButton.classList.remove("active");
        });
      }
    });
    buttonContainer.addEventListener("mouseout", () => {
      buttonContainer.classList.remove("hover");
    });

    // Clicked on option of submenu
    submenu.addEventListener("click", (event) => {
      const target = event.target;
      if (target.tagName.toLowerCase() == "li") {
        // Make the button green
        setClicked(button);
        // Set the value of the button to the selected option
        const value = target.innerHTML;
        setValue(button, value);
        // Update all buttons and submenus based on this selection
        updateAllButtons();
      }
    });

    // Do the same at Enter as is done at Click
    submenu.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        const focusedElement = document.activeElement;
        if (focusedElement.tagName.toLowerCase() == "li") {
          const target = focusedElement;
          setClicked(button);
          const value = target.innerHTML;
          setValue(button, value);
          updateAllButtons();
          // Close submenu
          buttonContainer.classList.remove("active");
        }
      }
    });
  }

  function getButtonByName(name) {
    for (var i = 0; i < buttons.length; i++) {
      if (buttons[i].getAttribute("name") == name) {
        return buttons[i];
      }
    }
    return null;
  }

  function isGreyedOut(button) {
    return button.classList.contains("greyed-out");
  }

  function greyOut(button) {
    removeAttributes(button);
    button.classList.add("greyed-out");
  }

  function unsetButton(button) {
    removeAttributes(button);
    button.classList.add("unset");
  }

  function setClicked(button) {
    removeAttributes(button);
    button.classList.add("clicked");
  }

  function setValue(button, value, year = null) {
    if (year == null) {
      button.querySelector("a").textContent = value;
    } else if (year == "year") {
      if (LEAGUE == "MLB") {
        button.querySelector("a").textContent = value;
      } else {
        const yearString = value + " - " + (parseInt(value) + 1).toString();
        button.querySelector("a").textContent = yearString;
      }
    }
  }

  function removeAttributes(button) {
    button.classList.remove("greyed-out", "clicked");
    toDefaultValue(button);
  }

  function toDefaultValue(button) {
    if (button === resetButton) {
      return;
    }
    button.querySelector("a").textContent = button.getAttribute("title");
  }

  function isClicked(button) {
    return button.classList.contains("clicked");
  }

  function isNotClicked(button) {
    return !button.classList.contains("clicked");
  }
});

