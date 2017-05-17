import 'whatwg-fetch';
import { $, $$ } from './modules/bling';
import pace from './modules/pace.min';
import url from './modules/config';
import serialize from './modules/serialize';
import autocomplete from './modules/autocomplete';

pace.start();
autocomplete($('#city'));

// set minimum date to now
const date = new Date().toISOString().substr(0, 10);
$('#date').min = date;

$('#date').on('input', function () {
  if (this.value !== '') {
    this.style.color = 'black';
  } else {
    this.style.color = 'rgba(0, 0, 0, 0.37)';
  }
  if (this.value === this.min) {
    this.classList.add('error');
  } else {
    this.classList.remove('error');
  }
});

$('select').on('change', function () {
  this.style.color = 'black';
});

function checkForm() {
  if ($('select').value !== $('option[disabled]').textContent && $('form').checkValidity()) {
    $('input[type="submit"]').disabled = false;
  } else {
    $('input[type="submit"]').disabled = true;
  }
}

$('select').on('input', checkForm);

$$('input').forEach((input) => {
  input.on('change', checkForm);
});

// submit to google form
function sendToGoogleForm(event) {
  event.preventDefault();
  const serializedData = serialize($('form'));
  console.log(serializedData);

  $('input[type="submit"]').disabled = true;

  fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: serializedData,
  })
    .then(blob => blob.json())
    .then((data) => {
      console.log(data);
      $('.form-wrap').textContent = 'Order successfully submitted';
    })
    .catch((err) => {
      console.error(`The following error occured: ${err}`);
    });
}

$('form').addEventListener('submit', sendToGoogleForm);
