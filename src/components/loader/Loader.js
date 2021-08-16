import './Loader.scss';
import { TAGS, CLASSES } from '../../js/constants/index';
import MyElement from '../_common/MyElement';

class Loader extends MyElement {
  constructor() {
    super({ className: CLASSES.LOADER });

    const headingWrapper = MyElement.createDOM({
      className: CLASSES.LOADER_HEADING_WRAPPER,
    });

    this.heading = MyElement.createDOM({
      tagName: TAGS.H2,
      textContent: 'Loading',
      className: CLASSES.LOADER_HEADING,
    });

    const headingSpinner = MyElement.createDOM({
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
