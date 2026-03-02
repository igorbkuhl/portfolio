export const useLanguage = (lang: string) => {
  const format = (): string => {
    if (lang == "c-sharp") return "C#";
    return lang;
  };

  return {
    format
  };
}
