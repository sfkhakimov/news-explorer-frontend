export default class NewsCardList {
  constructor(obj, createCard) {
    this.articles = [];
    this.counter = 0;
    this.addedArticles = [];
    this.result = obj.RESULT;
    this.resultActive = obj.RESULT_ACTIVE;
    this.resultButton = obj.RESULT_BUTTON;
    this.resultButtonActive = obj.RESULT_BUTTON_ACTIVE;
    this.resultCard = obj.RESULT_CARDS;
    this.loading = obj.LOADING;
    this.loadingActive = obj.LOADING_ACTIVE;
    this.searchFailed = obj.SEARCH_FAILED;
    this.searchFailedActive = obj.SEARCH_FAILED_ACTIVE;
    this.createCard = createCard;
    this.key = undefined;
    this.isLogged = undefined;
    this.download = this.download.bind(this);
    this.uploaded = this.uploaded.bind(this);
    this.renderResult = this.renderResult.bind(this);
    this.addCard = this.addCard.bind(this);
    this.buttonHide = this.buttonHide.bind(this);
    this.removeResult = this.removeResult.bind(this);
    this.buttonShow = this.buttonShow.bind(this);
    this.redrawCard = this.redrawCard.bind(this);
    this.searchErrorSetting = this.searchErrorSetting.bind(this);
    this.searchErrorRemove = this.searchErrorRemove.bind(this);
  }

  renderResult(elem) {
    document.querySelector(`.${this.result}`).classList.add(this.resultActive);
    document.querySelector(`.${this.resultCard}`).appendChild(elem);
  }

  removeResult() {
    const resultContainer = document.querySelector(`.${this.resultCard}`);
    while (resultContainer.firstChild) {
      resultContainer.removeChild(resultContainer.firstChild);
    }
  }

  addCard() {
    this.counter += 3;
    this.articles.forEach((elem, index) => {
      if (index < this.counter) {
        if (!this.addedArticles.includes(elem)) {
          const aticle = this.createCard();
          this.renderResult(aticle.card(elem));
          aticle.keyWord = this.key;
          this.addedArticles.push(elem);
        }
      }
    });
    if (this.articles.length === this.addedArticles.length) {
      this.buttonHide();
    }
  }

  redrawCard() {
    this.removeResult();
    this.addedArticles.forEach((elem) => {
      const aticle = this.createCard();
      this.renderResult(aticle.card(elem));
      aticle.keyWord = this.key;
    });
  }

  buttonHide() {
    document.querySelector(`.${this.resultButton}`).classList.remove(this.resultButtonActive);
  }

  buttonShow() {
    document.querySelector(`.${this.resultButton}`).classList.add(this.resultButtonActive);
  }

  download() {
    document.querySelector(`.${this.loading}`).classList.add(this.loadingActive);
  }

  uploaded() {
    document.querySelector(`.${this.loading}`).classList.remove(this.loadingActive);
  }

  searchErrorSetting() {
    document.querySelector(`.${this.searchFailed}`).classList.add(this.searchFailedActive);
  }

  searchErrorRemove() {
    document.querySelector(`.${this.searchFailed}`).classList.remove(this.searchFailedActive);
  }

  _setHandlers() {
    document.querySelector(`.${this.resultButton}`).addEventListener('click', this.addCard);
  }
}
