export default class NewsApi {
  constructor(obj, date) {
    this.url = obj.NEWS_URL;
    this.apiKey = obj.API_KEY;
    this.sort = obj.SORT;
    this.pageSize = obj.PAGE_SIZE;
    this.from = date().previousDate;
    this.to = date().currentDate;
  }

  getNews(key) {
    return fetch((`${this.url}?q=${key}&${this.sort}&${this.pageSize}&from=${this.from}&to=${this.to}&${this.apiKey}`))
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw res;
      })
      .catch((err) => {
        throw err;
      });
  }
}
