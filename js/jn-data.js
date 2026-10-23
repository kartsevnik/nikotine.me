/**
 * J&N Education — catalog and site content (English source strings = i18n keys).
 * Asset paths are relative to the site root (e.g. assets/comics/...).
 */
window.jnData = {
  brand: "J&N Education",
  email: "mkdiya20@gmail.com",
  copyright: "© 2026 J&N Education. All rights reserved.",
  credits: {
    created: "Created, Written & Illustrated by Nikolai Kartsev",
    edited: "Edited by Jade Solomon",
  },
  mission: {
    tagline: "Make learning English fun, visual, and unforgettable.",
    description:
      "We believe learning English should feel less like memorizing rules and more like discovering a new world. Through funny stories, memorable characters, visual grammar, and practical exercises, we turn English learning into an adventure worth continuing.",
  },
  philosophy: [
    {
      title: "Story First",
      text: "An engaging story comes first; learning lives inside it.",
    },
    {
      title: "Learn by Seeing",
      text: "Visual context helps you understand words and structures.",
    },
    {
      title: "Grammar in Context",
      text: "Grammar is explained and used in real conversational situations.",
    },
    {
      title: "Humor Helps Memory",
      text: "Humor and unexpected moments make learning stick.",
    },
    {
      title: "Read, Understand, Practice",
      text: "Theory, reading, and exercises come together in one issue.",
    },
    {
      title: "For Students and Teachers",
      text: "Materials work for self-study and classroom use.",
    },
  ],
  creators: [
    {
      id: "mykola",
      name: "Nikolai Kartsev",
      role: "Creator, Writer & Illustrator",
      bio: [
        "A software developer with a passion for storytelling, visual creativity, and learning new things. Nikolai created J&N Education to explore a simple idea: what if learning English could feel more like reading a funny adventure than studying a textbook?",
        "He brings the characters, stories, illustrations, and visual world of the comics to life, combining creativity with modern digital tools.",
      ],
    },
    {
      id: "jade",
      name: "Jade Solomon",
      role: "Editor & Educational Contributor",
      bio: [
        "Jade helps shape the educational side of the project, bringing a language teacher's perspective to the stories, dialogues, grammar explanations, and learning activities.",
        "Her contribution helps keep the English clear, natural, and accessible, especially for learners taking their first steps.",
      ],
    },
  ],
  howItBegan: [
    "It started with a question: Can learning English be both useful and genuinely entertaining?",
    "Instead of another collection of disconnected grammar exercises, we imagined a world where language comes alive through characters, conversations, mistakes, and unexpected adventures.",
    "One idea became a story. The story became a comic. And the comic grew into something bigger: J&N Education.",
  ],
  whyComics: [
    {
      title: "See the Meaning",
      text: "Pictures and scenes make vocabulary and grammar easier to grasp.",
    },
    {
      title: "Follow the Story",
      text: "Characters and plot keep you reading — and learning — to the end.",
    },
    {
      title: "Practice What You Learn",
      text: "Each issue includes exercises so new structures become usable.",
    },
    {
      title: "Keep Exploring",
      text: "Every comic opens a new grammar focus and continues the adventure.",
    },
  ],
  comics: [
    {
      id: "the-first-bite",
      slug: "the-first-bite",
      title: "To Be... SMART in English",
      subtitle: "The First Bite",
      seriesId: "to-be-smart",
      seriesTitle: "To Be... SMART in English",
      issueNumber: 1,
      description:
        'Adam and Eve thought life in paradise was supposed to be simple. But when a mysterious talking apple enters the picture, things get wonderfully complicated.\n\nJoin an unusual adventure filled with curious characters, unexpected surprises, and a little English grammar along the way.\n\nYour first lesson? The verb "to be." Your first problem? Well... that\'s another story.',
      shortDescription:
        "A humorous fantasy adventure in Eden — and your first lesson with the verb to be.",
      coverImage: "assets/comics/covers/the-first-bite.png",
      pdfUrl: "assets/comics/sources/the-first-bite.pdf",
      interactiveUrl: "",
      language: "English",
      englishLevel: ["Beginner (A0–A1)"],
      grammarTopics: ["The Verb To Be"],
      pageCount: 39,
      authors: [
        { name: "Nikolai Kartsev", role: "Author & Illustrator" },
        { name: "Jade Solomon", role: "Editor" },
      ],
      status: "published",
      isFree: true,
      publishedAt: "2026-06-22",
      structure: [
        { pages: "1", label: "Cover" },
        { pages: "2", label: "About page" },
        { pages: "3", label: "Grammar" },
        { pages: "4–5", label: "Pre-Reading" },
        { pages: "6–21", label: "Comic Story" },
        { pages: "22–30", label: "Practice" },
        { pages: "31", label: "What You Learned" },
        { pages: "32–34", label: "Teacher Guide" },
        { pages: "35–37", label: "Answer Keys" },
        { pages: "38", label: "Contents" },
        { pages: "39", label: "Next Issue" },
      ],
    },
  ],
};
