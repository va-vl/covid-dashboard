import HTML_TAGS from '../../js/constants/_htmlTags';

class Element {
  /**
   * @param {Object} params - an object with instance params
   * @param {String} params.tagName - name of created HTML Element
   * @param {String} params.className - a space-delimited string of CSS classes
   * @param {Array<Array<String>>} params.textContent - an array of ["attr", "value"] pairs
   */
  constructor({
    tagName = HTML_TAGS.DIV,
    className = null,
    textContent = null,
    attrs = null,
  } = {}) {
    this.element = document.createElement(tagName);
    this.addClasses(className);
    this.addAttrs(attrs);

    if (textContent) {
      this.element.textContent = textContent;
    }
  }

  addClasses(str) {
    if (str) {
      this.element.classList.add(...str.split(' '));
    }
  }

  addAttrs(arr) {
    if (arr) {
      arr.forEach(([attr, val]) => {
        this.element.setAttribute(attr, val ?? '');
      });
    }
  }

  /**
   * @param {Object} params - an object with instance params
   * @param {String} params.tagName - name of created HTML Element
   * @param {String} params.className - a space-delimited string of CSS classes
   * @param {Array<Array<String>>} params.textContent - an array of ["attr", "value"] pairs
   */
  static createDOM(params) {
    return new this(params).element;
  }
}

export default Element;