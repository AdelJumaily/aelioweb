export interface Project {
  slug: string;
  title: string;
  summary: string;
  services: string[];
  tags: string[];
  year: number;
  thumbnail: string;
  heroImage: string;
  url: string;
  challenge: string;
  solution: string;
  results: { label: string; value: string }[];
  gallery: string[];
  techStack: string[];
}

export const projects: Project[] = [
  {
    slug: "potomac-family-dental",
    title: "Potomac Family Dental",
    summary:
      "Family and cosmetic dentistry website for a Woodbridge practice—appointments, services, and patient resources in one place.",
    services: ["Web Design", "Development"],
    tags: ["Healthcare", "Local Business"],
    year: 2024,
    thumbnail: "/images/potomac-family-dental.png",
    heroImage: "/images/potomac-family-dental.png",
    url: "https://potomacfamilydental.com/",
    challenge:
      "The practice needed a trustworthy online presence that helps new patients understand services, find the office, and request appointments without calling first.",
    solution:
      "Built a clear, professional site organized around treatments, insurance, and new-patient info—with prominent appointment CTAs and a warm brand that matches the in-office experience.",
    results: [
      { label: "Focus", value: "Patient acquisition" },
      { label: "Scope", value: "Full practice site" },
      { label: "Region", value: "Northern Virginia" },
    ],
    gallery: ["/images/potomac-family-dental.png"],
    techStack: ["Responsive design", "SEO", "Appointment CTAs"],
  },
  {
    slug: "autoforge",
    title: "Autoforge",
    summary:
      "Landing page for a visual FTC path planner—waypoints, splines, and one-click Java export for competition teams.",
    services: ["Web Design", "Development"],
    tags: ["SaaS", "Education", "FTC"],
    year: 2025,
    thumbnail: "/images/autoforge.png",
    heroImage: "/images/autoforge.png",
    url: "https://autoforge-two.vercel.app/",
    challenge:
      "FIRST Tech Challenge teams spend hours hand-writing autonomous paths. Autoforge needed a product site that explains the workflow and captures early-access signups before launch.",
    solution:
      "Designed a dark, product-led landing page with a strong hero, feature breakdown, how-it-works steps, and waitlist CTA—built for developers and student teams evaluating the tool.",
    results: [
      { label: "Product", value: "FTC path planner" },
      { label: "Export", value: "RoadRunner Java" },
      { label: "Status", value: "Early access" },
    ],
    gallery: ["/images/autoforge.png"],
    techStack: ["Next.js", "Vercel", "Product marketing"],
  },
  {
    slug: "roarbotics",
    title: "Roarbotics",
    summary:
      "Team site for Fairfax High School’s FIRST Tech Challenge robotics program—sponsors, recruitment, and community outreach.",
    services: ["Web Design", "Development"],
    tags: ["Education", "Nonprofit", "Robotics"],
    year: 2024,
    thumbnail: "/images/roarbotics.png",
    heroImage: "/images/roarbotics.png",
    url: "https://www.roarbotics.org/",
    challenge:
      "The team needed a home base online for sponsors, prospective members, and supporters to understand the mission and get involved.",
    solution:
      "Created an approachable site with a bold hero, clear paths to join or learn more, and sections for sponsors and about the program—reflecting student energy and real competition work.",
    results: [
      { label: "Program", value: "FIRST Tech Challenge" },
      { label: "School", value: "Fairfax High School" },
      { label: "Goals", value: "Recruit & sponsor" },
    ],
    gallery: ["/images/roarbotics.png"],
    techStack: ["Responsive design", "Community site"],
  },
];
