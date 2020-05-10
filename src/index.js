import './style.css';
console.log('Вебпак работает');

document.querySelector('.header__navigation-button').addEventListener('click', function(event) {
  if(!document.querySelector('.header__navigation-container').classList.contains('header__navigation-container_mobile-active')) {
    document.querySelector('.header__navigation-container').classList.add('header__navigation-container_mobile-active')
    document.querySelector('.header').classList.add('header_mobile')
  } else {
    document.querySelector('.header__navigation-container').classList.remove('header__navigation-container_mobile-active')
    document.querySelector('.header').classList.remove('header_mobile')
  }
});