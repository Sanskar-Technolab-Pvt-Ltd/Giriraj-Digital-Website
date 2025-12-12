const items = document.querySelectorAll(".location-item");
let lastActiveIndex = 1; // Default active is second

function setActiveByIndex(index) {
    items.forEach((item, i) => {
        item.classList.toggle("active", i === index);
    });
}

setActiveByIndex(lastActiveIndex);

// Desktop hover
items.forEach((item, index) => {
    item.addEventListener("mouseenter", () => {
        if (window.innerWidth > 1024) {
            lastActiveIndex = index;
            setActiveByIndex(index);
        }
    });
});

// Mobile tap
items.forEach((item, index) => {
    item.addEventListener("click", () => {
        if (window.innerWidth <= 1024) {
            lastActiveIndex = index;
            setActiveByIndex(index);
        }
    });
});
