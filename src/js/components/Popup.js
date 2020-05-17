export default class Popup {
  constructor(popupClose, replace, root, openedPopup, popupIsOpened) {
    this.popupClose = popupClose;
    this.replace = replace;
    this.root = root;
    this.openedPopup = openedPopup;
    this.popupIsOpened = popupIsOpened;
    this._close = this.close.bind(this);
    this._open = this.open.bind(this);
    this._setHandler = this.setHandler.bind(this);
    this._removeHandler = this.removeHandler.bind(this);
  }

  open(elem) {
    document.querySelector(`#${elem}`).classList.add(this.popupIsOpened);
    //this._setHandler();
  }

  close() {
    if (event.target.classList.contains(this.popupClose) || event.target.classList.contains(this.replace)) {
      //this._removeHandler();
      document.querySelector(`.${this.popupIsOpened}`)
        .classList.remove(this.popupIsOpened);
    }
  }

  setHandler() {
    document.querySelector(`.${this.popupIsOpened}`)
      .addEventListener('click', this._close);
  }

  removeHandler() {
    document.querySelector(`.${this.popupIsOpened}`)
      .removeEventListener('click', this._close);
  }
}
