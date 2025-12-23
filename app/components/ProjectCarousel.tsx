"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";

interface Project {
  id: string;
  name: string;
  clientType: string;
  year: string;
  image: string;
}

const projects: Project[] = [
  {
    id: "1",
    name: "SaaS Platform",
    clientType: "SaaS",
    year: "2024",
    image: "/images/dashboard.png",
  },
  {
    id: "2",
    name: "E-commerce Store",
    clientType: "E-commerce",
    year: "2024",
    image: "/images/laptop.png",
  },
  {
    id: "3",
    name: "Brand Identity",
    clientType: "Startup",
    year: "2023",
    image: "/images/branding.jpg",
  },
  {
    id: "4",
    name: "Web Application",
    clientType: "Enterprise",
    year: "2024",
    image: "/images/webdesign.jpg",
  },
  {
    id: "5",
    name: "Digital Platform",
    clientType: "SaaS",
    year: "2023",
    image: "/images/digitalmarketing.jpg",
  },
  {
    id: "6",
    name: "Brand Website",
    clientType: "Startup",
    year: "2024",
    image: "/images/branding.jpg",
  },
];

export default function ProjectCarousel() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!carouselRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !carouselRef.current) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <section className="relative py-20 md:py-32 px-6 md:px-12 bg-gray-100">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Featured Projects
          </h2>
          <p className="text-gray-600 text-lg">
            Curated selection of our recent work
          </p>
        </motion.div>

        <div
          ref={carouselRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          className="flex gap-6 overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing pb-6"
          style={{
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch",
            scrollBehavior: "smooth",
          }}
        >
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  const rotateX = useTransform(mouseY, [-200, 200], [5, -5]);
  const rotateY = useTransform(mouseX, [-200, 200], [-5, 5]);

  const scale = useSpring(isHovered ? 1.05 : 1, {
    stiffness: 300,
    damping: 20,
  });

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        mouseX.set(0);
        mouseY.set(0);
      }}
      style={{
        rotateX,
        rotateY,
        scale,
        scrollSnapAlign: "start",
      }}
      className="flex-shrink-0 w-[320px] md:w-[400px] lg:w-[480px] rounded-3xl overflow-hidden bg-white shadow-md hover:shadow-2xl transition-all duration-300"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <div className="relative h-64 md:h-80 lg:h-96 bg-gray-100">
        <Image
          src={project.image}
          alt={project.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 320px, (max-width: 1024px) 400px, 480px"
        />
      </div>
      <div className="p-6 md:p-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">
            {project.clientType}
          </span>
          <span className="text-sm text-gray-400">{project.year}</span>
        </div>
        <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
          {project.name}
        </h3>
      </div>
    </motion.div>
  );
}

