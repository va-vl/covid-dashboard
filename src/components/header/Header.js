import './Header.scss';
import { TAGS, CLASSES } from '../../js/constants/index';
import MyElement from '../_common/MyElement';

class Header extends MyElement {
  constructor({ blockClassName }) {
    super({ tagName: TAGS.HEADER, className: CLASSES.HEADER });
    this.addClasses(blockClassName);

    const wrapper = MyElement.createDOM({ className: CLASSES.HEADER_WRAPPER });
    const title = MyElement.createDOM({
      tagName: TAGS.H1,
      className: CLASSES.HEADER_TITLE,
      textContent: 'RSS COVID-19 Dashboard',
    });
    const dateWrapper = MyElement.createDOM();
    const dateText = MyElement.createDOM({
      tagName: TAGS.P,
      className: CLASSES.HEADER_INFO,
      textContent: 'Last updated: ',
    });

    this.date = MyElement.createDOM({
      tagName: TAGS.P,
      className: CLASSES.HEADER_INFO,
    });

    this.button = MyElement.createDOM({
      tagName: TAGS.BUTTON,
      className: `${CLASSES.HEADER_BUTTON} ${CLASSES.BUTTON}`,
      textContent: 'Save as JSON',
    });

    dateWrapper.append(dateText, this.date);
    wrapper.append(title, dateWrapper, this.button);
    this.element.append(wrapper);
  }

  update({ updateTimestamp }) {
    this.date.textContent = new Date(updateTimestamp).toUTCString();
  }
}

export default Header;
