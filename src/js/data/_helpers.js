import { NUMBERS } from '../constants/index';

function cap(str) {
  return str[0].toUpperCase() + str.slice(1);
}

function val100k(val, pop) {
  return +(NUMBERS['100K'] * (val / pop)).toFixed(2);
}

function noSubZero(val) {
  return val < 0 ? 0 : val;
}

function toHist(obj, type, val, dailyVal, pop) {
  obj[`today${cap(type)}`].push(dailyVal);
  obj[`today${cap(type)}100k`].push(val100k(dailyVal, pop));
  obj[`all${cap(type)}`].push(val);
  obj[`all${cap(type)}100k`].push(val100k(val, pop));
}

function createTypeFields(type, isHistoric) {
  return {
    [`today${cap(type)}`]: isHistoric ? [] : 0,
    [`today${cap(type)}100k`]: isHistoric ? [] : 0,
    [`all${cap(type)}`]: isHistoric ? [] : 0,
    [`all${cap(type)}100k`]: isHistoric ? [] : 0,
  };
}

function createDataFields(isHistoric = false) {
  return {
    ...createTypeFields('cases', isHistoric),
    ...createTypeFields('deaths', isHistoric),
    ...createTypeFields('recovered', isHistoric),
  };
}

function createHistoricTemplate() {
  return {
    historic: {
      dates: [],
      ...createDataFields(true),
    },
  };
}

function createTemplate() {
  return {
    ...createDataFields(),
    ...createHistoricTemplate(true),
  };
}

export {
  createTemplate,
  createHistoricTemplate,
  cap,
  val100k,
  noSubZero,
  toHist,
};
