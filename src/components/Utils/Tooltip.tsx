import { useState } from "react";

interface Props {
  text: string;
  children: React.ReactNode;
  width?: number | null;
};

export default function Tooltip({ text, children, width }: Props) {
  const [visible, setVisible] = useState<boolean>(false);

  return (
    <div>
      <div
        onMouseOver={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
      >
        {children}
      </div>
      {visible && (
        <span
          className={`
            absolute -translate-x-1/2 mt-2 
            rounded-lg bg-purple-dark/75 dark:bg-licorice py-1.5 px-3 text-sm 
            text-rose-200 transition-opacity select-none z-10
            ${width ? `w-sm whitespace-normal` : "text-nowrap"}
          `}
        >
          {text}
        </span>
      )}
    </div>
  );
}
