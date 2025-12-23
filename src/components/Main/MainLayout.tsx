import TopContent from "@main/TopContent";
import Qualifications from "@main/Qualifications";
import Idioms from "@main/Idioms";
import LanguageBlock from "@main/Languages/LanguageBlock";
import ProjectDisplay from "@main/ProjectDisplay";

export default function MainLayout() {
  return (
    <div
      className={`
        lg:rounded-2xl bg-linear-to-b
        from-pink-light to-violet-100
        dark:from-purple-dark dark:to-indigo-950
        shadow-lg/25 shadow-indigo-300 dark:shadow-rose-950
        w-screen lg:w-280 p-8
      `}
    >
      <div className="w-[80%] mx-auto">
        <div id="main-content">
          <TopContent />
          <Qualifications />
          <Idioms />
        </div>
        <LanguageBlock />
        <ProjectDisplay />
      </div>
    </div>
  )
}
