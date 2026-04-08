import {
  AppOnboardingScreenFeatures,
  AppOnboardingScreenWelcome,
} from '@/features/app-onboarding/app-onboarding-screens';

export const appOnboardingScreens = [
  { name: 'welcome', Component: AppOnboardingScreenWelcome },
  { name: 'features', Component: AppOnboardingScreenFeatures },
];
