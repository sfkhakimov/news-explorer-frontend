export default class NewsCard {
  constructor(obj, authorization, mainApi) {
    this.newsCard = obj.NEWS_CARD;
    this.newsCardTmpl = obj.NEWS_CARD_TMPL;
    this.newsCardDate = obj.NEWS_CARD_DATE;
    this.newsCardImage = obj.NEWS_CARD_IMAGE;
    this.link = obj.LINK;
    this.newsCardTitle = obj.NEWS_CARD_TITLE;
    this.newsCardDescription = obj.NEWS_CARD_DESCRIPTION;
    this.newsCardSource = obj.NEWS_CARD_SOURCE;
    this.newsCardButton = obj.NEWS_CARD_BUTTON;
    this.mounthArr = obj.MOUNTH;
    this.newsCardButtonDescriotion = obj.NEWS_CARD_BUTTON_DESCRIPTION;
    this.newsCardButtonSaved = obj.NEWS_CARD_BUTTON_SAVED;
    this.newsCardKeywords = obj.NEWS_CARD_KEYWORDS;
    this.authorization = authorization;
    this.mainApi = mainApi;
    this.articleData = undefined;
    this.keyWord = undefined;
    this.article = undefined;
    this.card = this.card.bind(this);
    this.deleteArticle = this.deleteArticle.bind(this);
    this.createSavedCard = this.createSavedCard.bind(this);
    this.saveArticle = this.saveArticle.bind(this);
    this._setHandlers = this._setHandlers.bind(this);
    this._savedArticleHandlers = this._savedArticleHandlers.bind(this);
  }

  card(elem) {
    this.articleData = elem;
    const date = new Date(elem.publishedAt).getDate();
    const mounth = new Date(elem.publishedAt).getMonth();
    const year = new Date(elem.publishedAt).getFullYear();
    const card = document.createElement('div');
    card.classList.add(this.newsCard);
    card.append(document.querySelector(`#${this.newsCardTmpl}`).content.cloneNode(true));
    card.querySelector(`.${this.newsCardDate}`).textContent = `${date} ${this.mounthArr[mounth]}, ${year}`;
    card.querySelector(`.${this.newsCardTitle}`).textContent = elem.title;
    card.querySelector(`.${this.newsCardDescription}`).textContent = elem.description;
    card.querySelector(`.${this.newsCardSource}`).textContent = elem.source.name;
    card.querySelector(`.${this.newsCardImage}`).style.backgroundImage = `url(${elem.urlToImage})`;
    card.querySelector(`.${this.link}`).setAttribute('href', elem.url);
    this.article = card;
    if (this.authorization.login === true) {
      card.querySelector(`.${this.newsCardButtonDescriotion}`).remove();
      card.querySelector(`.${this.newsCardButton}`).removeAttribute('disabled', true);
      card.querySelector(`.${this.newsCardButton}`).addEventListener('click', this.saveArticle);
    } else {
      card.querySelector(`.${this.newsCardButton}`).setAttribute('disabled', true);
      this._setHandlers();
    }
    return card;
  }

  createSavedCard(elem) {
    this.articleData = elem;
    const date = new Date(elem.date).getDate();
    const mounth = new Date(elem.date).getMonth();
    const year = new Date(elem.date).getFullYear();
    const card = document.createElement('div');
    card.classList.add(this.newsCard);
    card.append(document.querySelector(`#${this.newsCardTmpl}`).content.cloneNode(true));
    card.querySelector(`.${this.newsCardDate}`).textContent = `${date} ${this.mounthArr[mounth]}, ${year}`;
    card.querySelector(`.${this.newsCardTitle}`).textContent = elem.title;
    card.querySelector(`.${this.newsCardKeywords}`).textContent = elem.keyword;
    card.querySelector(`.${this.newsCardDescription}`).textContent = elem.text;
    card.querySelector(`.${this.newsCardSource}`).textContent = elem.source;
    card.querySelector(`.${this.newsCardImage}`).style.backgroundImage = `url(${elem.image})`;
    card.querySelector(`.${this.link}`).setAttribute('href', elem.link);
    card.querySelector(`.${this.newsCardButton}`).removeAttribute('disabled', true);
    this.article = card;
    this._savedArticleHandlers();
    return card;
  }

  saveArticle() {
    this.mainApi.createArticle({
      key: this.keyWord,
      title: this.articleData.title,
      text: this.articleData.description,
      date: this.articleData.publishedAt,
      source: this.articleData.source.name,
      link: this.articleData.url,
      image: this.articleData.urlToImage,
    })
      .then((article) => {
        if (article.message !== undefined) {
          Promise.reject(article);
        }
        this.article.querySelector(`.${this.newsCardButton}`).classList.add(this.newsCardButtonSaved);
        this.article.querySelector(`.${this.newsCardButton}`).setAttribute('disabled', true);
      })
      .catch((err) => alert(err.message));
  }

  deleteArticle() {
    this.mainApi.removeArticle(this.articleData._id)
      .then((res) => {
        if (res.message !== undefined) {
          Promise.reject(res);
        }
        this.article.remove();
      })
      .catch((err) => alert(err.message));
  }

  _savedArticleHandlers() {
    this.article.querySelector(`.${this.newsCardButton}`).addEventListener('click', this.deleteArticle);
  }

  _setHandlers() {
    this.article.querySelector(`.${this.newsCardButton}`).addEventListener('click', this.saveArticle);
  }
}
