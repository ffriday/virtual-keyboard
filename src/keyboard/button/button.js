import elementFab from '../func';

class Button {
  constructor(key, lang = 'ru') {
    this.key = key;
    this.lang = lang;
    this.element = this.render();
  }

  render() {
    return elementFab('div', ['basic-key', this.key.type, this.key.class], this.key[this.lang]);
  }

  handleEvent(shift, caps) {
    let i = this.lang;
    if (shift || caps) {
      i += 'S';
    }
    this.element.innerText = this.key[i];
  }
}

export default Button;
