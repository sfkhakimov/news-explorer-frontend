import './style.css';

import Popup from './js/components/Popup';
import SignInPopup from './js/components/SignInPopup';
import SignUpPopup from './js/components/SignUpPopup';

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

const module = (function () {
  const popup = new Popup(POPUP_CLOSE, POPUP_REPLACE, ROOT, POPUP, POPUP_IS_OPENED);
  const signInPopup = new SignInPopup(HEADER_BUTTON, SIGNIN_POPUP, BUTTON_SIGNIN, popup);
  const signUpPopup = new SignUpPopup(SIGNUP_POPUP, BUTTON_SIGNUP, popup);

  signInPopup._handler();
  signUpPopup._handler();

  document.querySelector('.header__mobile-input').addEventListener('click', (event) => {
    if (!document.querySelector('.header__navigation-container').classList.contains('header__navigation-container_mobile-active')) {
      document.querySelector('.header__navigation-container').classList.add('header__navigation-container_mobile-active');
      document.querySelector('.header').classList.add('header_mobile');
      document.querySelector('.overlay').classList.add('overlay_active');
    } else {
      document.querySelector('.header__navigation-container').classList.remove('header__navigation-container_mobile-active');
      document.querySelector('.header').classList.remove('header_mobile');
      document.querySelector('.overlay').classList.remove('overlay_active');
    }
  });
}());
