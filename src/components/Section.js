// КЛАСС КОТОРЫЙ ОТРИСОВЫВАЕТ ЭЛЕМЕНТЫ НА СТРАНИЦЕ

export default class Section {
  constructor({ render}, containerSelector) {
    this._render = render;//функция которая рендерит данные
    this._container = document.querySelector(containerSelector);
  }

  //рендер элементов на странице
  renderItems(arr, id) {
    arr.forEach((item) => this._render(item,id));
  }

  //это метод который принимает элемент и закидывает в начало контейнера
  addItem(element) {
    this._container.append(element);
  }
  addItemPrepend(element) {
    this._container.prepend(element);
  }

}
