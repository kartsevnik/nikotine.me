/**
 * Site configuration — edit links, titles and images here.
 * Leave a URL empty ("") to treat the item as unavailable / coming soon.
 */
window.siteConfig = {
  name: "Nikolay",
  tagline: "Developer · Creator · Explorer",
  slogan: [
    "Build with purpose.",
    "Create with freedom.",
    "Explore without limits.",
  ],
  meta: {
    title: "Nikolay — Developer, Creator & Explorer",
    description:
      "Personal digital card of Nikolay — developer, creator and explorer. Contacts, projects and creative work.",
  },

  contacts: [
    {
      id: "whatsapp",
      label: "WhatsApp",
      url: "https://wa.me/393273345667", // WHATSAPP_URL
      icon: "assets/contacts/whatsapp.png",
    },
    {
      id: "telegram",
      label: "Telegram",
      url: "https://t.me/nikotine7", // TELEGRAM_URL
      icon: "assets/contacts/telegram.png",
    },
    {
      id: "instagram",
      label: "Instagram",
      url: "https://www.instagram.com/nikotine.me/", // INSTAGRAM_URL
      icon: "assets/contacts/instagram.png",
    },
  ],

  projects: [
    {
      id: "power-platform-lab",
      title: "Power Platform Lab",
      description: "Power Platform tutorials, tools and developer practices",
      url: "https://www.youtube.com/@PowerPlatformLaba", // POWER_PLATFORM_LAB_URL
      image: "assets/projects/power-platform-lab.png",
      destination: "YouTube",
      comingSoon: false,
    },
    {
      id: "animatra",
      title: "Animatra",
      description: "Visual stories, characters and creative experiments",
      url: "https://www.youtube.com/@animatra_official", // ANIMATRA_URL
      image: "assets/projects/animatra.png",
      destination: "YouTube",
      comingSoon: false,
    },
    {
      id: "jn",
      title: "J&N — A story that teaches!",
      description: "An illustrated story for learning English",
      url: "", // JN_PROJECT_URL — set when published
      image: "assets/projects/jn.png",
      comingSoon: true,
    },
  ],

  supRental: [
    {
      id: "price-and-service",
      title: "Price and service",
      description: "SUP rental prices and services",
      url: "sup-rental.html", // SUP_PRICE_URL
      image: "assets/sup/price_ico.png",
      comingSoon: false,
    },
    {
      id: "facebook-group",
      title: "Beaches & SUP Spots",
      description: "Beaches, lakes and SUP launch points in Italy",
      url: "https://www.facebook.com/groups/2184496025727612", // FACEBOOK_GROUP_URL
      image: "assets/sup/geo_ico.png",
      destination: "Facebook",
      comingSoon: false,
    },
  ],
};
