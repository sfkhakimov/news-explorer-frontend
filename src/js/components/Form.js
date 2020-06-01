export default class Form {
  constructor(obj) {
    this.errorType = obj.ERROR_TYPE;
    this.errorLength = obj.ERROR_LENGTH;
    this.errorServer = obj.ERROR_SERVER;
    this.errorKeywords = obj.ERROR_KEYWORD;
    this.errorRequired = obj.ERROR_REQUIRED;
    this.popupForm = obj.POPUP_FORM;
    this.popupButton = obj.POPUP_BUTTON;
    this.buttonActive = obj.BUTTON_ACTIVE;
    this.regexp = obj.REGEXP;
    this.setHandlers = this.setHandlers.bind(this);
    this._validateForm = this._validateForm.bind(this);
    this.setServerError = this.setServerError.bind(this);
    this._validateInputElement = this._validateInputElement.bind(this);
  }

  setServerError(error) {
    document.querySelector(`.${this.errorServer}`).textContent = error;
  }

  _validateInputElement() {
    if (event.target.validity.valueMissing) {
      document.querySelector(`#error-${event.target.id}`).textContent = this.errorRequired;
    } else if (event.target.validity.tooShort || event.target.validity.tooLong) {
      document.querySelector(`#error-${event.target.id}`).textContent = this.errorLength;
    } else if (event.target.type === 'email' && !this.regexp.exec(event.target.value)) {
      document.querySelector(`#error-${event.target.id}`).textContent = `${this.errorType} ${event.target.type}`;
    } else {
      document.querySelector(`#error-${event.target.id}`).textContent = '';
    }
    this._validateForm();
  }

  _validateForm() {
    const isValidForm = Array.from(document.querySelector(`.${this.popupForm}`).elements).every((elem) => elem.checkValidity());

    if (isValidForm) {
      document.querySelector(`.${this.popupButton}`).classList.add(this.buttonActive);
      document.querySelector(`.${this.popupButton}`).removeAttribute('disabled', true);
    } else {
      document.querySelector(`.${this.popupButton}`).classList.remove(this.buttonActive);
      document.querySelector(`.${this.popupButton}`).setAttribute('disabled', true);
    }
  }

  setHandlers() {
    document.querySelector(`.${this.popupForm}`).addEventListener('input', this._validateInputElement);
  }
}
