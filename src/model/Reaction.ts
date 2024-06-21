import { UserProfile } from "./UserProfile";

export interface Reaction {
  reactionType: string;
  user: UserProfile;
}
