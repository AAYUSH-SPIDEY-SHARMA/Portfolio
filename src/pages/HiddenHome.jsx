import { useState } from 'react';
import { Navigate } from 'react-router-dom';
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

/**
 * The easter-egg dimension, reachable only by clicking the C++ skill pill six
 * times on the home page.
 *
 * The gate is evaluated during the first render rather than in an effect — the
 * old effect-based redirect painted a frame of the secret page before bouncing,
 * which both leaked the surprise and flashed content. A lazy useState
 * initializer reads the flag once and is safe under StrictMode's double render.
 */
const HiddenHome = () => {
  const [unlocked] = useState(() => sessionStorage.getItem('easterEggTriggered') === 'true');

  if (!unlocked) return <Navigate to="/" replace />;

  return (
    <PageWrapper>
      <Seo
        title="Hidden Dimension"
        description="A quieter corner of the portfolio."
        path="/hidden"
        noIndex
      />
      <Hero variant="hidden" />
      <AboutMeSection />
      <SectionDivider />
      <SkillCloudSection variant="hidden" />
      <SectionDivider />
      <ProjectShowcase variant="hidden" />
      <SectionDivider />
      <ConnectCTA />
    </PageWrapper>
  );
};

export default HiddenHome;
