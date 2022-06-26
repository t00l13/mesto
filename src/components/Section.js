// КЛАСС КОТОРЫЙ ОТРИСОВЫВАЕТ ЭЛЕМЕНТЫ НА СТРАНИЦЕ

export default class Section {
  constructor(items, render), containerSelector {
    this._itemsArray = items;//массив данных
    this._render = render;//функция которая рендерит данные
    this._container = document.querySelector(containerSelector);
  }
}

//рендер элементов на странице
renderItems() {
  this._itemsArray.forEach (item => this._render(item));
}

//это метод который принимает элемент и закидывает в начало контейнера
addItem(element) {
  this._container.prepend(element);
}
