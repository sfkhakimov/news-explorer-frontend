export default class Popup {
  constructor(obj, form) {
    this.form = form;
    this.popupClose = obj.POPUP_CLOSE;
    this.replace = obj.POPUP_REPLACE;
    this.root = obj.ROOT;
    this.openedPopup = obj.POPUP;
    this.signInPopup = obj.SIGNIN_POPUP;
    this.signUpPopup = obj.SIGNUP_POPUP;
    this.resultPopup = obj.RESULT_POPUP;
    this.buttonSignUp = obj.BUTTON_SIGNUP;
    this.buttonSignIn = obj.BUTTON_SIGNIN;
    this.open = this.open.bind(this);
    this.setContent = this.setContent.bind(this);
    this.close = this.close.bind(this);
    this._setHandlers = this._setHandlers.bind(this);
    this.change = this.change.bind(this);
  }

  setContent(elem) {
    document.querySelector(`.${this.root}`)
      .append(document.querySelector(`#${elem}`)
        .content.cloneNode(true));
    this._setHandlers();
    this.form._setHandlers();
  }

  open() {
    this.setContent(this.signInPopup);
  }

  close() {
    document.querySelector(`.${this.openedPopup}`).remove();
    if (event.target.classList.contains(this.replace)) {
      this.change();
    }
  }

  change() {
    if (event.target.id === this.buttonSignUp) {
      this.setContent(this.signUpPopup);
    } else {
      this.setContent(this.signInPopup);
    }
  }

  _setHandlers() {
    document.querySelector(`.${this.popupClose}`).addEventListener('click', this.close);
    document.querySelector(`.${this.replace}`).addEventListener('click', this.close);
  }
}
