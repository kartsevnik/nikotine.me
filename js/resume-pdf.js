(function () {
  "use strict";

  var COLORS = {
    ink: "#0a0b0f",
    navy: "#12182a",
    muted: "#4a5160",
    gold: "#c9a227",
    goldSoft: "#e4c76b",
    line: "#e6e2d8",
    white: "#ffffff",
  };

  var LANG_FILE_CODE = {
    en: "EN",
    it: "IT",
    ru: "RU",
    uk: "UA",
  };

  var pdfMakeReady = null;
  var isDownloading = false;

  function getLanguage() {
    if (window.siteI18n && typeof window.siteI18n.getLanguage === "function") {
      return window.siteI18n.getLanguage();
    }
    return window.__initialLanguage || "en";
  }

  function getContent(language) {
    var lang = language || getLanguage();
    return (
      (window.resumeContent && window.resumeContent[lang]) ||
      (window.resumeContent && window.resumeContent.en) ||
      null
    );
  }

  function loadScript(src) {
    return new Promise(function (resolve, reject) {
      var existing = document.querySelector('script[data-resume-pdf-src="' + src + '"]');
      if (existing) {
        if (existing.getAttribute("data-loaded") === "1") {
          resolve();
          return;
        }
        existing.addEventListener("load", function () {
          resolve();
        });
        existing.addEventListener("error", function () {
          reject(new Error("Failed to load " + src));
        });
        return;
      }

      var script = document.createElement("script");
      script.src = src;
      script.async = true;
      script.setAttribute("data-resume-pdf-src", src);
      script.onload = function () {
        script.setAttribute("data-loaded", "1");
        resolve();
      };
      script.onerror = function () {
        reject(new Error("Failed to load " + src));
      };
      document.head.appendChild(script);
    });
  }

  function ensurePdfMake() {
    if (window.pdfMake && window.resumePdfFonts) {
      applyFonts();
      return Promise.resolve(window.pdfMake);
    }
    if (pdfMakeReady) return pdfMakeReady;

    pdfMakeReady = loadScript("js/vendor/pdfmake/pdfmake.min.js")
      .then(function () {
        return loadScript("js/vendor/resume-pdf-vfs.js");
      })
      .then(function () {
        if (!window.pdfMake) {
          throw new Error("pdfMake is not available");
        }
        applyFonts();
        return window.pdfMake;
      })
      .catch(function (err) {
        pdfMakeReady = null;
        throw err;
      });

    return pdfMakeReady;
  }

  function applyFonts() {
    var pack = window.resumePdfFonts;
    if (!pack || !window.pdfMake) return;
    window.pdfMake.vfs = Object.assign({}, window.pdfMake.vfs || {}, pack.vfs);
    window.pdfMake.fonts = Object.assign({}, window.pdfMake.fonts || {}, pack.fonts);
  }

  function cleanText(value) {
    if (value == null) return "";
    return String(value).replace(/\r\n/g, "\n").replace(/\n+/g, " ").trim();
  }

  function multilineText(value) {
    if (value == null) return "";
    return String(value).replace(/\r\n/g, "\n").trim();
  }

  function joinMeta(parts) {
    return parts
      .map(function (part) {
        return cleanText(part);
      })
      .filter(Boolean)
      .join("  ·  ");
  }

  function sectionTitle(text) {
    return {
      text: cleanText(text).toUpperCase(),
      style: "sectionTitle",
      margin: [0, 14, 0, 4],
    };
  }

  function goldRule() {
    return {
      canvas: [
        {
          type: "line",
          x1: 0,
          y1: 0,
          x2: 515,
          y2: 0,
          lineWidth: 1,
          lineColor: COLORS.gold,
        },
      ],
      margin: [0, 0, 0, 8],
    };
  }

  function bullets(items) {
    if (!items || !items.length) return [];
    return [
      {
        ul: items.map(function (item) {
          return { text: cleanText(item), style: "bullet" };
        }),
        margin: [0, 2, 0, 6],
      },
    ];
  }

  function roleBlock(opts) {
    var nodes = [];
    var title = multilineText(opts.role || opts.degree || opts.title || "");
    if (opts.roleLabel) {
      title = cleanText(opts.roleLabel) + " — " + title;
    }

    nodes.push({
      text: title,
      style: "roleTitle",
      margin: [0, 6, 0, 1],
    });

    var meta = joinMeta([
      opts.period,
      opts.company || opts.institution,
      opts.location,
      opts.current ? opts.currentLabel : "",
    ]);
    if (meta) {
      nodes.push({ text: meta, style: "meta", margin: [0, 0, 0, 2] });
    }

    if (opts.secondary) {
      nodes.push({
        text: cleanText(opts.secondary),
        style: "secondary",
        margin: [0, 0, 0, 2],
      });
    }

    if (opts.link) {
      nodes.push({
        text: cleanText(opts.linkLabel || opts.link),
        link: opts.link,
        style: "link",
        margin: [0, 0, 0, 2],
      });
    }

    nodes = nodes.concat(bullets(opts.bullets));
    return nodes;
  }

  function buildHeader(content) {
    var nodes = [];
    nodes.push({ text: "Nikolay Kartsev", style: "display" });
    nodes.push({
      text: "Software Developer  ·  Power Platform  ·  Dynamics 365",
      style: "tagline",
      margin: [0, 2, 0, 6],
    });

    var links = [];
    links.push({ text: "nikotine.me", link: "https://nikotine.me", style: "linkInline" });
    if (content.github && content.github.url) {
      links.push({ text: "  ·  ", style: "meta" });
      links.push({
        text: content.github.label || "GitHub",
        link: content.github.url,
        style: "linkInline",
      });
    }
    if (content.youtube && content.youtube.url) {
      links.push({ text: "  ·  ", style: "meta" });
      links.push({
        text: content.youtube.label || "YouTube",
        link: content.youtube.url,
        style: "linkInline",
      });
    }
    nodes.push({ text: links, margin: [0, 0, 0, 4] });

    if (content.certification) {
      var cert = content.certification;
      var certLine = [
        { text: cleanText(cert.name), style: "meta" },
      ];
      if (cert.credentialId) {
        certLine.push({
          text:
            "  ·  " +
            cleanText((content.labels && content.labels.credentialId) || "ID:") +
            " " +
            cleanText(cert.credentialId),
          style: "meta",
        });
      }
      if (cert.shareUrl) {
        certLine.push({ text: "  ·  ", style: "meta" });
        certLine.push({
          text: cleanText((content.labels && content.labels.link) || "Link"),
          link: cert.shareUrl,
          style: "linkInline",
        });
      }
      nodes.push({ text: certLine, margin: [0, 0, 0, 2] });
    }

    nodes.push({
      canvas: [
        {
          type: "line",
          x1: 0,
          y1: 0,
          x2: 515,
          y2: 0,
          lineWidth: 1.25,
          lineColor: COLORS.gold,
        },
      ],
      margin: [0, 8, 0, 10],
    });

    return nodes;
  }

  function buildSummary(content) {
    var nodes = [];
    var summaryTitle =
      (content.labels && content.labels.pdfSummary) || "Summary";
    nodes.push(sectionTitle(summaryTitle));
    nodes.push(goldRule());

    (content.heroLead || []).forEach(function (paragraph) {
      nodes.push({
        text: cleanText(paragraph),
        style: "body",
        margin: [0, 0, 0, 5],
      });
    });

    if (content.heroSoftSkills && content.heroSoftSkills.length) {
      nodes.push({
        text: content.heroSoftSkills.map(cleanText).join("  ·  "),
        style: "chips",
        margin: [0, 2, 0, 4],
      });
    }

    return nodes;
  }

  function buildSkills(content) {
    if (!content.skills) return [];
    var nodes = [];
    nodes.push(sectionTitle(content.skills.title || "Skills"));
    nodes.push(goldRule());

    (content.skills.groups || []).forEach(function (group) {
      nodes.push({
        text: [
          { text: cleanText(group.title) + ": ", style: "skillLabel" },
          {
            text: (group.tags || []).map(cleanText).join(" · "),
            style: "body",
          },
        ],
        margin: [0, 0, 0, 3],
      });
    });

    return nodes;
  }

  function buildItDevelopment(accordion, content) {
    var nodes = [];
    nodes.push(sectionTitle(accordion.title));
    nodes.push(goldRule());
    (accordion.roles || []).forEach(function (role) {
      nodes = nodes.concat(
        roleBlock({
          role: role.role,
          roleLabel: role.roleLabel,
          period: role.period,
          company: role.company,
          location: role.location,
          secondary: role.secondary,
          current: role.current,
          currentLabel: content.labels && content.labels.currentRole,
          bullets: role.bullets,
        })
      );
    });
    return nodes;
  }

  function buildCompactEntries(accordion) {
    var nodes = [];
    nodes.push(sectionTitle(accordion.title));
    nodes.push(goldRule());
    (accordion.entries || []).forEach(function (entry) {
      nodes = nodes.concat(
        roleBlock({
          role: entry.role,
          period: entry.period,
          company: entry.company,
          location: entry.location,
          bullets: entry.bullets,
        })
      );
    });
    return nodes;
  }

  function buildEducation(accordion) {
    var nodes = [];
    nodes.push(sectionTitle(accordion.title));
    nodes.push(goldRule());
    (accordion.entries || []).forEach(function (entry) {
      nodes = nodes.concat(
        roleBlock({
          degree: entry.degree,
          period: entry.period,
          institution: entry.institution,
          location: entry.location,
          link: entry.link,
          linkLabel: entry.linkLabel,
          bullets: entry.bullets,
        })
      );
    });
    return nodes;
  }

  function buildLanguages(accordion) {
    var nodes = [];
    nodes.push(sectionTitle(accordion.title));
    nodes.push(goldRule());
    (accordion.rows || []).forEach(function (row) {
      nodes.push({
        columns: [
          { text: cleanText(row.name), style: "body", width: "*" },
          {
            text: cleanText(row.level),
            style: "meta",
            alignment: "right",
            width: 120,
          },
        ],
        margin: [0, 1, 0, 1],
      });
    });
    return nodes;
  }

  function buildPortfolioItem(item, labels) {
    var nodes = [];
    nodes.push({
      text: cleanText(item.title),
      style: "roleTitle",
      margin: [0, 6, 0, 1],
    });

    if (item.description) {
      nodes.push({
        text: cleanText(item.description),
        style: "body",
        margin: [0, 0, 0, 2],
      });
    }

    if (item.role) {
      var roleLabel = (labels && labels.myRole) || "My role";
      nodes.push({
        text: [
          { text: roleLabel + ": ", style: "skillLabel" },
          { text: cleanText(item.role), style: "body" },
        ],
        margin: [0, 0, 0, 2],
      });
    }

    nodes = nodes.concat(bullets(item.bullets));

    if (item.technologies && item.technologies.length) {
      var techLabel = (labels && labels.technologies) || "Technologies";
      nodes.push({
        text: [
          { text: techLabel + ": ", style: "skillLabel" },
          {
            text: item.technologies.map(cleanText).join(" · "),
            style: "meta",
          },
        ],
        margin: [0, 0, 0, 4],
      });
    }

    if (item.liveSite || item.github || item.liveDemo) {
      var linkParts = [];
      if (item.liveSite) {
        linkParts.push({
          text: (labels && labels.liveSite) || "Live Site",
          link: item.liveSite,
          style: "linkInline",
        });
      }
      if (item.liveDemo) {
        if (linkParts.length) linkParts.push({ text: "  ·  ", style: "meta" });
        linkParts.push({
          text: (labels && labels.liveDemo) || "Live Demo",
          link: item.liveDemo,
          style: "linkInline",
        });
      }
      if (item.github) {
        if (linkParts.length) linkParts.push({ text: "  ·  ", style: "meta" });
        linkParts.push({
          text: (labels && labels.github) || "GitHub",
          link: item.github,
          style: "linkInline",
        });
      }
      nodes.push({ text: linkParts, margin: [0, 0, 0, 4] });
    }

    return nodes;
  }

  function buildPortfolio(accordion) {
    var nodes = [];
    var portfolio = accordion.portfolio || {};
    var labels = portfolio.labels || {};
    var sections = portfolio.sections || {};

    nodes.push(sectionTitle(accordion.title));
    nodes.push(goldRule());

    if (sections.powerPlatform) {
      var pp = sections.powerPlatform;
      nodes.push({
        text: cleanText(pp.title),
        style: "subSection",
        margin: [0, 4, 0, 2],
      });
      if (pp.intro) {
        nodes.push({
          text: cleanText(pp.intro),
          style: "body",
          margin: [0, 0, 0, 3],
        });
      }
      if (pp.focusLine) {
        nodes.push({
          text: cleanText(pp.focusLine),
          style: "chips",
          margin: [0, 0, 0, 4],
        });
      }
      (pp.workAreas || []).forEach(function (area) {
        nodes.push({
          text: [
            { text: cleanText(area.title) + ": ", style: "skillLabel" },
            { text: cleanText(area.line), style: "body" },
          ],
          margin: [0, 0, 0, 2],
        });
      });
      if (pp.technologiesLine) {
        nodes.push({
          text: [
            {
              text: ((labels && labels.technologies) || "Technologies") + ": ",
              style: "skillLabel",
            },
            { text: cleanText(pp.technologiesLine), style: "meta" },
          ],
          margin: [0, 4, 0, 6],
        });
      }
      if (pp.pcfExamples && pp.pcfExamples.length) {
        nodes.push({
          text: cleanText(
            labels.sectionPcfExamples || "PCF custom controls examples"
          ),
          style: "subSection",
          margin: [0, 4, 0, 2],
        });
        pp.pcfExamples.forEach(function (item) {
          nodes = nodes.concat(buildPortfolioItem(item, labels));
        });
      }
    }

    if (sections.angularProjects && sections.angularProjects.length) {
      nodes.push({
        text: cleanText(labels.sectionAngular || "Angular Projects"),
        style: "subSection",
        margin: [0, 8, 0, 2],
      });
      sections.angularProjects.forEach(function (item) {
        nodes = nodes.concat(buildPortfolioItem(item, labels));
      });
    }

    if (sections.webProjects && sections.webProjects.length) {
      nodes.push({
        text: cleanText(labels.sectionWeb || "Web Projects"),
        style: "subSection",
        margin: [0, 8, 0, 2],
      });
      sections.webProjects.forEach(function (item) {
        nodes = nodes.concat(buildPortfolioItem(item, labels));
      });
    }

    return nodes;
  }

  function buildAccordion(accordion, content) {
    if (!accordion) return [];
    switch (accordion.type) {
      case "itDevelopment":
        return buildItDevelopment(accordion, content);
      case "portfolio":
        return buildPortfolio(accordion);
      case "compactEntries":
        return buildCompactEntries(accordion);
      case "education":
        return buildEducation(accordion);
      case "languages":
        return buildLanguages(accordion);
      default:
        return [];
    }
  }

  function buildDocDefinition(content, language) {
    var body = [];
    body = body.concat(buildHeader(content));
    body = body.concat(buildSummary(content));
    body = body.concat(buildSkills(content));

    (content.accordions || []).forEach(function (accordion) {
      body = body.concat(buildAccordion(accordion, content));
    });

    return {
      pageSize: "A4",
      pageMargins: [40, 40, 40, 48],
      defaultStyle: {
        font: "Manrope",
        fontSize: 9.5,
        color: COLORS.navy,
        lineHeight: 1.35,
      },
      styles: {
        display: {
          font: "EBGaramond",
          fontSize: 22,
          bold: true,
          color: COLORS.ink,
        },
        tagline: {
          font: "Manrope",
          fontSize: 9,
          color: COLORS.muted,
        },
        sectionTitle: {
          font: "EBGaramond",
          fontSize: 12,
          bold: true,
          color: COLORS.ink,
          characterSpacing: 0.6,
        },
        subSection: {
          font: "EBGaramond",
          fontSize: 11,
          bold: true,
          color: COLORS.navy,
        },
        roleTitle: {
          font: "EBGaramond",
          fontSize: 11,
          bold: true,
          color: COLORS.ink,
        },
        body: {
          font: "Manrope",
          fontSize: 9.5,
          color: COLORS.navy,
        },
        bullet: {
          font: "Manrope",
          fontSize: 9,
          color: COLORS.navy,
        },
        meta: {
          font: "Manrope",
          fontSize: 8.5,
          color: COLORS.muted,
        },
        secondary: {
          font: "Manrope",
          fontSize: 8.5,
          color: COLORS.muted,
        },
        skillLabel: {
          font: "EBGaramond",
          fontSize: 9.5,
          bold: true,
          color: COLORS.ink,
        },
        chips: {
          font: "Manrope",
          fontSize: 8.5,
          color: COLORS.gold,
        },
        link: {
          font: "Manrope",
          fontSize: 8.5,
          color: COLORS.gold,
          decoration: "underline",
        },
        linkInline: {
          font: "Manrope",
          fontSize: 8.5,
          color: COLORS.gold,
          decoration: "underline",
        },
        footer: {
          font: "Manrope",
          fontSize: 8,
          color: COLORS.muted,
        },
      },
      background: function () {
        return {
          canvas: [
            {
              type: "rect",
              x: 0,
              y: 0,
              w: 595.28,
              h: 841.89,
              color: COLORS.white,
            },
          ],
        };
      },
      footer: function (currentPage, pageCount) {
        return {
          columns: [
            {
              text: "nikotine.me/resume",
              style: "footer",
              margin: [40, 0, 0, 0],
            },
            {
              text: String(currentPage) + " / " + String(pageCount),
              style: "footer",
              alignment: "right",
              margin: [0, 0, 40, 0],
            },
          ],
        };
      },
      info: {
        title: "Nikolay Kartsev — CV (" + (LANG_FILE_CODE[language] || "EN") + ")",
        author: "Nikolay Kartsev",
        subject: "Resume",
      },
      content: body,
    };
  }

  function fileNameForLanguage(language) {
    var code = LANG_FILE_CODE[language] || "EN";
    return "Mykola_Kartsev_CV_" + code + ".pdf";
  }

  function setButtonState(button, state) {
    if (!button) return;
    if (state === "busy") {
      button.disabled = true;
      button.setAttribute("aria-busy", "true");
      button.classList.add("is-busy");
      return;
    }
    button.disabled = false;
    button.removeAttribute("aria-busy");
    button.classList.remove("is-busy");
  }

  function downloadResumePdf(options) {
    options = options || {};
    var button = options.button || null;
    if (isDownloading) return Promise.resolve();

    var language = getLanguage();
    var content = getContent(language);
    if (!content) {
      window.alert("Resume content is not available.");
      return Promise.reject(new Error("Missing resume content"));
    }

    isDownloading = true;
    setButtonState(button, "busy");

    return ensurePdfMake()
      .then(function (pdfMake) {
        var doc = buildDocDefinition(content, language);
        var filename = fileNameForLanguage(language);
        return new Promise(function (resolve, reject) {
          try {
            var pdf = pdfMake.createPdf(doc);
            if (typeof pdf.getBlob === "function") {
              pdf.getBlob(function (blob) {
                try {
                  var url = URL.createObjectURL(blob);
                  var anchor = document.createElement("a");
                  anchor.href = url;
                  anchor.download = filename;
                  anchor.rel = "noopener";
                  document.body.appendChild(anchor);
                  anchor.click();
                  anchor.remove();
                  setTimeout(function () {
                    URL.revokeObjectURL(url);
                  }, 2000);
                  resolve();
                } catch (err) {
                  reject(err);
                }
              });
              return;
            }
            pdf.download(filename);
            resolve();
          } catch (err) {
            reject(err);
          }
        });
      })
      .catch(function (err) {
        console.error(err);
        window.alert(
          (content.labels && content.labels.downloadPdfError) ||
            "Could not generate the PDF. Please try again."
        );
        throw err;
      })
      .finally(function () {
        isDownloading = false;
        setButtonState(button, "idle");
      });
  }

  window.resumePdf = {
    download: downloadResumePdf,
    buildDocDefinition: buildDocDefinition,
    getFileName: fileNameForLanguage,
    ensurePdfMake: ensurePdfMake,
  };
})();
