"use client";
import { useState, useEffect } from "react";
import {
  getLocalStorageWithTTL,
  setLocalStorageWithTTL,
} from "@/lib/localStorage";
import { SkeletonPropertyCard } from "../custom/skeleton/SkeletonPropertyCard";
import ProjectCard from "./ProjectCard"; // We'll create this component
import { Project } from "@/lib/type"; // We'll define this type

const FeaturedProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Local storage key for projects

  const fetchProjects = async () => {
    try {
      const response = await fetch("/api/projects");
      if (!response.ok) {
        throw new Error(
          `Error Status: ${response.status} - ${response.statusText || "Unknown error"}`
        );
      }
      const result = await response.json();
      console.log("result ========> ", result);
      // Ensure the fetched projects include all required fields
      const formattedProjects = result.map((project: any) => ({
        ...project,
        timeline: project.timeline || "",
        propertyTypes: project.propertyTypes || [],
        amenities: project.amenities || [],
        legalStatus: project.legalStatus || "",
      }));
      setProjects(formattedProjects);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  console.log("Projects ================> ", projects);
  // Skeleton loading state
  if (loading) {
    return (
      <div>
        {/* Featured Projects Loading Sections */}
        <div>
          <div className="px-6 py-8 lg:sm:px-8 lg:sm:py-8">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">
              Featured Projects
            </h2>
          </div>
          <div className="p-4 mx-auto">
            <SkeletonPropertyCard count={4} />
          </div>
        </div>
      </div>
    );
  }

  // Filter and prepare projects
  const featuredProjects = projects.slice().reverse().slice(0, 4);

  return (
    <div>
      <div>
        <div className="px-6 py-8 lg:sm:px-8 lg:sm:py-8">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">
            Featured Projects
          </h2>
        </div>
        <div className="p-4 mx-auto">
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 p-5">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProjects;
