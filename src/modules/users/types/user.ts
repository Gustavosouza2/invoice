export type Account = {
  password: string | null;
  providerId: string;
  accountId: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  id: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  createdAt: Date;
  accounts: Account[];
  password?: string;
};

export type GetUsersResponse = {
  id: string;
  name: string;
  email: string;
  phone: string;
  createdAt: Date;
  accounts: Account[];
};
