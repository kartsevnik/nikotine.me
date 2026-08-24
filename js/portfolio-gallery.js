(function () {
  "use strict";

  let lightboxDialog = null;
  let activeGallery = null;
  let activeLightboxIndex = 0;

  function ensureLightbox() {
    if (lightboxDialog) return lightboxDialog;
    lightboxDialog = document.createElement("dialog");
    lightboxDialog.className = "portfolio-lightbox";
    lightboxDialog.innerHTML =
      '<div class="portfolio-lightbox__inner">' +
      '<button type="button" class="portfolio-lightbox__close" aria-label="Close">&times;</button>' +
      '<button type="button" class="portfolio-lightbox__prev" aria-label="Previous" hidden>‹</button>' +
      '<img class="portfolio-lightbox__img" alt="" />' +
      '<button type="button" class="portfolio-lightbox__next" aria-label="Next" hidden>›</button>' +
      '<div class="portfolio-lightbox__counter" aria-live="polite"></div>' +
      "</div>";
    document.body.appendChild(lightboxDialog);

    lightboxDialog.querySelector(".portfolio-lightbox__close")?.addEventListener(
      "click",
      function () {
        lightboxDialog.close();
      }
    );

    lightboxDialog.querySelector(".portfolio-lightbox__prev")?.addEventListener(
      "click",
      function (event) {
        event.stopPropagation();
        stepLightbox(-1);
      }
    );

    lightboxDialog.querySelector(".portfolio-lightbox__next")?.addEventListener(
      "click",
      function (event) {
        event.stopPropagation();
        stepLightbox(1);
      }
    );

    lightboxDialog.addEventListener("click", function (event) {
      if (event.target === lightboxDialog) {
        lightboxDialog.close();
      }
    });

    lightboxDialog.addEventListener("close", function () {
      activeGallery = null;
      activeLightboxIndex = 0;
    });

    lightboxDialog.addEventListener("keydown", function (event) {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        stepLightbox(-1);
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        stepLightbox(1);
      }
    });

    return lightboxDialog;
  }

  function getLightboxSources(gallery) {
    return Array.from(
      gallery.querySelectorAll("[data-lightbox-src]")
    ).map(function (trigger) {
      return {
        src: trigger.getAttribute("data-lightbox-src") || "",
        alt: trigger.querySelector("img")?.alt || "",
      };
    });
  }

  function updateLightboxUi() {
    const dialog = ensureLightbox();
    const sources = activeGallery ? getLightboxSources(activeGallery) : [];
    const img = dialog.querySelector(".portfolio-lightbox__img");
    const prevBtn = dialog.querySelector(".portfolio-lightbox__prev");
    const nextBtn = dialog.querySelector(".portfolio-lightbox__next");
    const counter = dialog.querySelector(".portfolio-lightbox__counter");
    const hasMultiple = sources.length > 1;
    const current = sources[activeLightboxIndex];

    if (!img || !current) return;

    img.src = current.src;
    img.alt = current.alt;

    if (prevBtn) prevBtn.hidden = !hasMultiple;
    if (nextBtn) nextBtn.hidden = !hasMultiple;
    if (counter) {
      counter.textContent = hasMultiple
        ? activeLightboxIndex + 1 + " / " + sources.length
        : "";
    }
  }

  function stepLightbox(delta) {
    if (!activeGallery) return;
    const sources = getLightboxSources(activeGallery);
    if (sources.length <= 1) return;

    const total = sources.length;
    activeLightboxIndex = ((activeLightboxIndex + delta) % total + total) % total;
    updateLightboxUi();
    setActiveSlide(activeGallery, activeLightboxIndex);
  }

  function openLightbox(gallery, index) {
    const dialog = ensureLightbox();
    const sources = getLightboxSources(gallery);
    if (!sources.length) return;

    activeGallery = gallery;
    activeLightboxIndex = Math.max(0, Math.min(index, sources.length - 1));
    updateLightboxUi();
    setActiveSlide(gallery, activeLightboxIndex);

    if (typeof dialog.showModal === "function") {
      dialog.showModal();
    }
  }

  function setActiveSlide(gallery, index) {
    const slides = gallery.querySelectorAll(".portfolio-gallery__slide");
    const dots = gallery.querySelectorAll(".portfolio-gallery__dot");
    if (!slides.length) return;

    const total = slides.length;
    const nextIndex = ((index % total) + total) % total;

    slides.forEach(function (slide, slideIndex) {
      slide.classList.toggle("is-active", slideIndex === nextIndex);
    });

    dots.forEach(function (dot, dotIndex) {
      const selected = dotIndex === nextIndex;
      dot.classList.toggle("is-active", selected);
      dot.setAttribute("aria-selected", String(selected));
    });

    gallery.setAttribute("data-current-slide", String(nextIndex));
  }

  function bindGallery(gallery) {
    if (gallery.getAttribute("data-gallery-bound") === "true") return;
    gallery.setAttribute("data-gallery-bound", "true");

    const slides = gallery.querySelectorAll(".portfolio-gallery__slide");
    const hasRealImages = gallery.getAttribute("data-has-images") === "true";
    const prevBtn = gallery.querySelector(".portfolio-gallery__prev");
    const nextBtn = gallery.querySelector(".portfolio-gallery__next");
    const dotsWrap = gallery.querySelector(".portfolio-gallery__dots");

    if (slides.length <= 1) {
      if (prevBtn) prevBtn.hidden = true;
      if (nextBtn) nextBtn.hidden = true;
      if (dotsWrap) dotsWrap.hidden = true;
    } else {
      if (prevBtn) {
        prevBtn.hidden = false;
        prevBtn.addEventListener("click", function () {
          const current = Number(gallery.getAttribute("data-current-slide") || "0");
          setActiveSlide(gallery, current - 1);
        });
      }
      if (nextBtn) {
        nextBtn.hidden = false;
        nextBtn.addEventListener("click", function () {
          const current = Number(gallery.getAttribute("data-current-slide") || "0");
          setActiveSlide(gallery, current + 1);
        });
      }
      if (dotsWrap) {
        dotsWrap.hidden = false;
        dotsWrap.querySelectorAll(".portfolio-gallery__dot").forEach(function (dot) {
          dot.addEventListener("click", function () {
            const index = Number(dot.getAttribute("data-slide-index") || "0");
            setActiveSlide(gallery, index);
          });
        });
      }
    }

    if (hasRealImages) {
      gallery.querySelectorAll("[data-lightbox-src]").forEach(function (trigger) {
        trigger.addEventListener("click", function () {
          const index = Number(trigger.getAttribute("data-lightbox-index") || "0");
          openLightbox(gallery, index);
        });
      });
    }

    gallery.setAttribute("data-current-slide", "0");
  }

  function bindPortfolioGalleries(container) {
    if (!container) return;
    container.querySelectorAll("[data-portfolio-gallery]").forEach(bindGallery);
  }

  window.bindPortfolioGalleries = bindPortfolioGalleries;
})();
