import './SearchInput.scss';
import { TAGS, CLASSES, CONFIGS } from '../../js/constants/index';
import MyElement from '../_common/MyElement';

class SearchInput extends MyElement {
  constructor({ blockClassName }) {
    super({ className: CLASSES.INPUT });
    this.addClasses(blockClassName);

    this.input = MyElement.createDOM({
      tagName: TAGS.INPUT,
      className: CLASSES.INPUT_FIELD,
      attrs: [
        ['type', 'text'],
        ['placeholder', 'Type to search'],
        ['id', 'input'],
      ],
    });
    this.dropdown = MyElement.createDOM({ className: CLASSES.INPUT_DROPDOWN });

    this.element.append(this.input, this.dropdown);

    this.input.addEventListener('input', () => {
      this.handleInputFocus();
    });
    this.input.addEventListener('focus', () => {
      this.handleInputFocus();
    });
    this.element.addEventListener('keydown', (event) => {
      this.handleEnter(event);
    });
    this.dropdown.addEventListener('click', (event) => {
      this.handleDropdownClick(event);
    });

    document.addEventListener('click', (event) => {
      const isInput = event.target.classList.contains(CLASSES.INPUT_FIELD);
      const isDropdown = event.target.closest(`.${CLASSES.INPUT_DROPDOWN}`);
      const isVirtualKeyboard = event.target.closest(
        `.${CLASSES.SIMPLE_KEYBOARD}`
      );

      if (!isInput && !isDropdown && !isVirtualKeyboard) {
        this.input.blur();
        this.dropdown.innerHTML = '';
      }
    });
  }

  handleInputFocus() {
    const { value } = this.input;

    if (value === '') {
      setTimeout(() => {
        this.dropdown.innerHTML = '';
      }, CONFIGS.DELAY.MIN);

      return;
    }

    this.addSuggestions(value);
  }

  handleEnter(event) {
    const enterCond = event.key === 'Enter';
    const { value } = this.input;

    if (enterCond && value !== '') {
      let name = this.names.find((str) => str === value);

      if (name) {
        this.dropdown.innerHTML = '';

        SearchInput.fireEvent({
          dispatcher: this.element,
          name: 'updateRequest',
          bubbles: true,
          detail: { change: ['name', name] },
        });
      } else if (this.dropdown.children.length !== 0) {
        name = this.dropdown.firstElementChild.textContent;
        this.input.value = name;
        this.dropdown.innerHTML = '';

        SearchInput.fireEvent({
          dispatcher: this.element,
          name: 'updateRequest',
          bubbles: true,
          detail: { change: ['name', name] },
        });
      } else {
        this.input.style.backgroundColor = CONFIGS.COLOR.WRONG;

        setTimeout(() => {
          this.input.style.backgroundColor = '';
        }, CONFIGS.DELAY.MID);
      }
    }
  }

  handleDropdownClick(event) {
    const name = event.target.textContent;

    this.dropdown.innerHTML = '';
    this.input.value = name;

    SearchInput.fireEvent({
      dispatcher: this.element,
      name: 'updateRequest',
      bubbles: true,
      detail: { change: ['name', name] },
    });
  }

  addSuggestions(value) {
    this.dropdown.innerHTML = '';
    const regex = new RegExp(`^${value}`, 'i');
    const filtered = this.names.filter((item) => regex.test(item));

    filtered.forEach((name) => {
      const suggestion = MyElement.createDOM({
        tagName: TAGS.P,
        className: CLASSES.INPUT_SUGGESTION,
        textContent: name,
      });

      this.dropdown.append(suggestion);
    });
  }
}

export default SearchInput;
