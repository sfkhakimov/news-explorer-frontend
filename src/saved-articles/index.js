import '../article.css';
console.log('Точно работает');

document.querySelector('.header__mobile-input').addEventListener('click', function(event) {
  if(!document.querySelector('.header__navigation-container').classList.contains('header__navigation-container_mobile-active')) {
    document.querySelector('.header__navigation-container').classList.add('header__navigation-container_mobile-active')
    document.querySelector('.header').classList.add('header_mobile')
    document.querySelector('.overlay').classList.add('overlay_active')
    document.querySelector('.header__name-project').classList.remove('header__name-project_theme_white')
    document.querySelector('.header__button-image').setAttribute('src', './images/logout.svg')
  } else {
    document.querySelector('.header__navigation-container').classList.remove('header__navigation-container_mobile-active')
    document.querySelector('.header').classList.remove('header_mobile')
    document.querySelector('.overlay').classList.remove('overlay_active')
    document.querySelector('.header__name-project').classList.add('header__name-project_theme_white')
    document.querySelector('.header__button-image').setAttribute('src', './images/logout_dark.svg')
  }
});