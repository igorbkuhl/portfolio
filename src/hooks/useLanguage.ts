export const useLanguage = (lang: string, defaultLabel: string = "") => {
  const format = (): string => {
    switch(lang) {
        case "react":
            return "React";
        case "typescript":
            return "TypeScript";
        case "rust":
            return "Rust";
        case "c":
            return "C";
        case "cpp":
            return "C++";
        case "c-sharp":
            return "C#";
        case "supabase":
            return "Supabase";
        default:
            return defaultLabel;
    };
  };

  return {
    format
  };
}
