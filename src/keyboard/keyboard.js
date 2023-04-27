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
    this.text.focus();
  }

  renderButtons(keyArray) {
    const arr = Array(keyArray.length);
    keyArray.forEach((v, i) => {
      arr[i] = new Button(v, this.lang);
    });
    return arr;
  }

  mouseDownHandler(event, env) {
    if (event.target.classList[0] === 'basic-key') {
      const type = event.target.classList[1];
      const keyClass = event.target.classList[2];
      const { innerText } = event.target;
      const { value } = this.text;
      event.target.classList.toggle('active'); // Add animation class
      // Letters and numbers
      if (type === 'letter' || type === 'number') {
        this.addText(innerText);
      }
      // Backspace
      if (keyClass === 'backspace' && this.cursor > 0) {
        this.text.value = value.slice(0, this.cursor - 1) + value.slice(this.cursor);
        this.cursor = this.cursor > 0 ? this.cursor -= 1 : 0;
      }
      // Del
      if (keyClass === 'del' && this.cursor < this.text.value.length) {
        this.text.value = value.slice(0, this.cursor) + value.slice(this.cursor + 1);
        this.cursor = this.cursor < this.text.value.length
          ? this.cursor : this.text.value.length;
      }
      // Enter
      if (keyClass === 'enter') {
        this.text.value += '\r\n';
        this.cursor += 1;
      }
      // Tab
      if (keyClass === 'tab') {
        this.addText('    ');
      }
      // Space
      if (keyClass === 'space') {
        this.addText(' ');
      }
      // Arrows
      if (keyClass.length > 'arrow'.length && keyClass.slice(0, 'arrow'.length) === 'arrow') {
        this.addText(innerText);
      }
      event.target.classList.toggle('active'); // Remove animation class
      this.text.focus();
      this.text.selectionStart = this.cursor;
      this.text.selectionEnd = this.cursor;
    }
  }

  addText(text) {
    this.text.value = this.text.value.slice(0, this.cursor)
       + text + this.text.value.slice(this.cursor);
    this.cursor += text.length;
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
