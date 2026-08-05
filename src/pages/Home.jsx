import PageWrapper from '../components/layout/PageWrapper';
import Seo from '../components/Seo';
import SectionDivider from '../components/layout/SectionDivider';
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
      title="AI/ML Engineer"
      description="AI/ML Student at IIIT Lucknow."
      path="/"
    />
    <Hero />
    <AboutMeSection />
    <SectionDivider />
    <SkillCloudSection />
    <SectionDivider />
    <ProjectShowcase />
    <SectionDivider />
    <ConnectCTA />
  </PageWrapper>
);

export default Home;
