import './ContentContainer.scss';
import { TAGS, CLASSES } from '../../../js/constants/index';
import MyElement from '../MyElement';

export default class ContentContainer extends MyElement {
  constructor({ className }) {
    super({ tagName: TAGS.SECTION, className: CLASSES.CONTENT_CONTAINER });
    this.addClasses(className);

    const buttonFullscreen = MyElement.createDOM({
      tagName: TAGS.BUTTON,
      className: CLASSES.CONTENT_CONTAINER_FULLSCREEN_BUTTON,
    });

    this.element.append(buttonFullscreen);

    buttonFullscreen.addEventListener('click', () => {
      if (
        !this.element.classList.contains(CLASSES.CONTENT_CONTAINER_FULLSCREEN)
      ) {
        this.element.requestFullscreen({ navigationUI: 'auto' });
        this.element.classList.add(CLASSES.CONTENT_CONTAINER_FULLSCREEN);
      } else {
        this.element.classList.remove(CLASSES.CONTENT_CONTAINER_FULLSCREEN);

        if (document.exitFullscreen) {
          document.exitFullscreen();
        }
      }

      ContentContainer.fireEvent({
        dispatcher: buttonFullscreen,
        name: 'fullscreenSet',
        bubbles: true,
      });
    });
  }
}
