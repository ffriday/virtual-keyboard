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
    this.mode = language;
    this.cursor = 0;

    // Main elements
    this.container = elementFab('main', ['container']);
    this.caption = elementFab('h1', ['container__caption'], 'Виртуальная клавиатура');
    this.text = elementFab('textarea', ['container__text']);
    this.text.cols = textCols;
    this.text.rows = textRows;
    this.key = elementFab('section', ['keyboard']);
    this.info = elementFab('h2', ['container__info'], 'Переключение языка Alt + Shift');

    // Mouse events
    this.mouseClickEvent = this.key.addEventListener('click', (event) => (this.mouseClickHandler(event, this)));
    // TODO add mouse down and mouse up events to handle shift properly
    this.textCliclEvent = this.text.addEventListener('click', (event) => (this.textClickHandler(event, this)));

    // Keyboard events
    this.keyDownEvent = window.addEventListener('keydown', (event) => (this.keyDownHandler(event)));
    this.keyUpEvent = window.addEventListener('keyup', (event) => (this.keyUpHandler(event)));
  }

  render(parentElement = document.body) {
    // Render all elements
    this.root = parentElement;
    this.buttons = this.renderButtons(keys);
    this.key.append(...this.buttons.map((v) => v.element));
    this.container.append(this.caption, this.text, this.key, this.info);
    this.root.append(this.container);
    this.text.focus();
  }

  // Shift and Caps mode
  changeMode() {
    if (this.shift) {
      if (this.caps) {
        this.mode = this.lang;
      } else {
        this.mode = `${this.lang}${'S'}`;
      }
    } else if (!this.shift) {
      if (this.caps) {
        this.mode = `${this.lang}${'S'}`;
      } else {
        this.mode = this.lang;
      }
    }
  }

  // Shift and Caps handler
  changeKeys() {
    this.changeMode();
    this.buttons = this.buttons.map((v) => {
      const t = v;
      t.element.innerText = v.key[this.mode];
      return v;
    });
  }

  renderButtons(keyArray) {
    const arr = Array(keyArray.length);
    keyArray.forEach((v, i) => {
      arr[i] = new Button(v, this.lang);
    });
    return arr;
  }

  mouseClickHandler(event) {
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
      if (keyClass === 'capslock') {
        this.caps = !this.caps;
        this.changeKeys();
      }
      if (keyClass === 'shiftL' || keyClass === 'shiftR') {
        this.shift = !this.shift;
        this.changeKeys();
      }
      event.target.classList.toggle('active'); // Remove animation class
      this.text.focus();
      this.text.selectionStart = this.cursor;
      this.text.selectionEnd = this.cursor;
    }
  }

  // Add text to textarea
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
  keyDownHandler(event) {
    event.preventDefault();
    event.stopPropagation();
    this.shift = event.getModifierState('Shift');
    this.caps = event.getModifierState('CapsLock');
    const val = event.key.toLowerCase();
    // const. el = this.buttons.filter((v) => {
    //   v.key[mode] === val;
    // })
    if (val.length === 1) {
      this.addText(val);
    }
    this.changeKeys();
  }

  keyUpHandler(event) {
    event.preventDefault();
    event.stopPropagation();
    this.shift = event.getModifierState('Shift');
    this.caps = event.getModifierState('CapsLock');
    this.changeKeys();
  }
}

const keyboard = () => {
  const key = new Keyboard();
  key.render();
};

export default keyboard;
