const tabs = document.querySelectorAll(".tabs-item");
const tabImage = document.getElementById("tab-image");
let currentIndex = 0;
const intervalTime = 7000;
let autoplayInterval;

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

    const activeFills = activeTab.querySelectorAll(".progress-fill");
    activeFills.forEach(f => {
        f.style.transition = `width ${intervalTime}ms linear`;
        // use requestAnimationFrame for smooth start
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
    clearInterval(autoplayInterval);
    autoplayInterval = setInterval(nextTab, intervalTime);
}

tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => {
        clearInterval(autoplayInterval);
        activateTab(index);
        startAutoplay();
    });
});

// INITIAL LOAD
activateTab(0);
startAutoplay();

// HANDLE VIEWPORT CHANGES
let isDesktop = window.innerWidth >= 1024;
window.addEventListener("resize", () => {
    const nowDesktop = window.innerWidth >= 1024;
    if (nowDesktop !== isDesktop) {
        isDesktop = nowDesktop;
        activateTab(currentIndex);
    }
});
