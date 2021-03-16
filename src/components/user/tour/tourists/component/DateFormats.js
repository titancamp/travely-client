const Months = ["Jan", "Feb", "Mar", "Apr",
  "May", "Jun", "Jul", "Aug",
  "Sep", "Oct", "Nov", "Dec"];


export function convertMonthFormat(date) {

  let day = date.getDate();
  let monthIndex = date.getMonth();
  let monthName = Months[monthIndex];
  let year = date.getFullYear();

  return `${monthName} ${day}, ${year % 100}`;
}
