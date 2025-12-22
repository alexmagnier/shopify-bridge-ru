// pages/partners/index.tsx

import React from 'react';
import { PartnerHero } from '@/components/partners/landing/PartnerHero';
import { HowItWorks } from '@/components/partners/landing/HowItWorks';
import { CommissionStructure } from '@/components/partners/landing/CommissionStructure';
import { Benefits } from '@/components/partners/landing/Benefits';
import { TargetAudience } from '@/components/partners/landing/TargetAudience';
import { FAQ } from '@/components/partners/landing/FAQ';
import { JoinCTA } from '@/components/partners/landing/JoinCTA';

const PartnersLandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <PartnerHero />
      <HowItWorks />
      <CommissionStructure />
      <Benefits />
      <TargetAudience />
      <FAQ />
      <JoinCTA />
    </div>
  );
};

export default PartnersLandingPage;

