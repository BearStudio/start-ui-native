/* eslint-disable no-unused-expressions */
import { createServer } from 'miragejs';

if (window.server) {
  window.server.shutdown();
}

window.server = createServer({
  routes() {
    this.post('/authenticate', () => {
      return {
        id_token: 'token',
      };
    }),
      this.get('/account', () => {
        return {
          firstName: 'Tom',
          lastName: 'Cruise',
          email: 'tom@email.com',
          authorities: ['ROLE_USER'],
        };
      }),
      this.post('/register', () => {
        return {};
      }),
      this.post('/account', () => {
        return {};
      }),
      this.post('/account/reset-password/init', () => {
        return {};
      }),
      this.post('/account/reset-password/finish', () => {
        return {};
      }),
      this.post('/account/change-password', () => {
        return {};
      });
  },
});
