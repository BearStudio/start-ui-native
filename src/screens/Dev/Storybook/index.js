import React from 'react';
import {getStorybookUI, configure} from '@storybook/react-native';

configure(() => {
  require('../../../stories');
}, module);

const StorybookUIRoot = getStorybookUI({});

const Storybook = () => <StorybookUIRoot />;

export default Storybook;
