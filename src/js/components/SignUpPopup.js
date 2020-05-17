import Popup from './Popup';

export default class SignUpPopup extends Popup {
  constructor(signUpPopup, buttonSignUp, popup) {
    super(popup.close, popup.replace, popup.root, popup.openedPopup, popup.popupIsOpened);
    this.signUpPopup = signUpPopup;
    this.buttonSignUp = buttonSignUp;
  }

  open() {
    super._open(this.signUpPopup);
  }

  _handler() {
    document.querySelector(`#${this.buttonSignUp}`).addEventListener('click', this.open.bind(this));
  }
}
