const swiperEl = document.querySelector(".mySwiper");
const tabItems = document.querySelectorAll(".tab-item");
const fills = document.querySelectorAll(".tab-progress-fill");

const AUTOPLAY_TIME = 5000; // 3 seconds

function updateTabs(index) {
    tabItems.forEach((tab, i) => {
        tab.classList.toggle("active", i === index);

        // Reset all progress bars
        fills[i].style.transition = "none";
        fills[i].style.width = "0%";
    });

    // Animate active progress bar
    setTimeout(() => {
        fills[index].style.transition = `width ${AUTOPLAY_TIME}ms linear`;
        fills[index].style.width = "100%";
    }, 50);
}

swiperEl.addEventListener("swiperslidechange", (e) => {
    updateTabs(e.detail[0].activeIndex);
});

window.onload = () => {
    updateTabs(0);
};

// --- MAKE TABS CLICKABLE ---
tabItems.forEach((tab) => {
    tab.addEventListener("click", () => {
        const index = parseInt(tab.dataset.index);

        // Move Swiper to selected slide
        swiperEl.swiper.slideTo(index);

        // Update tab UI + progress bar
        updateTabs(index);
    });
});
