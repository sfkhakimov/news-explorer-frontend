export default class Search {
  constructor(obj, newsApi) {
    this.searchForm = obj.SEARCH_FORM;
    this.loading = obj.LOADING;
    this.loadingActive = obj.LOADING_ACTIVE;
    this.searchFailed = obj.SEARCH_FAILED;
    this.searchFailedActive = obj.SEARCH_FAILED_ACTIVE;
    this.newsApi = newsApi;
    this.searchNews = this.searchNews.bind(this);
    this.download = this.download.bind(this);
    this.uploaded = this.uploaded.bind(this);
    this.searchErrorSetting = this.searchErrorSetting.bind(this);
    this.searchErrorRemove = this.searchErrorRemove.bind(this);
    this._setHandlers = this._setHandlers.bind(this);
  }

  searchNews() {
    event.preventDefault();
    if (document.querySelector(`.${this.searchFailed}`).classList.contains(this.searchFailedActive)) {
      this.searchErrorRemove();
    }
    this.download();
    const form = document.querySelector(`.${this.searchForm}`);
    this.newsApi.getNews(form.elements.search.value)
      .then((res) => {
        if (res.articles.length === 0) {
          throw res;
        }
        this.uploaded();
        console.log(res);
      })
      .catch((err) => {
        this.uploaded();
        this.searchErrorSetting();
      });
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
    document.querySelector(`.${this.searchForm}`).addEventListener('submit', this.searchNews);
  }
}
