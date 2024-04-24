const formatTime = (time) => {
  const getSeconds = `0${Math.round(time % 60)}`.slice(-2);
  const minutes = `${Math.floor(time / 60)}`;
  const getMinutes = `0${minutes % 60}`.slice(-2);
  const getHours = `0${Math.floor(time / 3600)}`.slice(-2);
  return `${getHours}:${getMinutes}:${getSeconds}`;
};

const formatDate = (date) => {
  return date.slice(0, 24);
};

const formatLogDate = (date) => {
  let d = date;

  let month = (d.getMonth() + 1).toString();
  let day = d.getDate().toString();
  let year = d.getFullYear().toString().slice(-2);

  if (month.length < 2) {
    month = "0" + month;
  }
  if (day.length < 2) {
    day = "0" + day;
  }

  return [month, day, year].join(".");
};

const formatMsgTime = (date) => {
  let hour = date.getHours();
  let mins = date.getMinutes();
  let daytime = "am";

  if (hour > 12) {
    hour = hour - 12;
    daytime = "pm";
  }
  if (mins < 10) {
    mins = "0" + mins;
  }
  return [hour, mins].join(":") + daytime;
};
export { formatTime, formatDate, formatLogDate, formatMsgTime };
