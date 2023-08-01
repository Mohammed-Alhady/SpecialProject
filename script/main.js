function __main__() {
    settingBoxMovment();
    settingBoxOptions();
    landingPageActiveElemetn();
    pupopBoxImages();
    emailValidation();
    screanNavBar();
    getYear();
    bulletsMove();
    scrollToTop();
}

function backgroundChanging() {
    // change landing page background
    let landingPage = document.querySelector(".landing-page")

    // get random number and change the background
    let randomNumber = Math.floor(Math.random() * 10);
    if (randomNumber > 0 && randomNumber !== 6) {
        randomNumber < 10 ? landingPage.style.backgroundImage = `url("imgs/0${randomNumber}.jpg")` : landingPage.style.backgroundImage = `url("imgs/${randomNumber}.jpg")` ;
    } else if (randomNumber === 6) {
        landingPage.style.backgroundImage = `url("imgs/0${randomNumber}.png")`
    }
}

function settingBoxMovment() {
    let settingIcon = document.querySelector(".gear-icon");
    let settingBox = document.querySelector(".setting-box")
    settingIcon.addEventListener("click", () => {
        if (!(settingBox.classList.contains("show"))) {
            settingBox.classList.add("show");
            settingIcon.innerHTML = "<i class=\"fa-regular fa-circle-xmark close\"></i>";
        } else {
            settingBox.classList.remove("show");
            settingIcon.innerHTML = "<i class=\"fa fa-gear move\"></i>";
        }
    })
}

function settingBoxOptions() {
    let colors = document.querySelectorAll(".colors-list li");
    let randomBackground = document.querySelectorAll(".random-backgrounds span");
    let showBullets = document.querySelectorAll(".show-bullets span");
    
    // check the local storage
    checkLocalStorage(colors, localStorage);

    // set active class to elements
    removeActive(colors);
    removeActive(randomBackground);
    removeActive(showBullets);

    function removeActive(list) {
        list.forEach((ele) => {
            ele.style.backgroundColor = `${ele.getAttribute("data-color")}`
            ele.addEventListener("click", () => {
                setActiveClassToElemet(list, ele);
                if (ele.classList.contains("choice") && ele.classList.contains("yes")) {
                    interval = setInterval(backgroundChanging, intervalTime);
                    localStorage.setItem("change_background", "yes");
                }
                else if (ele.classList.contains("choice") && ele.classList.contains("no")) {
                    window.clearInterval(interval);
                    localStorage.setItem("change_background", "no");
                }
                else if (ele.classList.contains("show")) {
                    if (ele.classList.contains("show") && ele.classList.contains("yes")) showBulletsOnPage();
                    else removeBulletsOnPage();
                }
                else if (ele.classList.contains("color")) {
                    document.documentElement.style.setProperty("--main-color", `${ele.getAttribute("data-color")}`);
                    localStorage.setItem("color_option", `${ele.getAttribute("data-color")}`);
                }
            })
        })
    }

    function checkLocalStorage(colors, localStorage) {
        if (localStorage.getItem("color_option") !== null) {
            colors.forEach(ele => {
                if (ele.getAttribute("data-color") === (localStorage.getItem("color_option"))) {
                    document.documentElement.style.setProperty("--main-color", `${localStorage.getItem("color_option")}`);
                    setActiveClassToElemet(colors, ele);
                }
            })
            if (localStorage.getItem("change_background") !== null) {
                randomBackground.forEach(ele => {
                    if (ele.classList.contains(localStorage.getItem("change_background"))) {
                        setActiveClassToElemet(randomBackground, ele);
                        (localStorage.getItem("change_background") === "yes") ? interval :  window.clearInterval(interval);
                    }
                })
            }
        }
    }

    // bullets shower in page
    function showBulletsOnPage() {
        document.querySelector(".nav-bullets").style.display = "block";
    }
    function removeBulletsOnPage() {
        document.querySelector(".nav-bullets").style.display = "none";
    }
}

function landingPageActiveElemetn() {
    let links = document.querySelectorAll(".links a");
    scrollToSomewhere(links);
}

function progressMovment() {
    let ourSkills = document.querySelector(".skills");

    window.onscroll = function () {

        let skillsOffsetTop = ourSkills.offsetTop;
        let skillsHeight = ourSkills.offsetHeight;
        let windowHeight = this.innerHeight;
        let windowScrollTop = this.pageYOffset;

        if (windowScrollTop > (skillsOffsetTop + skillsHeight - windowHeight)) {
            let progressElements = document.querySelectorAll(".skills .skill-progress span");

            progressElements.forEach((ele) => {
                ele.style.width = `${ (ele.getAttribute("data-progress"))}`
            })
        }
    }
}

function pupopBoxImages() {
    let images = document.querySelectorAll(".gallery img");
    
    images.forEach((img) => {
        img.addEventListener("click", (ele) => {
            // create overlay
            let popupOverlay = document.createElement("div");
            popupOverlay.className = "popup-overlay";
            // create pupot to hold the image
            let popupBox = document.createElement("div");
            popupBox.className = "popup-box";
            // create imgae with scr
            let image = document.createElement("img");
            image.src = img.src;
            
            
            if (img.alt !== "" || img.alt !== null) {
                let title = document.createElement("h3");
                title.textContent = img.alt;
                popupBox.appendChild(title);
            }
            
            // console.log(title);
            popupBox.appendChild(image);
            popupOverlay.appendChild(popupBox);
            document.body.appendChild(popupOverlay);
            
            let closeBtn = document.createElement("span");
            closeBtn.className = "close-button";
            closeBtn.textContent = "x";
            popupBox.appendChild(closeBtn);
            
        })
    })

    document.addEventListener("click", (e) => {
        if (e.target.classList.contains("close-button")) {
            document.querySelector(".popup-overlay").remove();
        }
    }) 
}

// not end yet
function emailValidation() {
    // let patter = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    // let email = document.querySelector(".email");

    // email.oninput = checkValidation(email.value);

    // function checkValidation(e) {
    //     let input = e.target.textContent;
    //     if (input && patter.test(input)) {
    //         e.target.classList.add("valid-email");
    //     } else {
    //         e.target.classList.add("unvalid-email");
    //     }
    // }
}

function screanNavBar() {
    let navIncon = document.querySelector(".nav-icon");
    let linksHolder = document.querySelector(".landing-page .links");

    navIncon.addEventListener("click", () => {
        if (!(navIncon.classList.contains("show"))) {
            navIncon.className = "fa-regular fa-circle-xmark nav-icon";
            navIncon.classList.add("show");
            linksHolder.style.right = "0%";
        } else {
            navIncon.className = "fa-solid fa-bars nav-icon";
            navIncon.classList.remove("show");
            linksHolder.style.right = "-80%";
        }
    })
}
// not finished
function getYear() {
    let currentYear = new Date().getFullYear();
    let year = document.querySelector(".year");
    year.textContent = currentYear;
}

function bulletsMove() {
        let bullets = document.querySelectorAll(".bullet");
    let links = document.querySelectorAll(".links a");

    bullets.forEach((elements) => {
        elements.addEventListener("click", (ele) => {
            links.forEach((e) => {
                e.dataset.section == ele.target.dataset.section ? e.classList.add("active") : e.classList.remove("active");
                
            })
            document.querySelector(ele.target.dataset.section).scrollIntoView({
                behavior: 'smooth'
            });
        })
    })
}

function scrollToTop() {
    let span = document.querySelector(".scroll-to-top");
    
    window.onscroll = function () {
        this.scrollY >= "700" ? span.classList.add("show") : span.classList.remove("show");
    }
    span.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    })
}

// intervals
let intervalTime = 5000;
let interval = setInterval(backgroundChanging, intervalTime);

// global
function setActiveClassToElemet(list, e) {
    list.forEach((ele) => {
        ele.classList.remove("active");
    })
    e.classList.add("active");
}

function scrollToSomewhere(elements) {
    elements.forEach(ele => {
        ele.addEventListener("click", (e) => {
            setActiveClassToElemet(elements, e.target);
            e.preventDefault();
            document.querySelector(e.target.dataset.section).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}

window.onscroll = function () {
    scrollToTop();
    progressMovment();

}

// main method
__main__();


