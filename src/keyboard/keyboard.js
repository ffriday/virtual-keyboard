import elementFab from './func';
import Button from './button/button';
import keys from './keys';

// Textarea size
const textCols = '98';
const textRows = '20';

class Keyboard {
  constructor(language = 'ru') {
    this.lang = language; // lang = ru || en
    this.shift = false;
    this.caps = false;
    this.cursor = 0;

    // Main elements
    this.container = elementFab('main', ['container']);
    this.caption = elementFab('h1', ['container__caption'], 'Виртуальная клавиатура');
    this.text = elementFab('textarea', ['container__text']);
    this.text.cols = textCols;
    this.text.rows = textRows;
    this.key = elementFab('section', ['keyboard']);
    this.info = elementFab('h2', ['container__info'], 'Переключение языка Alt + Shift');

    this.mouseDownEvent = this.key.addEventListener('click', (event) => (this.mouseDownHandler(event, this)));
    this.textCliclEvent = this.text.addEventListener('click', (event) => (this.textClickHandler(event, this)));

    // DEVELOPMENT
    this.keyDownEvent = window.addEventListener('keydown', (event) => (this.kewDownHandler(event, this)));
  }

  render(parentElement = document.body) {
    // Render all elements
    this.root = parentElement;
    this.buttons = this.renderButtons(keys);
    this.key.append(...this.buttons.map((v) => v.render()));
    this.container.append(this.caption, this.text, this.key, this.info);
    this.root.append(this.container);
  }

  renderButtons(keyArray) {
    const arr = Array(keyArray.length);
    keyArray.forEach((v, i) => {
      arr[i] = new Button(v, this.lang);
    });
    return arr;
  }

  mouseDownHandler(event, env) {
    const type = event.target.classList[1];
    const { innerText } = event.target;
    event.target.classList.toggle('active'); // Add animation class
    if (type === 'letter' || type === 'number') {
      const { value } = this.text;
      // const { selectionStart } = this.text;
      // this.text.value += innerText;
      this.text.value = value.slice(0, this.cursor) + innerText + value.slice(this.cursor);
      this.cursor += 1;
    }
    event.target.classList.toggle('active'); // Remove animation class
  }

  textClickHandler(event, env) {
    const e = env;
    e.cursor = this.text.selectionStart;
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
