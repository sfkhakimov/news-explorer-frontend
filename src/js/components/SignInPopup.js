import Popup from './Popup';

export default class SignInPopup extends Popup {
  constructor(headerButton, signInPopup, buttonSignIn, popup) {
    super(popup.popupClose, popup.replace, popup.root, popup.openedPopup, popup.popupIsOpened);
    this.headerButton = headerButton;
    this.signInPopup = signInPopup;
    this.buttonSignIn = buttonSignIn;
  }

  open() {
    super.open(this.signInPopup);
  }

  _handler() {
    document.querySelector(`.${this.headerButton}`).addEventListener('click', this.open.bind(this));
    document.querySelector(`#${this.buttonSignIn}`).addEventListener('click', this.open.bind(this));
  }
}
