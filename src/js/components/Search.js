export default class Search {
  constructor(SEARCH_FORM) {
    this.searchForm = SEARCH_FORM;
    this.mainApi = undefined;
    this.newsCardList = undefined;
    this.searchNews = this.searchNews.bind(this);
    this.setHandlers = this.setHandlers.bind(this);
  }

  searchNews() {
    event.preventDefault();
    this.newsCardList.searchErrorRemove();
    this.newsCardList.download();
    const form = document.querySelector(`.${this.searchForm}`);
    this.mainApi.getNews(form.elements.search.value)
      .then((res) => {
        if (res.articles.length === 0) {
          Promise.reject(res);
        }
        this.newsCardList.counter = 0;
        this.newsCardList.articles = res.articles;
        this.newsCardList.addedArticles = [];
        this.newsCardList.key = form.elements.search.value;
        this.newsCardList.removeResult();
        this.newsCardList.buttonShow();
        this.newsCardList.uploaded();
        this.newsCardList.addCard();
      })
      .catch((err) => {
        console.log(err.message)
        this.newsCardList.uploaded();
        this.newsCardList.searchErrorSetting();
      });
  }

  setDependence(dependence) {
    this.mainApi = dependence.mainApi;
    this.newsCardList = dependence.newsCardList;
  }

  setHandlers() {
    document.querySelector(`.${this.searchForm}`).addEventListener('submit', this.searchNews);
  }
}
