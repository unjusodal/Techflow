const menuBtn = document.querySelector('.menu__button')
const nav = document.querySelector('.nav__menu')

menuBtn.addEventListener('click', () => {
    nav.classList.toggle('nav__menu--active')

    document.querySelector('.header__content').addEventListener('click', () => {
        nav.classList.remove('nav__menu--active')
    })
})