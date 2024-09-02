import { User } from "@auth/core/types";
import { Session } from "next-auth";

export interface CustomUser extends Session {
  user: User;

  name: string;
  email: string;
  picture: string;
  image: string;

  userPk: number;
  userId: string;
  username: string;
  nickname: string;
  userType: string;
  registerBy: string;
  profileImage: string;

  phoneNumberOne: string;
  phoneNumberTwo: string;

  addressOne: string;
  addressTwo: string;
  postCode: string;

  marketingOne: boolean;
  marketingTwo: boolean;
  marketingThree: boolean;

  exp: number;

  cash: number;
  cashChargeCount: number;
  cashUsedCount: number;
  cashChargeTotal: number;
  point: number;
  pointUsedCount: number;
  eventPoint: number;
  eventPointEntry: number;

  postCount: number;
  commentCount: number;

  adultVerification: boolean;
  authorities: Array<Object>;

  registeredAt: string;
  lastLogin: string;

  credentialsNonExpired: boolean;
  accountNonExpired: boolean;
  accountNonLocked: boolean;
  enabled: boolean;
  sub: string;
}
