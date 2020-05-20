import Popup from './Popup';

export default class SignInPopup extends Popup {
  constructor(headerButton, signInPopup, buttonSignIn, popup) {
    super(popup.popupClose, popup.replace, popup.root, popup.openedPopup);
    this.headerButton = headerButton;
    this.signInPopup = signInPopup;
    this.buttonSignIn = buttonSignIn;
  }

  open() {
    super.open(this.signInPopup);
    this._setHandlers();
  }

  close() {
    super.close();
  }

  _setHandlers() {
    document.querySelector(`.${this.popupClose}`).addEventListener('click', this.close);
    document.querySelector(`.${this.replace}`).addEventListener('click', this.close);
  }
}
