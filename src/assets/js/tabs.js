const tabs = document.querySelectorAll(".tabs-item");
const tabImage = document.getElementById("tab-image");
let currentIndex = 0;
const intervalTime = 7000;
let autoplayInterval;
let isAutoplayRunning = false;

function resetTab(tab) {
    const fills = tab.querySelectorAll(".progress-fill");
    const mobileImage = tab.querySelector(".mobile-image");

    tab.classList.remove("active");
    tab.classList.add("opacity-70");

    if (mobileImage) mobileImage.style.display = "none";

    fills.forEach(f => {
        f.style.transition = "none";
        f.style.width = "0%";
        // force repaint to reset animation
        f.offsetHeight; 
    });
}

function activateTab(index) {
    currentIndex = index;

    tabs.forEach(resetTab);

    const activeTab = tabs[index];
    activeTab.classList.add("active");
    activeTab.classList.remove("opacity-70");

    const activeMobileImage = activeTab.querySelector(".mobile-image");
    if (activeMobileImage) activeMobileImage.style.display = "block";

    if (tabImage) tabImage.src = activeTab.dataset.image;

    // 🚫 Do NOT animate progress if autoplay not running
    if (!isAutoplayRunning) return;

    const activeFills = activeTab.querySelectorAll(".progress-fill");

    activeFills.forEach(f => {
        f.style.transition = "none";
        f.style.width = "0%";

        // force repaint
        f.offsetWidth;

        f.style.transition = `width ${intervalTime}ms linear`;
        requestAnimationFrame(() => {
            f.style.width = "100%";
        });
    });
}


function nextTab() {
    currentIndex = (currentIndex + 1) % tabs.length;
    activateTab(currentIndex);
}

function startAutoplay() {
    if (isAutoplayRunning) return;

    isAutoplayRunning = true;

    // start progress for current tab
    activateTab(currentIndex);

    autoplayInterval = setInterval(nextTab, intervalTime);
}


tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => {
        clearInterval(autoplayInterval);
        isAutoplayRunning = true;
        activateTab(index);
        autoplayInterval = setInterval(nextTab, intervalTime);
    });
});


// INITIAL STATE
activateTab(0);

let hasStarted = false;

const section = document.getElementById("auto-tabs-section");


const observer = new IntersectionObserver(
    ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
            startAutoplay();
            hasStarted = true;
        }
    },
    { threshold: 0.4 }
);

observer.observe(section);





// HANDLE VIEWPORT CHANGES
let isDesktop = window.innerWidth >= 1024;
window.addEventListener("resize", () => {
    const nowDesktop = window.innerWidth >= 1024;
    if (nowDesktop !== isDesktop) {
        isDesktop = nowDesktop;
        activateTab(currentIndex);
    }
});
