import React from 'react';

import {useNavigation} from '@react-navigation/native';
import {Div, Text} from 'react-native-magnus';
import VersionNumber from 'react-native-version-number';
import ENVS from '../../../services/constants/envs';
import {CONFIG} from '../../../../environments/current/config';

const ENVIRONMENTS_LABELS = {
  [ENVS.LOCAL]: 'Local',
  [ENVS.DEV]: 'Développement',
  [ENVS.STAGING]: 'Staging',
  [ENVS.PROD]: 'Production',
};

const AboutScreen = () => {
  const navigation = useNavigation();

  // TODO dev and use page layout
  return (
    <Container>
      <Text fontSize="lg" fontWeight="bold">
        Informations de l'application
      </Text>
      <Div mt="md">
        <Text>Version de l'application: {VersionNumber.appVersion}</Text>
        <Text>Build: {VersionNumber.buildVersion}</Text>
        <Text>
          Environnement / Mode: {ENVIRONMENTS_LABELS[CONFIG.ENV]} /{' '}
          {__DEV__ ? 'Dev' : 'Prod'}
        </Text>
      </Div>

      {__DEV__ && (
        <>
          <Text fontSize="lg" fontWeight="bold" mt="xl">
            Options développeurs
          </Text>
          <Div flexDir="row" mt="md">
            <Div flex={1}>
              <Button
                variant="block"
                colorScheme="primary"
                onPress={() => navigation.navigate('Components')}>
                Composants
              </Button>
            </Div>
            <Div flex={1}>
              <Button
                variant="block"
                colorScheme="primary"
                onPress={() => navigation.navigate('Services')}>
                Services
              </Button>
            </Div>
          </Div>
        </>
      )}
    </Container>
  );
};

export default AboutScreen;
