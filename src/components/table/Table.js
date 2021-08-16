import './Table.scss';
import { capitalizeFirstLetter } from '../../js/helpers/index';
import { TAGS, CLASSES, STRINGS, CONFIGS } from '../../js/constants/index';
import MyElement from '../_common/MyElement';
import ContentContainer from '../_common/content-container/ContentContainer';
import ControlsToggles from '../_common/controls-toggles/ControlsToggles';

const statusArr = Object.values(STRINGS.STATUS);

class Table extends ContentContainer {
  constructor({ blockClassName }) {
    super({ className: CLASSES.TABLE });
    this.addClasses(blockClassName);

    const table = MyElement.createDOM({
      tagName: TAGS.UL,
      className: CLASSES.TABLE_BLOCK,
    });

    this.values = Table.createTableRows(statusArr, table);

    this.title = MyElement.createDOM({
      tagName: TAGS.H2,
      className: CLASSES.TABLE_TITLE,
    });
    this.toggles = new ControlsToggles({ hostClassName: CLASSES.TABLE });

    this.element.append(this.title, table, this.toggles.element);
  }

  update({ data, state, change }) {
    this.toggles.update(state);

    if (change && change[0] === 'status') {
      return;
    }

    const { name, period, amount } = state;
    const src = data.find((obj) => obj.name === name);
    this.title.textContent = name;

    statusArr.forEach((status) => {
      const key =
        period +
        capitalizeFirstLetter(status) +
        (amount === 'abs' ? '' : '100k');
      this.values[status].textContent = src[key].toLocaleString(CONFIGS.LOCALE);
    });
  }

  static createTableRows(arr, parent) {
    const result = arr.reduce((acc, status) => {
      const row = MyElement.createDOM({
        tagName: TAGS.LI,
        className: CLASSES.TABLE_ROW,
        textContent: capitalizeFirstLetter(status),
      });
      const value = MyElement.createDOM({ tagName: TAGS.P });

      row.append(value);
      parent.append(row);
      acc[status] = value;
      return acc;
    }, {});

    return result;
  }
}

export default Table;
