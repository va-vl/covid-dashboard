import './ControlsToggles.scss';
import { STRINGS, CLASSES } from '../../../js/constants/index';
import Element from '../Element';
import ControlsContainer from '../ControlsContainer';

const {
  PERIOD: {
    ALL,
    TODAY,
  },

  AMOUNT: {
    ABS,
    PER100K,
  },

  DATA_STATE_ATTR: {
    PERIOD,
    AMOUNT,
  },
} = STRINGS;

class ControlsToggles extends Element {
  constructor({ hostClassName }) {
    super({ className: `${CLASSES.TOGGLES} ${hostClassName}__${CLASSES['TOGGLES-WRAPPER']}` });

    this.togglePeriod = new ControlsContainer({
      className: `${CLASSES.TOGGLES__WRAPPER} ${hostClassName}__${CLASSES.TOGGLES}`,
      buttonParams: [
        {
          className: CLASSES.TOGGLES__TOGGLE,
          textContent: 'Total',
          attrs: [
            [PERIOD, ALL],
          ],
        },
        {
          className: CLASSES.TOGGLES__TOGGLE,
          textContent: hostClassName === 'graph' ? 'Daily' : 'Last day',
          attrs: [
            [PERIOD, TODAY],
          ],
        },
      ],
    });

    this.toggleAmount = new ControlsContainer({
      className: `${CLASSES.TOGGLES__WRAPPER} ${hostClassName}__${CLASSES.TOGGLES}`,
      buttonParams: [
        {
          className: CLASSES.TOGGLES__TOGGLE,
          textContent: 'Abs',
          attrs: [
            [AMOUNT, ABS],
          ],
        },
        {
          className: CLASSES.TOGGLES__TOGGLE,
          textContent: 'Per 100k',
          attrs: [
            [AMOUNT, PER100K],
          ],
        },
      ],
    });

    this.toggles = [
      this.togglePeriod,
      this.toggleAmount,
    ];

    this.element.append(
      this.togglePeriod.element,
      this.toggleAmount.element,
    );
  }

  update(state) {
    this.toggles.forEach((toggle) => toggle.update(state));
  }
}

export default ControlsToggles;
