"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Project } from "@/lib/content/projects";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-[rgba(0,0,0,0.06)]"
    >
      <Link href={`/work/${project.slug}`}>
        <div className="relative h-64 md:h-80 overflow-hidden">
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <motion.div
            className="absolute inset-0 bg-black/0 hover:bg-black/5 transition-colors"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.5 }}
          />
        </div>
        <div className="p-6">
          <div className="flex flex-wrap gap-2 mb-3">
            {project.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-xs px-3 py-1 bg-[#FAFAF8] rounded-full text-[#6B6B6B]"
              >
                {tag}
              </span>
            ))}
          </div>
          <h3 className="text-2xl font-bold mb-2 text-[#0A0A0A]">
            {project.title}
          </h3>
          <p className="text-base text-[#6B6B6B] mb-4">{project.summary}</p>
          <div className="text-[15px] font-medium text-[#FF5722] hover:text-[#E64A19] inline-flex items-center gap-2 transition-colors">
            View Project
            <ArrowRight size={16} />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}






