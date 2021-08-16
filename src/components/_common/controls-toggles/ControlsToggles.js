import './ControlsToggles.scss';
import { STRINGS, CLASSES } from '../../../js/constants/index';
import MyElement from '../MyElement';
import ControlsContainer from '../ControlsContainer';

const {
  PERIOD: { ALL, TODAY },
  AMOUNT: { ABS, PER100K },
  DATA_STATE_ATTR: { PERIOD, AMOUNT },
} = STRINGS;

export default class ControlsToggles extends MyElement {
  constructor({ hostClassName }) {
    super({
      className: `${CLASSES.TOGGLES} ${hostClassName}__${CLASSES.TOGGLES_CONTAINER}`,
    });

    this.togglePeriod = new ControlsContainer({
      className: `${CLASSES.TOGGLES_WRAPPER} ${hostClassName}__${CLASSES.TOGGLES}`,
      buttonParams: [
        {
          className: CLASSES.TOGGLES_TOGGLE,
          textContent: 'Total',
          attrs: [[PERIOD, ALL]],
        },
        {
          className: CLASSES.TOGGLES_TOGGLE,
          textContent: hostClassName === 'graph' ? 'Daily' : 'Last day',
          attrs: [[PERIOD, TODAY]],
        },
      ],
    });

    this.toggleAmount = new ControlsContainer({
      className: `${CLASSES.TOGGLES_WRAPPER} ${hostClassName}__${CLASSES.TOGGLES}`,
      buttonParams: [
        {
          className: CLASSES.TOGGLES_TOGGLE,
          textContent: 'Abs',
          attrs: [[AMOUNT, ABS]],
        },
        {
          className: CLASSES.TOGGLES_TOGGLE,
          textContent: 'Per 100k',
          attrs: [[AMOUNT, PER100K]],
        },
      ],
    });

    this.toggles = [this.togglePeriod, this.toggleAmount];

    this.element.append(this.togglePeriod.element, this.toggleAmount.element);
  }

  update(state) {
    this.toggles.forEach((toggle) => toggle.update(state));
  }
}
