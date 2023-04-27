const keys = [
  // Row 1
  {
    type: 'letter',
    class: 'tilda',
    ru: 'ё',
    ruS: 'Ё',
    en: '`',
    enS: '~',
  },
  // Numbers
  {
    type: 'number',
    ru: '1',
    ruS: '!',
    en: '1',
    enS: '!',
  },
  {
    type: 'number',
    ru: '2',
    ruS: '"',
    en: '2',
    enS: '@',
  },
  {
    type: 'number',
    ru: '3',
    ruS: '№',
    en: '3',
    enS: '#',
  },
  {
    type: 'number',
    ru: '4',
    ruS: ';',
    en: '4',
    enS: '$',
  },
  {
    type: 'number',
    ru: '5',
    ruS: '%',
    en: '5',
    enS: '%',
  },
  {
    type: 'number',
    ru: '6',
    ruS: ':',
    en: '6',
    enS: '^',
  },
  {
    type: 'number',
    ru: '7',
    ruS: '?',
    en: '7',
    enS: '&',
  },
  {
    type: 'number',
    ru: '8',
    ruS: '*',
    en: '8',
    enS: '*',
  },
  {
    type: 'number',
    ru: '9',
    ruS: '(',
    en: '9',
    enS: '(',
  },
  {
    type: 'number',
    ru: '0',
    ruS: ')',
    en: '0',
    enS: ')',
  },
  // Signs
  {
    type: 'number',
    class: 'minus',
    ru: '-',
    ruS: '_',
    en: '-',
    enS: '_',
  },
  {
    type: 'number',
    class: 'plus',
    ru: '=',
    ruS: '+',
    en: '=',
    enS: '+',
  },
  // Backspace
  {
    type: 'system',
    class: 'backspace',
    ru: 'Backspace',
    ruS: 'Backspace',
    en: 'Backspace',
    enS: 'Backspace',
  },
  // Row 2
  // Tab
  {
    type: 'system',
    class: 'tab',
    ru: 'Tab',
    ruS: 'Tab',
    en: 'Tabe',
    enS: 'Tab',
  },
  {
    type: 'letter', ru: 'й', ruS: 'Й', en: 'q', enS: 'Q',
  },
  {
    type: 'letter', ru: 'ц', ruS: 'Ц', en: 'w', enS: 'W',
  },
  {
    type: 'letter', ru: 'у', ruS: 'У', en: 'e', enS: 'E',
  },
  {
    type: 'letter', ru: 'к', ruS: 'К', en: 'r', enS: 'R',
  },
  {
    type: 'letter', ru: 'е', ruS: 'Е', en: 't', enS: 'T',
  },
  {
    type: 'letter', ru: 'н', ruS: 'Н', en: 'y', enS: 'Y',
  },
  {
    type: 'letter', ru: 'г', ruS: 'Г', en: 'u', enS: 'U',
  },
  {
    type: 'letter', ru: 'ш', ruS: 'Ш', en: 'i', enS: 'I',
  },
  {
    type: 'letter', ru: 'щ', ruS: 'Щ', en: 'o', enS: 'O',
  },
  {
    type: 'letter', ru: 'з', ruS: 'З', en: 'p', enS: 'P',
  },
  {
    type: 'letter', ru: 'х', ruS: 'Х', en: '[', enS: '{',
  },
  {
    type: 'letter', ru: 'ъ', ruS: 'Ъ', en: ']', enS: '}',
  },
  // Slash
  {
    type: 'letter',
    ru: '\\',
    ruS: '/',
    en: '\\',
    enS: '/',
  },
  // Del
  {
    type: 'system',
    class: 'del',
    ru: 'Del',
    ruS: 'Del',
    en: 'Del',
    enS: 'Del',
  },
  // Row 3
  // Capslock
  {
    type: 'system',
    class: 'capslock',
    ru: 'CapsLock',
    ruS: 'CapsLock',
    en: 'CapsLock',
    enS: 'CapsLock',
  },
  {
    type: 'letter', ru: 'ф', ruS: 'Ф', en: 'a', enS: 'A',
  },
  {
    type: 'letter', ru: 'ы', ruS: 'Ы', en: 's', enS: 'S',
  },
  {
    type: 'letter', ru: 'в', ruS: 'В', en: 'd', enS: 'D',
  },
  {
    type: 'letter', ru: 'а', ruS: 'А', en: 'f', enS: 'F',
  },
  {
    type: 'letter', ru: 'п', ruS: 'П', en: 'g', enS: 'G',
  },
  {
    type: 'letter', ru: 'р', ruS: 'Р', en: 'h', enS: 'H',
  },
  {
    type: 'letter', ru: 'о', ruS: 'О', en: 'j', enS: 'J',
  },
  {
    type: 'letter', ru: 'л', ruS: 'Л', en: 'k', enS: 'K',
  },
  {
    type: 'letter', ru: 'д', ruS: 'Д', en: 'l', enS: 'L',
  },
  {
    type: 'letter', ru: 'ж', ruS: 'Ж', en: ';', enS: ':',
  },
  {
    type: 'letter', ru: 'э', ruS: 'Э', en: "'", enS: '"',
  },
  // Enter
  {
    type: 'system',
    class: 'enter',
    ru: 'Enter',
    ruS: 'Enter',
    en: 'Enterk',
    enS: 'Enter',
  },
  // Row 4
  // Shift Left
  {
    type: 'system',
    class: 'shiftL',
    ru: 'Shift',
    ruS: 'Shift',
    en: 'Shift',
    enS: 'Shift',
  },
  {
    type: 'letter', ru: 'я', ruS: 'Я', en: 'z', enS: 'Z',
  },
  {
    type: 'letter', ru: 'ч', ruS: 'Ч', en: 'x', enS: 'X',
  },
  {
    type: 'letter', ru: 'с', ruS: 'С', en: 'c', enS: 'C',
  },
  {
    type: 'letter', ru: 'м', ruS: 'М', en: 'v', enS: 'V',
  },
  {
    type: 'letter', ru: 'и', ruS: 'И', en: 'b', enS: 'B',
  },
  {
    type: 'letter', ru: 'т', ruS: 'Т', en: 'n', enS: 'N',
  },
  {
    type: 'letter', ru: 'ь', ruS: 'Ь', en: 'm', enS: 'M',
  },
  {
    type: 'letter', ru: 'б', ruS: 'Б', en: ',', enS: '<',
  },
  {
    type: 'letter', ru: 'ю', ruS: 'Ю', en: '.', enS: '>',
  },
  {
    type: 'letter', ru: '.', ruS: ',', en: '/', enS: '?',
  },
  // Arrow UP
  {
    type: 'system',
    class: 'arrowUP',
    ru: '▲',
    ruS: '▲',
    en: '▲',
    enS: '▲',
  },
  // Shift Right
  {
    type: 'system',
    class: 'shiftR',
    ru: 'Shift',
    ruS: 'Shift',
    en: 'Shift',
    enS: 'Shift',
  },
  // Row 5
  {
    type: 'system',
    class: 'ctrlL',
    ru: 'Ctrl',
    ruS: 'Ctrl',
    en: 'Ctrl',
    enS: 'Ctrl',
  },
  {
    type: 'system',
    class: 'win',
    ru: 'Win',
    ruS: 'Win',
    en: 'Win',
    enS: 'Win',
  },
  {
    type: 'system',
    class: 'altL',
    ru: 'Alt',
    ruS: 'Alt',
    en: 'Alt',
    enS: 'WAlt',
  },
  {
    type: 'system',
    class: 'space',
    ru: ' ',
    ruS: ' ',
    en: ' ',
    enS: ' ',
  },
  {
    type: 'system',
    class: 'altR',
    ru: 'Alt',
    ruS: 'Alt',
    en: 'Alt',
    enS: 'WAlt',
  },
  {
    type: 'system',
    class: 'arrowLEFT',
    ru: '◄',
    ruS: '◄',
    en: '◄',
    enS: '◄',
  },
  {
    type: 'system',
    class: 'arrowDOWN',
    ru: '▼',
    ruS: '▼',
    en: '▼',
    enS: '▼',
  },
  {
    type: 'system',
    class: 'arrowRIGHT',
    ru: '►',
    ruS: '►',
    en: '►',
    enS: '►',
  },
  {
    type: 'system',
    class: 'ctrlR',
    ru: 'Ctrl',
    ruS: 'Ctrl',
    en: 'Ctrl',
    enS: 'Ctrl',
  },
];

export default keys;
