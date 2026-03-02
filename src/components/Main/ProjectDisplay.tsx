import { useState, useEffect } from "react";
import { getImage } from "@lib/request";
import { useScreenshot } from "@hooks/useScreenshot";
import { useTranslations } from "next-intl";
import ProjectItem from "./ProjectItem";

interface Project {
  title: string;
  description: string;
  repository_url: string;
  deployed_url: string;
  languages: string;
  image_title: string;
};

interface TranslatedProject {
  title: string;
  description: string;
};

export default function ProjectDisplay() {
  const [projects, setProjects] = useState<Project[]>([]);

  const t = useTranslations("home.main.projects");
  const sectionTitle = t("title");
  const translatedProjects: TranslatedProject[] =
    t.raw("items") ?? [{ title: "", description: ""}];

  const portfolioImage = useScreenshot();

  useEffect(() => {
    (async () => {
      const fetchProjects = async () => {
        const projectResults: Project[] = await fetch("/api/projects")
          .then(res => res.json());

        const parsedProjects = projectResults.map((result, index) => ({
            ...result,
            title: translatedProjects?.[index]?.title,
            description: translatedProjects?.[index]?.description
        }));

        setProjects(parsedProjects);
      };

      await fetchProjects();
    })();
  }, []);

  return (
    <section
      id="projects"
      className={`
        flex flex-col lg:justify-evenly items-baseline
        mx-auto lg:w-full lg:px-8 mb-12 lg:mb-8
      `}
    >
      <h3 className="w-full text-center lg:text-left mb-4 w-fit">
        {sectionTitle}
      </h3>
      {projects.map((project, index) => {
        const projectImage = project.deployed_url === "#"
          ? portfolioImage : getImage(`/projects/${project.image_title}`);

        return (
          <div
            key={index}
            className={`
              bg-rose-100/50 dark:bg-slate-950/50 w-full
              rounded-md p-4 mb-4 drop-shadow-lg
            `}
          >
            <div
              className={`
                border-b border-b-[#450f57] mb-3 flex justify-between
              `}
            >
              <h4>{project.title}</h4>
            </div>
            <ProjectItem source={projectImage} project={project} />
          </div>
        );
      })}
    </section>
  );
}
