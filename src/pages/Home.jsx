import PageWrapper from '../components/layout/PageWrapper';
import Hero from '../components/Hero';
import {
  AchievementMarquee,
  AboutMeSection,
  SkillCloudSection,
  ProjectShowcase,
  ConnectCTA,
} from '../components/home/HomeSections';

const Home = () => {
  return (
    <PageWrapper>
      <Hero />
      <AchievementMarquee />
      <AboutMeSection />
      <SkillCloudSection />
      <ProjectShowcase />
      <ConnectCTA />
    </PageWrapper>
  );
};

export default Home;
// Force HMR reload
