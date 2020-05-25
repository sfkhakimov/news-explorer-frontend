export default class Header {
  constructor(obj, api, authorization, newsCardList) {
    this.email = null;
    this.password = null;
    this.logged = false;
    this.input = obj.MOBILE_INPUT;
    this.navigation = obj.NAVIGATION_CONTAINER;
    this.navigationActive = obj.NAVIGATION_CONTAINER_ACTIVE;
    this.header = obj.HEADER;
    this.headerMobile = obj.HEADER_MOBILE;
    this.overlay = obj.OVERLAY;
    this.overlayActive = obj.OVERLAY_ACTIVE;
    this.headerButton = obj.HEADER_BUTTON;
    this.imageButton = obj.HEADER_BUTTON_IMAGE;
    this.headerArticle = obj.HEADER_ARTICLE;
    this.navItemDisplay = obj.NAV_ITEM_DISPLAY_NONE;
    this.api = api;
    this.newsCardList = newsCardList;
    this.authorization = authorization;
    this.mobileMenu = this.mobileMenu.bind(this);
    this.render = this.render.bind(this);
    this.rememberUser = this.rememberUser.bind(this);
    this.output = this.output.bind(this);
    this._setHndlers = this._setHndlers.bind(this);
  }

  render(name) {
    if (name !== undefined) {
      this.authorization.login = true;
      document.querySelector(`.${this.headerButton}`).textContent = name;
      document.querySelector(`.${this.headerButton}`)
        .append(document.querySelector(`#${this.imageButton}`)
          .content.cloneNode(true));
      document.querySelector(`#${this.headerArticle}`).classList.remove(this.navItemDisplay);
    } else {
      this.authorization.login = false;
      document.querySelector(`.${this.headerButton}`).textContent = 'Авторизоваться';
      document.querySelector(`#${this.headerArticle}`).classList.add(this.navItemDisplay);
      if (window.location.pathname !== '/index.html') {
        window.location.href = '../../index.html';
      }
    }
    this.newsCardList.redrawCard();
  }

  rememberUser(email, password) {
    this.email = email;
    this.password = password;
  }

  mobileMenu() {
    if (!document.querySelector(`.${this.navigation}`).classList.contains(this.navigationActive)) {
      document.querySelector(`.${this.navigation}`).classList.add(this.navigationActive);
      document.querySelector(`.${this.header}`).classList.add(this.headerMobile);
      document.querySelector(`.${this.overlay}`).classList.add(this.overlayActive);
    } else {
      document.querySelector(`.${this.navigation}`).classList.remove(this.navigationActive);
      document.querySelector(`.${this.header}`).classList.remove(this.headerMobile);
      document.querySelector(`.${this.overlay}`).classList.remove(this.overlayActive);
    }
  }

  output() {
    this.api.logout()
      .then((res) => {
        this.render();
      })
      .catch((err) => err);
  }

  _setHndlers() {
    document.querySelector(`.${this.input}`).addEventListener('click', this.mobileMenu);
  }
}
