import AboutPage from "@/components/about";
import ExperiencePage from "@/components/experience";
import Hero from "@/components/hero";
import ProjectPage from "@/components/project";
import SkillsPage from "@/components/skills";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <>
    <div className="bg-background sm:px-4 md:px-8 lg:px-12">
      <Hero/>
      <AboutPage/>
      <SkillsPage/>
      <ProjectPage/>
      <ExperiencePage/>
    </div>
      <Footer/>
    </>
  );
}
