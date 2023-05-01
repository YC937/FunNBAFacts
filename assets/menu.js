//mobile menu
var burgerIcon = document.querySelector("#burger");
var navbarMenu = document.querySelector("#nav-links")

burgerIcon.addEventListener("click", getMenu);

function getMenu() {
    navbarMenu.classList.toggle("is-active")
}