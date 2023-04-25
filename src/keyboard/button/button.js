import elementFab from '../func';

class Button {
  constructor(key, lang = 'ru') {
    this.key = key;
    this.lang = lang;
    this.element = this.render();
  }

  render() {
    const cl = this.key.class ? this.key.class : this.key.type + this.key.en;
    return elementFab('div', ['basic-key', this.key.type, cl], this.key[this.lang]);
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
