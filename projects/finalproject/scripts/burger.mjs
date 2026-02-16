export function openHamburgerMenu() {
    const hamburger = document.getElementById("hamburger");
    const navigation = document.querySelector(".navigation");
    navigation.classList.toggle("open");
    hamburger.classList.toggle("open");
}

export async function initHamburgerMenu() {
    const hamburger = document.getElementById("hamburger");
    const navigation = document.querySelector(".navigation");
    if(hamburger && navigation) {
        hamburger.addEventListener("click", openHamburgerMenu);
    }
}