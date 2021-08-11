// Load Page
window.addEventListener("load", ()=>{
    document.querySelector(".main").classList.remove("hidden");
    document.querySelector(".home-section").classList.add("active");
    document.querySelector(".about-section").classList.add("active");
    document.querySelector(".portfolio-section").classList.add("active");
    document.querySelector(".contact-section").classList.add("active");
    //  Page Loader
    document.querySelector(".page-loader").classList.add("fade-out");
    setTimeout(()=>{
        document.querySelector(".page-loader").style.display = 'none';
    }, 600)
})

// -------- Nav Toggler --------------
const navToggler = document.querySelector(".nav-toggler");
navToggler.addEventListener("click", () => {
    toggleNavbar();
    document.body.classList.toggle("hide-scrolling");
})
function hideSection() {
    document.querySelector("section.active").classList.toggle("fade-out");
}
function toggleNavbar() {
    document.querySelector(".header").classList.toggle("active");
}

/*===== SCROLL SECTIONS ACTIVE LINK =====*/
const sections = document.querySelectorAll('section');
function scrollActive(){
    const scrollY = window.pageYOffset
    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute('id');

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.menu a[href*=' + sectionId + ']').classList.add('active')
            console.log('.menu a[href*=' + sectionId + ']');
        }else{
            document.querySelector('.menu a[href*=' + sectionId + ']').classList.remove('active')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*==================== SHOW SCROLL UP ====================*/ 
function scrollSocial(){
    const scrollSocial = document.getElementById('header__sidepanel');
    currentSection = document.querySelector(".menu .active");
    currentId = currentSection.getAttribute("href");
    if((this.scrollY >= 10) && currentId != '#home'){
        scrollSocial.classList.add('show-socials');
     } else{ 
         scrollSocial.classList.remove('show-socials')
    }
}
window.addEventListener('scroll', scrollSocial)

// TYPING
$(document).ready(function(){
    var typed = new Typed(".typing", {
        strings: ["medical devices.", "design.", "teaching.", "development.", "learning."],
        typeSpeed: 80,
        backSpeed: 60,
        loop: true
    });
});

// ABOUT TABS
const tabsContainer = document.querySelector('.about-tabs'),
    aboutSection = document.querySelector(".about-section");
tabsContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains('tab-item') && !e.target.classList.contains("active")) {
        tabsContainer.querySelector(".active").classList.remove("active");
        e.target.classList.add("active");
        const target = e.target.getAttribute("data-target");
        aboutSection.querySelector('.tab-content.active').classList.remove("active");
        aboutSection.querySelector(target).classList.add("active");
    }
})

function bodyScrollingToggle() {
    document.body.classList.toggle("hide-scrolling");
}

// Portfolio filter and popup
(() => {

    const filterContainer = document.querySelector(".portfolio-filter"),
        portfolioItemsContainer = document.querySelector(".portfolio-items"),
        portfolioItems = document.querySelectorAll(".portfolio-item"),
        popup = document.querySelector(".portfolio-popup"),
        prevBtn = popup.querySelector(".pp-next"),
        nextBtn = popup.querySelector(".pp-prev"),
        closeBtn = popup.querySelector(".pp-close"),
        projectDetailsContainer = popup.querySelector(".pp-details"),
        projectDetailsBtn = popup.querySelector(".pp-project-details-btn");
    let itemIndex, slideIndex, screenshots;

    // Filter portfolio items
    filterContainer.addEventListener("click", (event) => {
        if (event.target.classList.contains("filter-item") && !event.target.classList.contains("active")) {
            // deactivate existing active filter item
            filterContainer.querySelector(".active").classList.remove("outer-shadow", "active");
            // activate new filter item
            event.target.classList.add("active", "outer-shadow");
            const target = event.target.getAttribute("data-target");
            portfolioItems.forEach((item) => {
                if (target === item.getAttribute("data-category") || target === 'all') {
                    item.classList.remove("hide");
                    item.classList.add("show");
                }
                else {
                    item.classList.remove("show");
                    item.classList.add("hide");
                }
            })
        }
    })

    portfolioItemsContainer.addEventListener("click", (event) => {
        if (event.target.closest(".portfolio-item-inner")) {
            const portfolioItem = event.target.closest(".portfolio-item-inner").parentElement;
            // get the portfolio item index
            itemIndex = Array.from(portfolioItem.parentElement.children).indexOf(portfolioItem);
            screenshots = portfolioItems[itemIndex].querySelector(".portfolio-item-img img").getAttribute("data-screenshots");
            // convert screenshots into array
            screenshots = screenshots.split(",");
            if(screenshots.length === 1){
                prevBtn.style.display = "none";
                nextBtn.style.display = "none";
            }
            else{
                prevBtn.style.display = "block";
                nextBtn.style.display = "block";
            }
            slideIndex = 0;
            popupToggle();
            popupSlideshow();
            popupDetails();
        }
    })

    closeBtn.addEventListener("click", () => {
        popupToggle();
        if(projectDetailsContainer.classList.contains("active")){
            popupDetailsToggle();
        }
    })

    function popupToggle() {
        popup.classList.toggle("open");
        bodyScrollingToggle();
        document.querySelector(".main").classList.toggle("fade-out");
    }

    function popupSlideshow() {
        const imgSrc = screenshots[slideIndex];
        
        const popupImg = popup.querySelector(".pp-img");
        // activate loader until the popupImg loads
        popup.querySelector(".pp-loader").classList.add('active');
        popupImg.src = imgSrc;
        popupImg.onload = () => {
            // deactivate laoder
            popup.querySelector(".pp-loader").classList.remove('active');
        }
        popup.querySelector(".pp-counter").innerHTML = (slideIndex+1) + " of " + screenshots.length;
    }

    // next slide
    nextBtn.addEventListener("click", () => {
        if(slideIndex === screenshots.length - 1) {
            slideIndex = 0;
        }
        else {
            slideIndex ++;
        }
        popupSlideshow();
    })

    // prev slide
    prevBtn.addEventListener("click", () => {
        if(slideIndex === 0) {
            slideIndex = screenshots.length - 1;
        }
        else {
            slideIndex --;
        }
        popupSlideshow();
    })

    function popupDetails(){
        // if portfolio item details not empty
        if (!portfolioItems[itemIndex].querySelector(".portfolio-item-details")){
            projectDetailsBtn.style.display = 'none';
            return; 
        }
        projectDetailsBtn.style.display = 'block';
        // get the project details
        const details = portfolioItems[itemIndex].querySelector(".portfolio-item-details").innerHTML;
        popup.querySelector(".pp-project-details").innerHTML = details;
        const title = portfolioItems[itemIndex].querySelector(".portfolio-item-title").innerHTML;
        popup.querySelector(".pp-title h2").innerHTML = title;
        const category = portfolioItems[itemIndex].getAttribute("data-category");
        popup.querySelector(".pp-project-category").innerHTML = category.split("-").join(" ");
    }

    projectDetailsBtn.addEventListener("click", () => {
        popupDetailsToggle();
    })
    function popupDetailsToggle() {
        if(projectDetailsContainer.classList.contains("active")){
            projectDetailsBtn.querySelector("i").classList.remove("uil-minus");
            projectDetailsBtn.querySelector("i").classList.add("uil-plus");

            projectDetailsContainer.classList.remove("active");
            projectDetailsContainer.style.maxHeight = 0 + "px";
        }
        else{
            projectDetailsBtn.querySelector("i").classList.remove("uil-plus");
            projectDetailsBtn.querySelector("i").classList.add("uil-minus");

            projectDetailsContainer.classList.add("active");
            projectDetailsContainer.style.maxHeight = projectDetailsContainer.scrollHeight + "px";
            popup.scrollTo(0, -projectDetailsContainer.offsetTop);
        }

    }

})();

/*==================== DARK LIGHT THEME ====================*/ 
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'uil-sun'


const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => document.body.classList.contains(iconTheme) ? 'uil-moon' : 'uil-sun'

if (selectedTheme) {
    document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
    themeButton.classList[selectedIcon === 'uil-moon' ? 'add' : 'remove'](iconTheme)
}

themeButton.addEventListener('click', () => {
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)

    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})

// Navbar and ScrollTop 
$(document).ready(function(){
    $(window).scroll(function(){
        // sticky navbar on scroll script
        if(this.scrollY > 40){
            $('.navbar').addClass("sticky");
        }else{
            $('.navbar').removeClass("sticky");
        }
        
        // scroll-up button show/hide script
        if(this.scrollY > 500){
            $('.scroll-up-btn').addClass("show");
        }else{
            $('.scroll-up-btn').removeClass("show");
        }
    });

    // slide-up script
    $('.scroll-up-btn').click(function(){
        $('html').animate({scrollTop: 0});
        // removing smooth scroll on slide-up button click
        $('html').css("scrollBehavior", "auto");
    });

    $('.navbar .menu li a').click(function(){
        // applying again smooth scroll on menu items click
        $('html').css("scrollBehavior", "smooth");
        $('.navbar .menu').toggleClass("active");
        $('.navbar .header').toggleClass("active");
    });

    // toggle menu/navbar script
    $('.nav-toggler').click(function(){
        $('.navbar .menu').toggleClass("active");
    });
});

function submit_form() {
    document.EmailForm.submit();
    document.EmailForm.reset();
}