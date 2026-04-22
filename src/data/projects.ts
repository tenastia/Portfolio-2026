export type Project = {
  slug: string;
  title: string;
  year: string;
  chips: string[];
  cover?: string;
};

export const projects: Project[] = [
  {
    slug: "performory",
    title: "performory",
    year: "2025",
    chips: ["user experience", "interface design", "Mobile App"],
    cover: "/projects/performory.png",
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
