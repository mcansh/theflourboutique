function setMinDate(input) {
  if (!input) return; // skip this fn from running if there is not input on the page
  const currentDate = new Date(); //
  const threeWeeks = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 21).toISOString().substr(0, 10).split('-');
  input.min = `${threeWeeks[0]}-${threeWeeks[1]}-${threeWeeks[2]}`;
}

export default setMinDate;
