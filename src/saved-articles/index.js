import '../article.css';

import Header from '../js/components/Header';
import Popup from '../js/components/Popup';
import Authorization from '../js/components/Authorization';
import MainApi from '../js/api/MainApi';
import NewsCardList from '../js/components/NewsCardList';
import NewsCard from '../js/components/NewsCard';
import Form from '../js/components/Form';
import User from '../js/components/User';

import newsCardListObj from '../js/constants/news-card-list';
import newsCardObj from '../js/constants/news-card';
import popupObj from '../js/constants/popup';
import headerObj from '../js/constants/header';
import formObj from '../js/constants/form';
import userObj from '../js/constants/user';
import {
  URL,
  HEADERS,
  COOKIE,
} from '../js/constants/main-api';

(function () {
  const authorization = new Authorization();
  const mainApi = new MainApi({
    baseUrl: URL,
    headers: HEADERS,
    credentials: COOKIE,
  });
  const user = new User(userObj);
  const createCard = () => new NewsCard(newsCardObj, authorization, mainApi);
  const newsCardList = new NewsCardList(newsCardListObj, createCard, mainApi);
  const form = new Form(formObj);
  const header = new Header(headerObj, mainApi, authorization, newsCardList);
  const popup = new Popup(popupObj, form, header, mainApi, authorization);

  header._setHndlers();
  document.querySelector(`.${popupObj.HEADER_BUTTON}`).addEventListener('click', popup.open);
  mainApi.getUserData()
    .then((res) => {
      if (res.message !== undefined) {
        Promise.reject(res);
      }
      header.render(res.user.name);
      user.name = res.user.name;
    })
    .catch((err) => header.render());
  mainApi.getArticles()
    .then((res) => {
      if (res.message !== undefined) {
        Promise.reject(res);
      }
      newsCardList.addSavedArticles(res.article);
      user.render(res.article);
    })
    .catch((err) => {
      user.render(err);
    });
}());
