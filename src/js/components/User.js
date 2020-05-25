export default class User {
  constructor(obj) {
    this.articleTitle = obj.ARTILES_TITLE;
    this.articleDescription = obj.ARTICLES_DESCRIPTION;
    this.articleKeywords = obj.ARTICLES_KEYWORDS;
    this.articleDescriptionActive = obj.ARTICLES_DESCRIPTION_ACTIVE;
    this.articleOne = obj.ARTICLE_ONE;
    this.articleTwo = obj.ARTICLE_TWO;
    this.articleOther = obj.ARTICLE_OTHER;
    this.name = undefined;
    this.popularKeywords = [];
    this.getKeywords = this.getKeywords.bind(this);
    this.render = this.render.bind(this);
    this.setKeywords = this.setKeywords.bind(this);
  }

  render(data) {
    this.getKeywords(data);
    const title = document.querySelector(`.${this.articleTitle}`);
    if (data.length === undefined) {
      title.textContent = `${this.name}, у вас нет сохраненных статей`;
    } else if (data.length === 1) {
      title.textContent = `${this.name}, у вас ${data.length} сохраненная статья`;
    } else if (data.length > 1 && data.length < 5) {
      title.textContent = `${this.name}, у вас ${data.length} сохраненных статьи`;
    } else {
      title.textContent = `${this.name}, у вас ${data.length} сохраненных статей`;
    }

    if (this.popularKeywords.length === 1) {
      document.querySelector(`.saved-articles__container`).insertAdjacentHTML('beforeend', `
      <p class="saved-articles__description">По ключевым словам:
        <span id="article-one" class="saved-articles__keywrods">${this.popularKeywords[0]}</span>
      </p>`);
    } else if (this.popularKeywords.length === 2) {
      document.querySelector(`.saved-articles__container`).insertAdjacentHTML('beforeend', `
      <p class="saved-articles__description">По ключевым словам:
        <span id="article-one" class="saved-articles__keywrods">${this.popularKeywords[0]},</span>
        <span id="article-two" class="saved-articles__keywrods">${this.popularKeywords[1]}</span>
      </p>`);
    } else if (this.popularKeywords.length > 2) {
      document.querySelector(`.saved-articles__container`).insertAdjacentHTML('beforeend', `
      <p class="saved-articles__description">По ключевым словам:
        <span id="article-one" class="saved-articles__keywrods">${this.popularKeywords[0]},</span>
        <span id="article-two" class="saved-articles__keywrods">${this.popularKeywords[1]}</span> и
        <span id="article-other" class="saved-articles__keywrods">${this.popularKeywords.length - 2} другим</span>
      </p>`);
    }
  }

  setKeywords(text) {
    const elem = document.createElement('span');
    elem.classList.add(this.articleKeywords);
    elem.textContent = text;
    return elem;
  }

  getKeywords(data) {
    const articleArr = [];
    data.forEach((elem) => {
      articleArr.push(elem.keyword);
    });
    const keywords = {};
    articleArr.forEach((elem) => {
      if (keywords[elem]) {
        keywords[elem] += 1;
      } else {
        keywords[elem] = 1;
      }
    });
    this.popularKeywords = Object.keys(keywords).sort((a, b) => keywords[b] - keywords[a]);
  }
}
