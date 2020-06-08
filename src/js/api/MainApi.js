export default class MainApi {
  constructor(api, date) {
    this.baseUrl = api.URL;
    this.headers = api.HEADERS;
    this.credentials = api.COOKIE;
    this.sort = api.SORT;
    this.resultSize = api.RESULT_SIZE;
    this.from = date().previousDate;
    this.to = date().currentDate;
    this.signin = this.signin.bind(this);
    this.signup = this.signup.bind(this);
    this.getNews = this.getNews.bind(this);
    this.getUserData = this.getUserData.bind(this);
    this.getArticles = this.getArticles.bind(this);
    this.createArticle = this.createArticle.bind(this);
    this.removeArticle = this.removeArticle.bind(this);
    this.logout = this.logout.bind(this);
  }

  signin(userEmail, userPassword) {
    return fetch((`${this.baseUrl}/signin`), {
      method: 'POST',
      headers: this.headers,
      credentials: this.credentials,
      body: JSON.stringify({
        email: userEmail,
        password: userPassword,
      }),
    })
      .then((res) => res.json())
      .catch((err) => Promise.reject(err));
  }

  signup(userEmail, userPassword, userName) {
    return fetch((`${this.baseUrl}/signup`), {
      method: 'POST',
      headers: this.headers,
      credentials: this.credentials,
      body: JSON.stringify({
        email: userEmail,
        password: userPassword,
        name: userName,
      }),
    })
      .then((res) => res.json())
      .catch((err) => Promise.reject(err));
  }

  getUserData() {
    return fetch((`${this.baseUrl}/users/me`), {
      headers: this.headers,
      credentials: this.credentials,
    })
      .then((res) => res.json())
      .catch((err) => Promise.reject(err));
  }

  getNews(key) {
    return fetch((`${this.baseUrl}/news-api?keyword=${key}&${this.sort}&${this.resultSize}&fromDate=${this.from}&toDate=${this.to}`), {
      headers: this.headers,
      credentials: this.credentials,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res);
      })
      .catch((err) => Promise.reject(err));
  }

  getArticles() {
    return fetch((`${this.baseUrl}/articles`), {
      headers: this.headers,
      credentials: this.credentials,
    })
      .then((res) => res.json())
      .catch((err) => Promise.reject(err));
  }

  removeArticle(articleId) {
    return fetch((`${this.baseUrl}/articles/${articleId}`), {
      method: 'DELETE',
      headers: this.headers,
      credentials: this.credentials,
    })
      .then((res) => res.json())
      .catch((err) => Promise.reject(err));
  }

  createArticle(article) {
    return fetch((`${this.baseUrl}/articles`), {
      method: 'POST',
      headers: this.headers,
      credentials: this.credentials,
      body: JSON.stringify({
        keyword: article.key,
        title: article.title,
        text: article.text,
        date: article.date,
        source: article.source,
        link: article.link,
        image: article.image,
      }),
    })
      .then((res) => res.json())
      .catch((err) => Promise.reject(err));
  }

  logout() {
    return fetch((`${this.baseUrl}/logout`), {
      method: 'PUT',
      headers: this.headers,
      credentials: this.credentials,
    })
      .then((res) => res.json())
      .catch((err) => Promise.reject(err));
  }
}
