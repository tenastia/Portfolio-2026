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
    slug: "landmark-district",
    title: "landmark district",
    year: "2026",
    chips: ["user experience", "user interface", "web"],
    cover: "/projects/landmark-district/landmark-district-thumb.png",
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
    slug: "performory",
    title: "performory",
    year: "2025",
    chips: ["user experience", "user interface", "mobile app"],
    cover: "/projects/performory/performory-hero-img.png",
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
    liveUrl: "https://www.teradevelopment.com/",
  },
  {
    slug: "emera",
    title: "emera",
    year: "2025",
    chips: ["user experience", "user interface", "motion"],
    video: "/projects/other/emera-thumb.mp4",
    liveUrl: "https://emeraliving.com/",
  },
];
