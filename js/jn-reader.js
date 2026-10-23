(function () {
  "use strict";

  const root = document.querySelector("[data-jn-reader-root]");
  if (!root) return;

  function assetPrefix() {
    return document.body?.dataset.jnRoot || "../";
  }

  function resolveAsset(path) {
    if (!path) return "";
    if (/^(https?:|\/\/|data:)/i.test(path)) return path;
    return assetPrefix() + String(path).replace(/^\//, "");
  }

  function t(source) {
    return window.siteI18n ? window.siteI18n.t(source) : source;
  }

  function escapeHtml(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function showMessage(text) {
    root.innerHTML = '<p class="jn-empty">' + escapeHtml(text) + "</p>";
    if (window.siteI18n) window.siteI18n.apply();
  }

  const pdfjsLib = window.pdfjsLib;
  const data = window.jnData;

  if (!pdfjsLib || typeof pdfjsLib.getDocument !== "function") {
    showMessage("Comic viewer failed to load. Please refresh the page.");
    return;
  }

  if (!data) {
    showMessage("Comic data failed to load. Please refresh the page.");
    return;
  }

  function findComic(slug) {
    return (data.comics || []).find(function (comic) {
      return comic.slug === slug;
    });
  }

  const slug = document.body?.dataset.comicSlug;
  const comic = findComic(slug);

  if (!comic || comic.status === "draft" || !comic.pdfUrl) {
    showMessage("This comic is not available yet.");
    return;
  }

  if (comic.status !== "published") {
    showMessage("Coming soon");
    return;
  }

  pdfjsLib.GlobalWorkerOptions.workerSrc = resolveAsset(
    "js/vendor/pdfjs/pdf.worker.min.js"
  );

  let pdfDoc = null;
  let pageCount = 0;
  let currentVisiblePage = 1;
  let lastStreamWidth = 0;
  let renderQueue = Promise.resolve();
  let observer = null;
  let visibilityObserver = null;

  root.innerHTML =
    '<section class="jn-reader" aria-label="Comic reader">' +
    '<header class="jn-reader__header">' +
    "<div>" +
    '<p class="jn-reader__eyebrow">' +
    escapeHtml(comic.subtitle || comic.title) +
    "</p>" +
    "<h1>" +
    escapeHtml(comic.title) +
    "</h1>" +
    "</div>" +
    '<a class="jn-btn jn-btn--ghost" href="' +
    escapeHtml(comic.slug + ".html") +
    '">Back to comic</a>' +
    "</header>" +
    '<p class="jn-reader__note">In-browser viewing only. Saving the original file is not offered and cannot be fully prevented.</p>' +
    '<p class="jn-reader__status" data-jn-status>Loading comic…</p>' +
    '<div class="jn-reader__stream" data-jn-stream hidden></div>' +
    '<div class="jn-reader__progress" data-jn-progress hidden aria-live="polite">' +
    '<span data-jn-page-label>Page 1 of 1</span>' +
    "</div>" +
    "</section>";

  const statusEl = root.querySelector("[data-jn-status]");
  const streamEl = root.querySelector("[data-jn-stream]");
  const progressEl = root.querySelector("[data-jn-progress]");
  const pageLabel = root.querySelector("[data-jn-page-label]");

  function updateProgressLabel(page) {
    currentVisiblePage = page;
    pageLabel.textContent =
      t("Page") + " " + page + " " + t("of") + " " + pageCount;
  }

  function getRenderWidth() {
    return Math.min(streamEl.clientWidth || window.innerWidth || 800, 960);
  }

  function enqueueRender(pageNum, slot) {
    if (!pdfDoc || !slot || slot.dataset.rendered === "1" || slot.dataset.rendering === "1") {
      return;
    }
    slot.dataset.rendering = "1";

    renderQueue = renderQueue
      .then(function () {
        if (slot.dataset.rendered === "1") return;
        return pdfDoc.getPage(pageNum).then(function (page) {
          const maxWidth = getRenderWidth();
          const unscaled = page.getViewport({ scale: 1 });
          const scale = maxWidth / unscaled.width;
          const viewport = page.getViewport({ scale: scale });
          const outputScale = window.devicePixelRatio || 1;

          if (!slot.style.aspectRatio) {
            slot.style.aspectRatio = unscaled.width + " / " + unscaled.height;
          }

          let canvas = slot.querySelector("canvas");
          if (!canvas) {
            canvas = document.createElement("canvas");
            canvas.className = "jn-reader__canvas";
            slot.appendChild(canvas);
          }

          const ctx = canvas.getContext("2d");
          canvas.width = Math.floor(viewport.width * outputScale);
          canvas.height = Math.floor(viewport.height * outputScale);
          canvas.style.width = "100%";
          canvas.style.height = "auto";

          const transform =
            outputScale !== 1 ? [outputScale, 0, 0, outputScale, 0, 0] : null;

          return page
            .render({
              canvasContext: ctx,
              viewport: viewport,
              transform: transform,
            })
            .promise.then(function () {
              slot.dataset.rendered = "1";
              slot.dataset.rendering = "0";
              slot.classList.add("is-rendered");
            });
        });
      })
      .catch(function () {
        slot.dataset.rendering = "0";
        if (!slot.querySelector(".jn-reader__slot-error")) {
          const err = document.createElement("p");
          err.className = "jn-reader__slot-error";
          err.textContent = t("Could not render this page.");
          slot.appendChild(err);
        }
      });
  }

  function clearRenderedSlots() {
    streamEl.querySelectorAll(".jn-reader__slot").forEach(function (slot) {
      slot.dataset.rendered = "0";
      slot.dataset.rendering = "0";
      slot.classList.remove("is-rendered");
      const canvas = slot.querySelector("canvas");
      if (canvas) {
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        canvas.width = 0;
        canvas.height = 0;
        canvas.remove();
      }
    });
  }

  function buildSlots(aspectRatio) {
    streamEl.innerHTML = "";
    const fragment = document.createDocumentFragment();

    for (let i = 1; i <= pageCount; i += 1) {
      const slot = document.createElement("div");
      slot.className = "jn-reader__slot";
      slot.dataset.page = String(i);
      slot.dataset.rendered = "0";
      if (aspectRatio) {
        slot.style.aspectRatio = aspectRatio;
      }
      fragment.appendChild(slot);
    }

    streamEl.appendChild(fragment);
  }

  function observeSlots() {
    if (observer) observer.disconnect();
    if (visibilityObserver) visibilityObserver.disconnect();

    observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          const slot = entry.target;
          const pageNum = Number(slot.dataset.page);
          enqueueRender(pageNum, slot);
        });
      },
      { root: null, rootMargin: "200% 0px", threshold: 0.01 }
    );

    visibilityObserver = new IntersectionObserver(
      function (entries) {
        let best = null;
        let bestRatio = 0;
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          if (entry.intersectionRatio >= bestRatio) {
            bestRatio = entry.intersectionRatio;
            best = entry.target;
          }
        });
        if (best) {
          updateProgressLabel(Number(best.dataset.page));
        }
      },
      { root: null, rootMargin: "0px", threshold: [0.25, 0.5, 0.75, 1] }
    );

    streamEl.querySelectorAll(".jn-reader__slot").forEach(function (slot) {
      observer.observe(slot);
      visibilityObserver.observe(slot);
    });
  }

  function bootStream() {
    return pdfDoc.getPage(1).then(function (firstPage) {
      const unscaled = firstPage.getViewport({ scale: 1 });
      const aspectRatio = unscaled.width + " / " + unscaled.height;
      buildSlots(aspectRatio);
      statusEl.hidden = true;
      streamEl.hidden = false;
      progressEl.hidden = false;
      updateProgressLabel(1);
      lastStreamWidth = streamEl.clientWidth;
      observeSlots();
      if (window.siteI18n) window.siteI18n.apply();
    });
  }

  let resizeTimer = null;
  window.addEventListener("resize", function () {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(function () {
      if (!pdfDoc || !streamEl) return;
      const width = streamEl.clientWidth;
      if (Math.abs(width - lastStreamWidth) < 8) return;
      lastStreamWidth = width;
      clearRenderedSlots();
      observeSlots();
    }, 220);
  });

  window.addEventListener("site:languagechange", function () {
    updateProgressLabel(currentVisiblePage);
  });

  if (window.siteI18n) window.siteI18n.apply();
  statusEl.textContent = t("Loading comic…");

  pdfjsLib
    .getDocument({
      url: resolveAsset(comic.pdfUrl),
      withCredentials: false,
    })
    .promise.then(function (doc) {
      pdfDoc = doc;
      pageCount = doc.numPages;
      return bootStream();
    })
    .catch(function () {
      showMessage("Could not open this comic for viewing.");
    });
})();
