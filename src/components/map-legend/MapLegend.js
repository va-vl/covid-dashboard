import './MapLegend.scss';
import { radius, formatNumber } from '../../js/helpers/index';
import { TAGS, CLASSES, STRINGS, CONFIGS } from '../../js/constants/index';
import MyElement from '../_common/MyElement';

class MapLegend extends MyElement {
  constructor({ className, minArea, maxArea }) {
    super({ className: CLASSES.LEGEND });
    this.addClasses(className);

    const maxDiameter = 2 * radius.fromArea(maxArea);
    const containerSide = formatNumber.toPixelString(maxDiameter);

    const areas = [maxArea, (maxArea - minArea) / 2, minArea];
    const { rows, rowTitles } = areas.reduce(
      (acc, area) => {
        const [row, title] = MapLegend.createRow(area, containerSide);
        acc.rows.push(row);
        acc.rowTitles.push(title);

        return acc;
      },
      { rows: [], rowTitles: [] }
    );

    this.title = MyElement.createDOM({
      tagName: TAGS.H3,
      className: CLASSES.LEGEND_TITLE,
    });
    this.rowTitles = rowTitles;

    this.element.append(this.title, ...rows);
  }

  update({ minVal, maxVal, state }) {
    const values = [maxVal, (maxVal - minVal) / 2, minVal];
    values.forEach((value, index) => {
      this.rowTitles[index].textContent = MapLegend.formatLegendAmount(
        value,
        state.amount
      );
    });

    this.element.dataset.status = state.status;
    this.title.textContent = state.getDescription();
  }

  static createRow(area, containerSide) {
    const currentDiameter = 2 * radius.fromArea(area);
    const side = formatNumber.toPixelString(currentDiameter);

    const row = MyElement.createDOM({ className: CLASSES.LEGEND_ROW });
    const circleContainer = MyElement.createDOM({
      className: CLASSES.LEGEND_CIRCLE_CONTAINER,
      attrs: [['style', `width: ${containerSide}; height: ${containerSide}`]],
    });

    const circle = MyElement.createDOM({
      className: CLASSES.LEGEND_CIRCLE,
      attrs: [['style', `width: ${side}; height: ${side}`]],
    });
    const title = MyElement.createDOM({ tagName: TAGS.P });

    circleContainer.append(circle);
    row.append(circleContainer, title);
    return [row, title];
  }

  static formatLegendAmount(val, amount) {
    switch (amount) {
      case STRINGS.AMOUNT.PER100K:
        return formatNumber.toNamelessString(val);
      default:
        return parseInt(val, 10).toLocaleString(CONFIGS.LOCALE);
    }
  }
}

export default MapLegend;
