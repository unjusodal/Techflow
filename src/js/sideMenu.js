const body = document.querySelector('body')
const menuBtn = document.querySelector('.menu__button')
const nav = document.querySelector('.nav__menu')
const navLinks = document.querySelectorAll('.nav__menu ul li')

menuBtn.addEventListener('click', () => {
    nav.classList.toggle('nav__menu--active')
    body.classList.toggle('disable-scroll')

    document.querySelector('.header__content').addEventListener('click', unactive)

    navLinks.forEach(li => {
        li.addEventListener('click', unactive)
    })

    function unactive() {
        nav.classList.remove('nav__menu--active')
        body.classList.remove('disable-scroll')
    }
})