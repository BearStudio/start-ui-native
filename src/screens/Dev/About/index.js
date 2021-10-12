import React from 'react';

import { useNavigation } from '@react-navigation/core';
import {
  ArrowBackIcon,
  Divider,
  Heading,
  HStack,
  IconButton,
  Stack,
  Text,
} from 'native-base';
import VersionNumber from 'react-native-version-number';

import { CONFIG } from '@/environment/config';
import ENVS from '@/services/constants/envs';

const ENVIRONMENTS_LABELS = {
  [ENVS.LOCAL]: 'Local',
  [ENVS.DEV]: 'Développement',
  [ENVS.STAGING]: 'Staging',
  [ENVS.PROD]: 'Production',
};

const isHermes = () => !!global.HermesInternal;

const Info = ({ label = '', children, ...rest }) => (
  <HStack space="xs" px="2" {...rest}>
    <Text flex="1" color="gray.600">
      {label}
    </Text>
    <Text fontWeight="bold">{children}</Text>
  </HStack>
);

const AboutScreen = () => {
  const navigation = useNavigation();
  return (
    <Stack space="4" bg="white" h="full" p="6">
      <HStack alignItems="center" space="xs">
        <IconButton
          ml={-3}
          onPress={() => navigation.goBack()}
          icon={<ArrowBackIcon color="gray.600" size="6" />}
        />
        <Heading>About this app</Heading>
      </HStack>
      <Stack
        space="2"
        divider={<Divider w="full" />}
        borderColor="gray.200"
        borderTopWidth="1px"
        borderBottomWidth="1px"
        py="2"
      >
        <Info label="App version">{VersionNumber.appVersion}</Info>
        <Info label="Build number">{VersionNumber.buildVersion}</Info>
        <Info label="Environnement">{ENVIRONMENTS_LABELS[CONFIG.ENV]}</Info>
        <Info label="Mode">{__DEV__ ? 'Dev' : 'Prod'}</Info>
        <Info label="Using Hermes JS Engine?">{isHermes() ? 'Yes' : 'No'}</Info>
      </Stack>
    </Stack>
  );
};

export default AboutScreen;
