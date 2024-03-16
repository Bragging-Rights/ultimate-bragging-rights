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
      name: "Boston Bruins",
      division: "Atlantic Division",
      conference: "Eastern Conference",
    },
    {
      name: "Buffalo Sabres",
      division: "Atlantic Division",
      conference: "Eastern Conference",
    },
    {
      name: "Detroit Red Wings",
      division: "Atlantic Division",
      conference: "Eastern Conference",
    },
    {
      name: "Florida Panthers",
      division: "Atlantic Division",
      conference: "Eastern Conference",
    },
    {
      name: "Montreal Canadiens",
      division: "Atlantic Division",
      conference: "Eastern Conference",
    },
    {
      name: "Ottawa Senators",
      division: "Atlantic Division",
      conference: "Eastern Conference",
    },
    {
      name: "Tampa Bay Lightning",
      division: "Atlantic Division",
      conference: "Eastern Conference",
    },
    {
      name: "Toronto Maple Leafs",
      division: "Atlantic Division",
      conference: "Eastern Conference",
    },
    {
      name: "Carolina Hurricanes",
      division: "Metropolitan Division",
      conference: "Eastern Conference",
    },
    {
      name: "Columbus Blue Jackets",
      division: "Metropolitan Division",
      conference: "Eastern Conference",
    },
    {
      name: "New Jersey Devils",
      division: "Metropolitan Division",
      conference: "Eastern Conference",
    },
    {
      name: "New York Islanders",
      division: "Metropolitan Division",
      conference: "Eastern Conference",
    },
    {
      name: "New York Rangers",
      division: "Metropolitan Division",
      conference: "Eastern Conference",
    },
    {
      name: "Philadelphia Flyers",
      division: "Metropolitan Division",
      conference: "Eastern Conference",
    },
    {
      name: "Pittsburgh Penguins",
      division: "Metropolitan Division",
      conference: "Eastern Conference",
    },
    {
      name: "Washington Capitals",
      division: "Metropolitan Division",
      conference: "Eastern Conference",
    },
    {
      name: "Chicago Blackhawks",
      division: "Central Division",
      conference: "Western Conference",
    },
    {
      name: "Colorado Avalanche",
      division: "Central Division",
      conference: "Western Conference",
    },
    {
      name: "Dallas Stars",
      division: "Central Division",
      conference: "Western Conference",
    },
    {
      name: "Minnesota Wild",
      division: "Central Division",
      conference: "Western Conference",
    },
    {
      name: "Nashville Predators",
      division: "Central Division",
      conference: "Western Conference",
    },
    {
      name: "St. Louis Blues",
      division: "Central Division",
      conference: "Western Conference",
    },
    {
      name: "Winnipeg Jets",
      division: "Central Division",
      conference: "Western Conference",
    },
    {
      name: "Anaheim Ducks",
      division: "Pacific Division",
      conference: "Western Conference",
    },
    {
      name: "Arizona Coyotes",
      division: "Pacific Division",
      conference: "Western Conference",
    },
    {
      name: "Calgary Flames",
      division: "Pacific Division",
      conference: "Western Conference",
    },
    {
      name: "Edmonton Oilers",
      division: "Pacific Division",
      conference: "Western Conference",
    },
    {
      name: "Los Angeles Kings",
      division: "Pacific Division",
      conference: "Western Conference",
    },
    {
      name: "San Jose Sharks",
      division: "Pacific Division",
      conference: "Western Conference",
    },
    {
      name: "Seattle Kraken",
      division: "Pacific Division",
      conference: "Western Conference",
    },
    {
      name: "Vancouver Canucks",
      division: "Pacific Division",
      conference: "Western Conference",
    },
  ],
  NFL: [
    {
      name: "Buffalo Bills",
      division: "AFC East",
      conference: "American Football Conference (AFC)",
    },
    {
      name: "Miami Dolphins",
      division: "AFC East",
      conference: "American Football Conference (AFC)",
    },
    {
      name: "New England Patriots",
      division: "AFC East",
      conference: "American Football Conference (AFC)",
    },
    {
      name: "New York Jets",
      division: "AFC East",
      conference: "American Football Conference (AFC)",
    },
    {
      name: "Baltimore Ravens",
      division: "AFC North",
      conference: "American Football Conference (AFC)",
    },
    {
      name: "Cincinnati Bengals",
      division: "AFC North",
      conference: "American Football Conference (AFC)",
    },
    {
      name: "Cleveland Browns",
      division: "AFC North",
      conference: "American Football Conference (AFC)",
    },
    {
      name: "Pittsburgh Steelers",
      division: "AFC North",
      conference: "American Football Conference (AFC)",
    },
    {
      name: "Houston Texans",
      division: "AFC South",
      conference: "American Football Conference (AFC)",
    },
    {
      name: "Indianapolis Colts",
      division: "AFC South",
      conference: "American Football Conference (AFC)",
    },
    {
      name: "Jacksonville Jaguars",
      division: "AFC South",
      conference: "American Football Conference (AFC)",
    },
    {
      name: "Tennessee Titans",
      division: "AFC South",
      conference: "American Football Conference (AFC)",
    },
    {
      name: "Denver Broncos",
      division: "AFC West",
      conference: "American Football Conference (AFC)",
    },
    {
      name: "Kansas City Chiefs",
      division: "AFC West",
      conference: "American Football Conference (AFC)",
    },
    {
      name: "Las Vegas Raiders",
      division: "AFC West",
      conference: "American Football Conference (AFC)",
    },
    {
      name: "Los Angeles Chargers",
      division: "AFC West",
      conference: "American Football Conference (AFC)",
    },
    {
      name: "Dallas Cowboys",
      division: "NFC East",
      conference: "National Football Conference (NFC)",
    },
    {
      name: "New York Giants",
      division: "NFC East",
      conference: "National Football Conference (NFC)",
    },
    {
      name: "Philadelphia Eagles",
      division: "NFC East",
      conference: "National Football Conference (NFC)",
    },
    {
      name: "Washington Football Team",
      division: "NFC East",
      conference: "National Football Conference (NFC)",
    },
    {
      name: "Chicago Bears",
      division: "NFC North",
      conference: "National Football Conference (NFC)",
    },
    {
      name: "Detroit Lions",
      division: "NFC North",
      conference: "National Football Conference (NFC)",
    },
    {
      name: "Green Bay Packers",
      division: "NFC North",
      conference: "National Football Conference (NFC)",
    },
    {
      name: "Minnesota Vikings",
      division: "NFC North",
      conference: "National Football Conference (NFC)",
    },
    {
      name: "Atlanta Falcons",
      division: "NFC South",
      conference: "National Football Conference (NFC)",
    },
    {
      name: "Carolina Panthers",
      division: "NFC South",
      conference: "National Football Conference (NFC)",
    },
    {
      name: "New Orleans Saints",
      division: "NFC South",
      conference: "National Football Conference (NFC)",
    },
    {
      name: "Tampa Bay Buccaneers",
      division: "NFC South",
      conference: "National Football Conference (NFC)",
    },
    {
      name: "Arizona Cardinals",
      division: "NFC West",
      conference: "National Football Conference (NFC)",
    },
    {
      name: "Los Angeles Rams",
      division: "NFC West",
      conference: "National Football Conference (NFC)",
    },
    {
      name: "San Francisco 49ers",
      division: "NFC West",
      conference: "National Football Conference (NFC)",
    },
    {
      name: "Seattle Seahawks",
      division: "NFC West",
      conference: "National Football Conference (NFC)",
    },
  ],
  NBA: [
    {
      name: "Boston Celtics",
      division: "Atlantic Division",
      conference: "Eastern Conference",
    },
    {
      name: "Brooklyn Nets",
      division: "Atlantic Division",
      conference: "Eastern Conference",
    },
    {
      name: "New York Knicks",
      division: "Atlantic Division",
      conference: "Eastern Conference",
    },
    {
      name: "Philadelphia 76ers",
      division: "Atlantic Division",
      conference: "Eastern Conference",
    },
    {
      name: "Toronto Raptors",
      division: "Atlantic Division",
      conference: "Eastern Conference",
    },
    {
      name: "Chicago Bulls",
      division: "Central Division",
      conference: "Eastern Conference",
    },
    {
      name: "Cleveland Cavaliers",
      division: "Central Division",
      conference: "Eastern Conference",
    },
    {
      name: "Detroit Pistons",
      division: "Central Division",
      conference: "Eastern Conference",
    },
    {
      name: "Indiana Pacers",
      division: "Central Division",
      conference: "Eastern Conference",
    },
    {
      name: "Milwaukee Bucks",
      division: "Central Division",
      conference: "Eastern Conference",
    },
    {
      name: "Atlanta Hawks",
      division: "Southeast Division",
      conference: "Eastern Conference",
    },
    {
      name: "Charlotte Hornets",
      division: "Southeast Division",
      conference: "Eastern Conference",
    },
    {
      name: "Miami Heat",
      division: "Southeast Division",
      conference: "Eastern Conference",
    },
    {
      name: "Orlando Magic",
      division: "Southeast Division",
      conference: "Eastern Conference",
    },
    {
      name: "Washington Wizards",
      division: "Southeast Division",
      conference: "Eastern Conference",
    },
    {
      name: "Denver Nuggets",
      division: "Northwest Division",
      conference: "Western Conference",
    },
    {
      name: "Minnesota Timberwolves",
      division: "Northwest Division",
      conference: "Western Conference",
    },
    {
      name: "Oklahoma City Thunder",
      division: "Northwest Division",
      conference: "Western Conference",
    },
    {
      name: "Portland Trail Blazers",
      division: "Northwest Division",
      conference: "Western Conference",
    },
    {
      name: "Utah Jazz",
      division: "Northwest Division",
      conference: "Western Conference",
    },
    {
      name: "Golden State Warriors",
      division: "Pacific Division",
      conference: "Western Conference",
    },
    {
      name: "LA Clippers",
      division: "Pacific Division",
      conference: "Western Conference",
    },
    {
      name: "Los Angeles Lakers",
      division: "Pacific Division",
      conference: "Western Conference",
    },
    {
      name: "Phoenix Suns",
      division: "Pacific Division",
      conference: "Western Conference",
    },
    {
      name: "Sacramento Kings",
      division: "Pacific Division",
      conference: "Western Conference",
    },
    {
      name: "Dallas Mavericks",
      division: "Southwest Division",
      conference: "Western Conference",
    },
    {
      name: "Houston Rockets",
      division: "Southwest Division",
      conference: "Western Conference",
    },
    {
      name: "Memphis Grizzlies",
      division: "Southwest Division",
      conference: "Western Conference",
    },
    {
      name: "New Orleans Pelicans",
      division: "Southwest Division",
      conference: "Western Conference",
    },
    {
      name: "San Antonio Spurs",
      division: "Southwest Division",
      conference: "Western Conference",
    },
  ],
  MLB: [
    {
      name: "Toronto Blue Jays",
      division: "AL East",
      conference: "American League (AL)",
    },
    {
      name: "Baltimore Orioles",
      division: "AL East",
      conference: "American League (AL)",
    },
    {
      name: "Boston Red Sox",
      division: "AL East",
      conference: "American League (AL)",
    },
    {
      name: "New York Yankees",
      division: "AL East",
      conference: "American League (AL)",
    },
    {
      name: "Tampa Bay Rays",
      division: "AL East",
      conference: "American League (AL)",
    },
    {
      name: "Chicago White Sox",
      division: "AL Central",
      conference: "American League (AL)",
    },
    {
      name: "Cleveland Indians",
      division: "AL Central",
      conference: "American League (AL)",
    },
    {
      name: "Detroit Tigers",
      division: "AL Central",
      conference: "American League (AL)",
    },
    {
      name: "Kansas City Royals",
      division: "AL Central",
      conference: "American League (AL)",
    },
    {
      name: "Minnesota Twins",
      division: "AL Central",
      conference: "American League (AL)",
    },
    {
      name: "Houston Astros",
      division: "AL West",
      conference: "American League (AL)",
    },
    {
      name: "Los Angeles Angels",
      division: "AL West",
      conference: "American League (AL)",
    },
    {
      name: "Oakland Athletics",
      division: "AL West",
      conference: "American League (AL)",
    },
    {
      name: "Seattle Mariners",
      division: "AL West",
      conference: "American League (AL)",
    },
    {
      name: "Texas Rangers",
      division: "AL West",
      conference: "American League (AL)",
    },
    {
      name: "Atlanta Braves",
      division: "NL East",
      conference: "National League (NL)",
    },
    {
      name: "Miami Marlins",
      division: "NL East",
      conference: "National League (NL)",
    },
    {
      name: "New York Mets",
      division: "NL East",
      conference: "National League (NL)",
    },
    {
      name: "Philadelphia Phillies",
      division: "NL East",
      conference: "National League (NL)",
    },
    {
      name: "Washington Nationals",
      division: "NL East",
      conference: "National League (NL)",
    },
    {
      name: "Chicago Cubs",
      division: "NL Central",
      conference: "National League (NL)",
    },
    {
      name: "Cincinnati Reds",
      division: "NL Central",
      conference: "National League (NL)",
    },
    {
      name: "Milwaukee Brewers",
      division: "NL Central",
      conference: "National League (NL)",
    },
    {
      name: "Pittsburgh Pirates",
      division: "NL Central",
      conference: "National League (NL)",
    },
    {
      name: "St. Louis Cardinals",
      division: "NL Central",
      conference: "National League (NL)",
    },
    {
      name: "Arizona Diamondbacks",
      division: "NL West",
      conference: "National League (NL)",
    },
    {
      name: "Colorado Rockies",
      division: "NL West",
      conference: "National League (NL)",
    },
    {
      name: "Los Angeles Dodgers",
      division: "NL West",
      conference: "National League (NL)",
    },
    {
      name: "San Diego Padres",
      division: "NL West",
      conference: "National League (NL)",
    },
    {
      name: "San Francisco Giants",
      division: "NL West",
      conference: "National League (NL)",
    },
  ],
};

export const conferencesData = {
  NHL: ["Eastern Conference", "Western Conference"],
  NFL: [
    "American Football Conference (AFC)",
    "National Football Conference (NFC)",
  ],
  NBA: ["Eastern Conference", "Western Conference"],
  MLB: ["American League (AL)", "National League (NL)"],
};

export const divisionsData = {
  NHL: [
    { name: "Atlantic Division", conference: "Eastern Conference" },
    { name: "Metropolitan Division", conference: "Eastern Conference" },
    { name: "Central Division", conference: "Western Conference" },
    { name: "Pacific Division", conference: "Western Conference" },
  ],
  NFL: [
    { name: "AFC East", conference: "American Football Conference (AFC)" },
    { name: "AFC North", conference: "American Football Conference (AFC)" },
    { name: "AFC South", conference: "American Football Conference (AFC)" },
    { name: "AFC West", conference: "American Football Conference (AFC)" },
    { name: "NFC East", conference: "National Football Conference (NFC)" },
    { name: "NFC North", conference: "National Football Conference (NFC)" },
    { name: "NFC South", conference: "National Football Conference (NFC)" },
    { name: "NFC West", conference: "National Football Conference (NFC)" },
  ],
  NBA: [
    { name: "Atlantic Division", conference: "Eastern Conference" },
    { name: "Central Division", conference: "Eastern Conference" },
    { name: "Southeast Division", conference: "Eastern Conference" },
    { name: "Northwest Division", conference: "Western Conference" },
    { name: "Pacific Division", conference: "Western Conference" },
    { name: "Southwest Division", conference: "Western Conference" },
  ],
  MLB: [
    { name: "AL East", conference: "American League (AL)" },
    { name: "AL Central", conference: "American League (AL)" },
    { name: "AL West", conference: "American League (AL)" },
    { name: "NL East", conference: "National League (NL)" },
    { name: "NL Central", conference: "National League (NL)" },
    { name: "NL West", conference: "National League (NL)" },
  ],
};

export const months = [
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
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
