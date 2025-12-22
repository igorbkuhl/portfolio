import Color from "color";
import html2canvas from "html2canvas";
import { useState, useEffect } from "react";

export function useScreenshot() {
  const [base64, setBase64] = useState<string>("");

  useEffect(() => {
    const screenshotTarget = document.getElementById("main-content")!;

    /**
     * Recursively converts any CSS color property from lab to hex.
     * This action is required for html2canvas due to unsupported color space from tailwindcss v4.
     * @param elements HTMLCollection
     */
    const convertColors = (elements: HTMLCollection) => {
      if (!elements.length) return;

      Array.from(elements).forEach(element => {
        const computedStyles = window.getComputedStyle(element);

        Object.values(computedStyles).forEach(key => {
          const value = computedStyles.getPropertyValue(key);

          if (value.startsWith("lab(")) {
            const labValues = value
              .replace(/\D+/, "")
              .split(" ")
              .map(v => parseFloat(v));
            screenshotTarget.style.setProperty(
              key, Color.lab(...labValues).hex()
            );
          }
        });

        convertColors(element.children);
      });
    }

    /**
     * Captures a screenshot of the page's top content.
     */
    const screenshot = () => {
      html2canvas(screenshotTarget).then((canvas) => {
        const base64Image = canvas.toDataURL("image/png");
        setBase64(base64Image);
      }).catch(err => console.error("Screenshot error: ", err));
    }

    convertColors(screenshotTarget.children);
    screenshot();
  }, []);

  return base64;
}
