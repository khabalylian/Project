

const burger = document.querySelector('.header__burger');
const burgerButton = document.querySelector('.header__burger-button');
const burgerMenu = document.querySelector('.header__burger-menu');

burger.addEventListener('click', () => {
	burger.classList.toggle('close');
	burgerMenu.classList.toggle('open');
})

burgerButton.addEventListener('click', () => {
    burger.classList.toggle('close');
    burgerMenu.classList.toggle('open');
});