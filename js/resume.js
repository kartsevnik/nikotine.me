(function () {
  "use strict";

  const root = document.getElementById("resume-root");
  const skillsRoot = document.getElementById("resume-skills-root");
  const heroExtras = document.getElementById("resume-hero-extras");
  const heroLeadWrap = document.querySelector("[data-resume-hero-lead]");

  const TAB_LABEL_KEYS = {
    "it-experience": "navItExperience",
    projects: "navProjects",
    "italy-other": "navItaly",
    ukraine: "navUkraine",
    education: "navEducation",
    languages: "navLanguages",
  };

  const DEFAULT_TAB_ID = "it-experience";
  let activeTabId = DEFAULT_TAB_ID;

  function escapeHtml(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function encodeAssetUrl(value) {
    return encodeURI(String(value || ""));
  }

  function getProjectImages(project) {
    if (project.images?.length) return project.images;
    if (project.id && window.portfolioImages?.[project.id]?.length) {
      return window.portfolioImages[project.id];
    }
    return [];
  }

  function externalLink(url, label) {
    const safeUrl = escapeHtml(url);
    const safeLabel = escapeHtml(label || url);
    return (
      '<a class="content-link" href="' +
      safeUrl +
      '" target="_blank" rel="noopener noreferrer">' +
      safeLabel +
      "</a>"
    );
  }

  function renderList(items) {
    if (!items?.length) return "";
    return (
      '<ul class="resume-list">' +
      items
        .map(function (item) {
          return "<li>" + escapeHtml(item) + "</li>";
        })
        .join("") +
      "</ul>"
    );
  }

  function getTabLabel(accordion, labels) {
    const key = TAB_LABEL_KEYS[accordion.id];
    return (key && labels[key]) || accordion.title;
  }

  function renderHeroLead(paragraphs) {
    if (!heroLeadWrap || !paragraphs?.length) return;
    heroLeadWrap.innerHTML = paragraphs
      .map(function (paragraph) {
        return '<p class="content-hero__lead">' + escapeHtml(paragraph) + "</p>";
      })
      .join("");
  }

  function renderHeroExtras(content) {
    if (!heroExtras) return;
    const github = content.github;
    let html = '<div class="resume-hero-extras">';

    if (github?.url) {
      html += '<div class="resume-hero-badges">';
      html +=
        '<a class="resume-badge resume-badge--link" href="' +
        escapeHtml(github.url) +
        '" target="_blank" rel="noopener noreferrer">' +
        escapeHtml(github.label || "GitHub") +
        "</a>";
      html += "</div>";
    }

    if (content.heroSoftSkills?.length) {
      html += '<div class="resume-soft-chips" aria-label="Soft skills">';
      content.heroSoftSkills.forEach(function (skill) {
        html +=
          '<span class="resume-soft-chips__item">' + escapeHtml(skill) + "</span>";
      });
      html += "</div>";
    }

    html += "</div>";
    heroExtras.innerHTML = html;
  }

  function renderSkills(content) {
    if (!skillsRoot || !content.skills) return;
    const section = content.skills;
    let html =
      '<div class="resume-skills__inner">' +
      '<h2 id="skills" class="resume-skills__title">' +
      escapeHtml(section.title) +
      "</h2>" +
      '<table class="skills-table"><tbody>';

    section.groups.forEach(function (group) {
      html += "<tr>";
      html += '<th scope="row">' + escapeHtml(group.title) + "</th>";
      html +=
        "<td>" +
        escapeHtml((group.tags || []).join(" · ")) +
        "</td>";
      html += "</tr>";
    });

    html += "</tbody></table></div>";
    skillsRoot.innerHTML = html;
  }

  function getCardLayout(accordion) {
    if (accordion.cardLayout) return accordion.cardLayout;
    if (accordion.type === "itDevelopment") return "stack";
    if (accordion.type === "education") return "stack";
    if (accordion.type === "portfolio") return "stack";
    if (accordion.type === "languages") return "languages";
    return "grid";
  }

  function wrapCards(cardsHtml, layout) {
    if (!cardsHtml) return "";
    let extraClass = "";
    if (layout === "stack") extraClass = " resume-cards--stack";
    if (layout === "languages") extraClass = " resume-cards--languages";
    return '<div class="resume-cards' + extraClass + '">' + cardsHtml + "</div>";
  }

  function renderLinkList(links) {
    if (!links?.length) return "";
    return (
      '<ul class="resume-link-list">' +
      links
        .map(function (link) {
          return (
            "<li>" + externalLink(link.url, link.label || link.url) + "</li>"
          );
        })
        .join("") +
      "</ul>"
    );
  }

  function renderCardBody(entry) {
    let bodyHtml = "";
    if (entry.note) {
      bodyHtml += "<p>" + escapeHtml(entry.note) + "</p>";
    }
    if (entry.summary) {
      bodyHtml += "<p>" + escapeHtml(entry.summary) + "</p>";
    }
    if (entry.stack) {
      bodyHtml +=
        '<p class="resume-card__stack">' + escapeHtml(entry.stack) + "</p>";
    }
    if (entry.bullets?.length) {
      bodyHtml += renderList(entry.bullets);
    }
    if (entry.links?.length) {
      bodyHtml += renderLinkList(entry.links);
    }
    if (entry.details) {
      bodyHtml += "<p>" + escapeHtml(entry.details) + "</p>";
    }
    return bodyHtml;
  }

  function renderCard(options) {
    const opts = options || {};
    let html =
      '<article class="resume-card' +
      (opts.extraClass ? " " + opts.extraClass : "") +
      (opts.isCurrent ? " resume-card--current" : "") +
      '">';

    if (opts.period) {
      html += '<p class="resume-card__period">' + escapeHtml(opts.period) + "</p>";
    }
    if (opts.headHtml) {
      html += opts.headHtml;
    } else if (opts.title) {
      html += '<div class="resume-card__head">';
      html += '<h3 class="resume-card__title">' + escapeHtml(opts.title) + "</h3>";
      if (opts.titleSuffixHtml) {
        html += opts.titleSuffixHtml;
      }
      if (opts.isCurrent && opts.currentLabel) {
        html +=
          '<span class="resume-card__badge">' +
          escapeHtml(opts.currentLabel) +
          "</span>";
      }
      html += "</div>";
    }
    if (opts.meta) {
      html += '<p class="resume-card__meta">' + escapeHtml(opts.meta) + "</p>";
    }
    if (opts.linkHtml) {
      html += '<p class="resume-card__link">' + opts.linkHtml + "</p>";
    }
    if (opts.bodyHtml) {
      html += '<div class="resume-card__body">' + opts.bodyHtml + "</div>";
    }
    if (opts.footerHtml) {
      html += opts.footerHtml;
    }

    html += "</article>";
    return html;
  }

  function renderItDevelopment(accordion, labels) {
    let html = '<div class="resume-timeline">';
    (accordion.roles || []).forEach(function (role) {
      const isCurrent = Boolean(role.current);
      html +=
        '<article class="resume-timeline__item' +
        (isCurrent ? " resume-timeline__item--current" : "") +
        '">';

      html += '<div class="resume-timeline__marker" aria-hidden="true">';
      if (role.icon) {
        html +=
          '<img src="' +
          escapeHtml(role.icon) +
          '" alt="" loading="lazy" />';
      }
      html += "</div>";

      html += '<div class="resume-timeline__content">';
      html += '<div class="resume-timeline__head">';
      html +=
        '<h3 class="resume-timeline__title">' +
        escapeHtml(role.role) +
        "</h3>";
      if (isCurrent && labels.currentRole) {
        html +=
          '<span class="resume-card__badge">' +
          escapeHtml(labels.currentRole) +
          "</span>";
      }
      html += "</div>";
      if (role.period) {
        html +=
          '<p class="resume-timeline__period">' +
          escapeHtml(role.period) +
          "</p>";
      }
      if (role.meta) {
        html +=
          '<p class="resume-timeline__meta">' + escapeHtml(role.meta) + "</p>";
      }
      const bodyHtml = renderCardBody(role);
      if (bodyHtml) {
        html += '<div class="resume-timeline__body">' + bodyHtml + "</div>";
      }
      html += "</div></article>";
    });
    html += "</div>";
    return html;
  }

  function renderPortfolioThumbnail(thumbnail) {
    if (!thumbnail?.src) return "";
    return (
      '<div class="portfolio-project-card__thumb">' +
      '<img src="' +
      escapeHtml(thumbnail.src) +
      '" alt="' +
      escapeHtml(thumbnail.alt || "") +
      '" loading="lazy" />' +
      "</div>"
    );
  }

  function renderPortfolioMedia(project, labels) {
    if (project.thumbnail) {
      return renderPortfolioThumbnail(project.thumbnail);
    }
    return renderPortfolioGallery(project, labels);
  }

  function renderPortfolioGallery(project, labels) {
    const images = getProjectImages(project);
    const galleryId = project.id || "";
    const placeholderText =
      labels.screenshotsComingSoon || "Screenshots coming soon";
    const hasImages = images.length > 0;
    let slidesHtml = "";

    if (!hasImages) {
      slidesHtml +=
        '<div class="portfolio-gallery__slide is-active" data-slide-index="0">' +
        '<div class="portfolio-gallery__placeholder"><span>' +
        escapeHtml(placeholderText) +
        "</span></div></div>";
    } else {
      images.forEach(function (image, index) {
        const previewSrc = encodeAssetUrl(image.src);
        const lightboxSrc = encodeAssetUrl(image.src);
        slidesHtml +=
          '<div class="portfolio-gallery__slide' +
          (index === 0 ? " is-active" : "") +
          '" data-slide-index="' +
          index +
          '">' +
          '<button type="button" class="portfolio-gallery__zoom" data-lightbox-src="' +
          lightboxSrc +
          '" data-lightbox-index="' +
          index +
          '" aria-label="' +
          escapeHtml(labels.viewImage || "View image") +
          '">' +
          '<img src="' +
          previewSrc +
          '" alt="' +
          escapeHtml(image.alt || "") +
          '" loading="lazy" decoding="async" />' +
          "</button></div>";
      });
    }

    let dotsHtml = "";
    if (images.length > 1) {
      dotsHtml = '<div class="portfolio-gallery__dots" role="tablist">';
      images.forEach(function (_image, index) {
        dotsHtml +=
          '<button type="button" class="portfolio-gallery__dot' +
          (index === 0 ? " is-active" : "") +
          '" role="tab" data-slide-index="' +
          index +
          '" aria-selected="' +
          String(index === 0) +
          '" aria-label="' +
          escapeHtml((labels.slide || "Slide") + " " + (index + 1)) +
          '"></button>';
      });
      dotsHtml += "</div>";
    }

    return (
      '<div class="portfolio-gallery" data-portfolio-gallery data-gallery-id="' +
      escapeHtml(galleryId) +
      '" data-has-images="' +
      String(hasImages) +
      '" data-current-slide="0">' +
      '<div class="portfolio-gallery__viewport" aria-live="polite">' +
      slidesHtml +
      "</div>" +
      '<button type="button" class="portfolio-gallery__prev" aria-label="' +
      escapeHtml(labels.previous || "Previous") +
      '"' +
      (images.length > 1 ? "" : " hidden") +
      ">‹</button>" +
      '<button type="button" class="portfolio-gallery__next" aria-label="' +
      escapeHtml(labels.next || "Next") +
      '"' +
      (images.length > 1 ? "" : " hidden") +
      ">›</button>" +
      dotsHtml +
      "</div>"
    );
  }

  function renderPortfolioProjectCard(project, labels, variant) {
    const techLabel = labels.technologies || "Technologies";
    const techLine = (project.technologies || []).join(" · ");
    let actionsHtml = "";

    if (project.github) {
      actionsHtml +=
        '<a class="portfolio-project-card__btn content-link" href="' +
        escapeHtml(project.github) +
        '" target="_blank" rel="noopener noreferrer">' +
        escapeHtml(labels.github || "GitHub") +
        "</a>";
    }
    if (project.liveDemo) {
      actionsHtml +=
        '<a class="portfolio-project-card__btn content-link" href="' +
        escapeHtml(project.liveDemo) +
        '" target="_blank" rel="noopener noreferrer">' +
        escapeHtml(labels.liveDemo || "Live Demo") +
        "</a>";
    }
    if (project.liveSite) {
      actionsHtml +=
        '<a class="portfolio-project-card__btn content-link" href="' +
        escapeHtml(project.liveSite) +
        '" target="_blank" rel="noopener noreferrer">' +
        escapeHtml(labels.liveSite || "Live Site") +
        "</a>";
    }

    return (
      '<article class="portfolio-project-card portfolio-project-card--' +
      escapeHtml(variant) +
      '">' +
      renderPortfolioMedia(project, labels) +
      '<div class="portfolio-project-card__body">' +
      "<h4 class=\"portfolio-project-card__title\">" +
      escapeHtml(project.title) +
      "</h4>" +
      (project.bullets?.length
        ? '<div class="portfolio-project-card__desc">' +
        renderList(project.bullets) +
        "</div>"
        : project.description
          ? '<p class="portfolio-project-card__desc">' +
          escapeHtml(project.description) +
          "</p>"
          : "") +
      (project.role
        ? '<p class="portfolio-project-card__role"><strong>' +
        escapeHtml(labels.myRole || "My role") +
        ":</strong> " +
        escapeHtml(project.role) +
        "</p>"
        : "") +
      (techLine
        ? '<p class="portfolio-project-card__tech"><strong>' +
        escapeHtml(techLabel) +
        ":</strong> " +
        escapeHtml(techLine) +
        "</p>"
        : "") +
      (actionsHtml
        ? '<div class="portfolio-project-card__actions">' + actionsHtml + "</div>"
        : "") +
      "</div></article>"
    );
  }

  function renderPortfolioTechTags(technologiesLine) {
    if (!technologiesLine) return "";
    const items = String(technologiesLine)
      .split("·")
      .map(function (item) {
        return item.trim();
      })
      .filter(Boolean);
    if (!items.length) return "";

    let html = '<div class="portfolio-pp__tech"><div class="portfolio-pp__tech-tags">';
    items.forEach(function (item) {
      html +=
        '<span class="portfolio-pp__tech-tag">' +
        escapeHtml(item) +
        "</span>";
    });
    html += "</div></div>";
    return html;
  }

  function workAreaLine(area) {
    if (area?.line) return area.line;
    if (area?.bullets?.length) return area.bullets.join(" · ");
    return "";
  }

  function renderPortfolio(accordion) {
    const portfolio = accordion.portfolio || {};
    const labels = portfolio.labels || {};
    const sections = portfolio.sections || {};
    const pp = sections.powerPlatform || {};
    const angularProjects = sections.angularProjects || [];
    const webProjects = sections.webProjects || [];

    let html = '<div class="portfolio">';

    html +=
      '<section class="portfolio-section portfolio-section--pp portfolio-pp-reveal" data-pp-reveal>' +
      '<h3 class="portfolio-section__title">' +
      escapeHtml(labels.sectionPowerPlatform || "Power Platform") +
      "</h3>" +
      '<div class="portfolio-pp-block">' +
      "<h4 class=\"portfolio-pp-block__heading\">" +
      escapeHtml(pp.title || "Microsoft Power Platform & Dynamics 365 Developer") +
      "</h4>";

    if (pp.intro) {
      html +=
        '<p class="portfolio-pp__intro">' + escapeHtml(pp.intro) + "</p>";
    }
    if (pp.focusLine) {
      html +=
        '<p class="portfolio-pp__focus">' + escapeHtml(pp.focusLine) + "</p>";
    }

    html += renderPortfolioTechTags(pp.technologiesLine);

    const workAreas = pp.workAreas || [];
    if (workAreas.length) {
      html +=
        '<h5 class="portfolio-pp__cap-title">' +
        escapeHtml(labels.sectionCapabilities || "Capabilities") +
        "</h5>";
      html += '<div class="portfolio-pp__capabilities">';
      workAreas.forEach(function (area, index) {
        const num = String(index + 1).padStart(2, "0");
        const line = workAreaLine(area);
        html +=
          '<div class="portfolio-pp__capability" style="--cap-delay: ' +
          String(index * 80) +
          'ms">' +
          '<span class="portfolio-pp__capability-num">' +
          num +
          "</span>" +
          '<div class="portfolio-pp__capability-body">' +
          '<p class="portfolio-pp__capability-title">' +
          escapeHtml(area.title || "") +
          "</p>";
        if (line) {
          html +=
            '<p class="portfolio-pp__capability-line">' +
            escapeHtml(line) +
            "</p>";
        }
        html += "</div></div>";
      });
      html += "</div>";
    }

    const pcfExamples = pp.pcfExamples || [];
    if (pcfExamples.length) {
      html +=
        '<h5 class="portfolio-pp__pcf-title">' +
        escapeHtml(
          labels.sectionSelectedWork ||
            labels.sectionPcfExamples ||
            "Selected Work"
        ) +
        "</h5>";
      html += '<div class="portfolio-projects portfolio-projects--pcf">';
      pcfExamples.forEach(function (project) {
        html += renderPortfolioProjectCard(project, labels, "pcf");
      });
      html += "</div>";
    }

    html += "</div></section>";

    html +=
      '<section class="portfolio-section">' +
      '<h3 class="portfolio-section__title">' +
      escapeHtml(labels.sectionAngular || "Angular Projects") +
      "</h3>" +
      '<div class="portfolio-projects portfolio-projects--angular">';
      angularProjects.forEach(function (project) {
        html += renderPortfolioProjectCard(project, labels, "angular");
      });
      html += "</div></section>";

    html +=
      '<section class="portfolio-section">' +
      '<h3 class="portfolio-section__title">' +
      escapeHtml(labels.sectionWeb || "Web Projects") +
      "</h3>" +
      '<div class="portfolio-projects portfolio-projects--web">';
      webProjects.forEach(function (project) {
        html += renderPortfolioProjectCard(project, labels, "web");
      });
      html += "</div></section>";

    html += "</div>";
    return html;
  }

  function renderHighlights(accordion) {
    let cardsHtml = "";
    (accordion.items || []).forEach(function (item) {
      const linkHtml =
        item.link && !item.links?.length
          ? externalLink(item.link, item.linkLabel || item.link)
          : "";
      cardsHtml += renderCard({
        period: item.period,
        title: item.title,
        meta: item.meta || item.location || "",
        linkHtml: linkHtml,
        bodyHtml: renderCardBody(item),
      });
    });
    return wrapCards(cardsHtml, getCardLayout(accordion));
  }

  function renderCompactEntries(accordion) {
    let html = '<div class="resume-timeline">';
    (accordion.entries || []).forEach(function (entry) {
      html += '<article class="resume-timeline__item">';
      html += renderTimelineMarker(entry.icons || entry.icon);

      html += '<div class="resume-timeline__content">';
      if (entry.role) {
        html +=
          '<div class="resume-timeline__head">' +
          '<h3 class="resume-timeline__title">' +
          escapeHtml(entry.role) +
          "</h3></div>";
      }
      if (entry.period) {
        html +=
          '<p class="resume-timeline__period">' +
          escapeHtml(entry.period) +
          "</p>";
      }
      let meta = entry.company || "";
      if (entry.location) {
        meta += (meta ? " · " : "") + entry.location;
      }
      if (meta) {
        html +=
          '<p class="resume-timeline__meta">' + escapeHtml(meta) + "</p>";
      }
      const bodyHtml = renderCardBody(entry);
      if (bodyHtml) {
        html += '<div class="resume-timeline__body">' + bodyHtml + "</div>";
      }
      html += "</div></article>";
    });
    html += "</div>";
    return html;
  }

  function renderTimelineMarker(icons) {
    const list = Array.isArray(icons)
      ? icons.filter(Boolean)
      : icons
        ? [icons]
        : [];
    const stackClass =
      list.length > 1 ? " resume-timeline__marker--stack" : "";
    let html =
      '<div class="resume-timeline__marker' +
      stackClass +
      '" aria-hidden="true">';
    list.forEach(function (src) {
      html +=
        '<img src="' + escapeHtml(src) + '" alt="" loading="lazy" />';
    });
    html += "</div>";
    return html;
  }

  function renderEducation(accordion) {
    let html = '<div class="resume-timeline">';
    (accordion.entries || []).forEach(function (entry) {
      html += '<article class="resume-timeline__item">';
      html += renderTimelineMarker(entry.icons || entry.icon);

      html += '<div class="resume-timeline__content">';
      if (entry.degree) {
        html +=
          '<div class="resume-timeline__head">' +
          '<h3 class="resume-timeline__title">' +
          escapeHtml(entry.degree) +
          "</h3></div>";
      }
      if (entry.period) {
        html +=
          '<p class="resume-timeline__period">' +
          escapeHtml(entry.period) +
          "</p>";
      }
      const meta = [entry.institution, entry.location]
        .filter(Boolean)
        .join(" · ");
      if (meta) {
        html +=
          '<p class="resume-timeline__meta">' + escapeHtml(meta) + "</p>";
      }
      if (entry.link) {
        html +=
          '<p class="resume-timeline__link">' +
          externalLink(entry.link, entry.linkLabel || entry.link) +
          "</p>";
      }
      const bodyHtml = renderCardBody(entry);
      if (bodyHtml) {
        html += '<div class="resume-timeline__body">' + bodyHtml + "</div>";
      }
      html += "</div></article>";
    });
    html += "</div>";
    return html;
  }

  const LANG_GREETINGS = {
    ua: "Привіт!",
    ru: "Привет!",
    it: "Ciao!",
    en: "Hello!",
  };

  function renderLanguagesTable(accordion) {
    let cardsHtml = "";
    (accordion.rows || []).forEach(function (row) {
      const langClass = row.langCode
        ? " resume-card--lang-" + row.langCode
        : "";
      let footerHtml = "";
      if (row.langCode) {
        const greeting = LANG_GREETINGS[row.langCode] || "";
        footerHtml =
          '<div class="resume-card__lang-bubble" aria-hidden="true">' +
          '<span class="resume-card__lang-bubble-text">' +
          escapeHtml(greeting) +
          "</span></div>" +
          '<div class="resume-card__lang-art">' +
          '<div class="resume-card__lang-figure">' +
          '<img src="img/resume/languages/' +
          escapeHtml(row.langCode) +
          '.png" alt="" loading="lazy" />' +
          "</div></div>";
      }
      cardsHtml += renderCard({
        extraClass: "resume-card--language" + langClass,
        title: row.name,
        titleSuffixHtml:
          '<span class="resume-card__lang-level">' +
          escapeHtml(row.level) +
          "</span>",
        footerHtml: footerHtml,
      });
    });
    return wrapCards(cardsHtml, "languages");
  }

  function renderPanelBody(accordion, labels) {
    switch (accordion.type) {
      case "itDevelopment":
        return renderItDevelopment(accordion, labels);
      case "portfolio":
        return renderPortfolio(accordion);
      case "highlights":
        return renderHighlights(accordion);
      case "compactEntries":
        return renderCompactEntries(accordion);
      case "education":
        return renderEducation(accordion);
      case "languages":
        return renderLanguagesTable(accordion);
      default:
        return "";
    }
  }

  function renderPanelIntro(accordion) {
    if (!accordion.hint || accordion.type === "languages") return "";
    return '<p class="resume-panel-intro">' + escapeHtml(accordion.hint) + "</p>";
  }

  function renderTabPanel(content) {
    if (!root) return;
    const labels = content.labels || {};
    const accordions = content.accordions || [];
    const tabIds = accordions.map(function (a) {
      return a.id;
    });
    const hash = window.location.hash.replace(/^#/, "");
    if (hash && tabIds.includes(hash)) {
      activeTabId = hash;
    } else if (!tabIds.includes(activeTabId)) {
      activeTabId = tabIds[0] || DEFAULT_TAB_ID;
    }

    let html =
      '<div class="resume-tabs" data-resume-tabs>' +
      '<div class="resume-tabs__list" role="tablist" aria-label="' +
      escapeHtml(labels.tabsAriaLabel || "Experience and background") +
      '">';

    accordions.forEach(function (accordion) {
      const isActive = accordion.id === activeTabId;
      html +=
        '<button type="button" class="resume-tab' +
        (isActive ? " is-active" : "") +
        '" role="tab" id="tab-' +
        escapeHtml(accordion.id) +
        '" aria-selected="' +
        String(isActive) +
        '" aria-controls="panel-' +
        escapeHtml(accordion.id) +
        '" tabindex="' +
        (isActive ? "0" : "-1") +
        '" data-tab-id="' +
        escapeHtml(accordion.id) +
        '">' +
        escapeHtml(getTabLabel(accordion, labels)) +
        "</button>";
    });

    html += '</div><div class="resume-tabs__panels">';

    accordions.forEach(function (accordion) {
      const isActive = accordion.id === activeTabId;
      const panelLayout = getCardLayout(accordion);
      html +=
        '<section class="resume-tabs__panel resume-tabs__panel--' +
        panelLayout +
        '" role="tabpanel" id="panel-' +
        escapeHtml(accordion.id) +
        '" aria-labelledby="tab-' +
        escapeHtml(accordion.id) +
        '"' +
        (isActive ? "" : ' hidden') +
        ">" +
        renderPanelIntro(accordion) +
        renderPanelBody(accordion, labels) +
        "</section>";
    });

    html += "</div></div>";
    root.innerHTML = html;
    bindTabs();
    if (typeof window.bindPortfolioGalleries === "function") {
      window.bindPortfolioGalleries(root);
    }
    initPortfolioPpReveal();
  }

  function initPortfolioPpReveal() {
    if (!root) return;
    const targets = root.querySelectorAll("[data-pp-reveal]");
    if (!targets.length) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      targets.forEach(function (el) {
        el.classList.add("is-visible");
      });
      return;
    }

    if (!("IntersectionObserver" in window)) {
      targets.forEach(function (el) {
        el.classList.add("is-visible");
      });
      return;
    }

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px" }
    );

    targets.forEach(function (el) {
      observer.observe(el);
    });
  }

  function prefersReducedMotion() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  function playTabEnter(panel) {
    if (!panel || prefersReducedMotion()) return;

    panel.classList.remove("is-entering");
    // Restart CSS animation if the same panel is re-shown quickly.
    void panel.offsetWidth;
    panel.classList.add("is-entering");

    function onEnd(event) {
      if (event.target !== panel) return;
      panel.classList.remove("is-entering");
      panel.removeEventListener("animationend", onEnd);
    }

    panel.addEventListener("animationend", onEnd);
  }

  function activateTab(tabId, options) {
    const opts = options || {};
    const container = root?.querySelector("[data-resume-tabs]");
    if (!container) return;

    const previousTabId = activeTabId;
    activeTabId = tabId;
    const tabs = container.querySelectorAll('[role="tab"]');
    const panels = container.querySelectorAll('[role="tabpanel"]');
    let visiblePanel = null;

    tabs.forEach(function (tab) {
      const selected = tab.getAttribute("data-tab-id") === tabId;
      tab.classList.toggle("is-active", selected);
      tab.setAttribute("aria-selected", String(selected));
      tab.tabIndex = selected ? 0 : -1;
    });

    panels.forEach(function (panel) {
      const visible = panel.id === "panel-" + tabId;
      panel.classList.remove("is-entering");
      panel.hidden = !visible;
      if (visible) visiblePanel = panel;
    });

    if (opts.animate && visiblePanel && previousTabId !== tabId) {
      playTabEnter(visiblePanel);
    }

    if (opts.updateHash !== false && tabId) {
      history.replaceState(null, "", "#" + tabId);
    }

    if (opts.focusTab) {
      const tab = container.querySelector('[data-tab-id="' + tabId + '"]');
      tab?.focus();
    }

    if (tabId === "projects") {
      initPortfolioPpReveal();
    }
  }

  function bindTabs() {
    const container = root?.querySelector("[data-resume-tabs]");
    if (!container) return;

    container.querySelectorAll('[role="tab"]').forEach(function (tab) {
      tab.addEventListener("click", function () {
        const tabId = tab.getAttribute("data-tab-id");
        if (tabId) activateTab(tabId, { updateHash: true, animate: true });
      });
    });

    container.querySelector('[role="tablist"]')?.addEventListener("keydown", function (event) {
      const tabs = Array.from(container.querySelectorAll('[role="tab"]'));
      const currentIndex = tabs.findIndex(function (tab) {
        return tab.getAttribute("data-tab-id") === activeTabId;
      });
      if (currentIndex < 0) return;

      let nextIndex = currentIndex;
      if (event.key === "ArrowRight") {
        nextIndex = (currentIndex + 1) % tabs.length;
      } else if (event.key === "ArrowLeft") {
        nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
      } else if (event.key === "Home") {
        nextIndex = 0;
      } else if (event.key === "End") {
        nextIndex = tabs.length - 1;
      } else {
        return;
      }

      event.preventDefault();
      const nextTab = tabs[nextIndex];
      const tabId = nextTab.getAttribute("data-tab-id");
      if (tabId) activateTab(tabId, { updateHash: true, focusTab: true, animate: true });
    });
  }

  function applyHashTab() {
    const hash = window.location.hash.replace(/^#/, "");
    if (!hash) return;
    const container = root?.querySelector("[data-resume-tabs]");
    if (!container) return;
    const tab = container.querySelector('[data-tab-id="' + hash + '"]');
    if (tab) activateTab(hash, { updateHash: false });
  }

  function render(content) {
    if (!content) return;
    renderHeroLead(content.heroLead);
    renderHeroExtras(content);
    renderSkills(content);
    renderTabPanel(content);
    applyHashTab();
  }

  function getLanguage() {
    if (window.siteI18n?.getLanguage) {
      return window.siteI18n.getLanguage();
    }
    return window.__initialLanguage || "en";
  }

  function renderCurrent() {
    const language = getLanguage();
    const content = window.resumeContent?.[language] || window.resumeContent?.en;
    render(content);
  }

  window.addEventListener("hashchange", applyHashTab);
  document.addEventListener("DOMContentLoaded", renderCurrent);
  window.addEventListener("site:languagechange", function (event) {
    render(
      window.resumeContent?.[event.detail.language] || window.resumeContent?.en
    );
  });
})();
