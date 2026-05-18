import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageWrapper from '../components/layout/PageWrapper';
import HiddenHero from '../components/hidden/HiddenHero';
import {
  AboutMeSection,
  SkillCloudSection,
  ProjectShowcase,
  ConnectCTA,
} from '../components/hidden/HiddenHomeSections';

const HiddenHome = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isTriggered = sessionStorage.getItem('easterEggTriggered');

    // 1. If not triggered legitimately -> boot to home
    if (!isTriggered) {
      navigate('/', { replace: true });
      return;
    }

    // 2. Scroll to top immediately
    window.scrollTo({ top: 0, behavior: 'instant' });

    // 3. Clear the sessionStorage so a future hard reload will fail this check
    sessionStorage.removeItem('easterEggTriggered');
  }, [navigate]);

  return (
    <PageWrapper>
      <HiddenHero />
      <AboutMeSection />
      <SkillCloudSection />
      <ProjectShowcase />
      <ConnectCTA />
    </PageWrapper>
  );
};

export default HiddenHome;
