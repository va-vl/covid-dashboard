import './Loader.scss';
import { TAGS, CLASSES } from '../../js/constants/index';
import Element from '../_common/Element';
import Button from '../_common/Button';

class Loader extends Element {
  constructor() {
    super({ className: CLASSES.LOADER });

    const wrapper = Element.createDOM({ className: CLASSES.LOADER_WRAPPER });
    const headingWrapper = Element.createDOM({
      className: CLASSES.LOADER_HEADING_WRAPPER,
    });

    this.heading = Element.createDOM({
      tagName: TAGS.H2,
      textContent: 'Loading',
    });
    const headingSpinner = Element.createDOM({
      className: CLASSES.LOADER_SPINNER,
    });
    this.buttonClose = Button.createDOM({
      className: `${CLASSES.BUTTON} ${CLASSES.LOADER_BUTTON}`,
      textContent: 'Open App',
    });

    headingWrapper.append(this.heading, headingSpinner, this.buttonClose);
    wrapper.append(headingWrapper);
    wrapper.insertAdjacentHTML('beforeend', greeting);
    this.element.append(wrapper);

    this.buttonClose.addEventListener('click', () => {
      this.element.remove();
    });
  }

  setLoaded() {
    this.heading.textContent = 'Loading done!';
    this.element.classList.add(CLASSES.LOADER_LOADED);
  }
}

export default Loader;
