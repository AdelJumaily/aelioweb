"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "@/lib/content/projects";
import ProjectCard from "../components/ProjectCard";

export default function WorkPage() {
  // Get all unique tags from projects
  const allTags = useMemo(() => {
    const tagsSet = new Set<string>();
    projects.forEach((project) => {
      project.tags.forEach((tag) => tagsSet.add(tag));
    });
    return Array.from(tagsSet).sort();
  }, []);

  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Filter projects based on selected tag
  const filteredProjects = useMemo(() => {
    if (!selectedTag) return projects;
    return projects.filter((project) => project.tags.includes(selectedTag));
  }, [selectedTag]);

  return (
    <main className="min-h-screen bg-[#F5F5F0]">
      <section className="pt-40 pb-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h1 className="text-[clamp(3.5rem,8vw,7rem)] font-bold leading-[1.05] mb-6 text-[#0A0A0A]">
              Our Work
            </h1>
            <p className="text-xl text-[#6B6B6B] max-w-2xl mb-8">
              A showcase of websites we&apos;ve designed and built for ambitious brands.
            </p>

            {/* Interactive Filter Tags */}
            <div className="flex flex-wrap gap-3 items-center">
              <button
                onClick={() => setSelectedTag(null)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedTag === null
                    ? "bg-[#FF5722] text-white shadow-lg scale-105"
                    : "bg-white text-[#6B6B6B] hover:bg-[#FAFAF8] hover:text-[#0A0A0A] border border-[rgba(0,0,0,0.08)]"
                }`}
              >
                All Projects
              </button>
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedTag === tag
                      ? "bg-[#FF5722] text-white shadow-lg scale-105"
                      : "bg-white text-[#6B6B6B] hover:bg-[#FAFAF8] hover:text-[#0A0A0A] border border-[rgba(0,0,0,0.08)]"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>

            {/* Results count */}
            <AnimatePresence mode="wait">
              {selectedTag && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-sm text-[#6B6B6B] mt-4"
                >
                  Showing {filteredProjects.length} project{filteredProjects.length !== 1 ? "s" : ""} tagged with{" "}
                  <span className="font-semibold text-[#FF5722]">{selectedTag}</span>
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Projects Grid with Animation */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedTag || "all"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-12"
            >
              {filteredProjects.length > 0 ? (
                filteredProjects.map((project, index) => (
                  <motion.div
                    key={project.slug}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <ProjectCard project={project} />
                  </motion.div>
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="col-span-2 text-center py-20"
                >
                  <p className="text-xl text-[#6B6B6B]">
                    No projects found with this tag. Try selecting a different filter.
                  </p>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </main>
  );
}


