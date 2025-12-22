import TopContent from "@main/TopContent";
import Qualifications from "@main/Qualifications";
import Idioms from "@main/Idioms";
import LanguageBlock from "@main/Languages/LanguageBlock";
import ProjectDisplay from "@main/ProjectDisplay";

export default function MainLayout() {
  return (
    <div
      className={`
        lg:rounded-2xl bg-pink-light dark:bg-purple-dark
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
