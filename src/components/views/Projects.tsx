"use client";
import { useEffect, useState } from "react";
import ProjectCard from "@/components/views/ProjectCard";
import { SkeletonPropertyCard } from "../custom/skeleton/SkeletonPropertyCard";
import { getLocalStorageWithTTL, setLocalStorageWithTTL } from "@/lib/localStorage";

const projectsDataLocalStorage = "projectsData";

const Projects = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const storedProjects = getLocalStorageWithTTL(projectsDataLocalStorage);
    if (storedProjects) {
      setProjects(storedProjects);
      setLoading(false);
    } else {
      fetchProjects();
    }
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch("/api/projects");
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const result = await response.json();
      setProjects(result);
      setLocalStorageWithTTL(projectsDataLocalStorage, result, 1000 * 60 * 3); // Store for 3 minutes
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="px-6 py-8">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">Featured Projects</h2>
        <div className="p-4">
          <SkeletonPropertyCard count={4} />
        </div>
      </div>
    );
  }

  return (
    <div className="px-6 py-8">
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">Featured Projects</h2>
      <div className="p-4">
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 p-5">
          {projects.slice(0, 4).map((project) => (
            <ProjectCard
              key={project.id}
              name={project.name}
              developer={project.developerName}
              city={project.city}
              priceRange={project.priceRange}
              image={project.rendersAndPlans[0] || "https://dummyimage.com/400x400"}
              status={project.projectStatus}
              id={project.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
