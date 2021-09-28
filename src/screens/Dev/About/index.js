import React from 'react';

import { Div, Text } from 'react-native-magnus';
import VersionNumber from 'react-native-version-number';

import { BackButton } from '@/components/BackButton';
import { CONFIG } from '@/environment/config';
import ENVS from '@/services/constants/envs';

const ENVIRONMENTS_LABELS = {
  [ENVS.LOCAL]: 'Local',
  [ENVS.DEV]: 'Développement',
  [ENVS.STAGING]: 'Staging',
  [ENVS.PROD]: 'Production',
};

const isHermes = () => !!global.HermesInternal;

const AboutScreen = () => {
  return (
    <Div p="xl" bg="body">
      <BackButton />
      <Div my="xl">
        <Text fontSize="6xl" color="text">
          📦 Start UI Native
        </Text>
      </Div>

      <Text fontSize="lg" fontWeight="bold">
        Informations de l'application
      </Text>
      <Div mt="md">
        <Text>Version de l'application: {VersionNumber.appVersion}</Text>
        <Text>Numéro de Build: {VersionNumber.buildVersion}</Text>
        <Text>Environnement: {ENVIRONMENTS_LABELS[CONFIG.ENV]}</Text>
        <Text>Mode: {__DEV__ ? 'Dev' : 'Prod'}</Text>
        {isHermes() && <Text>Using Hermes JS Engine</Text>}
      </Div>
    </Div>
  );
};

export default AboutScreen;
