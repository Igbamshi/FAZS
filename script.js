/* =========================================================
   FAZS WEBSITE JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* ================= MOBILE MENU ================= */

    const mobileMenu = document.getElementById("mobileMenu");
    const navMenu = document.getElementById("navMenu");

    if (mobileMenu && navMenu) {
        mobileMenu.addEventListener("click", () => {
            navMenu.classList.toggle("active");
        });

        navMenu.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                navMenu.classList.remove("active");
            });
        });
    }


    /* ================= NAVBAR SCROLL ================= */

    const navbar = document.getElementById("navbar");

    if (navbar) {
        window.addEventListener("scroll", () => {
            navbar.classList.toggle(
                "scrolled",
                window.scrollY > 40
            );
        });
    }


    /* ================= PRODUCT FILTER ================= */

    const filterButtons =
        document.querySelectorAll(".filter-btn");

    const productCards =
        document.querySelectorAll(
            ".products-grid .product-card"
        );

    filterButtons.forEach(button => {

        button.addEventListener("click", () => {

            filterButtons.forEach(btn => {
                btn.classList.remove("active");
            });

            button.classList.add("active");

            const filter =
                button.dataset.filter;

            productCards.forEach(card => {

                if (
                    filter === "all" ||
                    card.dataset.category === filter
                ) {
                    card.classList.remove("hidden");
                } else {
                    card.classList.add("hidden");
                }

            });

        });

    });


    /* ================= ORDER MODAL ================= */

    const orderModal =
        document.getElementById("orderModal");

    const modalProduct =
        document.getElementById("modalProduct");

    const modalCategory =
        document.getElementById("modalCategory");

    const modalPrice =
        document.getElementById("modalPrice");

    const quantityInput =
        document.getElementById("quantity");

    const modalClose =
        document.getElementById("modalClose");

    const continueShopping =
        document.getElementById("continueShopping");

    const sendOrder =
        document.getElementById("sendOrder");


    let selectedProduct = "";
    let selectedPrice = "";
    let selectedCategory = "";


    function openOrderModal(product, price, category) {

        selectedProduct = product;
        selectedPrice = price;
        selectedCategory = category;

        if (modalProduct) {
            modalProduct.textContent = product;
        }

        if (modalPrice) {
            modalPrice.textContent = price;
        }

        if (modalCategory) {
            modalCategory.textContent = category;
        }

        if (quantityInput) {
            quantityInput.value = 1;
        }

        if (orderModal) {
            orderModal.classList.add("active");
            document.body.style.overflow = "hidden";
        }
    }


    function closeOrderModal() {

        if (orderModal) {
            orderModal.classList.remove("active");
            document.body.style.overflow = "";
        }
    }


    /* ================= BUY BUTTONS ================= */

    document
        .querySelectorAll(".buy-button:not(.disabled)")
        .forEach(button => {

            button.addEventListener("click", event => {

                event.stopPropagation();

                openOrderModal(
                    button.dataset.product,
                    button.dataset.price,
                    button.dataset.category
                );

            });

        });


    /* ================= PRODUCT CARDS ================= */

    document
        .querySelectorAll(
            ".category-products-grid .product-card"
        )
        .forEach(card => {

            card.addEventListener("click", () => {

                if (
                    card.dataset.product &&
                    card.dataset.price &&
                    card.dataset.productCategory
                ) {
                    openOrderModal(
                        card.dataset.product,
                        card.dataset.price,
                        card.dataset.productCategory
                    );
                }

            });

        });


    /* ================= MODAL CLOSE ================= */

    if (modalClose) {
        modalClose.addEventListener(
            "click",
            closeOrderModal
        );
    }

    if (continueShopping) {
        continueShopping.addEventListener(
            "click",
            closeOrderModal
        );
    }


    if (orderModal) {

        orderModal.addEventListener(
            "click",
            event => {

                if (event.target === orderModal) {
                    closeOrderModal();
                }

            }
        );

    }


    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape" &&
                orderModal &&
                orderModal.classList.contains("active")
            ) {
                closeOrderModal();
            }

        }
    );


    /* ================= WHATSAPP ORDER ================= */

    if (sendOrder) {

        sendOrder.addEventListener(
            "click",
            () => {

                const quantity =
                    quantityInput
                        ? Math.max(
                            1,
                            Number(quantityInput.value) || 1
                        )
                        : 1;


                /*
                 * REPLACE THIS WITH THE CLIENT'S
                 * REAL WHATSAPP NUMBER.
                 *
                 * Nigerian format:
                 * 2348012345678
                 */

                const whatsappNumber =
                    "2348000000000";


                const message =
`Hello FAZS,

I would like to place an order.

Product: ${selectedProduct}
Category: ${selectedCategory}
Price: ${selectedPrice}
Quantity: ${quantity}

Please confirm availability, total cost and delivery details.

Thank you.`;


                const whatsappURL =
                    "https://wa.me/" +
                    whatsappNumber +
                    "?text=" +
                    encodeURIComponent(message);


                window.open(
                    whatsappURL,
                    "_blank"
                );

            }
        );

    }


    /* ================= CONTACT FORM ================= */

    const contactForm =
        document.getElementById("contactForm");

    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            event => {

                event.preventDefault();

                const name =
                    document.getElementById("name")?.value.trim();

                const phone =
                    document.getElementById("phone")?.value.trim();

                const product =
                    document.getElementById("product")?.value.trim();

                const message =
                    document.getElementById("message")?.value.trim();


                const whatsappNumber =
                    "2348000000000";


                const text =
`Hello FAZS,

I would like to make an inquiry.

Name: ${name}
Phone: ${phone}
Product: ${product || "Not specified"}
Message / Quantity: ${message || "Not specified"}

Thank you.`;


                const url =
                    "https://wa.me/" +
                    whatsappNumber +
                    "?text=" +
                    encodeURIComponent(text);


                window.open(url, "_blank");

                contactForm.reset();

            }
        );

    }

});
