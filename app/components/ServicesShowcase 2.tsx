'use client';

import { motion } from 'framer-motion';
import { InfiniteMovingCardsServices } from './ui/infinite-moving-cards-services';

interface Service {
  title: string;
  image: string;
  items: string[];
}

const services: Service[] = [
  {
    title: 'Branding',
    image: '/branding.jpg',
    items: [
      'Visual identity systems',
      'Logo & typography',
      'Brand guidelines',
    ],
  },
  {
    title: 'Digital Marketing',
    image: '/digitalmarketing.jpg',
    items: [
      'Paid ads & funnels',
      'Email flows',
      'Analytics & optimization',
    ],
  },
  {
    title: 'Development',
    image: '/develpment.jpg',
    items: [
      'Web apps & dashboards',
      'API integrations',
      'Performance optimization',
    ],
  },
  {
    title: 'Web Design',
    image: '/webdesign.jpg',
    items: [
      'Conversion-focused UX/UI',
      'Responsive layouts',
      'Design systems',
    ],
  },
];

// Gradient fallbacks for each service (used if image doesn't exist)
const serviceGradients = [
  'from-pink-500 via-rose-600 to-red-700', // Branding
  'from-orange-500 via-amber-600 to-yellow-700', // Digital Marketing
  'from-blue-600 via-purple-600 to-indigo-800', // Development
  'from-cyan-500 via-blue-600 to-teal-700', // Web Design
];

// Convert services to format for InfiniteMovingCards
const serviceCards = services.map((service, index) => ({
  quote: service.items.join(' • '),
  name: service.title,
  title: service.items.join(' • '),
  image: service.image,
  gradient: serviceGradients[index],
  items: service.items,
}));

export default function ServicesShowcase() {

  return (
    <section id="solutions" className="relative w-full bg-[#f5f1e8] py-24 md:py-32 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Headline */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2
            className="shadow-headline text-3xl md:text-4xl lg:text-5xl leading-tight mb-4"
          >
            Beyond Websites
            <br />
            A Full 360° Approach to Brand Elevation
          </h2>
        </motion.div>

        {/* Description Paragraph */}
        <motion.p
          className="text-center text-base md:text-lg text-gray-700 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          We don't just build websites—we craft complete brand experiences that
          resonate, convert, and elevate your business across every touchpoint.
        </motion.p>

        {/* Infinite Moving Cards */}
        <InfiniteMovingCardsServices
          items={serviceCards}
          direction="right"
          speed="slow"
        />
      </div>
    </section>
  );
}

