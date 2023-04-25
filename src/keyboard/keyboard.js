import elementFab from './func';

class Keyboard {
  constructor(language = 'ru') {
    this.lang = language; // lang = ru || en

    // Main elements
    this.container = elementFab('main', ['container']);
    this.caption = elementFab('h1', ['container__caption'], 'Виртуальная клавиатура');
    this.text = elementFab('textarea', ['container__text']);
    this.key = elementFab('section', ['keyboard']);
    this.info = elementFab('h2', ['container__info'], 'Переключение языка Alt + Shift');
  }

  render(parentElement = document.body) {
    // Render all elements
    this.root = parentElement;
    this.container.append(this.caption, this.text, this.key, this.info);
    this.root.append(this.container);
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
