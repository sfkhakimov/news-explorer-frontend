import '../article.css';

import Header from '../js/components/Header';
import Authorization from '../js/components/Authorization';
import MainApi from '../js/api/MainApi';
import NewsCardList from '../js/components/NewsCardList';
import NewsCard from '../js/components/NewsCard';
import User from '../js/components/User';

import newsCardListObj from '../js/constants/news-card-list';
import newsCardObj from '../js/constants/news-card';
import headerObj from '../js/constants/header';
import userObj from '../js/constants/user';

import formattingDate from '../js/utils/formattingDate';

import mainApiObj from '../js/constants/main-api';

(function () {
  const authorization = new Authorization();
  const mainApi = new MainApi(mainApiObj, formattingDate);
  const user = new User(userObj);
  const createCard = () => new NewsCard(newsCardObj, authorization, mainApi);
  const newsCardList = new NewsCardList(newsCardListObj, createCard, mainApi);
  const header = new Header(headerObj, authorization);

  header.setDependence({ newsCardList, mainApi });

  header.setHndlers();
  mainApi.getUserData()
    .then((res) => {
      if (res.message !== undefined) {
        Promise.reject(res);
      }
      header.render(res.user.name);
      user.name = res.user.name;
    })
    .catch(() => header.render());
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
