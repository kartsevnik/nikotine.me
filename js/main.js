(function () {
  "use strict";

  const config = window.siteConfig;
  if (!config) return;

  const contactsEl = document.getElementById("contacts-list");
  const projectsEl = document.getElementById("projects-list");

  function hasUrl(url) {
    return typeof url === "string" && url.trim().length > 0;
  }

  function firstLetter(title) {
    const cleaned = (title || "?").trim().replace(/^[^A-Za-z0-9А-Яа-я]/u, "");
    return (cleaned.charAt(0) || "?").toUpperCase();
  }

  function createPlaceholder(title, className) {
    const placeholder = document.createElement("div");
    placeholder.className = className || "project-card__placeholder";
    placeholder.setAttribute("aria-hidden", "true");
    placeholder.textContent = firstLetter(title);
    return placeholder;
  }

  function attachImageFallback(img, title, placeholderClass) {
    img.addEventListener("error", function onError() {
      img.removeEventListener("error", onError);
      const parent = img.parentElement;
      if (!parent) return;
      img.remove();
      parent.prepend(createPlaceholder(title, placeholderClass));
    });
  }

  function renderContacts() {
    if (!contactsEl || !Array.isArray(config.contacts)) return;

    const fragment = document.createDocumentFragment();

    config.contacts.forEach(function (contact) {
      const isActive = hasUrl(contact.url);
      const el = document.createElement(isActive ? "a" : "div");
      el.className = "contact-btn" + (isActive ? "" : " contact-btn--disabled");
      el.setAttribute("aria-label", contact.label);

      if (isActive) {
        el.href = contact.url.trim();
        el.target = "_blank";
        el.rel = "noopener noreferrer";
      } else {
        el.setAttribute("aria-disabled", "true");
        el.title = "Link coming soon";
      }

      const img = document.createElement("img");
      img.src = contact.icon;
      img.alt = "";
      img.width = 48;
      img.height = 48;
      img.loading = "lazy";
      img.decoding = "async";
      attachImageFallback(img, contact.label, "contact-btn__placeholder");

      const span = document.createElement("span");
      span.className = "contact-btn__label";
      span.textContent = contact.label;

      el.appendChild(img);
      el.appendChild(span);
      fragment.appendChild(el);
    });

    contactsEl.appendChild(fragment);
  }

  function renderProjects() {
    if (!projectsEl || !Array.isArray(config.projects)) return;

    const fragment = document.createDocumentFragment();

    config.projects.forEach(function (project, index) {
      const comingSoon = Boolean(project.comingSoon);
      const isLink = !comingSoon && hasUrl(project.url);
      const card = document.createElement(isLink ? "a" : "div");

      card.className =
        "project-card" + (comingSoon ? " project-card--soon" : "");
      card.style.setProperty("--delay", String(0.05 * index) + "s");

      if (isLink) {
        card.href = project.url.trim();
        card.target = "_blank";
        card.rel = "noopener noreferrer";
        card.setAttribute(
          "aria-label",
          project.title + " — open project"
        );
      } else {
        card.setAttribute("aria-disabled", "true");
        card.setAttribute(
          "aria-label",
          project.title + (comingSoon ? " — coming soon" : " — link not set")
        );
      }

      const media = document.createElement("div");
      media.className = "project-card__media";

      const img = document.createElement("img");
      img.src = project.image;
      img.alt = project.title + " logo";
      img.width = 72;
      img.height = 72;
      img.loading = "lazy";
      img.decoding = "async";
      attachImageFallback(img, project.title);
      media.appendChild(img);

      const body = document.createElement("div");
      body.className = "project-card__body";

      const titleRow = document.createElement("div");
      titleRow.className = "project-card__title-row";

      const title = document.createElement("h3");
      title.className = "project-card__title";
      title.textContent = project.title;
      titleRow.appendChild(title);

      if (comingSoon) {
        const badge = document.createElement("span");
        badge.className = "project-card__badge";
        badge.textContent = "Coming soon";
        titleRow.appendChild(badge);
      }

      const description = document.createElement("p");
      description.className = "project-card__desc";
      description.textContent = project.description;

      body.appendChild(titleRow);
      body.appendChild(description);

      const arrow = document.createElement("span");
      arrow.className = "project-card__arrow";
      arrow.setAttribute("aria-hidden", "true");
      arrow.innerHTML =
        '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M7 17L17 7M10 7h7v7"/></svg>';

      card.appendChild(media);
      card.appendChild(body);
      card.appendChild(arrow);
      fragment.appendChild(card);
    });

    projectsEl.appendChild(fragment);
  }

  function revealOnLoad() {
    requestAnimationFrame(function () {
      document.body.classList.add("is-ready");
    });
  }

  renderContacts();
  renderProjects();
  revealOnLoad();
})();
