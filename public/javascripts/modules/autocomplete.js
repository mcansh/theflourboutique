function autocomplete(input) {
  if (!input) return; // skip this fn from running if there is not input on the page
  const dropdown = new google.maps.places.Autocomplete(input);
  // if someone hits enter on the address field, don't submit the form
  input.on('keydown', (e) => {
    if (e.keyCode === 13) e.preventDefault();
  });
}

export default autocomplete;
