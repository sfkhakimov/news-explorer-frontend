export default class Popup {
  constructor(obj, form, header, mainApi) {
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
    this.form = form;
    this.header = header;
    this.mainApi = mainApi;
    this.open = this.open.bind(this);
    this.setContent = this.setContent.bind(this);
    this.close = this.close.bind(this);
    this.change = this.change.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this._setHandlers = this._setHandlers.bind(this);
  }

  setContent(elem) {
    document.querySelector(`.${this.root}`)
      .append(document.querySelector(`#${elem}`)
        .content.cloneNode(true));
    this._setHandlers();
    this.form._setHandlers();
  }

  open() {
    if (this.header.logged === false) {
      this.setContent(this.signInPopup);
    } else {
      this.header.output();
    }
  }

  close() {
    document.querySelector(`.${this.openedPopup}`).remove();
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
    const form = document.querySelector(`.${this.form.popupForm}`);
    if (form.id === 'authorization') {
      this.mainApi.signin(form.elements.email.value, form.elements.password.value)
        .then((user) => {
          this.header.render(user.name);
          this.close();
        })
        .catch((err) => {
          this.form.setServerError(err);
        });
    } else if (form.id === 'registration') {
      this.mainApi.signup(form.elements.email.value, form.elements.password.value, form.elements.name.value)
        .then((res) => {
          this.header.rememberUser(form.elements.email.value, form.elements.password.value);
          this.close();
          this.setContent(this.resultPopup);
        })
        .catch((err) => {
          this.form.setServerError(err);
        });
    }
  }

  _setHandlers() {
    document.querySelector(`.${this.popupClose}`).addEventListener('click', this.close);
    document.querySelector(`.${this.replace}`).addEventListener('click', this.change);
    document.querySelector(`.${this.form.popupForm}`).addEventListener('submit', this.submitForm);
  }
}
