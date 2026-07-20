(function () {
  "use strict";

  const whatsappNumber = "393273345667";
  const form = document.getElementById("booking-form");
  const dateInput = document.getElementById("booking-date");
  const serviceInput = document.getElementById("booking-service");
  const logisticsInput = document.getElementById("booking-logistics");
  const addressField = document.getElementById("delivery-address-field");
  const addressInput = document.getElementById("booking-address");
  const groupPricingLink = document.getElementById("group-pricing-link");

  function t(source) {
    return window.siteI18n?.t(source) || source;
  }

  function getLocalDateValue() {
    const now = new Date();
    const offset = now.getTimezoneOffset() * 60000;
    return new Date(now.getTime() - offset).toISOString().split("T")[0];
  }

  function isWeekend(dateValue) {
    if (!dateValue) return false;
    const day = new Date(dateValue + "T12:00:00").getDay();
    return day === 0 || day === 6;
  }

  function validateGuidedDate() {
    if (!dateInput || !serviceInput) return true;

    const guided = serviceInput.value === "guided";
    const valid = !guided || !dateInput.value || isWeekend(dateInput.value);
    dateInput.setCustomValidity(
      valid
        ? ""
        : t("Weekend Guided Experience is available on Saturdays and Sundays only.")
    );
    return valid;
  }

  function updateGroupPricingLink() {
    if (!groupPricingLink) return;
    const message = t("Hello, I'd like to ask about SUP group pricing.");
    groupPricingLink.href =
      "https://wa.me/" + whatsappNumber + "?text=" + encodeURIComponent(message);
  }

  if (dateInput) {
    dateInput.min = getLocalDateValue();
    dateInput.addEventListener("change", validateGuidedDate);
  }

  if (serviceInput) {
    serviceInput.addEventListener("change", validateGuidedDate);
  }

  if (logisticsInput && addressField && addressInput) {
    logisticsInput.addEventListener("change", function () {
      const delivery = logisticsInput.value.includes("delivery");
      addressField.hidden = !delivery;
      addressInput.disabled = !delivery;
      if (!delivery) addressInput.value = "";
    });
  }

  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      validateGuidedDate();

      if (!form.reportValidity()) return;

      const data = new FormData(form);
      const service =
        data.get("service") === "guided"
          ? t("Weekend Guided Experience")
          : t("Self Rental");
      const lines = [
        t("Hello, I'd like to request a SUP booking."),
        "",
        t("Name:") + " " + data.get("name"),
        t("Date:") + " " + data.get("date"),
        t("Number of sets:") + " " + data.get("sets"),
        t("Service:") + " " + service,
        t("Pickup:") + " " + t("Free pickup"),
      ];

      if (data.get("address")) {
        lines.push(t("Delivery address:") + " " + data.get("address"));
      }

      const url =
        "https://wa.me/" +
        whatsappNumber +
        "?text=" +
        encodeURIComponent(lines.join("\n"));

      window.open(url, "_blank", "noopener,noreferrer");
    });
  }

  document.querySelectorAll(".copy-button").forEach(function (button) {
    button.addEventListener("click", async function () {
      const value = button.dataset.copy;
      if (!value) return;

      try {
        await navigator.clipboard.writeText(value);
        button.textContent = t("Copied");
        window.setTimeout(function () {
          button.textContent = t("Copy IBAN");
        }, 1600);
      } catch (_error) {
        window.prompt(t("Copy IBAN:"), value);
      }
    });
  });

  window.addEventListener("site:languagechange", function () {
    validateGuidedDate();
    updateGroupPricingLink();
  });

  updateGroupPricingLink();
})();
