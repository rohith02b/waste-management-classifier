'use client';

import landingAnimation from '@/components/animations/landing.json';
import darkLandingAnimation from '@/components/animations/landing-dark.json';
import Lottie from 'lottie-react';
import React from 'react';
import { useTheme } from 'next-themes';

const LandingAnimation = () => {
  const { resolvedTheme } = useTheme();

  return (
    <Lottie
      className='md:w-1/2 mt-12 mx-auto bg-transparent'
      animationData={
        resolvedTheme === 'dark' ? darkLandingAnimation : landingAnimation
      }
    />
  );
};

export default LandingAnimation;
