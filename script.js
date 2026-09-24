/* =========================================================
SAIF UR REHMAN — PORTFOLIO JAVASCRIPT
   ========================================================= */


/* =========================================================
ELEMENTS
   ========================================================= */

const header = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-menu a");
const backToTop = document.querySelector(".back-to-top");
const currentYear = document.querySelector("#current-year");


/* =========================================================
SCROLL POSITION
   ========================================================= */

let lastScrollY = window.scrollY;


/* =========================================================
HEADER
   ========================================================= */

function updateHeader() {

    if (!header) return;

    if (window.scrollY > 20) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
}


/* =========================================================
ACTIVE NAVIGATION
   ========================================================= */

function updateActiveNavigation() {

    const sections = document.querySelectorAll("main section[id]");

    if (!sections.length) return;

    const scrollPosition = window.scrollY + 140;

    let currentSection = "home";

    sections.forEach((section) => {

        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (
            scrollPosition >= sectionTop &&
            scrollPosition < sectionTop + sectionHeight
        ) {
            currentSection = section.id;
        }
    });

    navLinks.forEach((link) => {

        const target = link.getAttribute("href");

        link.classList.toggle(
            "active",
            target === `#${currentSection}`
        );
    });
}


/* =========================================================
BACK TO TOP
   ========================================================= */

function updateBackToTop() {

    if (!backToTop) return;

    if (window.scrollY > 500) {
        backToTop.classList.add("show");
    } else {
        backToTop.classList.remove("show");
    }
}


/* =========================================================
MOBILE MENU
   ========================================================= */

if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", () => {

        const isOpen = navMenu.classList.toggle("active");

        menuToggle.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

        menuToggle.setAttribute(
            "aria-label",
            isOpen
                ? "Close navigation menu"
                : "Open navigation menu"
        );
    });
}


/* Close mobile menu after selecting a navigation link */

navLinks.forEach((link) => {

    link.addEventListener("click", () => {

        if (!navMenu || !menuToggle) return;

        navMenu.classList.remove("active");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        menuToggle.setAttribute(
            "aria-label",
            "Open navigation menu"
        );
    });
});


/* =========================================================
BACK TO TOP BUTTON
   ========================================================= */

if (backToTop) {

    backToTop.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}


/* =========================================================
SCROLL EVENT
   ========================================================= */

window.addEventListener("scroll", () => {

    const currentScrollY = window.scrollY;

    updateHeader();
    updateActiveNavigation();
    updateBackToTop();


    /* -----------------------------------------
    Hide header when scrolling DOWN
       ----------------------------------------- */

    if (
        currentScrollY > lastScrollY &&
        currentScrollY > 100
    ) {

        if (header) {
            header.classList.add("hide-header");
        }
    }


    /* -----------------------------------------
    Show header when scrolling UP
       ----------------------------------------- */

    else if (currentScrollY < lastScrollY) {

        if (header) {
            header.classList.remove("hide-header");
        }
    }


    /* -----------------------------------------
    Always show header near the top
       ----------------------------------------- */

    if (currentScrollY <= 50) {

        if (header) {
            header.classList.remove("hide-header");
        }
    }


    lastScrollY = currentScrollY;

});


/* =========================================================
   CURRENT YEAR
   ========================================================= */

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}


/* =========================================================
   INITIAL STATE
   ========================================================= */

updateHeader();
updateActiveNavigation();
updateBackToTop();