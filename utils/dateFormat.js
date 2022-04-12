exports.dateFormat = function (date) {
  const newString = date.toISOString().replace(/T/, " ").replace(/\..+/, "");
  const newArray = newString.split(" ");
  return newArray;
};
exports.getDiffDate = function (date1, date2) {
  const milisecond = date1.getTime() - date2.getTime();
  const hour = Math.floor(milisecond / 3600000);
  const minute = Math.floor((milisecond - hour * 3600000) / 60000);
  const second = Math.round(
    (milisecond - hour * 3600000 - minute * 60000) / 1000
  );
  const diff = hour + ":" + minute + ":" + second;
  return diff;
};
