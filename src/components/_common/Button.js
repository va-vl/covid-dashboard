import { TAGS } from '../../js/constants/index';
import MyElement from './MyElement';

export default class Button extends MyElement {
  constructor({ className, textContent, attrs } = {}) {
    super({
      tagName: TAGS.BUTTON,
      className,
      textContent,
      attrs,
    });

    this.addClasses(className);
  }
}
