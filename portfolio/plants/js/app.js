(() => {
    "use strict";
    let addWindowScrollEvent = false;
    setTimeout((() => {
        if (addWindowScrollEvent) {
            let windowScroll = new Event("windowScroll");
            window.addEventListener("scroll", (function(e) {
                document.dispatchEvent(windowScroll);
            }));
        }
    }), 0);
    const iconMenu = document.querySelector(".icon-menu");
    const menu = document.querySelector(".menu");
    const menuItem = document.querySelectorAll(".menu__item");
    function toggleMenu() {
        iconMenu.classList.toggle("icon-menu_open");
        menu.classList.toggle("menu_active");
        document.body.classList.toggle("lock");
    }
    iconMenu.addEventListener("click", toggleMenu);
    menuItem.forEach((el => {
        el.addEventListener("click", (event => {
            toggleMenu();
        }));
    }));
    menu.addEventListener("click", (e => {
        const eTarget = e.target;
        if (!eTarget.closest(".menu__body")) toggleMenu();
    }));
    const cardAll = document.querySelectorAll(".card");
    const tabsButton = document.querySelectorAll(".service__button");
    const tabsContent = document.querySelectorAll(".service-grid__item");
    const selectChooseArr = [];
    tabsButton.forEach((btn => {
        btn.addEventListener("click", (e => {
            const idTabs = btn.id;
            if (selectChooseArr.includes(`${idTabs}`)) {
                console.log();
                selectChooseArr.splice(selectChooseArr.indexOf(idTabs), 1);
            } else selectChooseArr.push(idTabs);
            if (selectChooseArr.length > 2) selectChooseArr.shift();
            tabsButton.forEach((el => {
                el.classList.remove("btn_active");
            }));
            tabsContent.forEach((el => {
                el.classList.remove("service-grid__item_active");
                el.classList.add("service-grid__item_blur");
            }));
            selectChooseArr.forEach((el => {
                let allBtn = document.querySelector(`#${el}`);
                let allElSort = document.querySelectorAll(`.${el}`);
                allBtn.classList.add("btn_active");
                allElSort.forEach((item => {
                    item.classList.add("service-grid__item_active");
                    item.classList.remove("service-grid__item_blur");
                }));
            }));
            if (0 === selectChooseArr.length) tabsContent.forEach((el => {
                el.classList.remove("service-grid__item_blur");
            }));
        }));
    }));
    const pricesWrap = document.querySelectorAll(".prices__wrap");
    const accord = document.querySelectorAll(".prices__accord");
    const accordWrapper = document.querySelectorAll(".accord__wrapper");
    accord.forEach((el => {
        el.addEventListener("click", (e => {
            const eTar = e.target;
            if (eTar.classList.contains("prices__accord_active")) {
                eTar.parentNode.classList.remove("prices__wrap_active");
                eTar.classList.remove("prices__accord_active");
                eTar.nextElementSibling.classList.remove("accord__wrapper_active");
            } else {
                pricesWrap.forEach((el => {
                    el.classList.remove("prices__wrap_active");
                }));
                accord.forEach((el => {
                    el.classList.remove("prices__accord_active");
                }));
                accordWrapper.forEach((el => {
                    el.classList.remove("accord__wrapper_active");
                }));
                eTar.parentNode.classList.add("prices__wrap_active");
                eTar.classList.add("prices__accord_active");
                eTar.nextElementSibling.classList.add("accord__wrapper_active");
            }
        }));
    }));
    const contactsSelect = document.querySelector(".contacts__select");
    const contactsSelectWrap = document.querySelector(".contacts__select-wrap");
    const contactsText = document.querySelectorAll(".contacts__text");
    const acccordBtn = document.querySelectorAll(".accord__button");
    const selectText = document.querySelector(".contacts__select-text");
    acccordBtn.forEach((el => {
        el.addEventListener("click", (e => {
            e.preventDefault();
            e.stopPropagation();
            contactsSelect.scrollIntoView();
        }));
    }));
    function selectActive() {
        contactsSelectWrap.classList.toggle("contacts__select-wrap_active");
        contactsSelect.classList.remove("contacts__select_checked");
        contactsSelect.classList.add("contacts__select_active");
    }
    const contactsWrapper = document.querySelector(".contacts__wrapper");
    contactsWrapper.addEventListener("click", (e => {
        if (e.target && e.target.closest(".contacts__wrapper")) selectActive();
    }));
    contactsText.forEach((card => {
        card.addEventListener("click", (function(e) {
            e.stopPropagation();
            const itemAttr = e.target.getAttribute("data-value");
            const cardItem = document.getElementById(`${itemAttr}`);
            cardAll.forEach((el => {
                el.classList.remove("card_active");
            }));
            cardItem.classList.add("card_active");
            selectActive();
            contactsSelect.classList.remove("contacts__select_active");
            contactsSelect.classList.add("contacts__select_checked");
            let text = card.textContent;
            selectText.textContent = text;
        }));
    }));
    document.addEventListener("click", (e => {
        if (e.target && !e.target.closest(".contacts__wrapper")) {
            contactsSelect.classList.remove("contacts__select_active");
            contactsSelectWrap.classList.remove("contacts__select-wrap_active");
        } else if (e.target && document.querySelector(".card_active")) contactsSelect.classList.add("contacts__select_checked");
    }));
    window["FLS"] = true;
})();