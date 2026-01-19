export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar?: string;
  verified: boolean;
}

export const testimonials: Testimonial[] = [
  {
    quote: "Working with Aelio was seamless. They delivered a stunning site ahead of schedule, and our conversion rate increased by 40%.",
    author: "Michael Chen",
    role: "CEO",
    company: "TechFlow",
    verified: true,
  },
  {
    quote: "The attention to detail is unmatched. Our new website loads instantly and looks incredible on every device.",
    author: "Emily Rodriguez",
    role: "Founder",
    company: "Bloom Studio",
    verified: true,
  },
  {
    quote: "Best investment we made this year. Aelio didn't just build a website — they built a growth engine.",
    author: "David Park",
    role: "CMO",
    company: "Elevate Fitness",
    verified: true,
  },
];










