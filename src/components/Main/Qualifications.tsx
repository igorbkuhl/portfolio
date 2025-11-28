import { useState } from "react";
import { useTranslations } from "next-intl";
import { getImage, } from "@lib/request";
import Image from "next/image";
import Modal from "@utils/Modal"

interface Certificate {
  name: string;
  path: string;
  date: string;
};

export default function Qualifications() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCertificate, setCurrentCertificate] = useState<Certificate | null>(null);
  const t = useTranslations("home.main.qualifications");

  const certificateKeys = Object.keys(t.raw("certificates"));
  const certificates = certificateKeys.map((cert) => ({
      name: t(`certificates.${cert}.title`),
      path: getImage(`certificates/${cert}.jpg`),
      date: t(`certificates.${cert}.date`)
  }));

  const openModal = (certificate: Certificate) => {
    setCurrentCertificate(certificate);
    setIsModalOpen(true);
  };

  return (
    <section
      className={`
        lg:justify-evenly items-baseline text-center lg:text-left
        mx-auto lg:w-full lg:px-8 mb-16 lg:mb-8
      `}
    >
      <h3 className="mb-4">{t("title")}</h3>
      <ul>
        {certificates.map((certificate, index) => (
          <li
            key={index}
            className={`
              mb-2 hover:text-rose-950 dark:hover:text-rose-200
              cursor-pointer w-fit sm:m-auto lg:m-0
            `}
            onClick={() => openModal(certificate)}>
            <h4 className="lg:text-left">{certificate.name}</h4>
            <time className="italic text-sm text-center lg:text-left">
              {certificate.date}
            </time>
          </li>
        ))}
      </ul>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {currentCertificate && (
          <Image
            src={currentCertificate.path}
            alt="Certificate image"
            height={600}
            width={850}
          />
        )}
      </Modal>
    </section>
  );
}
