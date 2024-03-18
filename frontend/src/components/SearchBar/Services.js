export function populateWeeks() {
  const today = new Date();
  // Set the date to the first day of the year
  const startDate = new Date(today.getFullYear(), 0, 1);
  const weeks = [];
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

    weeks.push(liText);
    startDate.setDate(startDate.getDate() + 7); // Set the date to the beginning of the next week
  }
  return weeks;
}

export const monthNums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

export const teamsData = {
  NHL: [
    {
      name: "Boston",
      division: "Atlantic",
      conference: "Eastern",
    },
    {
      name: "Buffalo",
      division: "Atlantic",
      conference: "Eastern",
    },
    {
      name: "Detroit",
      division: "Atlantic",
      conference: "Eastern",
    },
    {
      name: "Florida",
      division: "Atlantic",
      conference: "Eastern",
    },
    {
      name: "Montreal",
      division: "Atlantic",
      conference: "Eastern",
    },
    {
      name: "Ottawa",
      division: "Atlantic",
      conference: "Eastern",
    },
    {
      name: "Tampa Bay",
      division: "Atlantic",
      conference: "Eastern",
    },
    {
      name: "Toronto",
      division: "Atlantic",
      conference: "Eastern",
    },
    {
      name: "Carolina",
      division: "Metropolitan",
      conference: "Eastern",
    },
    {
      name: "Columbus",
      division: "Metropolitan",
      conference: "Eastern",
    },
    {
      name: "New Jersey",
      division: "Metropolitan",
      conference: "Eastern",
    },
    {
      name: "NY Islanders",
      division: "Metropolitan",
      conference: "Eastern",
    },
    {
      name: "NY Rangers",
      division: "Metropolitan",
      conference: "Eastern",
    },
    {
      name: "Philadelphia",
      division: "Metropolitan",
      conference: "Eastern",
    },
    {
      name: "Pittsburgh",
      division: "Metropolitan",
      conference: "Eastern",
    },
    {
      name: "Washington",
      division: "Metropolitan",
      conference: "Eastern",
    },
    {
      name: "Chicago",
      division: "Central",
      conference: "Western",
    },
    {
      name: "Colorado",
      division: "Central",
      conference: "Western",
    },
    {
      name: "Dallas",
      division: "Central",
      conference: "Western",
    },
    {
      name: "Minnesota",
      division: "Central",
      conference: "Western",
    },
    {
      name: "Nashville",
      division: "Central",
      conference: "Western",
    },
    {
      name: "St. Louis",
      division: "Central",
      conference: "Western",
    },
    {
      name: "Winnipeg",
      division: "Central",
      conference: "Western",
    },
    {
      name: "Anaheim",
      division: "Pacific",
      conference: "Western",
    },
    {
      name: "Arizona",
      division: "Pacific",
      conference: "Western",
    },
    {
      name: "Calgary",
      division: "Pacific",
      conference: "Western",
    },
    {
      name: "Edmonton",
      division: "Pacific",
      conference: "Western",
    },
    {
      name: "LA Kings",
      division: "Pacific",
      conference: "Western",
    },
    {
      name: "San Jose",
      division: "Pacific",
      conference: "Western",
    },
    {
      name: "Seattle",
      division: "Pacific",
      conference: "Western",
    },
    {
      name: "Vancouver",
      division: "Pacific",
      conference: "Western",
    },
  ],
  NFL: [
    {
      name: "Buffalo",
      division: "AFC East",
      conference: "AFC",
    },
    {
      name: "Miami",
      division: "AFC East",
      conference: "AFC",
    },
    {
      name: "New England",
      division: "AFC East",
      conference: "AFC",
    },
    {
      name: "NY Jets",
      division: "AFC East",
      conference: "AFC",
    },
    {
      name: "Baltimore",
      division: "AFC North",
      conference: "AFC",
    },
    {
      name: "Cincinnati",
      division: "AFC North",
      conference: "AFC",
    },
    {
      name: "Cleveland",
      division: "AFC North",
      conference: "AFC",
    },
    {
      name: "Pittsburgh",
      division: "AFC North",
      conference: "AFC",
    },
    {
      name: "Houston",
      division: "AFC South",
      conference: "AFC",
    },
    {
      name: "Indianapolis",
      division: "AFC South",
      conference: "AFC",
    },
    {
      name: "Jacksonville",
      division: "AFC South",
      conference: "AFC",
    },
    {
      name: "Tennessee",
      division: "AFC South",
      conference: "AFC",
    },
    {
      name: "Denver",
      division: "AFC West",
      conference: "AFC",
    },
    {
      name: "Kansas City",
      division: "AFC West",
      conference: "AFC",
    },
    {
      name: "Las Vegas",
      division: "AFC West",
      conference: "AFC",
    },
    {
      name: "LA Chargers",
      division: "AFC West",
      conference: "AFC",
    },
    {
      name: "Dallas",
      division: "NFC East",
      conference: "NFC",
    },
    {
      name: "NY Giants",
      division: "NFC East",
      conference: "NFC",
    },
    {
      name: "Philadelphia",
      division: "NFC East",
      conference: "NFC",
    },
    {
      name: "Washington",
      division: "NFC East",
      conference: "NFC",
    },
    {
      name: "Chicago",
      division: "NFC North",
      conference: "NFC",
    },
    {
      name: "Detroit",
      division: "NFC North",
      conference: "NFC",
    },
    {
      name: "Green Bay",
      division: "NFC North",
      conference: "NFC",
    },
    {
      name: "Minnesota",
      division: "NFC North",
      conference: "NFC",
    },
    {
      name: "Atlanta",
      division: "NFC South",
      conference: "NFC",
    },
    {
      name: "Carolina",
      division: "NFC South",
      conference: "NFC",
    },
    {
      name: "New Orleans",
      division: "NFC South",
      conference: "NFC",
    },
    {
      name: "Tampa Bay",
      division: "NFC South",
      conference: "NFC",
    },
    {
      name: "Arizona",
      division: "NFC West",
      conference: "NFC",
    },
    {
      name: "LA Rams",
      division: "NFC West",
      conference: "NFC",
    },
    {
      name: "San Francisco",
      division: "NFC West",
      conference: "NFC",
    },
    {
      name: "Seattle",
      division: "NFC West",
      conference: "NFC",
    },
  ],
  NBA: [
    {
      name: "Boston",
      division: "Atlantic",
      conference: "Eastern",
    },
    {
      name: "Brooklyn",
      division: "Atlantic",
      conference: "Eastern",
    },
    {
      name: "NY Knicks",
      division: "Atlantic",
      conference: "Eastern",
    },
    {
      name: "Philadelphia",
      division: "Atlantic",
      conference: "Eastern",
    },
    {
      name: "Toronto",
      division: "Atlantic",
      conference: "Eastern",
    },
    {
      name: "Chicago",
      division: "Central",
      conference: "Eastern",
    },
    {
      name: "Cleveland",
      division: "Central",
      conference: "Eastern",
    },
    {
      name: "Detroit",
      division: "Central",
      conference: "Eastern",
    },
    {
      name: "Indiana",
      division: "Central",
      conference: "Eastern",
    },
    {
      name: "Milwaukee",
      division: "Central",
      conference: "Eastern",
    },
    {
      name: "Atlanta",
      division: "Southeast",
      conference: "Eastern",
    },
    {
      name: "Charlotte",
      division: "Southeast",
      conference: "Eastern",
    },
    {
      name: "Miami",
      division: "Southeast",
      conference: "Eastern",
    },
    {
      name: "Orlando",
      division: "Southeast",
      conference: "Eastern",
    },
    {
      name: "Washington",
      division: "Southeast",
      conference: "Eastern",
    },
    {
      name: "Denver",
      division: "Northwest",
      conference: "Western",
    },
    {
      name: "Minnesota",
      division: "Northwest",
      conference: "Western",
    },
    {
      name: "Oklahoma City",
      division: "Northwest",
      conference: "Western",
    },
    {
      name: "Portland Trail",
      division: "Northwest",
      conference: "Western",
    },
    {
      name: "Utah",
      division: "Northwest",
      conference: "Western",
    },
    {
      name: "Golden State",
      division: "Pacific",
      conference: "Western",
    },
    {
      name: "LA Clippers",
      division: "Pacific",
      conference: "Western",
    },
    {
      name: "LA Lakers",
      division: "Pacific",
      conference: "Western",
    },
    {
      name: "Phoenix",
      division: "Pacific",
      conference: "Western",
    },
    {
      name: "Sacramento",
      division: "Pacific",
      conference: "Western",
    },
    {
      name: "Dallas",
      division: "Southwest",
      conference: "Western",
    },
    {
      name: "Houston",
      division: "Southwest",
      conference: "Western",
    },
    {
      name: "Memphis",
      division: "Southwest",
      conference: "Western",
    },
    {
      name: "New Orleans",
      division: "Southwest",
      conference: "Western",
    },
    {
      name: "San Antonio",
      division: "Southwest",
      conference: "Western",
    },
  ],
  MLB: [
    {
      name: "Toronto",
      division: "AL East",
      conference: "AL",
    },
    {
      name: "Baltimore",
      division: "AL East",
      conference: "AL",
    },
    {
      name: "Boston",
      division: "AL East",
      conference: "AL",
    },
    {
      name: "NY Yankees",
      division: "AL East",
      conference: "AL",
    },
    {
      name: "Tampa Bay",
      division: "AL East",
      conference: "AL",
    },
    {
      name: "CHI White Sox",
      division: "AL Central",
      conference: "AL",
    },
    {
      name: "Cleveland",
      division: "AL Central",
      conference: "AL",
    },
    {
      name: "Detroit",
      division: "AL Central",
      conference: "AL",
    },
    {
      name: "Kansas City",
      division: "AL Central",
      conference: "AL",
    },
    {
      name: "Minnesota",
      division: "AL Central",
      conference: "AL",
    },
    {
      name: "Houston",
      division: "AL West",
      conference: "AL",
    },
    {
      name: "LA Angels",
      division: "AL West",
      conference: "AL",
    },
    {
      name: "Oakland",
      division: "AL West",
      conference: "AL",
    },
    {
      name: "Seattle",
      division: "AL West",
      conference: "AL",
    },
    {
      name: "Texas",
      division: "AL West",
      conference: "AL",
    },
    {
      name: "Atlanta",
      division: "NL East",
      conference: "NL",
    },
    {
      name: "Miami",
      division: "NL East",
      conference: "NL",
    },
    {
      name: "NY Mets",
      division: "NL East",
      conference: "NL",
    },
    {
      name: "Philadelphia",
      division: "NL East",
      conference: "NL",
    },
    {
      name: "Washington",
      division: "NL East",
      conference: "NL",
    },
    {
      name: "CHI Cubs",
      division: "NL Central",
      conference: "NL",
    },
    {
      name: "Cincinnati",
      division: "NL Central",
      conference: "NL",
    },
    {
      name: "Milwaukee",
      division: "NL Central",
      conference: "NL",
    },
    {
      name: "Pittsburgh",
      division: "NL Central",
      conference: "NL",
    },
    {
      name: "St. Louis",
      division: "NL Central",
      conference: "NL",
    },
    {
      name: "Arizona",
      division: "NL West",
      conference: "NL",
    },
    {
      name: "Colorado",
      division: "NL West",
      conference: "NL",
    },
    {
      name: "LA Dodgers",
      division: "NL West",
      conference: "NL",
    },
    {
      name: "San Diego",
      division: "NL West",
      conference: "NL",
    },
    {
      name: "San Francisco",
      division: "NL West",
      conference: "NL",
    },
  ],
};

export const conferencesData = {
  NHL: ["Eastern", "Western"],
  NFL: [" AFC", "NFC"],
  NBA: ["Eastern", "Western"],
  MLB: ["AL", "NL"],
};

export const divisionsData = {
  NHL: [
    { name: "Atlantic", conference: "Eastern" },
    { name: "Metropolitan", conference: "Eastern" },
    { name: "Central", conference: "Western" },
    { name: "Pacific", conference: "Western" },
  ],
  NFL: [
    { name: "AFC East", conference: "AFC" },
    { name: "AFC North", conference: "AFC" },
    { name: "AFC South", conference: "AFC" },
    { name: "AFC West", conference: "AFC" },
    { name: "NFC East", conference: "NFC" },
    { name: "NFC North", conference: "NFC" },
    { name: "NFC South", conference: "NFC" },
    { name: "NFC West", conference: "NFC" },
  ],
  NBA: [
    { name: "Atlantic", conference: "Eastern" },
    { name: "Central", conference: "Eastern" },
    { name: "Southeast", conference: "Eastern" },
    { name: "Northwest", conference: "Western" },
    { name: "Pacific", conference: "Western" },
    { name: "Southwest", conference: "Western" },
  ],
  MLB: [
    { name: "AL East", conference: "AL" },
    { name: "AL Central", conference: "AL" },
    { name: "AL West", conference: "AL" },
    { name: "NL East", conference: "NL" },
    { name: "NL Central", conference: "NL" },
    { name: "NL West", conference: "NL" },
  ],
};

export const months = [
  "ALL MONTHS",
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

export const days = [
  "ALL DAYS",
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
