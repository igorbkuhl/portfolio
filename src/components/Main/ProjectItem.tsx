import { useTranslations } from "next-intl";
import { getImage } from "@lib/request";
import { useLanguage } from "@hooks/useLanguage";
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

interface ItemProps {
  source: string;
  project: Project;
};

export default function ProjectItem({source, project}: ItemProps) {
  const t = useTranslations("home.main.projects");
  const tAlts = useTranslations("home.main.projects.iconTitles");

  const deployed = t("links.deployed");
  const here = t("links.here");
  const repository = t("links.repository");

  return (
    <div
      className={`
        lg:grid grid-cols-1 grid-rows-2 lg:grid-cols-2 lg:grid-rows-1
      `}
    >
      <Image
        src={source}
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
            const iconTitle = useLanguage(lang).format().trim();
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
  );
}

