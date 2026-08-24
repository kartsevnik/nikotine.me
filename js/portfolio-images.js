(function () {
  "use strict";

  function portfolioImage(folder, fileName, alt) {
    const baseName = fileName.replace(/\.[^.]+$/, "");
    return {
      src: "img/resume/portfolio/" + folder + "/web/" + baseName + ".webp",
      fullSrc: "img/resume/portfolio/" + folder + "/" + fileName,
      alt: alt,
    };
  }

  window.portfolioImages = {
    "pcf-status-action-button": [
      portfolioImage(
        "pcf-status-action-button",
        "form.png",
        "StatusActionButton PCF — model-driven form"
      ),
      portfolioImage(
        "pcf-status-action-button",
        "modal.png",
        "StatusActionButton PCF — modal web resource"
      ),
    ],
    "pcf-custom-text-input-tooltip": [
      portfolioImage(
        "pcf-custom-text-input-tooltip",
        "field-help.png",
        "CustomTextInputTooltip PCF — text field with help icon"
      ),
      portfolioImage(
        "pcf-custom-text-input-tooltip",
        "tooltip.png",
        "CustomTextInputTooltip PCF — contextual tooltip"
      ),
    ],
    "angular-moviepulse": [
      portfolioImage(
        "angular-moviepulse",
        "home.png",
        "MoviePulse — home screen"
      ),
      portfolioImage(
        "angular-moviepulse",
        "featured.png",
        "MoviePulse — featured movies"
      ),
      portfolioImage(
        "angular-moviepulse",
        "details.png",
        "MoviePulse — movie details"
      ),
      portfolioImage(
        "angular-moviepulse",
        "watchlist.png",
        "MoviePulse — watchlist"
      ),
      portfolioImage(
        "angular-moviepulse",
        "tv-series.png",
        "MoviePulse — TV series"
      ),
      portfolioImage(
        "angular-moviepulse",
        "search.png",
        "MoviePulse — search results"
      ),
      portfolioImage(
        "angular-moviepulse",
        "profile.png",
        "MoviePulse — user profile"
      ),
      portfolioImage(
        "angular-moviepulse",
        "auth.png",
        "MoviePulse — authentication"
      ),
      portfolioImage(
        "angular-moviepulse",
        "responsive.png",
        "MoviePulse — responsive layout"
      ),
    ],
    "angular-contracts": [
      portfolioImage(
        "angular-contracts",
        "employee-list.png",
        "Contracts — employee list"
      ),
      portfolioImage(
        "angular-contracts",
        "filters.png",
        "Contracts — dynamic filters"
      ),
      portfolioImage(
        "angular-contracts",
        "details.png",
        "Contracts — contract details"
      ),
      portfolioImage(
        "angular-contracts",
        "mobile.png",
        "Contracts — mobile layout"
      ),
    ],
  };
})();
