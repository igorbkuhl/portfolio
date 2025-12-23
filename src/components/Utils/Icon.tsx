import { useLanguage } from "@hooks/useLanguage";
import Image from "next/image";
import Tooltip from "@utils/Tooltip";

interface LanguageItemProps {
  src: string;
  size: number;
  text: string;
  className?: string;
  tooltip?: string;
};

export default function Icon({
  src,
  size,
  text,
  className = "",
  tooltip = ""
}: LanguageItemProps) {
  const metaText = useLanguage(text).format()

  const image =
    <Image
      src={src}
      alt={text}
      title={tooltip ? "" : text}
      height={size}
      width={size}
      className={className}
      unoptimized
    />;
  const content = tooltip
    ? <Tooltip text={metaText}>
        {image}
      </Tooltip>
    : image;

  return content;
}
