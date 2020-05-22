import './style.css';

import Form from './js/components/Form';
import Popup from './js/components/Popup';
import MainApi from './js/api/MainApi';
import Header from './js/components/Header';

import {
  POPUP_CLOSE,
  POPUP_REPLACE,
  ROOT,
  POPUP,
  HEADER_BUTTON,
  SIGNIN_POPUP,
  SIGNUP_POPUP,
  RESULT_POPUP,
  BUTTON_SIGNUP,
  BUTTON_SIGNIN,
  POPUP_IS_OPENED,
} from './js/constants/popup';
import {
  ERROR_TYPE,
  ERROR_LENGTH,
  ERROR_SERVER,
  ERROR_KEYWORD,
  POPUP_FORM,
  BUTTON_ACTIVE,
  POPUP_BUTTON,
  ERROR_REQUIRED,
} from './js/constants/form';

import {
  MOBILE_INPUT,
  NAVIGATION_CONTAINER,
  NAVIGATION_CONTAINER_ACTIVE,
  HEADER,
  HEADER_MOBILE,
  OVERLAY,
  OVERLAY_ACTIVE,
  HEADER_BUTTON_IMAGE,
  HEADER_ARTICLE,
  NAV_ITEM_DISPLAY_NONE,
} from './js/constants/header';

import {
  URL,
  HEADERS,
  COOKIE,
} from './js/constants/main-api';

const module = (function () {

  const mainApi = new MainApi({
    baseUrl: URL,
    headers: HEADERS,
    credentials: COOKIE,
  });

  const header = new Header({
    MOBILE_INPUT,
    NAVIGATION_CONTAINER,
    NAVIGATION_CONTAINER_ACTIVE,
    HEADER,
    HEADER_MOBILE,
    OVERLAY,
    OVERLAY_ACTIVE,
    HEADER_BUTTON,
    HEADER_BUTTON_IMAGE,
    HEADER_ARTICLE,
    NAV_ITEM_DISPLAY_NONE,
  }, mainApi);

  const popup = new Popup({
    POPUP_CLOSE,
    POPUP_REPLACE,
    ROOT,
    POPUP,
    SIGNIN_POPUP,
    SIGNUP_POPUP,
    RESULT_POPUP,
    BUTTON_SIGNUP,
    BUTTON_SIGNIN,
    POPUP_BUTTON,
  },
  new Form({
    ERROR_TYPE,
    ERROR_LENGTH,
    ERROR_SERVER,
    ERROR_KEYWORD,
    POPUP_FORM,
    BUTTON_ACTIVE,
    POPUP_BUTTON,
    ERROR_REQUIRED,
  }), header, mainApi);


  header._setHndlers();
  document.querySelector(`.${HEADER_BUTTON}`).addEventListener('click', popup.open);

  mainApi.getUserData()
    .then((res) => {
      header.render(res.user.name);
    })
    .catch((err) => {
      header.render();
    });

}());
