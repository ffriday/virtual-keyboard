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
    this.hintText = `Если язык клавиатуры не совпадает с языком в системе - 
        после начала воода с клавиатуры язык изменится.
        При нажатии мышкой Shift залипает, после нажатия символа - отлипает (как в телефоне). 
        Поддерживаемые раскладки: русская, английская.`;

    // Main elements
    this.container = elementFab('main', ['container']);
    this.caption = elementFab('h1', ['container__caption'], 'Виртуальная клавиатура');
    this.text = elementFab('textarea', ['container__text']);
    this.text.cols = textCols;
    this.text.rows = textRows;
    this.key = elementFab('section', ['keyboard']);
    this.info = elementFab('h2', ['container__info'], 'Переключение языка left Shift + Alt');
    this.hint = elementFab('span', ['container__hint'], this.hintText);

    // Mouse events
    this.mouseClickEvent = this.key.addEventListener('mousedown', (event) => (this.mouseClickHandler(event.target)));
    this.mouseUpEvent = this.key.addEventListener('mouseup', (event) => (event.target.classList.remove('active')));
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
    this.container.append(this.caption, this.text, this.key, this.info, this.hint);
    this.root.append(this.container);

    this.elCaps = this.key.querySelector('.capslock');
    this.elShiftL = this.key.querySelector('.shiftL');
    this.elShiftR = this.key.querySelector('.shiftR');

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
  changeKeys(caps) {
    this.changeMode();
    window.localStorage.setItem('lang', this.lang);
    const checkLetter = this.lang === 'ru' ? 'rl' : 'el';
    this.buttons = this.buttons.map((v) => {
      const t = v;
      if (caps) {
        if (v.key[checkLetter]) {
          t.element.innerText = v.key[this.mode];
        }
      } else {
        const mode = this.shift ? `${this.lang}S` : this.lang;
        if (v.key[checkLetter]) {
          t.element.innerText = v.key[this.mode];
        } else {
          t.element.innerText = v.key[mode];
        }
      }
      return v;
    });

    if (this.shift) {
      this.elShiftL.classList.add('stick');
      this.elShiftR.classList.add('stick');
    } else {
      this.elShiftL.classList.remove('stick');
      this.elShiftR.classList.remove('stick');
    }
    if (this.caps) {
      this.elCaps.classList.add('stick');
    } else {
      this.elCaps.classList.remove('stick');
    }
  }

  renderButtons(keyArray) {
    const arr = Array(keyArray.length);
    keyArray.forEach((v, i) => {
      arr[i] = new Button(v, this.lang);
      arr[i].mouseOutEvent = arr[i].element.addEventListener('mouseout', (event) => (event.target.classList.remove('active')));
    });
    return arr;
  }

  mouseClickHandler(element) {
    if (element.classList[0] === 'basic-key') {
      const type = element.classList[1];
      const keyClass = element.classList[2];
      const { innerText } = element;
      const { value } = this.text;
      element.classList.add('active'); // Add animation class
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
        // this.text.value += '\r\n';
        // this.cursor += 1;
        this.addText('\r\n', 1);
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
        this.changeKeys(true);
      }
      if (keyClass === 'shiftL' || keyClass === 'shiftR') {
        this.shift = !this.shift;
        this.changeKeys();
      }
      if (keyClass !== 'shiftL' && keyClass !== 'shiftR') {
        this.shift = false;
        this.changeKeys();
      }
      // event.target.classList.remove('active'); // Remove animation class
      this.text.focus();
      this.text.selectionStart = this.cursor;
      this.text.selectionEnd = this.cursor;
    }
  }

  // Add text to textarea
  addText(text, len = 0) {
    const l = len || text.length;
    this.text.value = this.text.value.slice(0, this.cursor)
       + text + this.text.value.slice(this.cursor);
    this.cursor += l;
  }

  textClickHandler(event, env) {
    const e = env;
    e.cursor = this.text.selectionStart;
  }

  getElement(event) {
    const alt = {
      Control: 'Ctrl',
      AltGraph: 'Alt',
      Meta: 'Win',
      Delete: 'Del',
      ArrowUp: '▲',
      ArrowDown: '▼',
      ArrowLeft: '◄',
      ArrowRight: '►',
    };
    const loc = event.location === 0 ? 0 : event.location - 1;
    const key = alt[event.key] ? alt[event.key] : event.key;
    let element = null;
    if (this.buttons.filter((v) => v.key[this.mode] === key).length) {
      element = this.buttons.filter((v) => v.key[this.mode] === key)[loc];
    } else {
      const tempMode = this.lang === 'ru' ? 'en' : 'ru';
      if (this.buttons.filter((v) => v.key[tempMode] === key).length) {
        this.lang = tempMode;
        this.changeKeys(false);
        element = this.buttons.filter((v) => v.key[this.mode] === key)[loc];
      }
    }
    return element ? element.element : null;
  }

  keyDownHandler(event) {
    event.preventDefault();
    event.stopPropagation();
    this.shift = event.getModifierState('Shift');
    this.caps = event.getModifierState('CapsLock');
    const element = this.getElement(event);
    if (element) {
      this.mouseClickHandler(element);
      this.changeKeys(event.key === 'CapsLock');
    }
    // AltGraph problem
    if (this.key.querySelector('.altR').classList.contains('active')) {
      this.key.querySelector('.ctrlL').classList.remove('active');
    }
  }

  keyUpHandler(event) {
    event.preventDefault();
    event.stopPropagation();
    this.shift = event.getModifierState('Shift');
    this.caps = event.getModifierState('CapsLock');
    this.changeKeys(event.key === 'CapsLock');
    const element = this.getElement(event);
    if (element) {
      element.classList.remove('active');
    }

    // Change language
    if (event.key === 'Alt' && event.location === 1) {
      if (event.getModifierState('Shift')) {
        this.lang = this.lang === 'ru' ? 'en' : 'ru';
        this.changeKeys();
      }
    }
    if (event.key === 'Shift' && event.location === 1) {
      if (event.getModifierState('Alt')) {
        this.lang = this.lang === 'ru' ? 'en' : 'ru';
        this.changeKeys();
      }
    }
  }
}

const keyboard = () => {
  let lang = 'ru';
  if (window.localStorage.getItem('lang')) {
    lang = window.localStorage.getItem('lang');
  }
  const key = new Keyboard(lang);
  key.render();
};

export default keyboard;
