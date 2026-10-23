(function () {
  "use strict";

  const data = window.jnData;
  if (!data) return;

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

  function visibleComics() {
    return (data.comics || []).filter(function (comic) {
      return comic.status === "published" || comic.status === "coming-soon";
    });
  }

  function findComic(slug) {
    return (data.comics || []).find(function (comic) {
      return comic.slug === slug;
    });
  }

  function statusLabel(status) {
    if (status === "published") return "Published";
    if (status === "coming-soon") return "Coming soon";
    return status;
  }

  function issueLabel(comic) {
    return "Issue " + String(comic.issueNumber);
  }

  function detailHref(comic) {
    const root = assetPrefix();
    if (root === "../../") {
      return comic.slug + ".html";
    }
    return "comics/" + comic.slug + ".html";
  }

  function readHref(comic) {
    const root = assetPrefix();
    if (root === "../../") {
      return comic.slug + "-read.html";
    }
    return "comics/" + comic.slug + "-read.html";
  }

  function coverHref(comic) {
    return resolveAsset(comic.coverImage);
  }

  function descriptionParagraphs(text) {
    return String(text || "")
      .split(/\n\n+/)
      .map(function (part) {
        return part.trim();
      })
      .filter(Boolean);
  }

  function renderBadges(comic) {
    const parts = [];
    parts.push(
      '<span class="jn-badge jn-badge--status">' +
        escapeHtml(statusLabel(comic.status)) +
        "</span>"
    );
    if (comic.isFree) {
      parts.push('<span class="jn-badge jn-badge--free">Free</span>');
    }
    return parts.join("");
  }

  function renderComicCard(comic) {
    const isPublished = comic.status === "published" && comic.pdfUrl;
    const href = detailHref(comic);
    return (
      '<article class="jn-comic-card">' +
      '<a class="jn-comic-card__link" href="' +
      escapeHtml(href) +
      '">' +
      '<div class="jn-comic-card__cover">' +
      '<img src="' +
      escapeHtml(coverHref(comic)) +
      '" alt="' +
      escapeHtml(comic.title) +
      ' cover" width="320" height="452" loading="lazy" decoding="async" />' +
      "</div>" +
      '<div class="jn-comic-card__body">' +
      '<div class="jn-comic-card__meta">' +
      "<span>" +
      escapeHtml(issueLabel(comic)) +
      "</span>" +
      renderBadges(comic) +
      "</div>" +
      "<h3 class=\"jn-comic-card__title\">" +
      escapeHtml(comic.title) +
      "</h3>" +
      (comic.subtitle
        ? '<p class="jn-comic-card__subtitle">' +
          escapeHtml(comic.subtitle) +
          "</p>"
        : "") +
      '<p class="jn-comic-card__desc">' +
      escapeHtml(comic.shortDescription) +
      "</p>" +
      '<ul class="jn-comic-card__facts">' +
      "<li><span>Level</span> " +
      escapeHtml((comic.englishLevel || []).join(", ")) +
      "</li>" +
      "<li><span>Grammar</span> " +
      escapeHtml((comic.grammarTopics || []).join(", ")) +
      "</li>" +
      "<li><span>Pages</span> " +
      escapeHtml(String(comic.pageCount)) +
      "</li>" +
      "</ul>" +
      '<span class="jn-comic-card__cta">' +
      (isPublished ? "View Details" : "Coming soon") +
      "</span>" +
      "</div>" +
      "</a>" +
      "</article>"
    );
  }

  function renderFeatured(comic) {
    if (!comic) return "";
    const isPublished = comic.status === "published" && comic.pdfUrl;
    return (
      '<div class="jn-featured">' +
      '<div class="jn-featured__cover">' +
      '<img src="' +
      escapeHtml(coverHref(comic)) +
      '" alt="' +
      escapeHtml(comic.title) +
      ' cover" width="360" height="508" loading="lazy" decoding="async" />' +
      "</div>" +
      '<div class="jn-featured__body">' +
      '<div class="jn-featured__meta">' +
      "<span>" +
      escapeHtml(issueLabel(comic)) +
      "</span>" +
      renderBadges(comic) +
      "</div>" +
      "<h2 class=\"jn-featured__title\">" +
      escapeHtml(comic.title) +
      "</h2>" +
      (comic.subtitle
        ? '<p class="jn-featured__subtitle">' +
          escapeHtml(comic.subtitle) +
          "</p>"
        : "") +
      descriptionParagraphs(comic.description)
        .map(function (p) {
          return '<p class="jn-featured__text">' + escapeHtml(p) + "</p>";
        })
        .join("") +
      '<ul class="jn-featured__facts">' +
      "<li><strong>Grammar Focus:</strong> " +
      escapeHtml((comic.grammarTopics || []).join(", ")) +
      "</li>" +
      "<li><strong>English Level:</strong> " +
      escapeHtml((comic.englishLevel || []).join(", ")) +
      "</li>" +
      "<li><strong>Pages:</strong> " +
      escapeHtml(String(comic.pageCount)) +
      "</li>" +
      "</ul>" +
      '<div class="jn-featured__actions">' +
      '<a class="jn-btn jn-btn--primary" href="' +
      escapeHtml(detailHref(comic)) +
      '">View Comic</a>' +
      (isPublished
        ? '<a class="jn-btn jn-btn--ghost" href="' +
          escapeHtml(readHref(comic)) +
          '">Read Comic</a>'
        : "") +
      "</div>" +
      "</div>" +
      "</div>"
    );
  }

  function renderLibrary(container) {
    if (!container) return;
    const comics = visibleComics();
    if (!comics.length) {
      container.innerHTML =
        '<p class="jn-empty">No comics published yet. Check back soon.</p>';
      return;
    }
    container.innerHTML =
      '<div class="jn-library-grid">' +
      comics.map(renderComicCard).join("") +
      "</div>";
  }

  function renderDetail(comic) {
    const root = document.querySelector("[data-jn-comic-root]");
    if (!root || !comic || comic.status === "draft") {
      if (root) {
        root.innerHTML =
          '<p class="jn-empty">This comic is not available yet.</p>';
      }
      return;
    }

    const isPublished = comic.status === "published" && comic.pdfUrl;
    const paragraphs = descriptionParagraphs(comic.description)
      .map(function (p) {
        return "<p>" + escapeHtml(p) + "</p>";
      })
      .join("");

    const authors = (comic.authors || [])
      .map(function (author) {
        return (
          "<li><strong>" +
          escapeHtml(author.role) +
          ":</strong> " +
          escapeHtml(author.name) +
          "</li>"
        );
      })
      .join("");

    const structure = (comic.structure || [])
      .map(function (row) {
        return (
          "<li><span>" +
          escapeHtml(row.pages) +
          "</span> " +
          escapeHtml(row.label) +
          "</li>"
        );
      })
      .join("");

    root.innerHTML =
      '<nav class="jn-breadcrumb" aria-label="Breadcrumb">' +
      '<a href="../index.html">Education</a>' +
      '<span class="jn-breadcrumb__sep" aria-hidden="true">/</span>' +
      '<a href="index.html">Comics</a>' +
      '<span class="jn-breadcrumb__sep" aria-hidden="true">/</span>' +
      '<span aria-current="page">' +
      escapeHtml(comic.title) +
      "</span>" +
      "</nav>" +
      '<p class="jn-back"><a href="index.html">← Back to Library</a></p>' +
      '<div class="jn-detail">' +
      '<div class="jn-detail__cover">' +
      '<img src="' +
      escapeHtml(coverHref(comic)) +
      '" alt="' +
      escapeHtml(comic.title) +
      ' cover" width="420" height="593" decoding="async" />' +
      "</div>" +
      '<div class="jn-detail__body">' +
      '<p class="jn-detail__series">' +
      escapeHtml(comic.seriesTitle || data.brand) +
      " · " +
      escapeHtml(issueLabel(comic)) +
      "</p>" +
      "<h1>" +
      escapeHtml(comic.title) +
      "</h1>" +
      (comic.subtitle ? "<p class=\"jn-detail__subtitle\">" + escapeHtml(comic.subtitle) + "</p>" : "") +
      '<div class="jn-detail__badges">' +
      renderBadges(comic) +
      "</div>" +
      '<div class="jn-detail__description">' +
      paragraphs +
      "</div>" +
      '<ul class="jn-detail__facts">' +
      "<li><strong>English Level:</strong> " +
      escapeHtml((comic.englishLevel || []).join(", ")) +
      "</li>" +
      "<li><strong>Grammar Focus:</strong> " +
      escapeHtml((comic.grammarTopics || []).join(", ")) +
      "</li>" +
      "<li><strong>Language:</strong> " +
      escapeHtml(comic.language) +
      "</li>" +
      "<li><strong>Format:</strong> Educational Comic / PDF</li>" +
      "<li><strong>Pages:</strong> " +
      escapeHtml(String(comic.pageCount)) +
      "</li>" +
      (comic.publishedAt
        ? "<li><strong>Published:</strong> " +
          escapeHtml(comic.publishedAt) +
          "</li>"
        : "") +
      authors +
      "</ul>" +
      '<div class="jn-detail__actions">' +
      (isPublished
        ? '<a class="jn-btn jn-btn--primary" href="' +
          escapeHtml(readHref(comic)) +
          '">Read Comic</a>'
        : '<span class="jn-btn jn-btn--disabled" aria-disabled="true">Coming soon</span>') +
      '<a class="jn-btn jn-btn--ghost" href="index.html">Back to Library</a>' +
      "</div>" +
      "</div>" +
      "</div>" +
      (structure
        ? '<section class="jn-structure" aria-labelledby="jn-structure-title">' +
          '<h2 id="jn-structure-title">What\'s Inside</h2>' +
          '<p class="jn-section__lead">This issue combines story, grammar, practice, and teacher support.</p>' +
          '<ol class="jn-structure__list">' +
          structure +
          "</ol>" +
          "</section>"
        : "");
  }

  function fillStaticFromData() {
    document.querySelectorAll("[data-jn-mission-tagline]").forEach(function (el) {
      el.textContent = data.mission.tagline;
    });
    document.querySelectorAll("[data-jn-mission-text]").forEach(function (el) {
      el.textContent = data.mission.description;
    });
    document.querySelectorAll("[data-jn-copyright]").forEach(function (el) {
      el.textContent = data.copyright;
    });
    document.querySelectorAll("[data-jn-credit-created]").forEach(function (el) {
      el.textContent = data.credits.created;
    });
    document.querySelectorAll("[data-jn-credit-edited]").forEach(function (el) {
      el.textContent = data.credits.edited;
    });
    document.querySelectorAll("[data-jn-email]").forEach(function (el) {
      el.textContent = data.email;
      if (el.tagName === "A") el.href = "mailto:" + data.email;
    });
  }

  function bindContactForms() {
    const email = data.email || "mkdiya20@gmail.com";

    document.querySelectorAll("[data-jn-contact-form]").forEach(function (form) {
      form.addEventListener("submit", function (event) {
        event.preventDefault();
        if (!form.reportValidity()) return;

        const formData = new FormData(form);
        const name = String(formData.get("name") || "").trim();
        const replyEmail = String(formData.get("email") || "").trim();
        const message = String(formData.get("message") || "").trim();

        const subject = t("J&N Education — Contact");
        const body = [
          t("Name:") + " " + name,
          t("Email:") + " " + replyEmail,
          "",
          message,
        ].join("\n");

        window.location.href =
          "mailto:" +
          email +
          "?subject=" +
          encodeURIComponent(subject) +
          "&body=" +
          encodeURIComponent(body);
      });
    });
  }

  function boot() {
    fillStaticFromData();
    bindContactForms();

    const featured = document.querySelector("[data-jn-featured]");
    if (featured) {
      const first = visibleComics()[0];
      featured.innerHTML = renderFeatured(first);
    }

    const library = document.querySelector("[data-jn-library]");
    if (library) {
      renderLibrary(library);
    }

    const explore = document.querySelector("[data-jn-explore]");
    if (explore) {
      renderLibrary(explore);
    }

    const slug = document.body?.dataset.comicSlug;
    if (slug) {
      renderDetail(findComic(slug));
    }

    if (window.siteI18n) {
      window.siteI18n.apply();
    }
  }

  function updateDynamicA11y() {
    document.querySelectorAll(".jn-comic-card__link").forEach(function (link) {
      const titleEl = link.querySelector(".jn-comic-card__title");
      const title = titleEl ? titleEl.textContent.trim() : "";
      if (title) {
        link.setAttribute("aria-label", title + " — " + t("View Details"));
      }
      const img = link.querySelector("img");
      if (img && title) {
        img.alt = title + " " + t("cover");
      }
    });
    document.querySelectorAll(".jn-featured__cover img, .jn-detail__cover img").forEach(function (img) {
      const title =
        document.querySelector(".jn-featured__title, .jn-detail h1")?.textContent?.trim() ||
        "";
      if (title) img.alt = title + " " + t("cover");
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }

  window.addEventListener("site:languagechange", function () {
    updateDynamicA11y();
  });

  document.addEventListener("DOMContentLoaded", function () {
    window.setTimeout(updateDynamicA11y, 0);
  });
})();
