export interface Service {
  id: string;
  number: string;
  title: string;
  description: string;
  deliverables: string[];
  timeline: string;
  techStack: string[];
  tags: string[];
}

export const services: Service[] = [
  {
    id: "web-design",
    number: "01",
    title: "Web Design",
    description: "We create world-class websites using modern design practices. Mobile-first websites and web experiences are essential to the success of your web project. While maintaining bespoke originality, our team will focus on responsive design and optimize your website for any device and interface. Your new website will attract desirable target audiences, boost engagement, drive sales, and increase the brand value of your business.",
    deliverables: [
      "User research & personas",
      "Wireframes & prototypes",
      "High-fidelity mockups",
      "Design system",
      "Usability testing",
    ],
    timeline: "2-4 weeks",
    techStack: ["Figma", "Adobe XD", "Framer"],
    tags: ["Landing", "Brochure Site", "Corporate Website", "E-Commerce", "Web 3.0", "UI/UX Design"],
  },
  {
    id: "branding",
    number: "02",
    title: "Branding",
    description: "We develop comprehensive brand identities that resonate with your target audience and differentiate you from competitors. Our branding process includes logo design, color palettes, typography systems, and brand guidelines that ensure consistency across all touchpoints. A strong brand identity builds trust, recognition, and emotional connection with your customers.",
    deliverables: [
      "Logo design",
      "Brand guidelines",
      "Color palette",
      "Typography system",
      "Brand voice & messaging",
    ],
    timeline: "4-6 weeks",
    techStack: ["Illustrator", "Photoshop", "Figma"],
    tags: ["Logo Design", "Brand Identity", "Visual Identity", "Brand Guidelines", "Brand Strategy"],
  },
  {
    id: "graphic-design",
    number: "03",
    title: "Graphic Design",
    description: "We create compelling visual communications that capture attention and convey your message effectively. From print materials to digital graphics, our designs combine aesthetic appeal with strategic thinking. Whether it's marketing collateral, social media graphics, or presentation decks, we ensure every design element serves a purpose and strengthens your brand.",
    deliverables: [
      "Marketing collateral",
      "Social media graphics",
      "Print materials",
      "Presentation decks",
      "Digital assets",
    ],
    timeline: "2-3 weeks",
    techStack: ["Illustrator", "Photoshop", "InDesign"],
    tags: ["Print Design", "Digital Graphics", "Marketing Materials", "Social Media", "Visual Communication"],
  },
  {
    id: "video-production",
    number: "04",
    title: "Video Production",
    description: "We produce high-quality video content that tells your story and engages your audience. From brand videos and commercials to social media content and explainer videos, we handle every aspect of production from concept to final delivery. Our videos are crafted to capture attention, communicate your message clearly, and drive action.",
    deliverables: [
      "Concept development",
      "Scriptwriting",
      "Filming & production",
      "Post-production & editing",
      "Motion graphics",
    ],
    timeline: "4-8 weeks",
    techStack: ["Premiere Pro", "After Effects", "Final Cut Pro"],
    tags: ["Brand Video", "Commercial", "Social Media", "Explainer Video", "Motion Graphics", "Editing"],
  },
];

