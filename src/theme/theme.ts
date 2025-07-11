import foundations from './foundations';

export const theme = {
  name: 'startUINativeTheme',
  ...foundations,
  components: {
    Modal: {
      baseStyle: {
        bg: 'gray.100',
        _dark: {
          bg: 'gray.900',
        },
      },
    },
  },
};
