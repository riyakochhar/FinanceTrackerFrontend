import format from "date-fns/format";

function formatDate(date) {
  const year = date.getFullYear().toString().slice(-2);
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}${month}${day}`;
}

function convertSlot(inputDate) {
  // Extract year, month, and day from the input date
  // Get the current year
  const currentYear = new Date().getFullYear();

  // Extract the year, month, and day from the input date
  const inputYear =
    parseInt(inputDate.slice(0, 2), 10) + currentYear - (currentYear % 100);
  const month = parseInt(inputDate.slice(2, 4), 10);
  const day = parseInt(inputDate.slice(4, 6), 10);

  // Create a JavaScript Date object
  const date = new Date(inputYear, month - 1, day); // Month in JavaScript is 0-based

  // Format the date in "dd-MMM-yyyy" format
  const options = { year: "numeric", month: "short", day: "numeric" };
  const formattedDate = date.toLocaleDateString("en-US", options);
  return formattedDate;
}

let options = [
  {
    label: "Today",
    value: {
      from_slot: formatDate(new Date()),
      to_slot: formatDate(new Date()),
    },
  },
  {
    label: "Yesterday",
    value: {
      from_slot: formatDate(
        new Date(new Date().getTime() - 24 * 60 * 60 * 1000)
      ),
      to_slot: formatDate(new Date(new Date().getTime() - 24 * 60 * 60 * 1000)),
    },
  },
  {
    label: "This Week",
    value: {
      from_slot: formatDate(getStartOfWeek(new Date())),
      to_slot: formatDate(new Date()),
    },
  },
  {
    label: "This Month",
    value: {
      from_slot: formatDate(getStartOfMonth(new Date())),
      to_slot: formatDate(new Date()),
    },
  },
  {
    label: "Last 7 days",
    value: {
      from_slot: formatDate(
        new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000)
      ),
      to_slot: formatDate(new Date()),
    },
  },
  {
    label: "Last 30 days",
    value: {
      from_slot: formatDate(
        new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000)
      ),
      to_slot: formatDate(new Date()),
    },
  },

  {
    label: "Select Time Period",
    value: {
      from_slot: "", // You can set this to an initial value
      to_slot: "",
    },
  },
];

// Function to get the start of the week
function getStartOfWeek(date) {
  const currentDate = new Date(date);
  const day = currentDate.getDay();
  const diff = currentDate.getDate() - day + (day === 0 ? -6 : 1);
  currentDate.setDate(diff);
  return currentDate;
}

function getNSlot() {
  const currentDate = new Date();
  const formattedDate = format(currentDate, "yyMMdd");
  return formattedDate;
}

function getNSlotBeforeTwoDays() {
  const currentDate = new Date();
  // Get the date for tomorrow
  const tomorrowDate = new Date(currentDate);
  tomorrowDate.setDate(currentDate.getDate() - 2);

  // Format the date as "yyMMdd"
  const formattedDate = format(tomorrowDate, "yyMMdd");
  return formattedDate;
}

// Function to get the start of the month
function getStartOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

export {
  formatDate,
  convertSlot,
  options,
  getStartOfMonth,
  getStartOfWeek,
  getNSlot,
  getNSlotBeforeTwoDays,
};
