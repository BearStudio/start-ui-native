export type AccountRole = 'ROLE_ADMIN' | 'ROLE_USER';
export type Account = {
  id: number;
  login: string;
  firstName?: string;
  lastName?: string;
  email: string;
  activated: boolean;
  authorities: AccountRole[];
  createdBy?: string;
  createdDate?: string;
  lastModifiedBy?: string;
  lastModifiedDate?: string;
};
