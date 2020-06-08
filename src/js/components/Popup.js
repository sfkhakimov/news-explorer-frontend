export default class Popup {
  constructor(obj, authorization) {
    this.popupClose = obj.POPUP_CLOSE;
    this.replace = obj.POPUP_REPLACE;
    this.root = obj.ROOT;
    this.openedPopup = obj.POPUP;
    this.signInPopup = obj.SIGNIN_POPUP;
    this.signUpPopup = obj.SIGNUP_POPUP;
    this.resultPopup = obj.RESULT_POPUP;
    this.buttonSignUp = obj.BUTTON_SIGNUP;
    this.buttonSignIn = obj.BUTTON_SIGNIN;
    this.popupButton = obj.POPUP_BUTTON;
    this.popupForm = obj.POPUP_FORM;
    this.authorization = authorization;
    this.form = undefined;
    this.mainApi = undefined;
    this.header = undefined;
    this.open = this.open.bind(this);
    this.setContent = this.setContent.bind(this);
    this.close = this.close.bind(this);
    this.eventClose = this.eventClose.bind(this);
    this.change = this.change.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this._setHandlers = this._setHandlers.bind(this);
  }

  setContent(elem) {
    document.querySelector(`.${this.root}`)
      .append(document.querySelector(`#${elem}`)
        .content.cloneNode(true));
    this._setHandlers();
    this.form.setHandlers();
  }

  open() {
    this.setContent(this.signInPopup);
  }

  close() {
    document.querySelector(`.${this.openedPopup}`).remove();
  }

  eventClose() {
    if (event.key === 'Escape'
      || event.target.classList.contains(this.openedPopup)
      || event.target.classList.contains(this.popupClose)) {
      this.close();
    }
  }

  change() {
    this.close();
    if (event.target.id === this.buttonSignUp) {
      this.setContent(this.signUpPopup);
    } else {
      this.setContent(this.signInPopup);
    }
  }

  submitForm() {
    event.preventDefault();
    const form = document.querySelector(`.${this.popupForm}`);
    if (form.id === 'authorization') {
      this.mainApi.signin(form.elements.email.value, form.elements.password.value)
        .then((user) => {
          if (user.name === undefined) {
            throw user;
          }
          this.header.render(user.name);
          this.close();
        })
        .catch((err) => this.form.setServerError(err.message));
    } else if (form.id === 'registration') {
      this.mainApi.signup(form.elements.email.value,
        form.elements.password.value,
        form.elements.name.value)
        .then((user) => {
          if (user.name === undefined) {
            throw user;
          }
          this.close();
          this.setContent(this.resultPopup);
        })
        .catch((err) => this.form.setServerError(err.message));
    }
  }

  setDependence(dependence) {
    this.form = dependence.form;
    this.mainApi = dependence.mainApi;
    this.header = dependence.header;
  }

  _setHandlers() {
    document.querySelector(`.${this.openedPopup}`).addEventListener('click', this.eventClose);
    document.addEventListener('keydown', this.eventClose);
    document.querySelector(`.${this.replace}`).addEventListener('click', this.change);
    document.querySelector(`.${this.popupForm}`).addEventListener('submit', this.submitForm);
  }
}
