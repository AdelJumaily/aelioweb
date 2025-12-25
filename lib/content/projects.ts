export interface Project {
  slug: string;
  title: string;
  summary: string;
  services: string[];
  tags: string[];
  year: number;
  thumbnail: string;
  heroImage: string;
  challenge: string;
  solution: string;
  results: { label: string; value: string }[];
  gallery: string[];
  techStack: string[];
}

export const projects: Project[] = [
  {
    slug: "techflow-redesign",
    title: "TechFlow Platform Redesign",
    summary: "A complete UX overhaul for a B2B SaaS platform, increasing user engagement by 200%.",
    services: ["Web Design", "Development"],
    tags: ["Next.js", "React", "UX Design", "B2B"],
    year: 2024,
    thumbnail: "/images/dashboard.png",
    heroImage: "/images/dashboard.png",
    challenge: "TechFlow's legacy platform had a 40% bounce rate and poor user retention. Users found the interface confusing and slow.",
    solution: "We conducted user research, redesigned the entire platform with a focus on clarity and speed, and rebuilt it on Next.js for 10x faster load times.",
    results: [
      { label: "User Engagement", value: "+200%" },
      { label: "Load Time", value: "0.8s" },
      { label: "Bounce Rate", value: "-60%" },
    ],
    gallery: [
      "/images/dashboard.png",
      "/images/laptop.png",
      "/images/webdesign.jpg",
    ],
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "PostgreSQL"],
  },
  {
    slug: "bloom-ecommerce",
    title: "Bloom Studio E-Commerce",
    summary: "High-converting e-commerce site with custom Shopify integration, boosting sales by 180%.",
    services: ["E-Commerce", "Web Development"],
    tags: ["Shopify", "Next.js", "E-Commerce"],
    year: 2024,
    thumbnail: "/images/webdesign.jpg",
    heroImage: "/images/webdesign.jpg",
    challenge: "Bloom needed a modern e-commerce platform that could handle high traffic and convert visitors into customers.",
    solution: "Built a headless Shopify storefront with Next.js, implementing advanced filtering, fast checkout, and mobile-first design.",
    results: [
      { label: "Sales Increase", value: "+180%" },
      { label: "Conversion Rate", value: "+45%" },
      { label: "Page Speed", value: "1.2s" },
    ],
    gallery: [
      "/images/webdesign.jpg",
      "/images/branding.jpg",
    ],
    techStack: ["Next.js", "Shopify", "TypeScript", "Tailwind CSS"],
  },
  {
    slug: "elevate-fitness",
    title: "Elevate Fitness Brand & Website",
    summary: "Complete brand identity and website redesign for a fitness startup, increasing membership signups by 250%.",
    services: ["Branding", "Web Design", "Development"],
    tags: ["Branding", "Next.js", "Fitness"],
    year: 2024,
    thumbnail: "/images/branding.jpg",
    heroImage: "/images/branding.jpg",
    challenge: "Elevate needed a strong brand identity and website to compete in the crowded fitness market.",
    solution: "Created a bold, energetic brand system and built a conversion-focused website with integrated booking and payment.",
    results: [
      { label: "Signups", value: "+250%" },
      { label: "Brand Recognition", value: "+300%" },
      { label: "Mobile Traffic", value: "+180%" },
    ],
    gallery: [
      "/images/branding.jpg",
      "/images/digitalmarketing.jpg",
    ],
    techStack: ["Next.js", "Framer Motion", "Stripe"],
  },
  {
    slug: "summit-saas",
    title: "Summit SaaS Dashboard",
    summary: "Enterprise SaaS platform with advanced analytics and real-time collaboration features.",
    services: ["Web Development", "UX Design"],
    tags: ["SaaS", "Next.js", "Enterprise"],
    year: 2023,
    thumbnail: "/images/laptop.png",
    heroImage: "/images/laptop.png",
    challenge: "Summit needed a scalable dashboard that could handle complex data visualization and real-time updates.",
    solution: "Built a performant dashboard with React Server Components, optimized data fetching, and intuitive UX patterns.",
    results: [
      { label: "User Satisfaction", value: "+95%" },
      { label: "Load Time", value: "0.9s" },
      { label: "Task Completion", value: "+65%" },
    ],
    gallery: [
      "/images/laptop.png",
      "/images/dashboard.png",
    ],
    techStack: ["Next.js", "React", "TypeScript", "PostgreSQL"],
  },
  {
    slug: "horizon-landing",
    title: "Horizon Landing Page",
    summary: "High-converting landing page that generated 500+ qualified leads in the first month.",
    services: ["Landing Pages", "Web Design"],
    tags: ["Landing Page", "Conversion", "Next.js"],
    year: 2024,
    thumbnail: "/images/webdesign.jpg",
    heroImage: "/images/webdesign.jpg",
    challenge: "Horizon needed a landing page that could convert visitors at scale for their product launch.",
    solution: "Designed and built a conversion-optimized landing page with A/B testing, fast load times, and clear value proposition.",
    results: [
      { label: "Leads Generated", value: "500+" },
      { label: "Conversion Rate", value: "12%" },
      { label: "Load Time", value: "0.7s" },
    ],
    gallery: [
      "/images/webdesign.jpg",
    ],
    techStack: ["Next.js", "Tailwind CSS", "Vercel Analytics"],
  },
  {
    slug: "acme-corp",
    title: "Acme Corp Website Redesign",
    summary: "Modern corporate website redesign that improved brand perception and increased inquiries by 140%.",
    services: ["Web Design", "Development", "SEO"],
    tags: ["Corporate", "Next.js", "SEO"],
    year: 2023,
    thumbnail: "/images/digitalmarketing.jpg",
    heroImage: "/images/digitalmarketing.jpg",
    challenge: "Acme's outdated website didn't reflect their industry leadership and was losing potential clients.",
    solution: "Redesigned the entire site with modern UX, improved SEO, and faster performance to better represent the brand.",
    results: [
      { label: "Inquiries", value: "+140%" },
      { label: "SEO Rankings", value: "+85%" },
      { label: "Time on Site", value: "+200%" },
    ],
    gallery: [
      "/images/digitalmarketing.jpg",
      "/images/branding.jpg",
    ],
    techStack: ["Next.js", "TypeScript", "Tailwind CSS"],
  },
];





