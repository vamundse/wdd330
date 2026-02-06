const hamburger = document.getElementById("hamburger");
const navigation = document.querySelector(".navigation");
hamburger.addEventListener("click", openHamburgerMenu);

export function openHamburgerMenu() {
    navigation.classList.toggle("open");
    hamburger.classList.toggle("open");
}