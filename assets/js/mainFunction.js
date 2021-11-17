'use strict';

function select(selection, singleElement = true) {
    if (singleElement) {return document.querySelector(selection)}
    else {return document.querySelectorAll(selection)}
}
function append(mainElement, ...subElements) {
    subElements.forEach(subElement => {mainElement.append(subElement);})
}
function newElement(cls, content = "", tag = "div") {
    let element = document.createElement(tag);
    if (cls) {
        if (typeof cls === "object") {
            cls.forEach(clsElement => {
                element.classList.add(clsElement);
            });
        } else {
            element.classList.add(cls);
        }
    }
    if (content) {
        element.innerText = content;
    }
    return element;
}

function hideMenu() {
    select(".custom-right-click-menu").style.display = "none"
}
function rightClick(e) {
    e.preventDefault();

    let menu = select(".custom-right-click-menu");
    menu.style.display = 'block';
    let menuWidth = getComputedStyle(select(".custom-right-click-menu")).width;
    menuWidth = menuWidth.slice(0, menuWidth.length - 2) * 1
    let menuHeight = getComputedStyle(select(".custom-right-click-menu")).height;
    menuHeight = menuHeight.slice(0, menuHeight.length - 2) * 1
    if (window.innerWidth < menuWidth + 100 || window.innerHeight < menuHeight + 100) {
        return false
    }
    else {

        if (e.pageX + menuWidth > window.innerWidth) { menu.style.left = e.pageX - menuWidth + "px"; }
        else { menu.style.left = e.pageX + "px"; }
        if (e.pageY + menuHeight > window.innerHeight) { menu.style.top = e.pageY - menuHeight + "px"; }
        else {menu.style.top = e.pageY + "px"; }
    }
}

document.oncontextmenu = rightClick;
document.onclick = hideMenu;
