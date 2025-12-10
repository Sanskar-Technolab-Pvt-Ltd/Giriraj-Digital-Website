
document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".faq-btn");

    buttons.forEach(btn => {
        btn.addEventListener("click", () => {
            const target = document.querySelector(btn.dataset.target);

            // Close all other open FAQs (accordion behavior)
            document.querySelectorAll(".faq-btn").forEach(other => {
                if (other !== btn) {
                    const otherTarget = document.querySelector(other.dataset.target);
                    otherTarget.classList.add("hidden");
                    other.querySelector(".icon-plus").classList.remove("hidden");
                    other.querySelector(".icon-minus").classList.add("hidden");
                }
            });

            // Toggle current FAQ
            target.classList.toggle("hidden");

            const plusIcon = btn.querySelector(".icon-plus");
            const minusIcon = btn.querySelector(".icon-minus");

            plusIcon.classList.toggle("hidden");
            minusIcon.classList.toggle("hidden");
        });
    });
});


document.querySelectorAll(".accordion-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        const target = document.querySelector(btn.dataset.target);

        const plus = btn.querySelector(".icon-plus");
        const minus = btn.querySelector(".icon-minus");

        const isOpen = !target.classList.contains("hidden");

        // Toggle accordion
        target.classList.toggle("hidden");

        // Swap icons
        plus.classList.toggle("hidden", !isOpen);
        minus.classList.toggle("hidden", isOpen);
    });
});
