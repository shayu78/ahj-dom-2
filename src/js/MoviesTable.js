export default class MoviesTable {
  constructor(columns) {
    this.columns = columns;
    this.theadElement = null;
    this.tableElement = null;
    this.trElements = [];
  }

  create(jsonData) {
    this.tableElement = document.createElement('table');
    this.theadElement = this.tableElement.createTHead();
    this.columns.forEach((value) => {
      const tdElement = document.createElement('td');
      const textElement = document.createTextNode(value);
      tdElement.append(textElement);
      this.theadElement.append(tdElement);
    });

    this.generateBody(jsonData);

    const bodyElement = document.querySelector('body');
    bodyElement.insertAdjacentElement('afterbegin', this.tableElement);
  }

  generateBody(jsonData) {
    const columnKeys = Object.keys([...jsonData][0]);
    const fragment = new DocumentFragment();
    [...jsonData].forEach((value) => {
      const trElement = this.tableElement.insertRow(-1);
      trElement.dataset.id = value.id;
      trElement.dataset.title = value.title;
      trElement.dataset.year = value.year;
      trElement.dataset.imdb = value.imdb.toFixed(2);

      const tdIdElement = document.createElement('td');
      const tdTitleElement = document.createElement('td');
      const tdYearElement = document.createElement('td');
      const tdImdbElement = document.createElement('td');

      for (const key in columnKeys) {
        if (Object.prototype.hasOwnProperty.call(columnKeys, key)) {
          const element = columnKeys[key];
          switch (element) {
            case 'id': {
              const textElement = document.createTextNode(value[element]);
              tdIdElement.append(textElement);
              break;
            }
            case 'title': {
              const textElement = document.createTextNode(value[element]);
              tdTitleElement.append(textElement);
              break;
            }
            case 'year': {
              const textElement = document.createTextNode(value[element]);
              tdYearElement.append(textElement);
              break;
            }
            case 'imdb': {
              const textElement = document.createTextNode(value[element].toFixed(2));
              tdImdbElement.append(textElement);
              break;
            }
            default:
              break;
          }
        }
      }
      trElement.append(tdIdElement, tdTitleElement, tdYearElement, tdImdbElement);
      // this.trElements.push(trElement);
      fragment.append(trElement);
    });
    this.tableElement.tBodies[0].append(fragment);
  }

  sort(sortField, reverse = false) {
    const trElementsNodeList = document.querySelectorAll('tr');
    this.trElements = [...trElementsNodeList];
    document.querySelectorAll('.asc-arrow, .desc-arrow')
      .forEach((value) => value.classList.remove('asc-arrow', 'desc-arrow'));
    switch (sortField) {
      case 'id': {
        this.trElements.sort((a, b) => {
          const aInt = parseInt(a.dataset.id, 10);
          const bInt = parseInt(b.dataset.id, 10);
          if (aInt < bInt) return -1;
          if (aInt > bInt) return 1;
          return 0;
        });
        break;
      }
      case 'year': {
        this.trElements.sort((a, b) => {
          const aInt = parseInt(a.dataset.year, 10);
          const bInt = parseInt(b.dataset.year, 10);
          if (aInt < bInt) return -1;
          if (aInt > bInt) return 1;
          return 0;
        });
        break;
      }
      case 'imdb': {
        this.trElements.sort((a, b) => {
          const aFloat = parseFloat(a.dataset.imdb, 10);
          const bFloat = parseFloat(b.dataset.imdb, 10);
          if (aFloat < bFloat) return -1;
          if (aFloat > bFloat) return 1;
          return 0;
        });
        break;
      }
      case 'title': {
        this.trElements.sort((a, b) => {
          const aString = a.dataset.title.toLowerCase().replace('ё', `е${String.fromCharCode(1500)}`);
          const bString = b.dataset.title.toLowerCase().replace('ё', `е${String.fromCharCode(1500)}`);
          if (aString < bString) return -1;
          if (aString > bString) return 1;
          return 0;
        });
        break;
      }
      default:
        return;
    }
    const tHeadChildren = this.theadElement.children;
    if (reverse) {
      this.trElements.reverse();
      tHeadChildren[this.columns.indexOf(sortField)].classList.add('desc-arrow');
    } else tHeadChildren[this.columns.indexOf(sortField)].classList.add('asc-arrow');

    // trElementsNodeList.forEach((value) => value.remove());
    // const fragment = new DocumentFragment();
    // this.trElements.forEach((value) => fragment.append(value));
    // this.tableElement.tBodies[0].append(fragment);

    // реализация Advanced к заданию
    for (let i = this.trElements.length - 1; i >= 0; i -= 1) {
      const result = [...trElementsNodeList].findIndex((value) => this.trElements[i] === value);
      this.tableElement.tBodies[0].insertAdjacentElement('afterbegin', trElementsNodeList[result]);
    }
  }
}
