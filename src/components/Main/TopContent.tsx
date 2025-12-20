import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { getImage } from "@lib/request";
import Image from "next/image"

interface Contact {
  title: string;
  url: string;
  label: string;
  icon_path: string;
  dark_invert: boolean;
};

export default function TopContent() {
  const [contacts, setContacts] = useState<Contact[]>([]);

  const t = useTranslations("home.main.top");

  const subtitle = t("subtitle");
  const resume = t("resume");
  const contactsTitle = t("contacts");

  const size = 300;
  const profilePictureTitle = "Foto de perfil";

  useEffect(() => {
    (async () => {
      const contactResults: Contact[] = await fetch("/api/contacts")
        .then(res => res.json());

      const contactInfo = contactResults.map((result) => ({
          title: result.title,
          icon_path: result.icon_path,
          url: result.url,
          label: result.label,
          dark_invert: result.dark_invert,
      }));
      setContacts(contactInfo);
    })();
  }, []);

  return (
    <section
      id="about"
      className={`
        mt-8 mb-16 lg:mb-0 flex items-center mx-auto
        lg:text-left lg:flex-row lg:p-8 lg:justify-evenly
        flex-col-reverse p-0 text-center
      `}
    >
      <div className="flex flex-col w-[30em]">
        <h1 className="font-bold">Igor Borges Kühl</h1>
        <h2>{subtitle}</h2>
        <p className="my-4 lg:pr-12">
          {resume}
        </p>
        <h3 className="my-4">{contactsTitle}</h3>
        <div className="text-left mx-auto lg:m-0">
          {contacts.map((contact, index) => (
            <div
              key={index}
              className="flex items-center mb-1"
            >
              <Image
                src={getImage(`icons/social/${contact.icon_path}`)}
                alt={contact.title}
                title={contact.title}
                height="25"
                width="25"
                priority
                className={contact.dark_invert ? "invert-0 dark:invert" : ""}
              />
              <a
                href={contact.url}
                target="_blank"
                className="ml-2"
              >
                {contact.label}
              </a>
            </div>
          ))}
        </div>
      </div>
      <div className="w-80">
        <Image
          src={getImage("general/foto-de-perfil.jpg")}
          height={size}
          width={size}
          title={profilePictureTitle}
          alt={profilePictureTitle}
          className={`
            max-w-[${size}px] max-h-[${size}px]
            lg:w-full rounded-full drop-shadow-lg
            lg:mx-auto mb-8 lg:m-0
          `}
        />
      </div>
    </section>
  );
}
