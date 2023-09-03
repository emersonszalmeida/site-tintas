const menuIcon = document.getElementById("menu-icon");
const menuLinks = document.getElementById("menu-links");

menuIcon.addEventListener("click", function () {
    menuLinks.classList.toggle("active");
    menuIcon.classList.toggle("active");
});