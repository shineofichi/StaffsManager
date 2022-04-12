module.exports = function dateFormat(date) {
  const newString = date.toISOString().replace(/T/, " ").replace(/\..+/, "");
  const newArray = newString.split(" ");
  return newArray;
};
