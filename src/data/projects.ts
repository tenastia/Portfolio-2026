export type Project = {
  slug: string;
  title: string;
  year: string;
  chips: string[];
  cover?: string;
  video?: string;
  externalUrl?: string;
  liveUrl?: string;
};

export const projects: Project[] = [
  {
    slug: "emera",
    title: "emera",
    year: "2025",
    chips: ["user experience", "user interface", "motion"],
    video: "/projects/other/emera-thumb.mp4",
    externalUrl: "https://emeraliving.com/",
  },
  {
    slug: "performory",
    title: "performory",
    year: "2025",
    chips: ["user experience", "user interface", "mobile app"],
    cover: "/projects/performory/performory-hero-img.png",
  },
  {
    slug: "century-group",
    title: "century group",
    year: "2025",
    chips: ["user experience", "user interface", "web"],
    cover: "/projects/century-group/cg-hero-image.png",
    liveUrl: "https://centurygroup.ca",
  },
  {
    slug: "aviary",
    title: "aviary",
    year: "2024",
    chips: ["user experience", "user interface", "touchscreen"],
    cover: "/projects/aviary/aviary-hero-image.png",
  },
  {
    slug: "tera",
    title: "tera development",
    year: "2024",
    chips: ["user experience", "user interface", "web"],
    video: "/projects/other/tera-thumb.mp4",
    externalUrl: "https://www.teradevelopment.com/",
  },
  {
    slug: "scorebook",
    title: "scorebook",
    year: "2024",
    chips: ["design system", "interface design", "Web App"],
    cover: "/projects/scorebook.png",
  },
  {
    slug: "cadence",
    title: "cadence",
    year: "2024",
    chips: ["brand identity", "interaction", "Landing"],
    cover: "/projects/cadence.png",
  },
  {
    slug: "metronome",
    title: "metronome",
    year: "2023",
    chips: ["product design", "prototyping", "Mobile App"],
    cover: "/projects/metronome.png",
  },
];
