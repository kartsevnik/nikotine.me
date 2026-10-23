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
  let pageNumber = 1;
  let rendering = false;
  let pendingPage = null;

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
    '<div class="jn-reader__toolbar" role="toolbar" aria-label="Page controls">' +
    '<button type="button" class="jn-btn jn-btn--ghost" data-jn-prev>Previous</button>' +
    '<span class="jn-reader__page" data-jn-page-label>Page 1 of 1</span>' +
    '<button type="button" class="jn-btn jn-btn--ghost" data-jn-next>Next</button>' +
    "</div>" +
    '<p class="jn-reader__note">In-browser viewing only. Saving the original file is not offered and cannot be fully prevented.</p>' +
    '<div class="jn-reader__stage">' +
    '<p class="jn-reader__status" data-jn-status>Loading comic…</p>' +
    '<canvas class="jn-reader__canvas" hidden></canvas>' +
    "</div>" +
    "</section>";

  const canvas = root.querySelector(".jn-reader__canvas");
  const ctx = canvas.getContext("2d");
  const statusEl = root.querySelector("[data-jn-status]");
  const pageLabel = root.querySelector("[data-jn-page-label]");
  const prevBtn = root.querySelector("[data-jn-prev]");
  const nextBtn = root.querySelector("[data-jn-next]");

  function updateControls() {
    const total = pdfDoc ? pdfDoc.numPages : 1;
    pageLabel.textContent =
      t("Page") + " " + pageNumber + " " + t("of") + " " + total;
    prevBtn.disabled = pageNumber <= 1;
    nextBtn.disabled = !pdfDoc || pageNumber >= pdfDoc.numPages;
  }

  function queueRender(num) {
    if (rendering) {
      pendingPage = num;
      return;
    }
    renderPage(num);
  }

  function renderPage(num) {
    rendering = true;
    pdfDoc
      .getPage(num)
      .then(function (page) {
        const stage = root.querySelector(".jn-reader__stage");
        const maxWidth = Math.min(stage.clientWidth || 800, 960);
        const unscaled = page.getViewport({ scale: 1 });
        const scale = maxWidth / unscaled.width;
        const viewport = page.getViewport({ scale: scale });
        const outputScale = window.devicePixelRatio || 1;

        canvas.width = Math.floor(viewport.width * outputScale);
        canvas.height = Math.floor(viewport.height * outputScale);
        canvas.style.width = Math.floor(viewport.width) + "px";
        canvas.style.height = Math.floor(viewport.height) + "px";

        const transform =
          outputScale !== 1 ? [outputScale, 0, 0, outputScale, 0, 0] : null;

        return page.render({
          canvasContext: ctx,
          viewport: viewport,
          transform: transform,
        }).promise;
      })
      .then(function () {
        rendering = false;
        statusEl.hidden = true;
        canvas.hidden = false;
        updateControls();
        if (pendingPage !== null) {
          const next = pendingPage;
          pendingPage = null;
          queueRender(next);
        }
      })
      .catch(function () {
        rendering = false;
        statusEl.hidden = false;
        statusEl.textContent = t("Could not render this page.");
        if (window.siteI18n) window.siteI18n.apply();
      });
  }

  function goTo(delta) {
    if (!pdfDoc) return;
    const next = pageNumber + delta;
    if (next < 1 || next > pdfDoc.numPages) return;
    pageNumber = next;
    updateControls();
    queueRender(pageNumber);
  }

  prevBtn.addEventListener("click", function () {
    goTo(-1);
  });
  nextBtn.addEventListener("click", function () {
    goTo(1);
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowLeft") goTo(-1);
    if (event.key === "ArrowRight") goTo(1);
  });

  let resizeTimer = null;
  let lastStageWidth = 0;
  window.addEventListener("resize", function () {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(function () {
      if (!pdfDoc) return;
      const stage = root.querySelector(".jn-reader__stage");
      const width = stage ? stage.clientWidth : 0;
      if (Math.abs(width - lastStageWidth) < 8) return;
      lastStageWidth = width;
      queueRender(pageNumber);
    }, 200);
  });

  window.addEventListener("site:languagechange", function () {
    updateControls();
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
      pageNumber = 1;
      const stage = root.querySelector(".jn-reader__stage");
      lastStageWidth = stage ? stage.clientWidth : 0;
      updateControls();
      queueRender(pageNumber);
    })
    .catch(function () {
      showMessage("Could not open this comic for viewing.");
    });
})();
