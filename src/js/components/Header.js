export default class Header {
  constructor(obj, authorization) {
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
    this.headerNameProject = obj.HEADER_NAME_PROJECT;
    this.headerNameProjectMobile = obj.HEADER_NAME_PROJECT_MOBILE;
    this.authorization = authorization;
    this.newsCardList = undefined;
    this.popup = undefined;
    this.mainApi = undefined;
    this.mobileMenu = this.mobileMenu.bind(this);
    this.render = this.render.bind(this);
    this.setDependence = this.setDependence.bind(this);
    this.openAndOutput = this.openAndOutput.bind(this);
    this.setHndlers = this.setHndlers.bind(this);
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

  mobileMenu() {
    if (!document.querySelector(`.${this.navigation}`).classList.contains(this.navigationActive)) {
      document.querySelector(`.${this.navigation}`).classList.add(this.navigationActive);
      document.querySelector(`.${this.header}`).classList.add(this.headerMobile);
      document.querySelector(`.${this.headerNameProject}`).classList.add(this.headerNameProjectMobile);
      document.querySelector(`.${this.overlay}`).classList.add(this.overlayActive);
    } else {
      document.querySelector(`.${this.navigation}`).classList.remove(this.navigationActive);
      document.querySelector(`.${this.header}`).classList.remove(this.headerMobile);
      document.querySelector(`.${this.overlay}`).classList.remove(this.overlayActive);
      document.querySelector(`.${this.headerNameProject}`).classList.remove(this.headerNameProjectMobile);
    }
  }

  openAndOutput() {
    if (this.authorization.login === true) {
      this.mainApi.logout()
        .then((res) => {
          if (res.message === 'Необходима авторизация') {
            Promise.reject(res);
          }
          return this.render();
        })
        .catch((err) => alert(err.message));
    } else {
      this.popup.open();
    }
  }

  setDependence(dependence) {
    this.newsCardList = dependence.newsCardList;
    this.popup = dependence.popup;
    this.mainApi = dependence.mainApi;
  }

  setHndlers() {
    document.querySelector(`.${this.headerButton}`).addEventListener('click', this.openAndOutput);
    document.querySelector(`.${this.input}`).addEventListener('click', this.mobileMenu);
  }
}
