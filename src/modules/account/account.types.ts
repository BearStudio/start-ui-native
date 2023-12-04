export type AccountRole = 'ADMIN' | 'APP';
export type Account = {
  id: string;
  name?: string;
  email: string;
  authorities: AccountRole[];
  language: string;
};
