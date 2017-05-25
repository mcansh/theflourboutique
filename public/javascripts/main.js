import 'whatwg-fetch';
import '../sass/style.sass';
import { $, $$ } from './modules/bling';
import pace from './modules/pace.min';
import autocomplete from './modules/autocomplete';
import setMinDate from './modules/setMinDate';
import completeOrder from './modules/completeOrder';

pace.start();
setMinDate($('#date'));
autocomplete($('#city'));
const copyright = new Date();
$('footer span').textContent = copyright.getFullYear();

const completeOrderForms = $$('form.completeOrderForm');
completeOrderForms.on('submit', completeOrder);
