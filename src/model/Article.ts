import { Reaction } from "./Reaction";
import { Scrap } from "./Scrap";
import { UserProfile } from "./UserProfile";

export interface Article {
  user: UserProfile;

  boardPk: number;
  boardName: string;

  articlePk: number;
  title: string;
  content: string;
  originContent: string;

  readCount: number;
  likeCount: number;
  neutralCount: number;
  dislikeCount: number;
  scrapCount: number;

  createdAt: string;
  updatedAt: string;

  reactions: Reaction[];
  scraps: Scrap[];
}
