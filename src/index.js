import './style.css';

import Form from './js/components/Form';
import Popup from './js/components/Popup';
import Header from './js/components/Header';
import Search from './js/components/Search';
import NewsCardList from './js/components/NewsCardList';
import NewsCard from './js/components/NewsCard';
import Authorization from './js/components/Authorization';

import MainApi from './js/api/MainApi';

import formattingDate from './js/utils/formattingDate';

import popupObj from './js/constants/popup';
import formObj from './js/constants/form';
import headerObj from './js/constants/header';
import SEARCH_FORM from './js/constants/search';
import newsCardObj from './js/constants/news-card';
import newsCardListObj from './js/constants/news-card-list';
import mainApiObj from './js/constants/main-api';

(function () {
  const authorization = new Authorization();
  const mainApi = new MainApi(mainApiObj, formattingDate);

  const createCard = () => new NewsCard(newsCardObj, authorization, mainApi);
  const newsCardList = new NewsCardList(newsCardListObj, createCard);
  const header = new Header(headerObj, authorization);
  const form = new Form(formObj);
  const popup = new Popup(popupObj, authorization);
  const search = new Search(SEARCH_FORM);

  header.setDependence({ newsCardList, mainApi, popup });
  popup.setDependence({ form, header, mainApi });
  search.setDependence({ mainApi, newsCardList });

  newsCardList.setHandlers();
  search.setHandlers();
  header.setHndlers();

  mainApi.getUserData()
    .then((res) => {
      if (res.user.name === undefined) {
        Promise.reject(res);
      }
      header.render(res.user.name);
    })
    .catch(() => header.render());
}());
