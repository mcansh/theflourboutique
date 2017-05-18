import 'whatwg-fetch';
import '../sass/style.sass';
import { $, $$ } from './modules/bling';
import pace from './modules/pace.min';
import autocomplete from './modules/autocomplete';

pace.start();
autocomplete($('#city'));
