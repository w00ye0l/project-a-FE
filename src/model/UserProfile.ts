export interface UserProfile {
  userPk: number;
  nickname: string;
  profileImage: string;

  postCount: number;
  commentCount: number;

  exp: number;
  point: number;
  eventPoint: number;

  registeredAt: string;
  lastLogin: string;
}
