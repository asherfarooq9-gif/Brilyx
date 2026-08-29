export interface TeamMember {
  slug: string;
  name: string;
  role: string;
  blurb: string;
  /** Card background gradient — kept in colour (the rest of the site is monochrome). */
  gradient: string;
  /** Optional portrait. Drop a file in `public/team/<slug>.jpg` and set the path here. */
  photo?: string;
}

export const TEAM: readonly TeamMember[] = [
  {
    slug: "rubab",
    name: "Rubab",
    role: "ML Engineer",
    blurb: "Designs, trains, and evaluates the models behind our AI products.",
    gradient: "from-sky-500 to-indigo-700",
    photo: "/team/rubab.jpg",
  },
  {
    slug: "fahad",
    name: "Fahad",
    role: "AI Engineer",
    blurb: "Builds LLM pipelines, retrieval systems, and evaluation harnesses.",
    gradient: "from-violet-500 to-purple-800",
    photo: "/team/fahad.jpg",
  },
  {
    slug: "kashif",
    name: "Kashif",
    role: "Software Developer",
    blurb: "Turns architecture into shipped, maintainable software.",
    gradient: "from-emerald-500 to-teal-800",
    photo: "/team/kashif.jpg",
  },
  {
    slug: "muneeb",
    name: "Muneeb",
    role: "AI Automation Expert",
    blurb: "Wires tools together and adds AI where it removes real work.",
    gradient: "from-amber-500 to-orange-700",
    photo: "/team/muneeb.jpg",
  },
  {
    slug: "asher",
    name: "Asher",
    role: "AI Engineer & Web Developer",
    blurb: "Bridges model work and the web interfaces users actually touch.",
    gradient: "from-rose-500 to-pink-800",
    photo: "/team/asher.jpg",
  },
] as const;

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();
}
