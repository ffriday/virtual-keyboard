import './styles.sass';
import Keyboard from './keyboard/keyboard';

let lang = 'ru';
if (window.localStorage.getItem('lang')) {
  lang = window.localStorage.getItem('lang');
}
const key = new Keyboard(lang);
key.render();
