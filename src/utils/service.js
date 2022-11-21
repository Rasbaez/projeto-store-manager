// https://stackoverflow.com/questions/10211145/getting-current-date-and-time-in-javascript
const dateNow = () => {
  const currentDate = new Date();
  const dateTime = `${currentDate.getFullYear()}-${
     currentDate.getMonth() + 1}-${
     currentDate.getDate()} ${
     currentDate.getHours()}:${
     currentDate.getMinutes()}:${
    currentDate.getSeconds()}`;
  
  return dateTime;
};

const verifyIfExist = (arr, productId) => arr.some(({ id }) => id === productId);

module.exports = { dateNow, verifyIfExist };