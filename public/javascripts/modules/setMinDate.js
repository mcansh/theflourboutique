function setMinDate(input) {
  if (!input) return; // skip this fn from running if there is not input on the page
  const currentDate = new Date();
  const threeWeeks = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate() + 21,
  )
    .toISOString()
    .substr(0, 10)
    .split('-');
  const [year, month, day] = threeWeeks;
  input.min = `${year}-${month}-${day}`; // eslint-disable-line no-param-reassign
  input.value = `${year}-${month}-${day}`; // eslint-disable-line no-param-reassign
}

export default setMinDate;
