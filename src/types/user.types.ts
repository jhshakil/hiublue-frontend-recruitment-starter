export type TUser = {
  users: TUserData;
  token: string;
};

export type TUserData = {
  id: string;
  email: string;
  name: string;
};
