import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PageWrapper from '../components/layout/PageWrapper';
import HiddenHero from '../components/hidden/HiddenHero';
import {
  AboutMeSection,
  SkillCloudSection,
  ProjectShowcase,
  ConnectCTA,
} from '../components/hidden/HiddenHomeSections';

const HiddenHome = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // 1. If not triggered legitimately (e.g. browser reload or direct URL entry) -> boot to home
    if (!location.state?.triggered) {
      navigate('/', { replace: true });
      return;
    }

    // 2. Otherwise, scroll to top smoothly (or instantly) since they just navigated
    window.scrollTo({ top: 0, behavior: 'instant' });

    // 3. Clear the state so a browser reload won't have it anymore
    navigate('.', { replace: true, state: {} });
  }, [location, navigate]);

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
