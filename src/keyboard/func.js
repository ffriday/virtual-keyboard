const elementFab = (elType = 'div', elClass = [], elText = '') => {
  const el = document.createElement(elType);
  el.className = elClass.join(' ');
  el.innerText = elText;
  return el;
};

export default elementFab;
