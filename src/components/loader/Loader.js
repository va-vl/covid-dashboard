import './Loader.scss';
import { TAGS, CLASSES } from '../../js/constants/index';
import Element from '../_common/Element';

class Loader extends Element {
  constructor() {
    super({ className: CLASSES.LOADER });

    const headingWrapper = Element.createDOM({
      className: CLASSES.LOADER_HEADING_WRAPPER,
    });

    this.heading = Element.createDOM({
      tagName: TAGS.H2,
      textContent: 'Loading',
      className: CLASSES.LOADER_HEADING,
    });

    const headingSpinner = Element.createDOM({
      className: CLASSES.LOADER_SPINNER,
    });

    headingWrapper.append(this.heading, headingSpinner);
    this.element.append(headingWrapper);
  }

  setLoaded() {
    this.element.remove();
  }
}

export default Loader;
