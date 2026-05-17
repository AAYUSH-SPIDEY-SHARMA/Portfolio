import PageWrapper from '../components/layout/PageWrapper';
import Hero from '../components/Hero';
import {
  AboutMeSection,
  SkillCloudSection,
  ProjectShowcase,
  ConnectCTA,
} from '../components/home/HomeSections';

const Home = () => {
  return (
    <PageWrapper>
      <Hero />
      <AboutMeSection />
      <SkillCloudSection />
      <ProjectShowcase />
      <ConnectCTA />
    </PageWrapper>
  );
};

export default Home;
// Force HMR reload
