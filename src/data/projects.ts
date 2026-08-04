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
    slug: "performory",
    title: "performory",
    year: "2022",
    chips: ["memory training app for musicians"],
    cover: "/projects/performory/performory-hero-img.png",
  },
  {
    slug: "landmark-district",
    title: "landmark district",
    year: "2024-2026",
    chips: ["rental engine", "design system"],
    cover: "/projects/landmark-district/landmark-district-thumb.png",
  },
  {
    slug: "century-group",
    title: "century group",
    year: "2025-2026",
    chips: ["scaling design system for a real estate corporation"],
    cover: "/projects/century-group/cg-hero-image.png",
    liveUrl: "https://centurygroup.ca",
  },
  {
    slug: "aviary",
    title: "aviary",
    year: "2022",
    chips: ["design for large screens", "interactive kiosk"],
    cover: "/projects/aviary/aviary-hero-image.png",
  },
  {
    slug: "tera",
    title: "tera development",
    year: "2024",
    chips: ["web presence for a boutique real-estate developer"],
    video: "/projects/other/tera-thumb.mp4",
    liveUrl: "https://www.teradevelopment.com/",
  },
  {
    slug: "emera",
    title: "emera",
    year: "2025",
    chips: ["motion design", "Storytelling as the conversion engine"],
    video: "/projects/other/emera-thumb.mp4",
    liveUrl: "https://emeraliving.com/",
  },
];
