import foundations from '@/theme/foundations';

export default {
  name: 'light',
  ...foundations,
  components: {
    Modal: {
      bg: 'gray.100',
    },
  },
};
