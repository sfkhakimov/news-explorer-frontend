import './style.css';

import Form from './js/components/Form';
import Popup from './js/components/Popup';
import MainApi from './js/api/MainApi';
import Header from './js/components/Header';
import Search from './js/components/Search';
import NewsApi from './js/api/NewsApi';
import NewsCardList from './js/components/NewsCardList';
import NewsCard from './js/components/NewsCard';
import Authorization from './js/components/Authorization';

import formattingDate from './js/utils/formattingDate';

import popupObj from './js/constants/popup';
import formObj from './js/constants/form';
import headerObj from './js/constants/header';
import SEARCH_FORM from './js/constants/search';
import newsCardObj from './js/constants/news-card';
import newsCardListObj from './js/constants/news-card-list';

import {
  NEWS_URL,
  API_KEY,
  SORT,
  PAGE_SIZE,
} from './js/constants/news-api';

import {
  URL,
  HEADERS,
  COOKIE,
} from './js/constants/main-api';

(function () {
  const authorization = new Authorization();
  const mainApi = new MainApi({
    baseUrl: URL,
    headers: HEADERS,
    credentials: COOKIE,
  });

  const newsApi = new NewsApi({
    NEWS_URL,
    API_KEY,
    SORT,
    PAGE_SIZE,
  }, formattingDate);

  const createCard = () => new NewsCard(newsCardObj, authorization, mainApi);
  const newsCardList = new NewsCardList(newsCardListObj, createCard);
  const header = new Header(headerObj, mainApi, authorization, newsCardList);
  const form = new Form(formObj);
  const popup = new Popup(popupObj, form, header, mainApi, authorization);
  const search = new Search(SEARCH_FORM, newsApi, newsCardList);

  newsCardList.setHandlers();
  search.setHandlers();
  header.setHndlers();
  document.querySelector(`.${popupObj.HEADER_BUTTON}`).addEventListener('click', popup.open);

  mainApi.getUserData()
    .then((res) => {
      if (res.user.name === undefined) {
        Promise.reject(res);
      }
      header.render(res.user.name);
    })
    .catch(() => header.render());
}());
