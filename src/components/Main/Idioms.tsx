import { useTranslations } from "next-intl";
import { locales } from "@src/proxy";

export default function IdiomsDisplay() {
  const t = useTranslations("home.main.idioms");
  const title = t("title");

  const idioms = locales.map((locale) => t(`items.${locale}`));

  return (
    <section
      id="languages"
      className={`
        flex flex-col lg:justify-evenly items-baseline text-center
        mx-auto lg:w-full lg:px-8 mb-16 lg:mb-8
      `}
    >
      <div className="flex flex-col flex-wrap mx-auto lg:mx-0">
        <h3 className="w-full text-center lg:text-left mb-4">{title}</h3>
        <div className="flex flex-col lg:text-left">
          {idioms.map((title, titleIndex) => (
            <p
              key={titleIndex}
              className="text-lg"
            >
              {title}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
