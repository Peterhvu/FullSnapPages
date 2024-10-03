

// setup observers
function sectionInView(entries) {
    entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add("active");
        else e.target.classList.remove("active");
    });
}

function swipeInView(entries) {
    entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add("active");
        else e.target.classList.remove("active");
    });
}

const vObserver = new IntersectionObserver(sectionInView, {
    root: document.querySelector("#vFlow"),
    rootMargin: "0px",
    threshold: .9,
});
const hObserver = new IntersectionObserver(swipeInView, {
    root: document.querySelector("#hFlow"),
    rootMargin: "0px",
    threshold: .9,
});

// ---

function menuClicked() {
    mainH1.innerHTML = this.dataset.name;
    hFlow.innerHTML = ""; //clear it
    for (let i = 1; i < 50; i++) {
        let swipe = document.createElement("span");
        swipe.classList.add('swipe');
        swipe.innerHTML = this.dataset.name + '- Slide ' + i;
        hFlow.appendChild(swipe);
        hObserver.observe(swipe);
    }
}

function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
        document.exitFullscreen();
    }
}