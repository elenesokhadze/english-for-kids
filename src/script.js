//MENU
document.querySelector('.navigation').addEventListener('click', () => {
  document.querySelector('.burger').classList.toggle('burger--clicked');
  document.querySelector('.menu').classList.toggle('menuActive');
});
