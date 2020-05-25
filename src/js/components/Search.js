export default class Search {
  constructor(SEARCH_FORM, newsApi, newsCardList) {
    this.searchForm = SEARCH_FORM;
    this.newsApi = newsApi;
    this.newsCardList = newsCardList;
    this.searchNews = this.searchNews.bind(this);
    this.setHandlers = this.setHandlers.bind(this);
  }

  searchNews() {
    event.preventDefault();
    this.newsCardList.searchErrorRemove();
    this.newsCardList.download();
    const form = document.querySelector(`.${this.searchForm}`);
    this.newsApi.getNews(form.elements.search.value)
      .then((res) => {
        if (res.articles.length === 0) {
          throw res;
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
        this.newsCardList.uploaded();
        this.newsCardList.searchErrorSetting();
      });
  }

  setHandlers() {
    document.querySelector(`.${this.searchForm}`).addEventListener('submit', this.searchNews);
  }
}
