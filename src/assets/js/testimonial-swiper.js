document.addEventListener("DOMContentLoaded", () => {
    const swiperEl = document.querySelector(".mySwiper2");

    if (!swiperEl) return;

    swiperEl.addEventListener("swiperinit", (event) => {
        console.log("Testimonial swiper initialized");
    });

    swiperEl.addEventListener("swiperslidechange", (event) => {
        console.log("Testimonial swiper slide change");
    });
});
