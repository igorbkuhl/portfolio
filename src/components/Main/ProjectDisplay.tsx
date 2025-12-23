import { useState, useEffect } from "react";
import { getImage } from "@lib/request";
import { useScreenshot } from "@hooks/useScreenshot";
import { useLanguage } from "@hooks/useLanguage";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Icon from "@utils/Icon";

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
  const tAlts = useTranslations("home.main.projects.iconTitles");

  const sectionTitle = t("title");
  const deployed = t("links.deployed");
  const here = t("links.here");
  const repository = t("links.repository");
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
            <div
              className={`
                lg:grid grid-cols-1 grid-rows-2 lg:grid-cols-2 lg:grid-rows-1
              `}
            >
              <Image
                src={projectImage}
                width={390}
                height={300}
                alt={project.title}
                title={project.title}
                quality={100}
                unoptimized
                className={`
                  h-full w-full lg:h-[300px] lg:w-[390px]
                  ${project.deployed_url === "#" && "lg:w-full object-cover"}
                `}
              />
              <div className="p-3 flex flex-col">
                <div>
                  <p className="mb-4">{project.description}</p>
                  {project.deployed_url && (
                    <p>
                      {deployed}
                      <a
                        href={project.deployed_url}
                        target="_blank"
                        className="underline hover:text-[#4c1048]"
                      >
                        {here}
                      </a>.
                    </p>
                  )}
                  <a
                    href={project.repository_url}
                    target="_blank"
                    className="underline"
                  >
                    {repository}
                  </a>
                </div>
                <div className="flex flex-row-reverse lg:mt-auto">
                  {project.languages.split(",").map((lang, langIndex) => {
                    const iconTitle = useLanguage(lang, tAlts("alt")).format();
                    const altTitle = tAlts("main", { title: iconTitle });

                    return (
                      <div key={langIndex}>
                        <Icon
                          src={getImage(`icons/languages/${lang}.svg`)}
                          text={altTitle}
                          size={30}
                          className="ml-2"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}
