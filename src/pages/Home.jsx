import PageWrapper from '../components/layout/PageWrapper';
import Seo from '../components/Seo';
import Hero from '../components/Hero';
import {
  AboutMeSection,
  SkillCloudSection,
  ProjectShowcase,
  ConnectCTA,
} from '../components/home/HomeSections';

const Home = () => (
  <PageWrapper>
    <Seo
      title="Open Source Contributor & AI/ML Engineer"
      description="M.Sc AI/ML at IIIT Lucknow. Open source contributor, competitive programmer, and Bitcoin protocol learner. Explore projects, skills, and writing."
      path="/"
    />
    <Hero />
    <AboutMeSection />
    <SkillCloudSection />
    <ProjectShowcase />
    <ConnectCTA />
  </PageWrapper>
);

export default Home;
