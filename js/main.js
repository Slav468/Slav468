//Burger menu//

window.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger'),
        menu = document.querySelector('.menu-deactive'),
        closeElem = document.querySelector('.menu__close'),
        wrapperMenu = document.querySelector('wrap');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('hamburger-deactive');
        hamburger.classList.remove('hamburger');
        menu.classList.toggle('menu');
        menu.classList.remove('menu-deactive');

    });

    closeElem.addEventListener('click', () => {
        menu.classList.toggle('menu-deactive');
        menu.classList.remove('menu');
        hamburger.classList.toggle('hamburger');
        hamburger.classList.remove('hamburger-deactive');

    });

});


// skills prc //
const counters = document.querySelectorAll('.framework-skills__prc'),
    lines = document.querySelectorAll('.framework-skills__ratings-line span');

counters.forEach((item, i) => {
    lines[i].style.width = item.innerHTML;
});