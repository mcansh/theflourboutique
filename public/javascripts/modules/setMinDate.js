function setMinDate(input) {
  if (!input) return; // skip this fn from running if there is not input on the page
  const currentDate = new Date(); //
  // const threeWeeks = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 21).toISOString().substr(0, 10).split('-');
  // input.min = `${threeWeeks[0]}-${threeWeeks[1]}-${threeWeeks[2]}`;
  // input.value = `${threeWeeks[1]}-${threeWeeks[2]}-${threeWeeks[0]}`;
  const firstOrder = new Date('2017', '08', '05').toISOString().substr(0, 10).split('-');
  input.min = `${firstOrder[0]}-${firstOrder[1]}-${firstOrder[2]}`;
  input.value = `${firstOrder[0]}-${firstOrder[1]}-${firstOrder[2]}`;
}

export default setMinDate;
