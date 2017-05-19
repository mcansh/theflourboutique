import 'whatwg-fetch';
import '../sass/style.sass';
import { $, $$ } from './modules/bling';
import pace from './modules/pace.min';
import autocomplete from './modules/autocomplete';
import setupRaven from './modules/raven';
import setMinDate from './modules/setMinDate';

setupRaven();
pace.start();
setMinDate($('#date'));
autocomplete($('#city'));
const copyright = new Date();
$('footer span').textContent = copyright.getFullYear();
