import elementFab from './func';
import Button from './button/button';
import keys from './keys';

// Textarea size
const textCols = '95';
const textRows = '20';

class Keyboard {
  constructor(language = 'ru') {
    this.lang = language; // lang = ru || en

    // Main elements
    this.container = elementFab('main', ['container']);
    this.caption = elementFab('h1', ['container__caption'], 'Виртуальная клавиатура');
    this.text = elementFab('textarea', ['container__text']);
    this.text.cols = textCols;
    this.text.rows = textRows;
    this.key = elementFab('section', ['keyboard']);
    this.info = elementFab('h2', ['container__info'], 'Переключение языка Alt + Shift');

    this.keyDownEvent = window.addEventListener('keydown', (event) => (this.kewDownHandler(event, this)));
  }

  render(parentElement = document.body) {
    // Render all elements
    this.root = parentElement;
    this.buttons = this.renderButtons(keys);
    this.key.append(...this.buttons.map(v => v.render()));
    this.container.append(this.caption, this.text, this.key, this.info);
    this.root.append(this.container);
  }

  renderButtons(keyArray) {
    const arr = Array(keyArray.length);
    keyArray.map((v, i) => {
      arr[i] = new Button(v, this.lang);
    });
    return arr;
  }
  // DEVELOP FUNCTION
  kewDownHandler(event, env) {
    env.text.value += event.key;
  }
}

const keyboard = () => {
  const key = new Keyboard();
  key.render();
};

export default keyboard;

// Structure
// container
//  caption
//  textarea
//  keyboard
//   button (main style)
//   TEMPLATE
//    div
//   small button (letters, numbers, arrows, CTRL, WIN, ALT)
//   del button
//   tab button
//   enter, right shift button
//   capslock, left shift button
//   backspace button
//   space button
//   MODIFICATORS
//    colored buttons (system)
//    hover style
//    active style
//  language chenge info
